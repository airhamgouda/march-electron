'use strict';
/*global village config $ save */

const events = (function () {
  if (village.cap !== village.villagerCount) {
    village.generateVillagers();
  }

  function renderText(arr) {
    console.log('render');
    for (let i = 0; i < arr.length; i++) {
      console.log(arr.length);
      arr[i]();
    }
  }

  // Water

  const water = {
    north: function () {
      $('.north').remove();
      $('.north-hud').append('<button class="north">Watch out! Water to the north!</button>');
    },

    south: function () {
      $('.south').remove();
      $('.south-hud').append('<button class="south">Watch out! Water to the south!</button>');
    },

    east: function () {
      $('.east').remove();
      $('.east-hud').append('<button class="east">Watch out! Water to the east!</button>');
    },

    west: function () {
      $('.west').remove();
      $('.west-hud').append('<button class="west">Watch out! Water to the west!</button>');
    }

  };


  // Npc Demo

  function test() {
    console.log('test');
  }
  const npcDemo = {

    snippet: {
      giftIronSword: '<p class="gc">You are given an iron sword. Type "equip sword" to hold it in your hand. </p>',

      haveIronSword: '<p class="gc">You have an unequipped iron sword in your inventory. Type "equip sword" to hold it in your hand. </p>',

      noSword: '<p class="gc">Do you really expect to fight with no sword...?</p>',
      intro11: `<p class="gc">"${save.localSave.name.first}! It's me,  ${save.localVillageSave[0].name.first}!
          I cant believe you survived...  it is all gone... the whole town was razed.. A few of us have retreated into woods
          but they got most of us. A few of us have made camp here, but there isnt much room. There are more supplies to the
          east, but they are being guarded by the troops. I have a few swords and horse. If you accompany me, I think we can take
          them! They wont be expecting us to sneak up on them. Let's go!"</p>`,
      intro21: `<p class="gc">"${save.localSave.name.first}! It's me,  ${save.localVillageSave[0].name.first}!
          I cant believe you survived...  it is all gone... the whole town was razed.. A few of us have retreated into woods
          but they got most of us. A few of us have made camp here, but there isnt much room. There are more supplies to the
          east, but they are being guarded by the troops. I have a few swords and horse. If you accompany me, I think we can take
          them! I think with you leading the way, we can rally some others, too! Let's go!"</p>`,

      intro12: '<p class="gc">"Lead the way, I am right behind you. It is only the two of us though, so we need to be careful.</p>',

      intro22: `<p class="gc">Lead the way! There are ${village.cap + 1} of us all together, so we should be ok. </p>`
    },

    loadRules: {
      intro: function () {

        $('.gc').remove();
        if (save.localVillageSave[0].met === false) {
          if (village.cap === 1) {
            $('.terminal').append(npcDemo.snippet.intro11);
            setTimeout(function () {
              $('.terminal').append(npcDemo.snippet.giftIronSword);
              config.clearTerminal(10);
            }, 6001);
          } else {
            $('.terminal').append(npcDemo.snippet.intro21);
            save.localVillageSave[1].met = true;
            setTimeout(function () {
              $('.terminal').append(npcDemo.snippet.giftIronSword);
              config.clearTerminal(10);
            }, 6001);
          }
          save.localSave.inventory.ironSword = {
            equipped: false,
            damage: 4
          };
          save.localVillageSave[0].met = true;

        } else if (save.localVillageSave[0].met === true) {
          // ...
          if (village.cap === 1) {

            if (save.localSave.inventory.ironSword.equipped === false) {
              $('.terminal').append(npcDemo.snippet.noSword);
              $('.terminal').append(npcDemo.snippet.haveIronSword);
            } else {
              $('.terminal').append(npcDemo.snippet.intro12);
            }
          } else {
            $('.terminal').append(npcDemo.snippet.intro22);
            if (save.localSave.inventory.ironSword.equipped === false) {
              $('.terminal').append(npcDemo.snippet.haveIronSword);
            }
          }
        }
        config.cooldown[0] = 5;
        config.clearTerminal(5);
        save.saveGame(save.localSave, save.localVillageSave, save.localEnemySave);
      }

    },


    north: function () {

      $(document).on('click', '.north', function () {
        if (config.cooldown[0] === 0) {
          renderText([npcDemo.loadRules.intro]);
        }
      });
    },

    south: function () {
      $(document).on('click', '.south', function () {
        if (config.cooldown[0] === 0) {
          renderText([npcDemo.loadRules.intro]);
        }
      });
    },

    east: function () {
      $(document).on('click', '.east', function () {
        if (config.cooldown[0] === 0) {
          renderText([npcDemo.loadRules.intro]);
        }
      });
    },

    west: function () {
      $(document).on('click', '.west', function () {
        if (config.cooldown[0] === 0) {
          renderText([npcDemo.loadRules.intro]);
        }
      });
    }
  };




  return {
    water,
    npcDemo,
    test,


  };
})();



