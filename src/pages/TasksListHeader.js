import React from 'react';
import { Link } from 'react-router-dom';

// Rename this to be a generic header component
export default function TasksListHeader() {
  return (
    <div className="TasksListHeader">
      <Link to="/task">
        <div></div>
      </Link>
      <h2>Tasks Details</h2>
      <Link to="/task">
        <button className="NewTaskBtn">new task</button>
      </Link>
    </div>
  );
}
