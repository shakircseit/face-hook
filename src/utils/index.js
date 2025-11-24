export const getDayDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime();
  difference = Math.floor(difference / 1000); // convert to seconds

  const secondsInYear = 365 * 24 * 3600;
  const secondsInDay = 24 * 3600;
  const secondsInHour = 3600;
  const secondsInMinute = 60;

  let yearDifference = Math.floor(difference / secondsInYear);
  difference -= yearDifference * secondsInYear;

  let dayDifference = Math.floor(difference / secondsInDay);
  difference -= dayDifference * secondsInDay;

  let hourDifference = Math.floor(difference / secondsInHour);
  difference -= hourDifference * secondsInHour;

  let minuteDifference = Math.floor(difference / secondsInMinute);
  difference -= minuteDifference * secondsInMinute;

  let message = "";

  if (yearDifference > 0) {
    message += `${yearDifference}y `;
  }

  if (dayDifference > 0) {
    message += `${dayDifference}d `;
  }

  if (hourDifference > 0) {
    message += `${hourDifference}h `;
  }

  if (minuteDifference > 0) {
    message += `${minuteDifference}m `;
  }

  if (difference > 0) {
    message += `${difference}s`;
  }

  return message.trim();
};
