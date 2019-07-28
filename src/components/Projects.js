/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { IndividualProject } from './IndividualProject';

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
        <IndividualProject project={project} />
      </li>
    ))
  );
};
