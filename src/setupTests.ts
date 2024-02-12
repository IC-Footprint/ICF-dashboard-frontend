// Jest-dom adds custom jest matchers for asserting on DOM nodes.
// Allows you to do things like:
// Expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import { createElement, forwardRef } from 'react';
import { vi } from 'vitest';

import initialSetup from '@/initial-setup';

initialSetup();

vi.doMock('react-globe.gl', () => {
  return {
    __esModule: true,
    default: forwardRef(function Globe(_props, ref) {
      return createElement('div', {
        ref
      });
    })
  };
});

vi.doMock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn()
  }
}));

global.ResizeObserver = class ResizeObserver {
  observe() {
    // Empty by design
  }
  unobserve() {
    // Empty by design
  }
  disconnect() {
    // Empty by design
  }
};
