/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

export const Projects = ({ projects, setSelectedProject }) => {
  const [active, setActive] = useState();

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
      </li>
    ))
  );
};
