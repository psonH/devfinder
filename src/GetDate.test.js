import { getDateString } from './GetDate';

// Basic test for getDateString

describe('getDateString', () => {
  it('should convert ISO date to [year, month, day]', () => {
    const date = '2022-03-15T00:00:00Z';
    const result = getDateString(date);
    expect(result).toEqual([2022, 'March', 15]);
  });
});
