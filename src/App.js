import React, { useState, useEffect } from 'react';
import './App.scss';
import { firebase } from './firebase';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';

// TODO: Add custom firebase hook maybe?
// TODO: RTL

export const App = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
        }));

        setProjects(allProjects);
      });
  }, []);

  return (
    <main>
      <Header />
      <Content projects={projects} />
    </main>
  );
};
