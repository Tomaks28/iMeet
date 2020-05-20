export const timeDifference = (previous: number) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const current: any = new Date();
  const previousDate: any = new Date(previous);

  const elapsed = current - previousDate;

  if (elapsed < msPerMinute) {
    return "Il y'a " + Math.round(elapsed / 1000) + " secondes";
  } else if (elapsed < msPerHour) {
    return "Il y'a " + Math.round(elapsed / msPerMinute) + " minutes";
  } else if (elapsed < msPerDay) {
    return "Il y'a " + Math.round(elapsed / msPerHour) + " heures";
  } else if (elapsed < msPerMonth) {
    return "Il y'a " + +Math.round(elapsed / msPerDay) + " jours";
  } else if (elapsed < msPerYear) {
    return "Il y'a " + +Math.round(elapsed / msPerMonth) + " mois";
  } else {
    return "Il y'a " + +Math.round(elapsed / msPerYear) + " années";
  }
};
