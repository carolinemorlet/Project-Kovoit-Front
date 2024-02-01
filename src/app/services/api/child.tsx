import { useApi } from 'app/hooks/useApi';

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

export async function getChildren() {
  try {
    const response = await api.get('kid');
    const kidsData = response.data;
    return {
      datas:kidsData,
      status: true,
    };
  } catch (error) {
    return {
      datas: [],
      status: false,
    };
  }
}

export async function getChildById(id: string) {
  try {
    const response = await api.get(`/kid/${id}`);
    const kidsData = response.data;
    return {
      datas: kidsData,
      status: true,
    };
  } catch (error) {
    console.error('Error in getChildById:', error);
    return {
      datas: null,
      status: false,
    };
  }
}

export async function createChild(data: any) {
  try {
    const response = await api.post('kid', data);
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

export async function updateChildById(id: any, data: any) {
  try {
    const response = await api.put(`kid/${id}`, data);
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

export async function deleteChildById(id: any) {
  try {
    const response = await api.delete(`kid/${id}`);
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

// //cette fonction récupère les enfants associés à un userId
// export async function getChildByUserId() {
//   try {
//     const response = await fakeRelation.datas;
//     const childByUserId = {};
//     for (const item of response) {
//       const { userId, kidId } = item;
//       if (!childByUserId[userId]) {
//         childByUserId[userId] = [];
//       }
//       childByUserId[userId].push(kidId);
//     }
//   } catch (error) {}
// }
