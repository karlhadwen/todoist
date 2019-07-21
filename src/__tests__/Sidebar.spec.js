import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Sidebar } from '../components/layout/Sidebar';

const projects = [
  { name: '🙌 THE OFFICE', projectId: '1', userId: 'jlIFXIwyAL3tzHMtzRbw' },
  { name: '🚀 DAILY', projectId: '2', userId: 'jlIFXIwyAL3tzHMtzRbw' },
];

beforeEach(cleanup);

describe('<Sidebar />', () => {
  const setSelectedProject = jest.fn(() => 0);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('it renders the sidebar', () => {
    const { queryByTestId } = render(
      <Sidebar projects={projects} setSelectedProject={setSelectedProject} />
    );
    expect(queryByTestId('sidebar')).toBeTruthy();
  });

  it('changes active project to inbox in collated tasks', async () => {
    setSelectedProject.mockImplementation(() => 'INBOX');

    const { queryByTestId } = render(
      <Sidebar projects={projects} setSelectedProject={setSelectedProject} />
    );
    fireEvent.click(queryByTestId('inbox'));
    expect(setSelectedProject).toHaveBeenCalledWith('INBOX');
  });

  it('changes active project to today in collated tasks', async () => {
    setSelectedProject.mockImplementation(() => 'TODAY');

    const { queryByTestId } = render(
      <Sidebar projects={projects} setSelectedProject={setSelectedProject} />
    );
    fireEvent.click(queryByTestId('today'));
    expect(setSelectedProject).toHaveBeenCalledWith('TODAY');
  });

  it('changes active project to next_7 in collated tasks', async () => {
    setSelectedProject.mockImplementation(() => 'NEXT_7');

    const { queryByTestId } = render(
      <Sidebar projects={projects} setSelectedProject={setSelectedProject} />
    );
    fireEvent.click(queryByTestId('next_7'));
    expect(setSelectedProject).toHaveBeenCalledWith('NEXT_7');
  });
});
