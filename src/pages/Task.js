/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import StartIcon from '../../assets/icons/start.svg';
import PauseIcon from '../../assets/icons/pause.svg';
import ResetIcon from '../../assets/icons/reset.svg';
import CloseIcon from '../../assets/icons/close.svg';
import MinimizeIcon from '../../assets/icons/minimize.svg';
import MaximizeIcon from '../../assets/icons/maximize.svg';

let startTime;
const { remote } = require('electron');

const win = remote.getCurrentWindow();

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);
  const [recordedTime, setRecordedTime] = useState('');

  const handleStart = () => {
    startTime = new Date();
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    startTime = Date.now();
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const handleSubmit = () => {};

  return {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  };
};

const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours}:${getMinutes}:${getSeconds}`;
};

const getTotalFee = (timer, hourlyFee) => {
  // const minutes = `${Math.floor(timer / 60)}`;
  // const seconds = `${Math.floor(timer / 3600)}`;
  // const hours = `${Math.floor(timer / 3600)}`;
  // const getSeconds = `0${timer % 60}`.slice(-2);
  // const getMinutes = `0${minutes % 60}`.slice(-2);
  // const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
  const result = Math.ceil((timer / 3600) * hourlyFee);
  return result;
};

export default function Task() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskFee, setTaskFee] = useState('');

  const changeWindowSize = () => {
    if (isMinimized) {
      win.setBounds({
        width: 299,
        height: 90,
      });
    } else {
      win.setBounds({
        width: 299,
        height: 510,
      });
    }
  };

  changeWindowSize();

  const minimizeWindow = () => {
    win.setAlwaysOnTop(!isMinimized, 'screen');
    setIsMinimized(!isMinimized);
  };

  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    handleSubmit,
  } = useTimer(0);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  return (
    <div className={`Task ${isMinimized ? 'FlexIt' : ''}`}>
      <div className="Btns">
        <img
          onClick={minimizeWindow}
          src={`${isMinimized ? MinimizeIcon : MaximizeIcon}`}
          alt="minimize icon"
        />
        <Link to="/tasks">
          <img src={CloseIcon} alt="close icon" />
        </Link>
      </div>
      <div className={`TaskDetails ${isMinimized ? 'HideIt' : ''}`}>
        <h3>Task Name</h3>
        <input
          className="TaskNameInput"
          onChange={(event) => setTaskName(event.target.value)}
          defaultValue="name"
        />
        <h3>Task Hourly Fee</h3>
        <span className="Currency">$ </span>
        <input
          className="TaskHourlyFeeInput"
          onChange={(event) => setTaskFee(event.target.value)}
          defaultValue="0"
        />
      </div>

      <div className="Time">{formatTime(timer)}</div>

      <div className={`${isMinimized ? 'HideIt' : 'Controllers'}`}>
        <div className="Row-1">
          {!isActive && !isPaused ? (
            <button className="StartButton" onClick={handleStart}>
              Start <img src={StartIcon} alt="start icon" />
            </button>
          ) : isPaused ? (
            <button className="PauseButton" onClick={handlePause}>
              Pause <img src={PauseIcon} alt="pause icon" />
            </button>
          ) : (
            <button className="ResumeButton" onClick={handleResume}>
              Resume <img src={StartIcon} alt="start icon" />
            </button>
          )}
          <button
            className="ResetButton"
            onClick={handleReset}
            disabled={!isActive}
          >
            Reset <img src={ResetIcon} alt="reset icon" />
          </button>
        </div>
        <div className="Row-2">
          <Link
            className="FinishButton"
            onClick={() => {
              tasks.push({
                id: tasks[tasks.length - 1]
                  ? parseInt(tasks[tasks.length - 1].id) + 1
                  : 0,
                name: taskName,
                startTime: startTime.toLocaleString(),
                endTime: new Date().toLocaleString(),
                time: formatTime(timer),
                taskFee,
                totalFee: getTotalFee(timer, taskFee),
              });
              localStorage.setItem('tasks', JSON.stringify(tasks));
              win.setBounds({
                width: 1250,
                height: 660,
              });
            }}
            to="/tasks"
          >
            Finish Task
          </Link>
        </div>
      </div>
    </div>
  );
}
