import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

beforeEach(cleanup); // clean clean clean the DOM!

describe('<Projects />', () => {
  describe('Success', () => {
    it('it renders the projects', () => {});
  });

  describe('Failure', () => {
    it('does not render the projects', () => {});
  });
});
