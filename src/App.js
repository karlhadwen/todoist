import React from 'react';
import './App.scss';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';

export const App = () => (
  <main data-testid="application">
    <Header />
    <Content />
  </main>
);
