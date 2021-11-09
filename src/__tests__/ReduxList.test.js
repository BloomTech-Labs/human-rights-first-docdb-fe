import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

import { ReduxList } from '../components/common';

afterEach(() => {
  cleanup();
});

const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

const getItemsData = jest.fn(() => {});

const RenderItems = jest.fn(() =>
  data.map(item => (
    <li data-testid="item" key={item.id}>
      Item
    </li>
  ))
);

describe('<ReduxList /> test suite', () => {
  test("renders 'loading' component initially", async () => {
    let rendered;

    act(() => {
      rendered = render(
        <ReduxList
          // return an unresolved promise to test initial component state
          getItemsData={jest.fn(() => {})}
          LoadingComponent={() => <div>Loading...</div>}
          RenderItems={RenderItems}
          isFetching={true}
        />
      );
    });

    expect(rendered.getByText('Loading...').textContent).toBe('Loading...');
  });
  test('renders item data', async () => {
    let rendered;

    await act(async () => {
      rendered = await render(
        <ReduxList
          getItemsData={getItemsData}
          LoadingComponent={() => <div>Loading...</div>}
          RenderItems={RenderItems}
          isFetching={false}
        />
      );
    });

    const { findAllByTestId } = rendered;
    const items = await findAllByTestId('item');

    expect(items).toHaveLength(3);
  });
});
