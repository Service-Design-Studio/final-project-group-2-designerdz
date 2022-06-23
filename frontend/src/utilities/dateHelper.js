const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let date;
let day;
let month;
let year;

export function getMonthYear(strDate) {
  date = new Date(strDate);
  month = monthNames[date.getMonth()];
  year = date.getFullYear();
  return "".concat(month + " " + year);
}
export function getDateMonthYear(strDate) {
  date = new Date(strDate);
  day = date.getDay();
  month = monthNames[date.getMonth()];
  year = date.getFullYear();
  return "".concat(`${day} ${month} ${year}`);
}

export default { getMonthYear, getDateMonthYear };
