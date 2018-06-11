'use strict';

const characters = (function () {
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
    let result = {
      strength,
      constitution,
      dexterity,
      intelligence,
      wisdom,
      charisma,
      level
    };

    if (total > lowEnd && total < highEnd) {
      return result;
    } else {
      skillGenerator(25, 35);
    }
  }


  // Run at start to generate new character, with random skill starts from level 1-10
  const createMainCharacter = function (firstName, lastName) {


    let skills = (skillGenerator(25, 35));
    while (skills === undefined) {
      skills = skillGenerator(25, 35);
    }



    return {
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
      },
    };
  };

  return {
    createMainCharacter
  };
})();

// console.log(characters.createMainCharacter('Aram', 'Hammoudeh'));
// console.log('---------------------------------------------------');
// console.log('Finished running');

