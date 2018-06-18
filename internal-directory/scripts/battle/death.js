'use strict';
/*global save village config battle characters */



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
      attributes: villager.attributes,
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

  function killVillager(first, last) {
    let killID;
    for (let i = 0; i < save.localVillageSave.villagers.length; i++) {
      if (first === save.localSave.name.first && last === save.localSave.name.last) {
        // Killed villager is main.
        killMainCharacter();

      }

      if (first === save.localVillageSave.villagers[i].name.first && last === save.localVillageSave.villagers[i].name.last) {
        // Kill villager
        delete save.localVillageSave.villagers[i];
        save.saveGame(save.localSave, save.localVillageSave, save.localEnemySave);

      }

      if (first === battle.allyTeam[i].name.first && last === battle.allyTeam[i].name.last) {
        delete battle.allyTeam[i];
      }
    }

  }

  function killEnemy(enemy) {
    for (let i = 0; i < save.localEnemySave.enemies.length; i++) {
      if (enemy === save.localEnemySave.enemies[i]) {
        delete save.localEnemySave.enemies[i];
        save.saveGame(save.localSave, save.localVillageSave, save.localEnemySave);
      }

      if (enemy === battle.enemyTeam[i]) {
        delete battle.enemyTeam[i];
      }
    }
  }

  return {
    killMainCharacter,
    killVillager,
    killEnemy
  };



})();



