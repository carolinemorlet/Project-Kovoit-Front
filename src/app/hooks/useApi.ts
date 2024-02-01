import axios from 'axios';
const url = 'http://localhost:3001/';
export function useApi() {
  const api = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // interceptor response API
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        const originalRequest = error.config;
        if (!originalRequest._retry) {
          // pour éviter boucle infinie du refreshToken
          originalRequest._retry = true;
        }

        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          try {
            const result = await refreshTokens();
            localStorage.setItem('accessToken', result?.data.datas.accessToken);
            localStorage.setItem(
              'refreshToken',
              result?.data.datas.refreshToken
            );
            originalRequest.headers['Authorization'] =
              'Bearer ' + result?.data.datas.accessToken;
            return axios(originalRequest);
          } catch (error) {
            // supprimer le token et le refresh
            destroyTokenUser();
            window.location.href = '/';
          }
        } else {
          // supprimer le token et le refresh
          destroyTokenUser();
          window.location.href = '/';
        }
      }
      if (error.response && error.response.status === 500) {
        destroyTokenUser();
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );
  return api;
}

// A mettre dans les functions ---> api/auth.ts
export async function refreshTokens() {
  const token = localStorage.getItem('refreshToken');
  const headers = {
    Authorization: 'Bearer ' + token,
  };

  try {
    const refreshResponse = await axios.get(url + 'auth/refresh-token', {
      headers,
    });
    return refreshResponse;
  } catch (error) {
    throw new Error('Echec du refreshToken ' + error);
  }
}

export async function destroyTokenUser() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}
