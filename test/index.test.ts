import { describe, expect, it } from 'bun:test';
import {
  getDateForPage,
  getDateForPageWithoutBrackets,
  getDeadlineDateDay,
  getScheduledDateDay,
  getYYMMDD,
  getYYMMDDTHHMMFormat,
} from '../src/index';

describe('getDateForPage', () => {
  it('wraps the formatted date in [[brackets]]', () => {
    expect(getDateForPage(new Date(2023, 9, 3), 'MMM do, yyyy')).toEqual(
      '[[Oct 3rd, 2023]]'
    );
  });

  it('honours the supplied date format', () => {
    expect(getDateForPage(new Date(2023, 9, 3), 'yyyy/MM/dd')).toEqual(
      '[[2023/10/03]]'
    );
  });
});

describe('getDateForPageWithoutBrackets', () => {
  it('formats the date with no brackets', () => {
    expect(
      getDateForPageWithoutBrackets(new Date(2023, 9, 3), 'MMM do, yyyy')
    ).toEqual('Oct 3rd, 2023');
  });

  it('honours the supplied date format', () => {
    expect(
      getDateForPageWithoutBrackets(new Date(2023, 9, 3), 'yyyy/MM/dd')
    ).toEqual('2023/10/03');
  });
});

describe('getDeadlineDateDay', () => {
  it('includes the time when it is not midnight', () => {
    expect(getDeadlineDateDay(new Date(2023, 9, 3, 12, 35))).toEqual(
      'DEADLINE: <2023-10-03 Tue 12:35>'
    );
  });

  it('omits the time at exactly midnight', () => {
    expect(getDeadlineDateDay(new Date(2023, 9, 3, 0, 0))).toEqual(
      'DEADLINE: <2023-10-03 Tue>'
    );
  });

  it('omits the time for a date-only value', () => {
    expect(getDeadlineDateDay(new Date(2023, 9, 3))).toEqual(
      'DEADLINE: <2023-10-03 Tue>'
    );
  });

  it('keeps the time one minute past midnight', () => {
    expect(getDeadlineDateDay(new Date(2023, 9, 3, 0, 1))).toEqual(
      'DEADLINE: <2023-10-03 Tue 00:01>'
    );
  });
});

describe('getScheduledDateDay', () => {
  it('includes the time when it is not midnight', () => {
    expect(getScheduledDateDay(new Date(2023, 9, 3, 12, 35))).toEqual(
      'SCHEDULED: <2023-10-03 Tue 12:35>'
    );
  });

  it('omits the time at exactly midnight', () => {
    expect(getScheduledDateDay(new Date(2023, 9, 3, 0, 0))).toEqual(
      'SCHEDULED: <2023-10-03 Tue>'
    );
  });

  it('omits the time for a date-only value', () => {
    expect(getScheduledDateDay(new Date(2023, 9, 3))).toEqual(
      'SCHEDULED: <2023-10-03 Tue>'
    );
  });

  it('keeps the time one minute past midnight', () => {
    expect(getScheduledDateDay(new Date(2023, 9, 3, 0, 1))).toEqual(
      'SCHEDULED: <2023-10-03 Tue 00:01>'
    );
  });
});

describe('getYYMMDDTHHMMFormat', () => {
  it('formats date and time as yyMMddTHHmm', () => {
    expect(getYYMMDDTHHMMFormat(new Date(2023, 9, 3, 12, 35))).toEqual(
      '231003T1235'
    );
  });

  it('zero-pads the time at midnight', () => {
    expect(getYYMMDDTHHMMFormat(new Date(2023, 9, 3, 0, 0))).toEqual(
      '231003T0000'
    );
  });
});

describe('getYYMMDD', () => {
  it('formats the date as yyMMdd', () => {
    expect(getYYMMDD(new Date(2023, 9, 3, 12, 35))).toEqual('231003');
  });
});

describe('invalid dates', () => {
  const invalid = new Date('not a date');

  it.each([
    ['getDateForPage', () => getDateForPage(invalid, 'yyyy-MM-dd')],
    [
      'getDateForPageWithoutBrackets',
      () => getDateForPageWithoutBrackets(invalid, 'yyyy-MM-dd'),
    ],
    ['getDeadlineDateDay', () => getDeadlineDateDay(invalid)],
    ['getScheduledDateDay', () => getScheduledDateDay(invalid)],
    ['getYYMMDDTHHMMFormat', () => getYYMMDDTHHMMFormat(invalid)],
    ['getYYMMDD', () => getYYMMDD(invalid)],
  ])('%s throws a RangeError', (_name, call) => {
    expect(call).toThrow(RangeError);
    expect(call).toThrow('an invalid Date was provided');
  });
});

describe('invalid date format strings', () => {
  const valid = new Date(2023, 9, 3);

  it.each([
    ['empty string', ''],
    ['whitespace only', '   '],
    ['null', null as unknown as string],
    ['undefined', undefined as unknown as string],
    ['a number', 123 as unknown as string],
  ])('getDateForPage throws a RangeError for %s', (_name, fmt) => {
    const call = () => getDateForPage(valid, fmt);
    expect(call).toThrow(RangeError);
    expect(call).toThrow('a date format string is required');
  });

  it.each([
    ['empty string', ''],
    ['whitespace only', '   '],
    ['null', null as unknown as string],
    ['undefined', undefined as unknown as string],
    ['a number', 123 as unknown as string],
  ])(
    'getDateForPageWithoutBrackets throws a RangeError for %s',
    (_name, fmt) => {
      const call = () => getDateForPageWithoutBrackets(valid, fmt);
      expect(call).toThrow(RangeError);
      expect(call).toThrow('a date format string is required');
    }
  );
});
