/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Projects = () => {
  const [active, setActive] = useState();
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map(project => (
      <li
        key={project.projectId}
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
        onClick={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
      >
        <span className="sidebar__dot">•</span>
        <span className="sidebar__project-name">{project.name}</span>
        <span
          className="sidebar__project-delete"
          onClick={() => console.log('Deleting...')}
        >
          <FaTrashAlt />
        </span>
      </li>
    ))
  );
};
