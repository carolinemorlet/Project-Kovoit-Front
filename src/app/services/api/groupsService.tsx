import { useApi } from '../../hooks/useApi';

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

export async function getGroups() {
  try {
    const response = await api.get('group');
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

export async function getGroupById(id: any) {
  try {
    const response = await api.get(`group/${id}`);
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

export async function createGroup(data: any) {
  try {
    const response = await api.post('group', data);
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


export async function updateGroup(id: any, data: any) {
  try {
    const response = await api.put(`group/${id}`, {
      ...data,
      kidId: data.kidId.map((kid) => kid._id),
    });
    return {
      datas: response.data,
      status: true,
    };
  } catch (error) {
    console.error('Erreur dans la requête PUT', error);
    return {
      datas: [],
      status: false,
    };
  }
}

export async function deleteGroupById(id: any) {
  try {
    const response = await api.delete(`group/${id}`);
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

//fonction pour récupérer les groupes en fonction de l'association
// export async function getGroupByAssoId(assoId: number) {
//   try {
//     const response = await fakeGroups.datas.find(
//       (el: any) => el.assoId === assoId
//     );
//     return {
//       datas: response,
//       status: true,
//     };
//   } catch (error) {}
// }
