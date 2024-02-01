import { useApi } from 'app/hooks/useApi';

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

export async function getAllAssociation() {
  try { 
    const response = await api.get('association');
    const groupsData = response.data;
    return {
      datas: groupsData,
      status: true,
    };
  } catch (error) {
    return {
      datas: [],
      status: false,
    };
  }
}



export async function getAssociationById(id: any) {
  try {
    const response = await api.get(`/association/${id}`);
    const groupsData = response.data;
    return {
      datas: groupsData,
      status: true,
    };
  } catch (error) {}
}

export async function createAssociation(data: any) {
  try {
    const response = await api.post('association', data);
    return {
      datas: response.data,
      status: true,
    };
  } catch (error) {
    return {
      datas: {},
      status: false,
    };
  }
}

export async function updateAssociationById(id: any, data: any) {
  try {
    const response = await api.put(`association/${id}`, data);
    return {
      datas: response.data,
      status: true,
    };
  } catch (error) {
    return {
      datas: {},
      status: false,
    };
  }
}

export async function deleteAssociationById(id: any) {
  try {
    const response = await api.delete(`association/${id}`);
    return {
      datas: response.data,
      status: true,
    };
  } catch (error) {
    return {
      datas: [],
      status: false,
    };
  }
}

export async function getAssociationByUserId(id: any) {
  try {
    const response = await api.get(`/association/user/${id}`);
    const groupsData = response.data;
    return {
      datas: groupsData,
      status: true,
    };
  } catch (error) {}
}
