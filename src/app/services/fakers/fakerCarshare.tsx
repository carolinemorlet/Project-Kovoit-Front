const carshare = {
  events: [
    {
      _id: '1',
      created_at: '2023-09-24',
      updated_at: '2023-09-24',
      userId: 'user1',
      eventId: 'event1',
      available_seat: 3,
      public: true,
    },
    {
      _id: '2',
      created_at: '2023-09-25',
      updated_at: '2023-09-25',
      userId: 'user2',
      eventId: 'event2',
      available_seat: 2,
      public: false,
    },
    {
      _id: '3',
      created_at: '2023-09-26',
      updated_at: '2023-09-26',
      userId: 'user3',
      eventId: 'event3',
      available_seat: 4,
      public: true,
    },
    {
      _id: '4',
      created_at: '2023-09-24',
      updated_at: '2023-09-24',
      userId: 'user1',
      eventId: 'event4',
      available_seat: 3,
      public: true,
    },
    {
      _id: '5',
      created_at: '2023-09-25',
      updated_at: '2023-09-25',
      userId: 'user3',
      eventId: 'event5',
      available_seat: 2,
      public: false,
    },
    {
      _id: '6',
      created_at: '2023-09-26',
      updated_at: '2023-09-26',
      userId: 'user3',
      eventId: 'event6',
      available_seat: 4,
      public: true,
    },
  ],
  users: [
    {
      _id: 'user1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      _id: 'user2',
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
    },
    {
      _id: 'user3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
    },
  ],
};
const fakeCarshare = {
  response: 200,
  datas: carshare,
};

export { fakeCarshare };
