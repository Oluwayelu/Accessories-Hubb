export const getDate = (date: Date) => {
  return new Date(date).toDateString();
};

export const getDateLocale = (date: Date) => {
  return new Date(date).toLocaleDateString("en-UK");
};
