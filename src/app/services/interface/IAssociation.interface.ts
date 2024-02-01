export default interface IAssociation {
  id: string;
  name: string;
  address: {
    street1: string;
    street2: string;
    zip: number;
    city: string;
  };
  phone: string;
  website: string;
  userId: string;
}