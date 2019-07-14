/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { FaRegListAlt, FaRegFlag } from 'react-icons/fa';

export const AddTask = () => {
  const [taskContent, setTaskContent] = useState();
  const [taskDate, setTaskDate] = useState(null);
  const [showShallow, setShowShallow] = useState(true);
  const [showMain, setShowMain] = useState(false);

  const addTask = () => {
    console.log('Adding a task!');
  };

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
          <input className="add-task__content" type="text" />
          <button type="button" className="add-task__submit">
            Add Task
          </button>
          <span className="add-task__cancel" onClick={() => setShowMain(false)}>
            Cancel
          </span>
          <span className="add-task__priority">
            <FaRegFlag />
          </span>
          <span className="add-task__project">
            <FaRegListAlt />
          </span>
        </div>
      )}
    </div>
  );
};
