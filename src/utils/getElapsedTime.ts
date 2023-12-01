const getElapsedTime = (datetimeString: string): string => {
  console.log(datetimeString);
  const datetimeParts = datetimeString.split(' / ');
  const datePart = datetimeParts[0];
  const timePart = datetimeParts[1];

  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  const start = new Date(year, month - 1, day, hours, minutes, seconds);
  const end = new Date();

  const secondsElapsed = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (secondsElapsed < 60) return '방금 전';

  const minutesElapsed = secondsElapsed / 60;
  if (minutesElapsed < 60) return `${Math.floor(minutesElapsed)}분 전`;

  const hoursElapsed = minutesElapsed / 60;
  if (hoursElapsed < 24) return `${Math.floor(hoursElapsed)}시간 전`;

  const daysElapsed = hoursElapsed / 24;
  if (daysElapsed < 7) return `${Math.floor(daysElapsed)}일 전`;

  return `${start.toLocaleDateString()}`;
};

export default getElapsedTime;
