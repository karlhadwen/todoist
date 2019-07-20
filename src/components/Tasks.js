import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';

const getProjectName = (projects, projectId) =>
  projects.find(project => project.projectId === projectId);

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
      .where('projectId', '==', selectedProject)
      .onSnapshot(snapshot => {
        const newTasks = snapshot.docs.map(task => ({
          id: task.id,
          ...task.data(),
        }));

        setTasks(newTasks.filter(task => task.archived !== true));
        setArchivedTasks(newTasks.filter(task => task.archived !== false));
      });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const Tasks = ({ projects, selectedProject }) => {
  const { tasks, archivedTasks } = useTasks(selectedProject);
  let projectName = 'Inbox';

  if (projects && selectedProject) {
    projectName = getProjectName(projects, selectedProject).name;
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
