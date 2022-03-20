const locale = 'ru-RU';

const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const timeFormatter = new Intl.DateTimeFormat(locale, {
  hour: 'numeric',
  minute: 'numeric',
});

const formatDate = (input: Date|string) => {
  const dateTime = (input instanceof Date) ? input as Date : new Date(input);
  const date = dateFormatter.format(dateTime);
  const time = timeFormatter.format(dateTime);
  return `${date} в ${time}`;
};

export default formatDate;
