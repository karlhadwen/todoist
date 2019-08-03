import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { IndividualProject } from '../components/IndividualProject';

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() =>
            Promise.resolve('Never mock firebase yourself')
          ),
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott',
      },
    ],
    setProjects: jest.fn(),
  })),
}));

beforeEach(cleanup); // clean clean clean the DOM!

describe('<IndividualProject />', () => {
  const project = {
    name: '🙌 THE OFFICE',
    projectId: '1',
    userId: 'jlIFXIwyAL3tzHMtzRbw',
    docId: 'michael-scott',
  };

  describe('Success', () => {
    it('it renders our project', () => {
      const { getByText } = render(<IndividualProject project={project} />);
      expect(getByText('🙌 THE OFFICE')).toBeTruthy();
    });

    it('it renders the delete project overlay & deletes a project', () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.click(queryByTestId('delete-project'));
      expect(
        getByText('Are you sure you want to delete this project?')
      ).toBeTruthy();

      fireEvent.click(getByText('Delete'));
    });

    it('it renders the delete project overlay & cancels', () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} />
      );

      fireEvent.click(queryByTestId('delete-project'));
      expect(
        getByText('Are you sure you want to delete this project?')
      ).toBeTruthy();

      fireEvent.click(getByText('Cancel'));
    });
  });
});
