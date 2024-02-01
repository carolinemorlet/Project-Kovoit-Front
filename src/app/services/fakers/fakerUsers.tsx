const users = [
  {
    _id: '5454654564',
    firstname: 'caroline',
    lastname: 'morlet',
    email: 'carolinemorlet@kovoit.com',
    password: '2023',
    status: 2,
    roles: [
      {
        assoId: ["64d0ad2b16728eb0723e9bf6"],
        role: 1
      }
    ],
    all_event_available: true
  },
  {
    _id: '54546558458',
    firstname: 'conjoint',
    lastname: 'ancelin',
    email: 'ancelin@conjoint.fr',
    password: '1983',
    status: 2,
    roles: [
      {
        assoId: ["64d0ad2b16728eb0723e9bf6"],
        role: 1
      }
    ],
    all_event_available: true
  },
];

const fakeUsers = {
  response: 200,
  datas: users,
};
export { fakeUsers };
