'use strict';
/*global $ */
// Meta Data


// Save game block
const save = (function () {

  const fs = require('fs');

  let playerSave = fs.readFileSync('./internal-directory/scripts/saves/save.json');
  let villageSave = fs.readFileSync('./internal-directory/scripts/saves/village-save.json');
  let localSave = JSON.parse(playerSave);
  let localVillageSave = JSON.parse(villageSave);


  // Save function
  function saveGame(saveData, villageData) {
    let data = JSON.stringify(saveData, null, 2);
    let dataVillage = JSON.stringify(villageData, null, 2);
    fs.writeFileSync('./internal-directory/scripts/saves/save.json', data);
    fs.writeFileSync('./internal-directory/scripts/saves/village-save.json', dataVillage);
  }



  return {
    localSave,
    localVillageSave,
    saveGame,
    fs,

  };

})();

