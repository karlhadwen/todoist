/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useProjectsValue } from '../context';

export const ProjectOverlay = ({ setProject, showOverlay, setShowOverlay }) => {
  const { projects } = useProjectsValue();

  return (
    projects &&
    showOverlay && (
      <div className="project-overlay">
        <ul className="project-overlay__list">
          {projects.map(project => (
            <li
              key={project.projectId}
              onClick={() => {
                setProject(project.projectId);
                setShowOverlay(false);
              }}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
