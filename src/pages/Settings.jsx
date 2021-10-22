import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { formatDate } from "../util/date";

export default function Settings() {
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [tasksFileName, setTasksFileName] = useState("tasks.json");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  function getLocalStorageLength() {
    return JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks")).length
      : 0;
  }

  useEffect(() => {
    setIsLocalStorageEmpty(getLocalStorageLength() === 0);
  }, []);

  function clearLocalStorageData() {
    localStorage.clear();
    setIsLocalStorageEmpty(true);
    if (!isLocalStorageEmpty) {
      setTimeout(function () {
        setIsLoadingDelete(false);
      }, 1500);
      setIsLoadingDelete(true);
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function replaceAll(str, match, replacement) {
    return str.replace(new RegExp(escapeRegExp(match), "g"), () => replacement);
  }

  function downloadTasksAsText(tasks) {
    if (tasks) {
      let newText = tasks.toString();
      // formatting copied output
      newText = replaceAll(newText, "[{", "");
      newText = replaceAll(newText, "}]", "");
      newText = replaceAll(newText, "{", "\n");
      newText = replaceAll(newText, "}", "");
      newText = replaceAll(newText, ",", "\n");
      const temp = document.createElement("textarea");
      document.body.appendChild(temp);
      temp.value = newText;
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);

      const blob = new Blob([newText], { type: "text/plain" });
      const currentDate = formatDate("ddMMyyyy_hhmmss", new Date());
      setDownloadUrl(URL.createObjectURL(blob));
      setTasksFileName(`tasks_${currentDate}.txt`);
    }
  }

  function downloadTasksAsJSON(tasks) {
    if (tasks) {
      const json = JSON.parse(tasks);
      const jsonStr = JSON.stringify(json, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const currentDate = formatDate("ddMMyyyy_hhmmss", new Date());

      setDownloadUrl(URL.createObjectURL(blob));
      setTasksFileName(`tasks_${currentDate}.json`);
    }
  }

  return (
    <div className="Flex-wide-container">
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
                  ? "GreyButtonBlueText"
                  : "PinkButtonYellowText"
              }`}
              onClick={clearLocalStorageData}
            >
              delete tasks
            </button>
          </div>
          <div className="Row">
            <div className="InstructionText">Download Tasks as text</div>
            <a
              className="PinkButtonYellowText"
              onClick={() => downloadTasksAsText(localStorage.getItem("tasks"))}
              download={tasksFileName}
              href={downloadUrl}
            >
              Download TXT
            </a>
          </div>
          <div className="Row">
            <div className="InstructionText">Download Tasks as JSON</div>
            <a
              className="PinkButtonYellowText"
              onClick={() => downloadTasksAsJSON(localStorage.getItem("tasks"))}
              download={tasksFileName}
              href={downloadUrl}
            >
              Download JSON
            </a>
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
    </div>
  );
}
