import React from 'react';
import { render, act, cleanup } from '@testing-library/react';

import DocumentListContainer from '../components/pages/DocumentList/DocumentListContainer';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

jest.mock('../api', () => ({
  getExampleData: jest.fn(() => Promise.resolve([])),
}));

describe('<DocumentListContainer /> test suite', () => {
  test('container renders without crashing', async () => {
    await act(async () => {
      await render(<DocumentListContainer />);
    });
  });
});
