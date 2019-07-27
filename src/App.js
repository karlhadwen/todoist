import React, { useState } from 'react';
import './App.scss';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { useProjects } from './hooks';

export const App = () => {
  const { projects, setProjects } = useProjects();
  const [selectedProject, setSelectedProject] = useState('INBOX');

  return (
    <main data-testid="application">
      <Header projects={projects} selectedProject={selectedProject} />
      <Content
        projects={projects}
        setProjects={setProjects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </main>
  );
};
