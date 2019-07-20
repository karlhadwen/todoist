import React, { useState } from 'react';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';

export const TaskDate = ({ showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className="task-date">
      <ul className="task-date__list">
        <li onClick={() => setShowTaskDate(false)}>
          <span>
            <FaSpaceShuttle />
          </span>
          <span>Today</span>
        </li>
        <li onClick={() => setShowTaskDate(false)}>
          <span>
            <FaSun />
          </span>
          <span>Tomorrow</span>
        </li>
        <li onClick={() => setShowTaskDate(false)}>
          <span>
            <FaRegPaperPlane />
          </span>
          <span>Next week</span>
        </li>
      </ul>
    </div>
  );
