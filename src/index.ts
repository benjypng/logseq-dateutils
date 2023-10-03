import { format } from 'date-fns';

export const getDateForPage = (d: Date, preferredDateFormat: string) => {
  return `[[${format(d, preferredDateFormat)}]]`;
};

export const getDateForPageWithoutBrackets = (
  d: Date,
  preferredDateFormat: string
) => {
  return format(d, preferredDateFormat);
};

export const getDeadlineDateDay = (d: Date) => {
  const dateComponent = format(d, 'yyyy-MM-dd');
  const day = format(d, 'EEE');
  const time = format(d, 'HH:mm');
  if (time === '00:00') {
    return `DEADLINE: <${dateComponent} ${day}>`;
  } else {
    return `DEADLINE: <${dateComponent} ${day} ${time}>`;
  }
};

export const getScheduledDateDay = (d: Date) => {
  const dateComponent = format(d, 'yyyy-MM-dd');
  const day = format(d, 'EEE');
  const time = format(d, 'HH:mm');
  if (time === '00:00') {
    return `SCHEDULED: <${dateComponent} ${day}>`;
  } else {
    return `SCHEDULED: <${dateComponent} ${day} ${time}>`;
  }
};

export const getYYMMDDTHHMMFormat = (d: Date) => {
  const dateComponent = format(d, 'yyMMdd');
  const time = format(d, 'HHmm');
  return `${dateComponent}T${time}`;
};

export const getYYMMDD = (d: Date) => {
  return format(d, 'yyMMdd');
};
