export const formatDateAndTime = (isoDate) => {
  const dateObj = new Date(isoDate);

  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;

  const hours = dateObj.getUTCHours().toString().padStart(2, '0');
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export const formatBirthdate = (isoDate) => {
  const dateObj = new Date(isoDate);

  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const formattedDate = `${day}/${month}/${year}`;

  const hours = dateObj.getUTCHours().toString().padStart(2, '0');
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export const formatDateString = (rawDate) => {
  const [day, month, year] = rawDate.split('-');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};