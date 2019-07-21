import React from 'react';
import { render } from '@testing-library/react';
import { App } from '../App';

it('it renders the application', () => {
  const { queryByTestId } = render(<App />);
  expect(queryByTestId('application')).toBeTruthy();
});
