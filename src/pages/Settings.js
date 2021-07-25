/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

export default function Settings() {
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(false);

  function getLocalStorageLength() {
    return JSON.parse(localStorage.getItem('tasks'))
      ? JSON.parse(localStorage.getItem('tasks')).length
      : 0;
  }
  useEffect(() => {
    setIsLocalStorageEmpty(getLocalStorageLength() === 0);
  });

  function clearLocalStorageData() {
    localStorage.clear();
    setIsLocalStorageEmpty(true);
  }

  function textToClipboard(text) {
    const temp = document.createElement('textarea');
    document.body.appendChild(temp);
    temp.value = text;
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
  }

  return (
    <>
      <Sidebar />
      <div className="Settings">
        <div className="SettingsHeader">
          <h2>Settings</h2>
        </div>
        <div className="SettingsContent">
          <div className="Row">
            <div className="InstructionText">Delete all current tasks data</div>
            <button
              className={`${
                isLocalStorageEmpty
                  ? 'GreyButtonBlueText'
                  : 'PinkButtonYellowText'
              }`}
              onClick={clearLocalStorageData}
            >
              delete tasks
            </button>
          </div>
          <div className="Row">
            <div className="InstructionText">Copy tasks data to clipboard</div>
            <button
              className="PinkButtonYellowText"
              onClick={textToClipboard(localStorage.getItem('tasks'))}
            >
              copy task data
            </button>
          </div>
          {/* <div className="Row">
            <div className="InstructionText">Change color mode</div>
            <button className="PinkButtonYellowText">
              coming soon
            </button>
          </div>
          <div className="Row">
            <div className="InstructionText">Change currency</div>
            <button className="PinkButtonYellowText">
              comnig soon
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
