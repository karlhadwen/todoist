/* eslint-disable no-nested-ternary */
import React from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useTasks } from '../hooks';

export const Tasks = ({ projects, selectedProject }) => {
  const { tasks } = useTasks(selectedProject);

  let projectName = 'Inbox';

  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  return (
    <div className="tasks">
      <h2>{projectName}</h2>

      <ul className="tasks__list">
        {tasks.map(task => (
          <li key={task.id}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      <AddTask projects={projects} selectedProject={selectedProject} />
    </div>
  );
};
