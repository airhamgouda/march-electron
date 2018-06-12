'use strict';
/*global characters config save $ */
//Development
function newCharacterButton() {
  const first = document.getElementById('first-name').value;
  const last = document.getElementById('last-name').value;
  save.localSave = characters.createMainCharacter(first, last);
  const newSheet = config.characterInfoWithLabels;

  $('.character-data').remove();
  $('.character-sheet').append(newSheet);
  save.saveGame(save.localSave);
}


