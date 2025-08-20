import type { ExtendedNativeTabOptions } from '../types';
import { getRecordFromTypeOrRecord, getValueFromTypeOrRecord, shouldTabBeVisible } from '../utils';

describe('shouldTabBeVisible', () => {
  it('returns true when options.hidden is false', () => {
    const options: ExtendedNativeTabOptions = { hidden: false };
    expect(shouldTabBeVisible(options)).toBe(true);
  });

  it('returns false when options.hidden is true', () => {
    const options: ExtendedNativeTabOptions = { hidden: true };
    expect(shouldTabBeVisible(options)).toBe(false);
  });

  it('returns false when options.hidden is undefined', () => {
    const options: ExtendedNativeTabOptions = {};
    expect(shouldTabBeVisible(options)).toBe(false);
  });
});

describe(getValueFromTypeOrRecord, () => {
  it.each([undefined, 'test', 123, true, false, null, () => {}])(
    'When primitive value is given to getValueFromTypeOrRecord, the it is returned',
    (value) => {
      const result = getValueFromTypeOrRecord<typeof value, 'test'>(value, 'test');
      expect(result).toEqual(value);
    }
  );
  it('When array is passed, then it is returned', () => {
    const result = getValueFromTypeOrRecord<string[], 'test'>(['test'], 'test');
    expect(result).toEqual(['test']);
  });
  it.each([{}, { test1: 'value' }, { anotherKey: 123 }])(
    'When object value is given, which does not include defined keys, then it is returned',
    (value) => {
      const result = getValueFromTypeOrRecord<typeof value, 'test'>(value, 'test');
      expect(result).toEqual(value);
    }
  );
  it.each([
    ['test', { test: 1 }, 1],
    ['test', { test: 1, test2: 2 }, 1],
    ['anotherKey', { test: 'a', anotherKey: 'b' }, 'b'],
    ['anotherKey', { test: { anotherKey: 'b' }, anotherKey: 'c' }, 'c'],
  ])(
    'When object value is given, which includes defined key, then its value is returned',
    (key, record, expected) => {
      const result = getValueFromTypeOrRecord<typeof record, typeof key>(record, key);
      expect(result).toEqual(expected);
    }
  );
});

describe(getRecordFromTypeOrRecord, () => {
  it.each([undefined, 'test', 123, true, false, null, () => {}])(
    'When primitive value is given to getRecordFromTypeOrRecord, then it is returned for default key',
    (value) => {
      const result = getRecordFromTypeOrRecord<typeof value, 'test' | 'a'>(
        value,
        ['test', 'a'],
        'a'
      );
      expect(result).toEqual({ a: value });
    }
  );
  it('When array is passed, then it is returned for default key', () => {
    const result = getRecordFromTypeOrRecord<string[], 'test' | 'a'>(['test'], ['test', 'a'], 'a');
    expect(result).toEqual({ a: ['test'] });
  });
  it.each([{}, { test1: 'value' }, { anotherKey: 123 }])(
    'When object value is given, which does not include defined keys, then it is returned',
    (value) => {
      const result = getRecordFromTypeOrRecord<typeof value, 'test' | 'a'>(
        value,
        ['test', 'a'],
        'a'
      );
      expect(result).toEqual({ a: value });
    }
  );

  it.each([
    ['test', { test: 1 }],
    ['test', { test: 1, test2: 2 }],
    ['anotherKey', { test: 'a', anotherKey: 'b' }],
    ['anotherKey', { test: { anotherKey: 'b' }, anotherKey: 'c' }],
  ])(
    'When object value is given, which includes defined key, then record is returned',
    (key, record) => {
      const result = getRecordFromTypeOrRecord<typeof record, typeof key>(record, [key], key);
      expect(result).toEqual(record);
    }
  );

  it('should return the record with all keys populated', () => {
    const input = {
      small: 'S',
      medium: 'M',
      large: 'L',
    };

    const result = getRecordFromTypeOrRecord(input, ['small', 'medium', 'large'], 'small');

    expect(result).toEqual({ small: 'S', medium: 'M', large: 'L' });
  });
});
