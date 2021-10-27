const jsonfile = require('jsonfile');
const fs = require('fs');
const path = require('path');

const createArchive = (filename, archive) => {
  console.log(filename, archive)
  return jsonfile.writeFile(filename, archive)
   .then(response => console.log('Archive created!', response))
   .catch(e => console.error(e));
};

const addTimeToCourse = (archive, studiedTime) => {
  let data = {
    lastStudy: new Date().toString(),
    time: studiedTime,
  };

  jsonfile.writeFile(archive, data, {spaces: 2})
    .then(() => console.log('Time saved.'))
    .catch(e => console.error(e));
};

module.exports = {
  saveData: (filename, data) => {
    let pathArchive = path.resolve(__dirname, 'data', `${filename}.json`);
    console.log(pathArchive)
    if(fs.existsSync(pathArchive)){
      addTimeToCourse(pathArchive, data);
    }else{
      createArchive(pathArchive, {})
        .then(() => {
          addTimeToCourse(pathArchive, data);
        });
    }
  },
  getData: (filename) => {
    let pathArchive = path.resolve(__dirname, 'data', `${filename}.json`);
    return jsonfile.readFile(pathArchive)
  },
};
