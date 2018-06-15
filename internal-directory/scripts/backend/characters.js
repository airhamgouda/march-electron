'use strict';
/*global config */

const characters = (function () {
  // Config Files
  const chance = require('chance').Chance();
  let lowMain = config.mainCharacterLevelBase;
  let highMain = config.mainCharacterLevelCap;


  // Create random skills with a cap of all attributes passed through as first argument

  function skillGenerator(low, high) {
    const lowEnd = low;
    const highEnd = high;
    const strength = Math.floor((Math.random() * 10) + 3);
    const constitution = Math.floor((Math.random() * 10) + 3);
    const dexterity = Math.floor((Math.random() * 10) + 3);
    const intelligence = Math.floor((Math.random() * 10) + 3);
    const wisdom = Math.floor((Math.random() * 10) + 3);
    const charisma = Math.floor((Math.random() * 10) + 3);
    const total = strength + constitution + dexterity + intelligence + wisdom + charisma;
    const level = Math.floor(total / Math.PI);
    const hp = ((constitution / 2) + (level / 3)) * 5;
    let result = {
      strength,
      constitution,
      dexterity,
      intelligence,
      wisdom,
      charisma,
      level,
      hp
    };

    if (total > lowEnd && total < highEnd) {
      return result;
    } else {
      skillGenerator(low, high);
    }
  }


  // Run at start to generate new character, with random skill starts from level 1-10
  const createMainCharacter = function (firstName, lastName) {
    let first = firstName;
    let last = lastName;

    let skills = (skillGenerator(lowMain, highMain));
    while (skills === undefined) {
      skills = skillGenerator(lowMain, highMain);
    }
    if (firstName === '') {
      first = chance.first();
    }

    if (lastName === '') {
      last = chance.last();
    }


    return {
      name: {
        first: first,
        last: last
      },
      skills: skills,
      experience: {
        strengthXp: 0,
        constitutionXp: 0,
        dexterityXp: 0,
        intelligenceXp: 0,
        wisdomXp: 0,
        charismaXp: 0
      },
    };
  };

  return {
    skillGenerator,
    createMainCharacter
  };
})();



