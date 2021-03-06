import React from 'react';
import { render } from '@testing-library/react';
import { testDocument } from '../__mocks__';
import LandingCard from '../components/pages/Landing/LandingCard';

describe('<Landing Card /> testing suite', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  test('renders title', () => {
    const { getByText } = render(<LandingCard {...testDocument} />);
    const titleElement = getByText(/test/i);
    expect(titleElement).toBeInTheDocument();
  });
  test('renders tags', () => {
    const { getAllByTestId } = render(<LandingCard {...testDocument} />);
    const tags = getAllByTestId('doc-tag');
    expect(tags).toHaveLength(testDocument.tags.length);
  });
  test('renders correct bookmark', () => {
    const { getByTestId, rerender } = render(<LandingCard {...testDocument} />);
    const FilledBookmark = getByTestId('filled-bookmark');
    expect(FilledBookmark).toBeInTheDocument();
    rerender(<LandingCard {...testDocument} favorited={false} />);
    const OutlinedBookmark = getByTestId('outlined-bookmark');
    expect(OutlinedBookmark).toBeInTheDocument();
  });
});
