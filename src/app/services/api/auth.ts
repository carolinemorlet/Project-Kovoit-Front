import { useApi } from "../../hooks/useApi";

// eslint-disable-next-line
const api = useApi();

export async function login(body):Promise<any> {
  try {
    const response = await api.post("auth/signin", body);
    return {
      datas: response,
      status: true
    };
  } catch (error) {
    return error;
  }
}

export async function createUser(body):Promise<any> {
  try {
    const response = await api.post("auth/signup", body);
    return {
      datas: response,
      status: true
    };
  } catch (error) {
    return error;
  }
}

