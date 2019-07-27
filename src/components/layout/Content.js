import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content = ({
  projects,
  setProjects,
  setSelectedProject,
  selectedProject,
}) => (
  <section className="content">
    <Sidebar
      projects={projects}
      setProjects={setProjects}
      setSelectedProject={setSelectedProject}
    />
    <Tasks projects={projects} selectedProject={selectedProject} />
  </section>
);
