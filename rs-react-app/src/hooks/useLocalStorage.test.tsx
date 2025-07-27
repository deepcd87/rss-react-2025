import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('returns initial value when no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('returns stored value from localStorage', () => {
    window.localStorage.setItem('testKey', 'storedValue');
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'));
    act(() => result.current[1]('newValue'));
    expect(window.localStorage.getItem('testKey')).toBe('newValue');
    expect(result.current[0]).toBe('newValue');
  });

  it('handles function updates', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'));
    act(() => result.current[1]((prev) => prev + '-updated'));
    expect(window.localStorage.getItem('testKey')).toBe('default-updated');
  });
});
