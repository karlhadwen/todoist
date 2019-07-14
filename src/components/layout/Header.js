import React from 'react';
import { FaCog } from 'react-icons/fa';

export const Header = () => (
  <header className="header">
    <nav>
      <div className="logo">
        <img src="/images/logo.png" alt="Todoist" />
      </div>
      <div className="settings">
        <ul>
          <li className="settings__add">+</li>
          <li className="settings__cog">
            <FaCog />
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
