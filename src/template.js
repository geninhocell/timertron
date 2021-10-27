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
