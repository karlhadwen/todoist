/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className="task-date">
      <ul className="task-date__list">
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().format('DD/MM/YYYY'));
          }}
        >
          <span>
            <FaSpaceShuttle />
          </span>
          <span>Today</span>
        </li>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(
              moment()
                .add(1, 'day')
                .format('DD/MM/YYYY')
            );
          }}
        >
          <span>
            <FaSun />
          </span>
          <span>Tomorrow</span>
        </li>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(
              moment()
                .add(7, 'days')
                .format('DD/MM/YYYY')
            );
          }}
        >
          <span>
            <FaRegPaperPlane />
          </span>
          <span>Next week</span>
        </li>
      </ul>
    </div>
  );
