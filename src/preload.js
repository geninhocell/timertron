const {
    contextBridge,
    ipcRenderer,
} = require("electron");
const packageJsonInfo = require('../package.json');
const timer = require('./app/js/timer');
const database = require('./database');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api",
  {
    database: {
      getData: database.getData,
    },
    timer: {
      start: timer.start,
      stop: timer.stop,
    },
    send: (channel, data) => {
      // whitelist channels
      let validChannels = [
        "open-window-about",
        "close-window-about",
        "open-link-github-external",
        "course-stop",
      ];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      let validChannels = [];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    }
  }
);

window.addEventListener('DOMContentLoaded', () => {
  const info = {
    name: packageJsonInfo.name,
    version: packageJsonInfo.version,
    author: packageJsonInfo.author,
    versionElectron: packageJsonInfo.dependencies.electron,
    license: packageJsonInfo.license,
  }

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['name', 'version', 'author', 'versionElectron', 'license']) {
    replaceText(`${type}`, info[type])
  }
});
