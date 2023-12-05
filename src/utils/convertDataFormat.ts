const convertDataFormat = (datetimeString: string) => {
  const [datePart, timePart] = datetimeString.split(' / ');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes, seconds] = timePart.split(':');

  const formattedDate = `${year}년 ${Number(month)}월 ${Number(day)}일 ${Number(hours)}시 ${Number(
    minutes,
  )}분 ${Number(seconds)}초`;

  return formattedDate;
};

export default convertDataFormat;
