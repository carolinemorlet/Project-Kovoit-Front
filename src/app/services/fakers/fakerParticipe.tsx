const participe = {
  events: [
    {
      _id: 'event1',
      created_at: '2023-09-27T08:00:00',
      updated_at: '2023-09-27T08:30:00',
      eventId: 'event1',
      kidId: 'kid1',
      carshareId: 'carshare1',
    },
    {
      _id: 'event2',
      created_at: '2023-09-28T10:00:00',
      updated_at: '2023-09-28T10:45:00',
      eventId: 'event2',
      kidId: 'kid2',
      carshareId: null,
    },
    {
      _id: 'event3',
      created_at: '2023-09-29T09:00:00',
      updated_at: '2023-09-29T09:45:00',
      eventId: 'event1',
      kidId: 'kid3',
      carshareId: 'carshare2',
    },
  ],
  kids: [
    {
      _id: 'kid1',
      name: 'Emma',
      age: 5,
    },
    {
      _id: 'kid2',
      name: 'Liam',
      age: 7,
    },
    {
      _id: 'kid3',
      name: 'Olivia',
      age: 6,
    },
  ],
  carshares: [
    {
      _id: 'carshare1',
      created_at: '2023-09-27T14:00:00',
      updated_at: '2023-09-27T14:30:00',
      available_seats: 3,
    },
    {
      _id: 'carshare2',
      created_at: '2023-09-28T09:00:00',
      updated_at: '2023-09-28T09:45:00',
      available_seats: 2,
    },
  ],
};

const fakeParticipe = {
  datas: participe,
  status: 200,
};

export { fakeParticipe };
