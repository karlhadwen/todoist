/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers/generate-pushid';

export const AddProject = ({ projects, setProjects }) => {
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState('');
  const projectId = generatePushId();

  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: 'jlIFXIwyAL3tzHMtzRbw',
      })
      .then(() => {
        const newProjects = [
          ...projects,
          { name: projectName, projectId, userId: 'jlIFXIwyAL3tzHMtzRbw' },
        ];
        newProjects.sort((a, b) => (a.projectId > b.projectId ? 1 : -1));
        setProjects(newProjects);

        setProjectName('');
        setShow(false);
      });

  return (
    <div className="add-project">
      {show && (
        <div className="add-project__input">
          <input
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            className="add-project__name"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
          >
            Add Project
          </button>
          <span className="add-project__cancel" onClick={() => setShow(false)}>
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span className="add-project__text" onClick={() => setShow(!show)}>
        Add Project
      </span>
    </div>
  );
};
