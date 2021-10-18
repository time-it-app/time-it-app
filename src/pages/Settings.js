import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function Settings() {

  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(false);
  const [downloadUrl, setDownloadURl] = useState("");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingCopy, setIsLoadingCopy] = useState(false);

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


  function downloadTasks(text) {
    console.log(text);
    if (text != null) {
      let newText = text.toString();
      // formatting copied output
      newText = replaceAll(text, "[{", "");
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

      let blob1 = new Blob([newText], { type: "text/plain" });
      setDownloadURl(URL.createObjectURL(blob1));
      // setTimeout(function () {
      //   setIsLoadingCopy(false);
      // }, 1500);
      // setIsLoadingCopy(true);

      //   let downloadContent = {
      //     content: [newText],
      //   };
      //   pdfMake.createPdf(docDefinition).download();

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
            {isLoadingCopy ? (
              <div className="loader" />
            ) : (
              <a
                className="PinkButtonYellowText"
                onClick={() => downloadTasks(localStorage.getItem("tasks"))}
                download="tasks.txt"
                href={downloadUrl}
              >
                Download Tasks
              </a>
            )}
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
