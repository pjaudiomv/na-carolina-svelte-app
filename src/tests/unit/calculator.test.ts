import { describe, test, expect } from 'vitest';
import { dateSpan, formatResult, getKeytags } from '$lib/utils/calculator';

describe('dateSpan', () => {
  test('returns zeros when fromDate is in the future', () => {
    const future = new Date(2030, 0, 1);
    const now = new Date(2025, 0, 1);
    const result = dateSpan(future, now);
    expect(result).toEqual({ totalDays: 0, years: 0, months: 0, days: 0 });
  });

  test('returns zeros when fromDate equals now', () => {
    const date = new Date(2025, 5, 15);
    const result = dateSpan(date, date);
    expect(result).toEqual({ totalDays: 0, years: 0, months: 0, days: 0 });
  });

  test('calculates 1 day correctly', () => {
    const from = new Date(2025, 0, 1);
    const now = new Date(2025, 0, 2);
    const result = dateSpan(from, now);
    expect(result.totalDays).toBe(1);
    expect(result.days).toBe(1);
    expect(result.months).toBe(0);
    expect(result.years).toBe(0);
  });

  test('calculates exactly 1 year', () => {
    const from = new Date(2024, 0, 1);
    const now = new Date(2025, 0, 1);
    const result = dateSpan(from, now);
    expect(result.totalDays).toBe(366); // 2024 is leap year
    expect(result.years).toBe(1);
    expect(result.months).toBe(0);
    expect(result.days).toBe(0);
  });

  test('calculates multi-year span with months and days', () => {
    const from = new Date(2020, 2, 15); // March 15, 2020
    const now = new Date(2025, 5, 20); // June 20, 2025
    const result = dateSpan(from, now);
    expect(result.years).toBe(5);
    expect(result.months).toBe(3);
    expect(result.days).toBe(5);
  });

  test('handles day rollover when current day < from day', () => {
    const from = new Date(2025, 0, 31); // Jan 31
    const now = new Date(2025, 1, 15); // Feb 15
    const result = dateSpan(from, now);
    expect(result.totalDays).toBe(15);
    expect(result.months).toBe(0);
  });

  test('handles month rollover', () => {
    const from = new Date(2024, 10, 15); // Nov 15, 2024
    const now = new Date(2025, 1, 10); // Feb 10, 2025
    const result = dateSpan(from, now);
    expect(result.years).toBe(0);
    expect(result.months).toBe(2);
  });
});

describe('formatResult', () => {
  test('first day message', () => {
    expect(formatResult({ totalDays: 0, years: 0, months: 0, days: 0 })).toBe('Today is your first day!');
  });

  test('1 day message', () => {
    expect(formatResult({ totalDays: 1, years: 0, months: 0, days: 1 })).toBe('You have been clean for 1 day!');
  });

  test('under 90 days shows only total days', () => {
    const result = formatResult({ totalDays: 45, years: 0, months: 1, days: 14 });
    expect(result).toBe('You have been clean for 45 days!');
    expect(result).not.toContain('\n');
  });

  test('over 90 days shows days and breakdown', () => {
    const result = formatResult({ totalDays: 400, years: 1, months: 1, days: 5 });
    expect(result).toContain('You have been clean for 400 days!');
    expect(result).toContain('This is 1 year, 1 month and 5 days.');
  });

  test('uses plural forms correctly', () => {
    const result = formatResult({ totalDays: 800, years: 2, months: 2, days: 10 });
    expect(result).toContain('2 years');
    expect(result).toContain('2 months');
    expect(result).toContain('10 days');
  });

  test('omits zero components from breakdown', () => {
    const result = formatResult({ totalDays: 365, years: 1, months: 0, days: 0 });
    expect(result).toContain('This is 1 year.');
    expect(result).not.toContain('month');
    // "days" appears in the first line, so check the detail line specifically
    const detail = result.split('\n')[1];
    expect(detail).not.toContain('day');
  });
});

describe('getKeytags', () => {
  test('no keytags for day zero', () => {
    expect(getKeytags({ totalDays: 0, years: 0, months: 0, days: 0 })).toEqual([]);
  });

  test('1 day gets Welcome keytag', () => {
    const tags = getKeytags({ totalDays: 1, years: 0, months: 0, days: 1 });
    expect(tags).toHaveLength(1);
    expect(tags[0]!.label).toBe('Welcome');
  });

  test('30 days gets Welcome + 30 Days', () => {
    const tags = getKeytags({ totalDays: 30, years: 0, months: 1, days: 0 });
    expect(tags).toHaveLength(2);
    expect(tags.map((t) => t.label)).toEqual(['Welcome', '30 Days']);
  });

  test('90 days gets 4 keytags', () => {
    const tags = getKeytags({ totalDays: 90, years: 0, months: 3, days: 0 });
    expect(tags).toHaveLength(4);
    expect(tags.map((t) => t.label)).toEqual(['Welcome', '30 Days', '60 Days', '90 Days']);
  });

  test('1 year gets all tags up to 1 Year', () => {
    const tags = getKeytags({ totalDays: 365, years: 1, months: 0, days: 0 });
    expect(tags.map((t) => t.label)).toContain('1 Year');
    expect(tags.map((t) => t.label)).not.toContain('18 Months');
  });

  test('2+ years gets Multiple Years tag', () => {
    const tags = getKeytags({ totalDays: 730, years: 2, months: 0, days: 0 });
    expect(tags.map((t) => t.label)).toContain('Multiple Years');
  });

  test('5 years gets extra yearly tags for years 3-5', () => {
    const tags = getKeytags({ totalDays: 1826, years: 5, months: 0, days: 0 });
    const labels = tags.map((t) => t.label);
    expect(labels).toContain('3 Years');
    expect(labels).toContain('4 Years');
    expect(labels).toContain('5 Years');
  });
});
