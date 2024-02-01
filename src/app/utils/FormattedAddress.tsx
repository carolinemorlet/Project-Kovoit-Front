export const formatAddress = (address) => {
  const addressParts = [
    address?.street1 || '',
    address?.street2 || '',
    address?.zip || '',
    address?.city || '',
  ];

  const fullAddress =
    addressParts.filter((part) => part !== '').join(', ') ||
    'adresse non disponible';

  return fullAddress;
};
