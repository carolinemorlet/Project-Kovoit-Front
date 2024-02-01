const relation = [
  {
    _id: 'relation1',
    created_at: '2023-09-25T14:00:00',
    updated_at: '2023-09-25T14:30:00',
    assoId: 'association1',
    kidId: 'kid1',
    userId: 'user1',
    type: 'Parent',
  },

  {
    _id: 'relation2',
    created_at: '2023-09-26T09:00:00',
    updated_at: '2023-09-26T09:45:00',
    assoId: 'association2',
    kidId: 'kid2',
    userId: 'user1',
    type: 'Parent',
  },
  {
    _id: 'relation3',
    created_at: '2023-09-27T11:00:00',
    updated_at: '2023-09-27T11:30:00',
    assoId: 'association1',
    kidId: 'kid3',
    userId: 'user3',
    type: 'Guardian',
  },
  {
    _id: 'relation3',
    created_at: '2023-09-27T11:00:00',
    updated_at: '2023-09-27T11:30:00',
    assoId: 'association1',
    kidId: 'aivy',
    userId: 'ancelin',
    type: 'Guardian',
  },
  {
    _id: 'relation3',
    created_at: '2023-09-27T11:00:00',
    updated_at: '2023-09-27T11:30:00',
    assoId: 'association1',
    kidId: 'riley',
    userId: 'ancelin',
    type: 'Guardian',
  },
  {
    _id: 'relation3',
    created_at: '2023-09-27T11:00:00',
    updated_at: '2023-09-27T11:30:00',
    assoId: 'association1',
    kidId: 'clay',
    userId: 'ancelin',
    type: 'Guardian',
  },
];

const fakeRelation = {
  response: 200,
  datas: relation,
};

export { fakeRelation };
