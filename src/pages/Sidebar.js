import React from 'react';
import TasksList from './TasksList';
import TasksListHeader from './TasksListHeader';
import AppLogo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="App-logo">
        <img src={AppLogo} alt="app logo" />
      </div>
      <div className="Menu">
        <Link to="/">
          <div className="Menu-item">Tasks</div>
        </Link>
        <Link to="/settings">
          <div className="Menu-item">Settings</div>
        </Link>
        <Link to="/about">
          <div className="Menu-item">About</div>
        </Link>
      </div>
    </div>
  );
}
