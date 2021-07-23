/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import TasksListHeader from './TasksListHeader';
import Sidebar from './Sidebar';
import Pagination from './Pagination';

// import DeleteIcon from '../../assets/icons/delete.svg';
const { remote } = require('electron');

const win = remote.getCurrentWindow();

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tasks.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    win.setBounds({
      width: 1250,
      height: 660,
    });
  });

  return (
    <>
      <Sidebar />
      <div className="TasksList">
        <TasksListHeader />
        <div className="Container">
          <table>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Task name</th>
                <th>Time</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Hourly fee</th>
                <th>Total fee</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((val, key) => {
                return (
                  <tr key={key}>
                    {/* <td>{key}</td> */}
                    <td>{val.name}</td>
                    <td>{val.time}</td>
                    <td>{val.startTime}</td>
                    <td>{val.endTime}</td>
                    <td>${val.taskFee}</td>
                    <td>${val.totalFee}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            rowsPerPage={rowsPerPage}
            totalRows={tasks.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}
