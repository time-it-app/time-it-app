/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Sidebar from './Sidebar';

export default function Settings() {
  function clearLocalStorageData() {
    localStorage.clear();
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
            <div className="InstructionText">Permanently delete all current tasks data?</div>
            <button className="PinkButtonYellowText" onClick={clearLocalStorageData}>
              delete tasks
            </button>
          </div>
          <div className="Row">
            <div className="InstructionText">Export current tasks data</div>
            <button className="PinkButtonYellowText" onClick={clearLocalStorageData}>
              export tasks
            </button>
          </div>
          <div className="Row">
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
          </div>
        </div>
      </div>
    </>
  );
}
