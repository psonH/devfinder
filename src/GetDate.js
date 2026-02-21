const MONTHS = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

export const getDateString = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const monthString = MONTHS[date.getMonth()];
  const day = date.getDate();
  return [year, monthString, day];
};
