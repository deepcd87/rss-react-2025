import '@testing-library/jest-dom';

declare module 'vitest' {
  type Assertion<T = unknown> = jest.Matchers<void, T>;
}
