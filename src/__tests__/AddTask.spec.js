import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddTask } from '../components/AddTask';
import { useSelectedProjectValue } from '../context';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
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

describe('<AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Success', () => {
    it('renders the <AddTask />', () => {
      const { queryByTestId } = render(<AddTask />);
      expect(queryByTestId('add-task-comp')).toBeTruthy();
    });

    it('renders the <AddTask /> quick overlay', () => {
      const setShowQuickAddTask = jest.fn();

      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain
          shouldShowMain={false}
          showQuickAddTask
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );

      expect(queryByTestId('quick-add-task')).toBeTruthy();
    });

    it('renders the <AddTask /> main showable when clicked', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('renders the <AddTask /> project overlay when clicked', () => {
      const { queryByTestId } = render(
        <AddTask showAddTaskMain shouldShowMain />
      );

      fireEvent.click(queryByTestId('show-project-overlay'));
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

    it('renders the <AddTask /> task date overlay when clicked', () => {
      const { queryByTestId } = render(
        <AddTask showAddTaskMain shouldShowMain />
      );

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    });

    it('hides the <AddTask /> main when cancel is clicked', () => {
      const { queryByTestId } = render(
        <AddTask showMain showQuickAddTask={false} />
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-main-cancel'));
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

    it('renders <AddTask /> for quick add task and then cancels', () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask
          showMain
          showQuickAddTask
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );

      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-quick-cancel'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

    it('renders <AddTask /> & adds a task to the inbox & clears state', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'TODAY',
      }));

      const { queryByTestId } = render(
        <AddTask showMain showQuickAddTask={false} />
      );
      fireEvent.click(queryByTestId('show-main-action'));

      expect(queryByTestId('add-task-content')).toBeTruthy();
      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am the most amazing task ever' },
      });

      expect(queryByTestId('add-task-content').value).toBe(
        'I am the most amazing task ever'
      );
      fireEvent.click(queryByTestId('add-task'));

      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('renders <AddTask /> & adds a task to next 7 days & clears state', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'NEXT_7',
      }));

      const { queryByTestId } = render(
        <AddTask showMain showQuickAddTask={false} />
      );

      fireEvent.click(queryByTestId('show-main-action'));

      const taskInput = queryByTestId('add-task-content');
      const taskSubmit = queryByTestId('add-task');
      expect(taskInput).toBeTruthy();

      fireEvent.change(taskInput, {
        target: { value: 'I am the most amazing task ever' },
      });

      expect(taskInput.value).toBe('I am the most amazing task ever');
      fireEvent.click(taskSubmit);

      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('renders <AddTask /> & adds a task with a task date', () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }));

      const { queryByTestId } = render(<AddTask showMain />);

      fireEvent.click(queryByTestId('show-main-action'));

      expect(queryByTestId('add-task-content')).toBeTruthy();
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.change(queryByTestId('add-task-content'), {
        target: { value: 'I am the most amazing task ever' },
      });
      expect(queryByTestId('add-task-content').value).toBe(
        'I am the most amazing task ever'
      );

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();

      fireEvent.click(queryByTestId('task-date-today'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      fireEvent.click(queryByTestId('task-date-overlay'));
      fireEvent.click(queryByTestId('task-date-tomorrow'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      fireEvent.click(queryByTestId('task-date-overlay'));
      fireEvent.click(queryByTestId('task-date-next-week'));
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.click(queryByTestId('add-task'));
    });
  });

  describe('Failure', () => {
    it('does not render <AddTask />', () => {});
    it('does not render the <AddTask /> quick overlay', () => {});
    it('does not render the <AddTask /> main showable when clicked', () => {});
    it('does not render the <AddTask /> project overlay when clicked', () => {});
    it('does not render the <AddTask /> task date overlay when clicked', () => {});
    it('does not hide the <AddTask /> main when cancel is clicked', () => {});
    it('does not render <AddTask /> & adds a task to the inbox & clears state', () => {});
    it('does not render <AddTask /> & adds a task to tomorrow & clears component state', () => {});
    it('does not render <AddTask /> & adds a task to next 7 days & clears state', () => {});
  });
});
