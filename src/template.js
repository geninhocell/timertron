const database = require('./database');

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

    return template;
  },
}
