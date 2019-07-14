import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';

export const Tasks = ({ arrangement = null }) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
      .onSnapshot(snapshot => {
        const newTasks = snapshot.docs.map(task => ({
          id: task.id,
          ...task.data(),
        }));

        setTasks(newTasks.filter(task => task.archived !== true));
        setArchivedTasks(newTasks.filter(task => task.archived !== false));
      });
  }, [tasks]);

  return (
    <div className="tasks">
      <h2>Next 7 days</h2>
      <ul>
        {arrangement === null &&
          tasks.map(task => (
            <li key={task.id}>
              <Checkbox id={task.id} />
              <span>{task.task}</span>
            </li>
          ))}
      </ul>

      <AddTask />
    </div>
  );
};
