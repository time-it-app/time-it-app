import React from 'react';
import TasksList from './TasksList';
import TasksListHeader from './TasksListHeader';
import Sidebar from './Sidebar';

export default function MainPage() {
  return (
    <div className="MainPage">
      <TasksList />
    </div>
  );
}
