'use strict';
/*global save config characters */



const village = (function () {
  // Config Files
  const chance = require('chance').Chance();
  let lowMain = config.mainCharacterLevelBase;
  let highMain = config.mainCharacterLevelCap;
  let villagerCount = 0;
  let cap = 0;
  // Solve for villager cap. If cap changes, either grant new villagers or kills some off
  function solveCap() {
    let oldCap = this.cap;
    let newCap = 1 + Math.floor(save.localSave.skills.charisma / 5);



    if (oldCap < newCap) {
      // Your cap has gone up. A new villager will be added to the que to approach your village.
      this.cap = newCap;

      generateVillagers(newCap - oldCap);
      this.villagerCount = newCap;


    }

    if (oldCap === newCap) {
      // Nothing has changed, nothing happens
      return;
    }

    if (oldCap > newCap) {
      this.cap = newCap;
      
      // Your cap has gone down. A random villagerLeave event will play out, by either fighting the character, commiting suicide, etc
    }


  }




  function generateVillagers(num) {

    let villagers = save.localVillageSave;
    for (let i = 0; i < num; i++) {

      let firstName = chance.first();
      let lastName = chance.last();
      let skills = (characters.skillGenerator(lowMain, highMain));
      while (skills === undefined) {
        skills = characters.skillGenerator(lowMain, highMain);
      }

      villagers[firstName] = {
        name: {
          first: firstName,
          last: lastName
        },
        skills: skills,
        experience: {
          strengthXp: 0,
          constitutionXp: 0,
          dexterityXp: 0,
          intelligenceXp: 0,
          wisdomXp: 0,
          charismaXp: 0
        }
      };


    }
    return villagers;
    // if (villagers.length > lowEnd && villagers.length < highEnd) {
    //   return villagers;
    // } else {
    //   generateVillagers(low, high);
    // }
  }

  return {
    generateVillagers,
    solveCap,
    cap
  };
})();



