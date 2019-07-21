import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';
import { useProjects } from '../../hooks';

export const Content = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const { projects } = useProjects();

  return (
    <section className="content">
      <Sidebar projects={projects} setSelectedProject={setSelectedProject} />
      <Tasks projects={projects} selectedProject={selectedProject} />
    </section>
  );
};
