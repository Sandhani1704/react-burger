export const transformDate = (date: string) => {
  const getDiffDays = (days: number) =>
    days === 0
      ? 'Сегодня'
      : days === 1
      ? 'Вчера'
      : days > 4
      ? `${days} дней назад`
      : days > 1
      ? `${days} дня назад`
      : '';
  const dataCreate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = Math.ceil((+today - +dataCreate) / (60 * 60 * 24 * 1000));
  const hours =
    dataCreate.getHours() > 9
      ? dataCreate.getHours()
      : `0${dataCreate.getHours()}`;
  const min =
    dataCreate.getMinutes() > 9
      ? dataCreate.getMinutes()
      : `0${dataCreate.getMinutes()}`;
  return `${getDiffDays(diffTime)}, ${hours}:${min} i-GMT+${
    (dataCreate.getTimezoneOffset() * -1) / 60
  }`;
};