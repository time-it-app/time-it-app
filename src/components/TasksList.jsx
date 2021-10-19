import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import TasksListHeader from "./TasksListHeader.jsx";
import Pagination from "./Pagination.jsx";

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
    const data = localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    window.TimeElectronAPI.changeSizeWindow({
      width: 1250,
      height: 660,
    });
  });

  return (
    <div className="Flex-wide-container">
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
    </div>
  );
}
