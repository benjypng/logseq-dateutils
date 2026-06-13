import format from 'date-fns/format/index.js';

const assertValidDate = (d: Date) => {
  if (!(d instanceof Date) || isNaN(d.getTime())) {
    throw new RangeError('logseq-dateutils: an invalid Date was provided');
  }
};

const assertValidFormat = (f: string) => {
  if (typeof f !== 'string' || f.trim() === '') {
    throw new RangeError('logseq-dateutils: a date format string is required');
  }
};

export const getDateForPage = (d: Date, preferredDateFormat: string) => {
  assertValidDate(d);
  assertValidFormat(preferredDateFormat);
  return `[[${format(d, preferredDateFormat)}]]`;
};

export const getDateForPageWithoutBrackets = (
  d: Date,
  preferredDateFormat: string
) => {
  assertValidDate(d);
  assertValidFormat(preferredDateFormat);
  return format(d, preferredDateFormat);
};

export const getDeadlineDateDay = (d: Date) => {
  assertValidDate(d);
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
  assertValidDate(d);
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
  assertValidDate(d);
  const dateComponent = format(d, 'yyMMdd');
  const time = format(d, 'HHmm');
  return `${dateComponent}T${time}`;
};

export const getYYMMDD = (d: Date) => {
  assertValidDate(d);
  return format(d, 'yyMMdd');
};
