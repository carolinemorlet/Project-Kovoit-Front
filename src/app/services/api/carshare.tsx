import { fakeCarshare } from '../../services/fakers/fakerCarshare';
import { fakeParticipe } from '../../services/fakers/fakerParticipe';

export async function getAllCarshare() {
  try {
    const response = await fakeParticipe.datas;
    // const response = await api.get("/users");
    return {
      datas: response,
      status: true,
    };
  } catch (error) {}
}

