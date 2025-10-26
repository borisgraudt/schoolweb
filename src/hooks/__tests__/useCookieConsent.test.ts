import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCookieConsent } from '../useCookieConsent';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useCookieConsent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with pending status when no consent stored', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useCookieConsent());
    
    expect(result.current.consentStatus).toBe('pending');
    expect(result.current.needsConsent).toBe(true);
    expect(result.current.hasConsent).toBe(false);
    expect(result.current.hasDeclined).toBe(false);
  });

  it('initializes with accepted status when consent is accepted', () => {
    localStorageMock.getItem.mockReturnValue('accepted');
    
    const { result } = renderHook(() => useCookieConsent());
    
    expect(result.current.consentStatus).toBe('accepted');
    expect(result.current.hasConsent).toBe(true);
    expect(result.current.needsConsent).toBe(false);
  });

  it('initializes with declined status when consent is declined', () => {
    localStorageMock.getItem.mockReturnValue('declined');
    
    const { result } = renderHook(() => useCookieConsent());
    
    expect(result.current.consentStatus).toBe('declined');
    expect(result.current.hasDeclined).toBe(true);
    expect(result.current.hasConsent).toBe(false);
  });

  it('acceptCookies sets consent to accepted', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useCookieConsent());
    
    act(() => {
      result.current.acceptCookies();
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookie-consent', 'accepted');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookie-consent-date', expect.any(String));
    expect(result.current.consentStatus).toBe('accepted');
  });

  it('declineCookies sets consent to declined', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useCookieConsent());
    
    act(() => {
      result.current.declineCookies();
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookie-consent', 'declined');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookie-consent-date', expect.any(String));
    expect(result.current.consentStatus).toBe('declined');
  });

  it('resetConsent removes consent from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('accepted');
    
    const { result } = renderHook(() => useCookieConsent());
    
    act(() => {
      result.current.resetConsent();
    });
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('cookie-consent');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('cookie-consent-date');
    expect(result.current.consentStatus).toBe('pending');
  });
});
