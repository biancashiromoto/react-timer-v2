import { describe, it, expect } from 'vitest';
import { getTotalSeconds, getTimeValues, formatTimeValue } from '../time';

describe('time utils', () => {
  describe('getTotalSeconds', () => {
    it('converts time values to total seconds', () => {
      expect(getTotalSeconds(1, 30, 45)).toBe(5445);
      expect(getTotalSeconds(0, 1, 30)).toBe(90);
      expect(getTotalSeconds(0, 0, 45)).toBe(45);
    });
  });

  describe('getTimeValues', () => {
    it('converts total seconds to time values', () => {
      expect(getTimeValues(5445)).toEqual({
        hours: 1,
        minutes: 30,
        seconds: 45
      });
      expect(getTimeValues(90)).toEqual({
        hours: 0,
        minutes: 1,
        seconds: 30
      });
    });
  });

  describe('formatTimeValue', () => {
    it('formats time values with leading zeros', () => {
      expect(formatTimeValue(5)).toBe('05');
      expect(formatTimeValue(10)).toBe('10');
      expect(formatTimeValue(0)).toBe('00');
    });
  });
});