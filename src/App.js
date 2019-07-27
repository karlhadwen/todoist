import React, { useState } from 'react';
import './App.scss';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { useProjects } from './hooks';

export const App = () => {
  const { projects, setProjects } = useProjects();
  const [selectedProject, setSelectedProject] = useState('INBOX');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main
      data-testid="application"
      className={darkMode ? 'darkmode' : undefined}
    >
      <Header
        projects={projects}
        selectedProject={selectedProject}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Content
        projects={projects}
        setProjects={setProjects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </main>
  );
};
