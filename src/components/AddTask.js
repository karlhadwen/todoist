/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { FaRegListAlt, FaRegFlag } from 'react-icons/fa';
import { firebase } from '../firebase';
import { ProjectOverlay } from './ProjectOverlay';

export const AddTask = ({ projects, selectedProject }) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState(null);
  const [project, setProject] = useState();
  const [showShallow, setShowShallow] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);

  // validate task date
  // validate task project
  const addTask = () =>
    task &&
    project &&
    firebase
      .firestore()
      .collection('tasks')
      .add({
        archived: false,
        projectId: selectedProject,
        task,
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      })
      .then(() => {
        setTask('');
        setProject('');
        setShowMain(false);
      });

  return (
    <div className="add-task">
      {showShallow && (
        <div
          className="add-task__shallow"
          onClick={() => setShowMain(!showMain)}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}
      {showMain && (
        <div className="add-task__main">
          <ProjectOverlay
            projects={projects}
            setProject={setProject}
            showOverlay={showOverlay}
            setShowOverlay={setShowOverlay}
          />
          <input
            className="add-task__content"
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <button
            type="button"
            className="add-task__submit"
            onClick={() => addTask()}
          >
            Add Task
          </button>
          <span
            className="add-task__cancel"
            onClick={() => {
              setShowMain(false);
              setShowOverlay(false);
            }}
          >
            Cancel
          </span>
          <span className="add-task__priority">
            <FaRegFlag />
          </span>
          <span
            className="add-task__project"
            onClick={() => setShowOverlay(!showOverlay)}
          >
            <FaRegListAlt />
          </span>
        </div>
      )}
    </div>
  );
};
