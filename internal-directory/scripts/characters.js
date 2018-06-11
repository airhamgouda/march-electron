'use strict';

const characters = (function () {
  // Create random skills with a cap of all attributes passed through as first argument
  function skillGenerator() {
    const cap = 30;
    const strength = Math.floor((Math.random() * 10) + 3);
    const constitution = Math.floor((Math.random() * 10) + 3);
    const dexterity = Math.floor((Math.random() * 10) + 3);
    const intelligence = Math.floor((Math.random() * 10) + 3);
    const wisdom = Math.floor((Math.random() * 10) + 3);
    const charisma = Math.floor((Math.random() * 10) + 3);
    const total = strength + constitution + dexterity + intelligence + wisdom + charisma;
    let result = {
      strength,
      constitution,
      dexterity,
      intelligence,
      wisdom,
      charisma
    };

    if (total !== cap) {
      skillGenerator();
    } else {
      return result;
    }
  }


  // Run at start to generate new character, with random skill starts from level 1-10
  const createMainCharacter = function (firstName, lastName) {


    let skills = (skillGenerator());
    while (skills === undefined) {
      skills = skillGenerator();
    }

    return {
      name: {
        First: firstName,
        Last: lastName
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
  };

  return {
    createMainCharacter
  };
})();

// console.log(characters.createMainCharacter('Aram', 'Hammoudeh'));
// console.log('---------------------------------------------------');
// console.log('Finished running');

