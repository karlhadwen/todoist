/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';

export const AddTask = ({ projects, selectedProject }) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState();
  const [showMain, setShowMain] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment()
        .add(7, 'days')
        .format('DD/MM/YYYY');
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: 'jlIFXIwyAL3tzHMtzRbw',
        })
        .then(() => {
          setTask('');
          setProject('');
          setShowMain(false);
        })
    );
  };

  return (
    <div className="add-task">
      <div className="add-task__shallow" onClick={() => setShowMain(!showMain)}>
        <span className="add-task__plus">+</span>
        <span className="add-task__text">Add Task</span>
      </div>

      {showMain && (
        <div className="add-task__main">
          <ProjectOverlay
            projects={projects}
            setProject={setProject}
            showOverlay={showOverlay}
            setShowOverlay={setShowOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
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
          <span
            className="add-task__project"
            onClick={() => setShowOverlay(!showOverlay)}
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            onClick={() => setShowTaskDate(!showTaskDate)}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
