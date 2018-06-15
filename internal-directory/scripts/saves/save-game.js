'use strict';
/*global $ */
// Meta Data


// Save game block
const save = (function () {

  const fs = require('fs');

  let playerSave = fs.readFileSync('./internal-directory/scripts/saves/save.json');
  let villageSave = fs.readFileSync('./internal-directory/scripts/saves/village-save.json');
  let enemySave = fs.readFileSync('./internal-directory/scripts/saves/enemy-save.json');
  let localSave = JSON.parse(playerSave);
  let localVillageSave = JSON.parse(villageSave);
  let localEnemySave = JSON.parse(enemySave);


  // Save function
  function saveGame(playerSave, villageSave, enemySave) {
    let data = JSON.stringify(playerSave, null, 2);
    let dataVillage = JSON.stringify(villageSave, null, 2);
    let dataEnemy = JSON.stringify(enemySave, null, 2);
    fs.writeFileSync('./internal-directory/scripts/saves/save.json', data);
    fs.writeFileSync('./internal-directory/scripts/saves/village-save.json', dataVillage);
    fs.writeFileSync('./internal-directory/scripts/saves/enemy-save.json', dataEnemy);
  }



  return {
    localSave,
    localVillageSave,
    saveGame,
    fs,
    localEnemySave

  };

})();

