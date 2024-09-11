import { parse, format } from 'date-fns';

export const formatDate = () => {
  // we are assuming that every job is created in canada
  const date = new Date('2024-05-16' + ' 10:00:00');
  const formattedDate = format(date, 'yyyy/MM/dd');
  return formattedDate;
};

export const formatDateString = (dateString) => {
  // Parse the date string into a Date object
  const parsedDate = parse(dateString, 'MMMM dd, yyyy', new Date());
  return parsedDate.toLocaleDateString();
};

export const formatDateString2 = (dateString) => {
  // Parse the date string into a Date object
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  return parsedDate.toLocaleDateString();
};
