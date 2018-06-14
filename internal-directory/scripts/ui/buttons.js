'use strict';
/*global characters village canvas config save $ */
//Development
function newCharacterButton() {
  const first = document.getElementById('first-name').value;
  const last = document.getElementById('last-name').value;
  save.localSave = characters.createMainCharacter(first, last);
  save.saveGame(save.localSave, save.localVillageSave);
  save.localVillageSave = village.generateVillagers(5);

  save.saveGame(save.localSave, save.localVillageSave);
  const newSheet = config.characterInfoWithLabels();
  $('.character-data').remove();
  $('.character-data').remove();
  $('.character-sheet').append(newSheet);

}

function loadNewMap() {
  $('#canvas').remove();
  config.load = config.maps.test2;
  $('.canvas-frame').append('<canvas id="canvas" class="map"></canvas>');
  // setTimeout(canvas.startCanvas(), 5000);
}


