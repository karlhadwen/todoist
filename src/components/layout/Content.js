import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(0);

  return (
    <section className="content">
      <Sidebar projects={projects} setSelectedProject={setSelectedProject} />
      <Tasks projects={projects} selectedProject={selectedProject} />
    </section>
  );
};
