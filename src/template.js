const {ipcMain} = require('electron');
const database = require('./database');

let initialTemplate = [];
module.exports = {
  generateTrayTemplate: (window) => {
    let template = [
      {
        label: 'Cursos'
      },
      {
        type: 'separator'
      },
    ];

    let courses = database.getLabels();
    courses.forEach(course => {
      let menuItem = {
        label: course,
        type: 'radio',
        click: () => {
          window.send('toggle-course', course);
        },
      };

      template.push(menuItem);
    });

    initialTemplate = template;
    return template;
  },
  generateMainMenuTemplate: (applicationName) => {
    let templateMenu = [
      {
        label: 'Ver',
        submenu: [
          {
            role: 'reload',
          },
          {
            role: 'toggledevtools',
          }
        ],
      },
      {
        label: 'Sobre',
        submenu: [
          {
            label: 'Sobre o Timer Tron',
            accelerator: 'CommandOrControl+I',
            click: () => {
              ipcMain.emit('open-window-about')
            }
          },
        ],
      },
    ];

    if(process.platform === 'darwin'){
      templateMenu.unshift({
        label: applicationName,
        submenu: [
          {
            label: 'O MAC É COMPLICA...',
          },
        ],
      });
    }

    return templateMenu;
  },
  courseAddTrayTemplate: (window, newCourse) => {
    initialTemplate.push({
      label: newCourse,
      type: 'radio',
      checked: true,
      click: () => {
        window.send('toggle-course', newCourse);
      },
    });

    return initialTemplate;
  },
}
