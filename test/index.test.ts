import {
  getDateForPage,
  getDateForPageWithoutBrackets,
  getDeadlineDateDay,
  getScheduledDateDay,
  getYYMMDD,
  getYYMMDDTHHMMFormat,
} from '../src/index';

describe('Get date for page in brackets', () => {
  it('gets the date for a page in brackets', () => {
    expect(getDateForPage(new Date('Tue Oct 03 2023'), 'MMM do, yyyy')).toEqual(
      '[[Oct 3rd, 2023]]'
    );
  });
});

describe('Get date for page without brackets', () => {
  it('gets the date for a page without brackets', () => {
    expect(
      getDateForPageWithoutBrackets(new Date('Tue Oct 03 2023'), 'MMM do, yyyy')
    ).toEqual('Oct 3rd, 2023');
  });
});

describe('Get DEADLINE component', () => {
  it('gets deadline-compatible component', () => {
    expect(
      getDeadlineDateDay(
        new Date(`Tue Oct 03 2023 12:35:47 GMT+0800 (Singapore Standard Time)`)
      )
    ).toEqual('DEADLINE: <2023-10-03 Tue 12:35>');
  });

  it('gets deadline-compatible component without time', () => {
    expect(getDeadlineDateDay(new Date(`Tue Oct 03 2023`))).toEqual(
      'DEADLINE: <2023-10-03 Tue>'
    );
  });
});

describe('Get SCHEDULED component', () => {
  it('gets scheduled-compatible component', () => {
    expect(
      getScheduledDateDay(
        new Date(`Tue Oct 03 2023 12:35:47 GMT+0800 (Singapore Standard Time)`)
      )
    ).toEqual('SCHEDULED: <2023-10-03 Tue 12:35>');
  });

  it('gets scheduled-compatible component without time', () => {
    expect(getScheduledDateDay(new Date(`Tue Oct 03 2023`))).toEqual(
      'SCHEDULED: <2023-10-03 Tue>'
    );
  });
});

describe('Get YYMMDDTHHMM', () => {
  it('Get the date in YYMMDDTHHMM', () => {
    expect(
      getYYMMDDTHHMMFormat(
        new Date(`Tue Oct 03 2023 12:35:47 GMT+0800 (Singapore Standard Time)`)
      )
    ).toEqual('231003T1235');
  });
});

describe('Get YYMMDD', () => {
  it('Get the date in YYMMDD', () => {
    expect(
      getYYMMDD(
        new Date(`Tue Oct 03 2023 12:35:47 GMT+0800 (Singapore Standard Time)`)
      )
    ).toEqual('231003');
  });
});
