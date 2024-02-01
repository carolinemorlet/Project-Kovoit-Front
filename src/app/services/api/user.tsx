import { fakeUsers } from '../fakers/fakerUsers';

export async function getUsers() {
  try {
    const response = await fakeUsers.datas;
    // const response = await api.get("/users");
    return {
      datas: response,
      status: true,
    };
  } catch (error) {}
}

export async function getUserById(id: any) {
  try {
    const response = await fakeUsers.datas.find((el: any) => el.id === id);
    // const response = await api.get("/users/${id}");
    return {
      datas: response,
      status: true,
    };
  } catch (error) {}
}
