import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ProjectOverlay } from '../components/ProjectOverlay';
import { useProjectsValue } from '../context';

beforeEach(cleanup); // clean clean clean the DOM!

jest.mock('../context', () => ({
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott',
      },
    ],
  })),
}));

describe('<ProjectOverlay />', () => {
  describe('Success', () => {
    it('it renders the project overlay', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const { queryByTestId } = render(
        <ProjectOverlay
          showProjectOverlay
          setProject={setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />
      );

      expect(queryByTestId('project-overlay')).toBeTruthy();

      fireEvent.click(queryByTestId('project-overlay-action'));
      expect(setProject).toHaveBeenCalled();
    });
  });

  describe('Failure', () => {
    it('does not render the project overlay with any projects', () => {
      useProjectsValue.mockImplementation(() => ({
        projects: [],
      }));

      const { queryByTestId } = render(<ProjectOverlay showProjectOverlay />);
      expect(queryByTestId('project-overlay')).toBeTruthy();
      expect(queryByTestId('project-overlay-action')).toBeFalsy();
    });
  });
});
