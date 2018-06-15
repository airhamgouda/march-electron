'use strict';
/*global characters village canvas config save $ */
//Development'use strict';
/*global save config characters */



const button = (function () {
  function newCharacterButton() {
    const first = '';
    const last = '';
    save.localVillageSave = {};
    village.villagerCount = 0;
    village.cap = 0;
    save.localSave = characters.createMainCharacter(first, last);
    save.saveGame(save.localSave, save.localVillageSave, save.localEnemySave);

    const newSheet = config.characterInfoWithLabels();
    $('.character-data').remove();
    $('.character-data').remove();
    $('.character-sheet').append(newSheet);
    location.reload(true);


  }

  function loadNewMap() {
    $('#canvas').remove();
    config.load = config.maps.test2;
    $('.canvas-frame').append('<canvas id="canvas" class="map"></canvas>');
    // setTimeout(canvas.startCanvas(), 5000);
  }



  return {
    newCharacterButton,
    loadNewMap
  };
})();




