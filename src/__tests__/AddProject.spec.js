import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddProject } from '../components/AddProject';

jest.mock('../context', () => ({
  useProjectsValue: jest.fn(() => ({
    projects: [
      { name: '🙌 THE OFFICE', projectId: '1', userId: '2' },
      { name: '🎯 FUTURE', projectId: '2', userId: '1' },
    ],
    setProjects: jest.fn(),
  })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never mock firebase yourself')),
      })),
    })),
  },
}));

beforeEach(cleanup); // clean clean clean the DOM!

describe('<AddProject />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('renders <AddProject />', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
    });

    it('adds a project', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project in the world' },
      });

      expect(queryByTestId('project-name').value).toBe(
        'Best project in the world'
      );
      fireEvent.click(queryByTestId('add-project-submit'));
    });

    it('hide project overlay with cancelling', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      fireEvent.click(queryByTestId('hide-project-overlay'));
    });

    it('hide project overlay with action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      fireEvent.click(queryByTestId('add-project-action'));
    });
  });

  describe('Failure', () => {
    it('does not render the <AddProject />', () => {
      const { queryByTestId } = render(<AddProject />);
      expect(queryByTestId('add-project')).toBeTruthy();
    });
  });
});
