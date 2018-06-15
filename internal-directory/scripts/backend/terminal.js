'use strict';
/*global $ save button config */

const terminal = (function () {
  // Meta
  let term = $('.terminal');


  // On enter, clear the input and run the command
  window.onkeydown = function (event) {
    if (event.keyCode === 13) {
      runCommand($('.terminal-input').val());
      $('.terminal-input').val('');
      if (event.preventDefault) event.preventDefault(); // This should fix it
      return false; // Just a workaround for old browsers
    }
  };


  // Check input to run command
  function runCommand(input) {
    // Help Command
    if (input === 'help') {
      term.append('<p class="gc">---- Help ---</p>');
      term.append('<p class="gc">equip - ex: "equip sword"</p>');
      term.append('<p class="gc">new game - Creates a new character and map, resetting any progress.</p>');
    }

    // Show Inventory
    else if (input === 'inventory') {
      term.append('<p class="gc">You open your bag to find...</p>');
      if (save.localSave.inventory.length === 0) {
        term.append('<p class="gc">nothing.</p>');
      } else {
        for (let i = 0; i < save.localSave.inventory.length; i++) {

          if (save.localSave.inventory[i].class === 'weapon') {
            let string1 = `<p class="gc">${save.localSave.inventory[i].name}</p>`;
            let string2 = `<p class="gc">${save.localSave.inventory[i].description}</p>`;
            let string3 = `<p class="gc">This weapon does ${save.localSave.inventory[i].damage} damage.</p>`;

            term.append(string1);
            term.append(string2);
            term.append(string3);
          }
        }
      }
    }
    // Equip sword in demo
    else if (input === 'equip') {
      term.append('<p class="gc">What would you like to equip?</p>');
    } else if (input === 'equip sword') {
      if (save.localSave.inventory[0].equipped === false) {
        save.localSave.inventory[0].equipped = true;
        save.localSave.buffs.strength += 2;
        term.append('<p class="gc">You have equipped an Iron Sword. Your strength goes up by 2.</p>');
      } else {
        term.append('<p class="gc">You already have it equipped, you FUCKIN MORON.</p>');
      }

    }
    // Create new game with random character name
    else if (input === 'new game') {
      button.newCharacterButton();
    } else {
      term.append(`<p class="gc">'${input}' is an unknown command, please try again or type help for options.</p>`);
    }

    // setTimeout($('.gc').remove(), 5000);
  }

  return {

  };
})();



