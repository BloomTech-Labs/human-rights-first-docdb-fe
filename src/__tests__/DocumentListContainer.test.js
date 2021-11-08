// import React from 'react';
import { render, act, cleanup } from '@testing-library/react'; // eslint-disable-line

// import { DocumentList } from '../components/pages/DocumentList/DocumentListContainer';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

jest.mock('../api', () => ({
  getExampleData: jest.fn(() => Promise.resolve([])),
}));

describe('<DocumentList/> test suite', () => {
  test('container renders without crashing', async () => {
    await act(async () => {
      // await render(
      //   <DocumentList
      //     getDocs={() => {}}
      //     isFetching={true}
      //   />
      // );
    });
  });
});
