import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  // return as an object so we can do like const { archivedTasks } = useTasks();
  // const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
      .onSnapshot(snapshot => {
        const newTasks = snapshot.docs.map(task => ({
          id: task.id,
          ...task.data(),
        }));

        setTasks(newTasks.filter(task => task.archived !== true));
        // setArchivedTasks(newTasks.filter(task => task.archived !== false));
      });

    return () => unsubscribe();
  }, []);

  return tasks;
};

export const Tasks = ({ projects }) => {
  const tasks = useTasks();

  return (
    <div className="tasks">
      <h2>Next 7 days</h2>
      <ul className="tasks__list">
        {tasks.map(task => (
          <li key={task.id}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      <AddTask projects={projects} />
    </div>
  );
};
