const {app, BrowserWindow, ipcMain, shell, Tray, Menu} = require('electron');
const path = require('path');
const database = require('./src/database');
const template = require('./src/template');

const iconPath = path.resolve(__dirname, 'src', 'app', 'img', 'icon-tray.png');

let mainWindow;
let tray = null;
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'src', "preload.js") // use a preload script
    },
  });

  tray = new Tray(iconPath);
  let trayMenu = Menu.buildFromTemplate(
    template.generateTrayTemplate(mainWindow)
  );

  tray.setContextMenu(trayMenu);

  let templateMenu = [
    {
      label: 'Meu Menu',
      submenu: [
        {
          label: 'Item 1',
        },
        {
          label: 'Item 2',
        },
      ],
    },
  ];

  if(process.platform === 'darwin'){
    templateMenu.unshift({
      label: app.getName(),
      submenu: [
        {
          label: 'O MAC É COMPLICA...',
        },
      ],
    });
  }

  let mainMenu = Menu.buildFromTemplate(templateMenu);

  Menu.setApplicationMenu(mainMenu);

  mainWindow.loadURL(`file://${__dirname}/src/app/index.html`);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

let aboutWindow = null;
ipcMain.on('open-window-about', () => {
  if(aboutWindow == null){
    aboutWindow = new BrowserWindow({
      width: 300,
      height: 270,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(__dirname, "src", "preload.js") // use a preload script
      },
      frame: false, // retirar botões
    });

    aboutWindow.on('closed', () => {
        aboutWindow = null;
    });
  }

  aboutWindow.loadURL(`file://${__dirname}/src/app/about.html`);
});

ipcMain.on('close-window-about', () => {
  aboutWindow.close();
});

ipcMain.on('open-link-github-external', () => {
  shell.openExternal("https://github.com/geninhocell");
});

ipcMain.on('course-stop', (event, data) => {
  database.saveData(data.course, data.time)
});

ipcMain.on('course-add', (event, newCourse) => {
  let newTrayMenuTemplate = template.courseAddTrayTemplate(mainWindow, newCourse);
  let newTrayMenu = Menu.buildFromTemplate(newTrayMenuTemplate);

  tray.setContextMenu(newTrayMenu);
});
