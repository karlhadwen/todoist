/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never mock firebase yourself')),
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

beforeEach(cleanup); // clean clean clean the DOM!

describe('<Checkbox />', () => {
  describe('Success', () => {
    it('it renders the task checkbox', () => {
      const { queryByTestId } = render(<Checkbox id="1" />);
      expect(queryByTestId('checkbox-action')).toBeTruthy();
    });

    it('it renders the task checkbox & accepts a click', () => {
      const { queryByTestId } = render(<Checkbox id="1" />);
      expect(queryByTestId('checkbox-action')).toBeTruthy();
      fireEvent.click(queryByTestId('checkbox-action'));
    });
  });

  describe('Failure', () => {
    it('does not render the project overlay with any projects', () => {});
  });
});
