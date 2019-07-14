import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content = ({ projects }) => (
  <section className="content">
    <Sidebar projects={projects} />
    <Tasks />
  </section>
);
