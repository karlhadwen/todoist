/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';

export const Sidebar = ({ projects, setProjects, setSelectedProject }) => {
  const [active, setActive] = useState('inbox');

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="inbox"
          className={active === 'inbox' ? 'active' : undefined}
          onClick={() => {
            setActive('inbox');
            setSelectedProject('INBOX');
          }}
        >
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li
          data-testid="today"
          className={active === 'today' ? 'active' : undefined}
          onClick={() => {
            setActive('today');
            setSelectedProject('TODAY');
          }}
        >
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li
          data-testid="next_7"
          className={active === 'next7' ? 'active' : undefined}
          onClick={() => {
            setActive('next7');
            setSelectedProject('NEXT_7');
          }}
        >
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>

      <div className="sidebar__middle">
        <span>
          <FaChevronDown />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">
        <Projects projects={projects} setSelectedProject={setSelectedProject} />
      </ul>

      <AddProject projects={projects} setProjects={setProjects} />
    </div>
  );
};
