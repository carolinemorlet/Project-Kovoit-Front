import { useApi } from 'app/hooks/useApi';
import { fakeCarshare } from '../fakers/fakerCarshare';
import { fakeParticipe } from '../fakers/fakerParticipe';

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

export async function getEvents() {
  try {
    const response = await api.get('/event');
    const eventsData = response.data;
    return {
      datas: eventsData,
      status: true,
    };
  } catch (error) {
    return {
      datas: [],
      status: false,
    };
  }
}

export async function getEventById(id: any) {
  try {
    const response = await api.get(`event/${id}`);
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

export async function createEvent(data: any) {
  try {
    const response = await api.post('event', data);
    console.log('service après appel api', data);
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

export async function updateEvent(id: any, data: any) {
  try {
    const response = await api.put(`event/${id}`, data);
    return {
      datas: response.data,
      // datas: response.datas,
      status: true,
    };
  } catch (error) {
    return {
      datas: [],
      status: false,
    };
  }
}

export async function deleteEventById(id: any) {
  try {
    const response = await api.delete(`event/${id}`);
    console.log(
      '🚀 ~ file: eventsService.tsx:83 ~ deleteEventById ~ response:',
      id
    );
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

//cette fonction récupère les enfants associés à un eventId
export async function getChildByEventId() {
  try {
    const response = await fakeParticipe.datas;
    const childByEventId = {};
    for (const item of response.events) {
      const { eventId, kidId } = item;
      if (!childByEventId[eventId]) {
        childByEventId[eventId] = [];
      }
      childByEventId[eventId].push(kidId);
    }
    return {
      datas: childByEventId,
    };
  } catch (error) {}
}

//cette fonction récupère les utilisateur associés à un eventId pour un covoiturage
// export async function getEventByUserId() {
//   try {
//     const response = await fakeCarshare.datas;
//     const eventByUserId = [];
//     for (const item of response.events) {
//       const { eventId, userId } = item;
//       if (!eventByUserId[userId]) {
//         eventByUserId[userId] = [];
//       }
//       eventByUserId[userId].push(eventId);
//     }
//     return {
//       datas: eventByUserId,
//     };
//   } catch (error) {}
// }
