import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Projects } from '../components/Projects';

beforeEach(cleanup); // clean clean clean the DOM!

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

describe('<Projects />', () => {
  describe('Success', () => {
    it('it renders the projects', () => {
      const { queryByTestId } = render(<Projects />);
      expect(queryByTestId('project-action')).toBeTruthy();
    });

    it('renders the projects with an active value', () => {
      const { queryByTestId } = render(<Projects activeValue="1" />);

      fireEvent.click(queryByTestId('project-action'));
      expect(
        queryByTestId('project-action').classList.contains('active')
      ).toBeTruthy();
    });

    it('renders the projects with no active value', () => {
      const { queryByTestId } = render(<Projects activeValue="1" />);

      fireEvent.click(queryByTestId('project-action'));
      expect(
        queryByTestId('project-action').classList.contains('sidebar__project')
      ).toBeTruthy();
    });
  });
});
