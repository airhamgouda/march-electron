'use strict';
/*global save village config characters */



const death = (function () {
  function killMainCharacter() {
    let id = Math.floor(Math.random() * village.villagerCount);
    let villager = save.localVillageSave.villagers[id];
    let companion = false;
    // Companions function () {
    if (village.villagerCount > 1) {
      companion = true;
    } else {
      companion = false;
    }

    let newMain = {
      name: {
        first: villager.name.first,
        last: villager.name.last
      },
      skills: villager.skills,
      buffs: villager.buffs,
      experience: villager.experience,
      inventory: villager.inventory,

      death: {
        name: save.localSave.name.first,
        companion: companion

      }
    };

    console.log(newMain);
    save.localSave = null;
    save.localSave = newMain;
    save.localVillageSave.villagers.splice(id, 1);
    save.saveGame(save.localSave, save.localVillageSave, save.localEnemySave);


  }

  return {
    killMainCharacter
  };



})();



