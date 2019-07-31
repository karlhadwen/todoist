import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Header } from '../components/layout/Header';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

beforeEach(cleanup); // clean clean clean the DOM!

describe('<Header />', () => {
  describe('Success', () => {
    it('it renders the header component', () => {
      const { queryByTestId } = render(<Header />);
      expect(queryByTestId('header')).toBeTruthy();
    });

    it('it renders the header component & activates dark mode', () => {
      const darkMode = false;
      const setDarkMode = jest.fn(() => !darkMode);

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      );

      fireEvent.click(queryByTestId('dark-mode-action'));
      expect(setDarkMode).toHaveBeenCalledWith(true);
    });

    it('it renders the header component & deactivates dark mode', () => {
      const darkMode = true;
      const setDarkMode = jest.fn(() => !darkMode);

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      );

      fireEvent.click(queryByTestId('dark-mode-action'));
      expect(setDarkMode).toHaveBeenCalledWith(false);
    });

    it('it renders the header component & fires off quick add task', () => {
      const { queryByTestId } = render(<Header />);
      fireEvent.click(queryByTestId('quick-add-task-action'));
    });
  });
});
