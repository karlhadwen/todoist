import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Sidebar } from '../components/layout/Sidebar';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      { name: '🙌 THE OFFICE', projectId: '1', userId: 'jlIFXIwyAL3tzHMtzRbw' },
    ],
  })),
}));

beforeEach(cleanup);

describe('<Sidebar />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('renders the sidebar', () => {
      const { queryByTestId } = render(<Sidebar />);
      expect(queryByTestId('sidebar')).toBeTruthy();
    });

    it('changes active project to inbox in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />);
      fireEvent.click(queryByTestId('inbox'));

      expect(queryByTestId('inbox').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    });

    it('changes active project to today in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />);
      fireEvent.click(queryByTestId('today'));

      expect(queryByTestId('today').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('next_7').classList.contains('active')).toBeFalsy();
    });

    it('changes active project to next_7 in collated tasks', () => {
      const { queryByTestId } = render(<Sidebar />);
      fireEvent.click(queryByTestId('next_7'));

      expect(queryByTestId('next_7').classList.contains('active')).toBeTruthy();
      expect(queryByTestId('today').classList.contains('active')).toBeFalsy();
      expect(queryByTestId('inbox').classList.contains('active')).toBeFalsy();
    });
  });
});
