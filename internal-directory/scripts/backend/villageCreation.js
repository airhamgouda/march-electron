'use strict';
/*global save config characters */



const village = (function () {
  // Config Files
  const chance = require('chance').Chance();
  let lowMain = config.mainCharacterLevelBase;
  let highMain = config.mainCharacterLevelCap;
  let villagerCount = save.localVillageSave.villagers.length;
  let cap = 1 + Math.floor(save.localSave.skills.charisma / 5);
  // Solve for villager cap. If cap changes, either grant new villagers or kills some off
  function solveCap() {
    let oldCap = this.cap;
    let newCap = 1 + Math.floor(save.localSave.skills.charisma / 5);


    // How many villagers are currently alive
    if (this.villagerCount < this.cap) {
      this.villagerCount = 0;
      for (var v = 0; v < this.cap; v++) {
        if (save.localVillageSave[`${v}`] !== undefined) {
          console.log('He is alive!');
          this.villagerCount++;
        }
      }
    }

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


  // To account for glitches, cheats, or bugs. General catch al

  function calculateVillagerCount() {
    this.villagerCount = save.localVillageSave.villagers.length;
  }






  function generateVillagers() {

    let villagers = save.localVillageSave;
    for (let i = 0; i < this.cap; i++) {

      let firstName = chance.first();
      let lastName = chance.last();

      let skills = (characters.skillGenerator(lowMain, highMain));
      while (skills === undefined) {
        skills = characters.skillGenerator(lowMain, highMain);
      }
      let battle = {
        damage: 10 + (skills.strength + 2 + 4),
        defence: 10 + (skills.constitution + 2 + 4),
        dexterity: 10 + (skills.dexterity + 0 + 0)
      };
      let id = i;
      // console.log(id);
      if (villagers.villagers[id]) {
        // console.log('Villager already exists');

      }
      else {
        // console.log(village.villagerCount + '/' + village.cap);
        // console.log('new villager');
        villagers.villagers.push({
          met: false,
          party: false,
          ID: config.ID(),
          name: {
            first: firstName,
            last: lastName
          },
          battle: battle,
          skills: skills,
          experience: {
            strengthXp: 0,
            constitutionXp: 0,
            dexterityXp: 0,
            intelligenceXp: 0,
            wisdomXp: 0,
            charismaXp: 0
          },
          buffs: {
            strength: 2,
            constitution: 2,
            dexterity: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
          },
          attributes: {
            damage: 4,
            defence: 4,
            speed: 0,
          },
          inventory: [
            {
              name: 'Iron Sword',
              equipped: true,
              damage: 4,
              level: 3,
              buffType: 'strength',
              buffAmt: 2,
              class: 'weapon',
              description: 'A rusted iron blade.. It gets the job done.',
              tags: ['sword', 'iron sword', 'Iron sword', 'iron Sword', 'Iron Sword', 'ironsword', 'ironSword', 'Ironsword']
            },
            {
              name: 'Leather Helmet',
              equipped: true,
              defence: 4,
              level: 4,
              buffType: 'constitution',
              buffAmt: 2,
              class: 'helmet',
              description: 'You see flakes coming off the side.. This helmet has seen better days',
              tags: ['helmet', 'leather helmet', 'Leather helmet', 'leather Helmet', 'Leather Helmet', 'leatherhelmet', 'leatherHelmet', 'LeatherHelmet']
            },
          ]
        });
      }

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
    cap,
    villagerCount,
    calculateVillagerCount
  };
})();



