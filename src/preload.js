const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("TimeElectronAPI", {
  openWebPage: function (page) {
    ipcRenderer.send("open-page", page);
  },
  changeSizeWindow: function (options) {
    ipcRenderer.send("change-size-window", options);
  },
  setAlwaysTop: function (value) {
    ipcRenderer.send("set-always-top", value);
  },
});
