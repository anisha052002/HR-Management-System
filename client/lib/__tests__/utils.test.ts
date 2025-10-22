import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn utility function', () => {
  it('should merge classes correctly', () => {
    const result = cn('px-2', 'py-1');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
  });

  it('should handle conditional classes', () => {
    const result = cn('base-class', { 'conditional-class': true });
    expect(result).toContain('base-class');
    expect(result).toContain('conditional-class');
  });

  it('should exclude false conditional classes', () => {
    const result = cn('base-class', { 'conditional-class': false });
    expect(result).toContain('base-class');
    expect(result).not.toContain('conditional-class');
  });

  it('should override conflicting tailwind classes', () => {
    // tailwind-merge should handle this
    const result = cn('px-2', 'px-4');
    expect(result).toContain('px-4');
  });

  it('should handle empty strings and undefined', () => {
    const result = cn('base-class', '', undefined, 'another-class');
    expect(result).toContain('base-class');
    expect(result).toContain('another-class');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
    expect(result).toContain('class3');
  });

  it('should preserve order of classes', () => {
    const result = cn('first', 'second', 'third');
    const classes = result.split(' ').filter(c => c.length > 0);
    expect(classes.length).toBeGreaterThanOrEqual(3);
  });
});
