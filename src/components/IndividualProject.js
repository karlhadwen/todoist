/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue } from '../context';
import { firebase } from '../firebase';

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();

  const deleteProject = () =>
    firebase
      .firestore()
      .collection('projects')
      .doc()
      // need something here as a reference
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
      .then(() => {
        const newProjects = projects.filter(
          op => op.projectId !== project.projectId
        );
        newProjects.sort((a, b) => (a.projectId > b.projectId ? 1 : -1));
        setProjects(newProjects);
      });

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        onClick={() => setShowConfirm(!showConfirm)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button type="button" onClick={deleteProject}>
                Delete
              </button>
              <span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
