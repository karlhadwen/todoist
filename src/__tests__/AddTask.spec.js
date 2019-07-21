import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { AddTask } from '../components/AddTask';

beforeEach(cleanup);

const projects = [
  { name: '🙌 THE OFFICE', projectId: '1', userId: 'jlIFXIwyAL3tzHMtzRbw' },
  { name: '🚀 DAILY', projectId: '2', userId: 'jlIFXIwyAL3tzHMtzRbw' },
];

describe('<AddTask />', () => {
  it('renders the <AddTask />', () => {
    const { queryByTestId } = render(
      <AddTask projects={projects} selectedProject="1" />
    );
    expect(queryByTestId('add-task')).toBeTruthy();
  });
});
