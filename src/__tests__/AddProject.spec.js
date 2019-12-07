import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddProject } from '../components/AddProject';
import { useSelectedProjectValue } from '../context';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott',
      },
      {
        name: '🚀 DAILY',
        projectId: '2',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'daily-office',
      },
      {
        name: '🎯 FUTURE',
        projectId: '3',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'wake-up',
      },
      {
        name: '📚 WORDS',
        projectId: '4',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'arcade-fire',
      },
      {
        name: '🎵 MUSIC',
        projectId: '5',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'bella-ciao',
      },
    ],
    setProjects: jest.fn(),
  })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('I am resolved!')),
      })),
    })),
  },
}));

beforeEach(cleanup);

describe('<AddProject />', () => {
  describe('Success', () => {
    it('renders <AddProject />', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
    });

    it('renders <AddProject /> and adds a project using onClick', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project in the world!' },
      });
      expect(queryByTestId('project-name').value).toBe(
        'Best project in the world!'
      );
      fireEvent.click(queryByTestId('add-project-submit'));
    });

    it('renders <AddProject /> and adds a project using onKeyPress', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project in the world!' },
      });
      expect(queryByTestId('project-name').value).toBe(
        'Best project in the world!'
      );
      fireEvent.keyPress(queryByTestId('add-project-submit'), {
        key: 'Enter',
        charCode: 13
      });
    });

    it('hides the project overlay when cancelled using onClick', () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.click(getByText('Cancel'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides the project overlay when cancelled onKeyPress', () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyPress(getByText('Cancel'), {
        key: 'Enter',
        charCode: 13
      });
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides the project overlay using onClick singular and reverse action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.click(queryByTestId('add-project-action'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides the project overlay using onKeyPress singular and reverse action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyPress(queryByTestId('add-project-action'), {
        key: 'Enter',
        charCode: 13
      });
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });
  });
});
