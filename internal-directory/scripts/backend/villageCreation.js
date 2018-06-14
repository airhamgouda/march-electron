'use strict';
/*global config characters */



const village = (function () {
  // Config Files
  const chance = require('chance').Chance();
  let lowMain = config.mainCharacterLevelBase;
  let highMain = config.mainCharacterLevelCap;




  function generateVillagers(num) {

    let villagers = {};
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
    generateVillagers
  };
})();



