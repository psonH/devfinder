export const getDateString = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const monthInt = date.getMonth() + 1;
  const day = date.getDate();
  let monthString = "";

  switch (monthInt) {
    case 1:
      monthString = "Jan";
      break;
    case 2:
      monthString = "Feb";
      break;
    case 3:
      monthString = "March";
      break;
    case 4:
      monthString = "April";
      break;
    case 5:
      monthString = "May";
      break;
    case 6:
      monthString = "June";
      break;
    case 7:
      monthString = "July";
      break;
    case 8:
      monthString = "Aug";
      break;
    case 9:
      monthString = "Sept";
      break;
    case 10:
      monthString = "Oct";
      break;
    case 11:
      monthString = "Nov";
      break;
    case 12:
      monthString = "Dec";
      break;
    default:
      break;
  }
  return [year, monthString, day];
};
