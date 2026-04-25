import { describe, it, expect } from 'vitest';
import { cn, formatNumber } from '../src/app/core/utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges class names', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('handles conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toBe('base-class active-class');
    });

    it('filters out falsy values', () => {
      const result = cn('base', false && 'ignored', undefined && 'also-ignored');
      expect(result).toBe('base');
    });
  });

  describe('formatNumber', () => {
    it('formats thousands with K suffix', () => {
      expect(formatNumber(1500)).toBe('1.5K');
    });

    it('formats millions with M suffix', () => {
      expect(formatNumber(2500000)).toBe('2.5M');
    });

    it('returns small numbers as-is', () => {
      expect(formatNumber(100)).toBe('100');
    });

    it('appends suffix when provided', () => {
      expect(formatNumber(500, '+')).toBe('500+');
    });
  });
});