'use strict';
/*global characters */
// Meta Data
const fs = require('fs');

// Save game block
const save = (function () {
  let rawdata = fs.readFileSync('./internal-directory/scripts/save.json');
  let localSave = JSON.parse(rawdata);


  // Save function
  function newGame(saveData) {
    let data = JSON.stringify(saveData, null, 2);
    fs.writeFileSync('./internal-directory/scripts/save.json', data);
  }

  function saveGame(saveData) {
    let data = JSON.stringify(saveData, null, 2);
    fs.writeFileSync('./internal-directory/scripts/save.json', data);
  }


  return {
    localSave,
    newGame,
    saveGame,

  };

})();

