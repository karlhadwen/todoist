import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';

jest.mock('../hooks', () => ({
  useTasks: () => ({
    tasks: [
      {
        id: 'mx2taaXpF38vYqMGbVtY',
        archived: false,
        date: '21/07/2019',
        projectId: '1',
        task:
          'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      },
      {
        id: 'p00ciBytqQFsYQIG0LTg',
        archived: false,
        date: '25/07/2019',
        projectId: '2',
        task:
          "Webster's Dictionary defines wedding as: The fusing of two metals with a hot torch.",
      },
    ],
  }),
}));

jest.mock('../helpers', () => ({
  getTitle: jest.fn(() => ({
    name: '🙌 THE OFFICE',
    projectId: '1',
  })),
  getCollatedTitle: jest.fn(() => ({
    name: 'INBOX',
    projectId: '2',
  })),
  collatedTasksExist: jest.fn(() => true),
}));

beforeEach(cleanup);

const projects = [
  { name: '🙌 THE OFFICE', projectId: '1', userId: 'jlIFXIwyAL3tzHMtzRbw' },
  { name: '🚀 DAILY', projectId: '2', userId: 'jlIFXIwyAL3tzHMtzRbw' },
];

describe('<Tasks />', () => {
  it('renders the sidebar', () => {
    const { queryByTestId } = render(
      <Tasks projects={projects} selectedProject="1" />
    );
    expect(queryByTestId('tasks')).toBeTruthy();
  });

  it('renders a normal title', () => {
    collatedTasksExist.mockImplementation(() => false);

    const { queryByTestId } = render(
      <Tasks projects={projects} selectedProject="1" />
    );
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('🙌 THE OFFICE');
  });

  it('renders a collated title', () => {
    collatedTasksExist.mockImplementation(() => true);

    const { queryByTestId } = render(
      <Tasks projects={projects} selectedProject="INBOX" />
    );
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('INBOX');
  });
});
