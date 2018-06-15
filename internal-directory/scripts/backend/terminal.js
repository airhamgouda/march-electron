'use strict';
/*global $ save button config */

const terminal = (function () {
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
    console.log(input);
    console.log(input === 'equip sword');
    if (input === 'help') {
      term.append('<p class="gc">---- Help ---</p>');
      term.append('<p class="gc">equip - ex: "equip sword"</p>');
      term.append('<p class="gc">new game - Creates a new character and map, resetting any progress.</p>');
    } else if (input === 'equip') {
      term.append('<p class="gc">What would you like to equip?</p>');
    } else if (input === 'equip sword') {
      if (save.localSave.inventory.ironSword.equipped === false) {
        save.localSave.inventory.ironSword.equipped = true;
        term.append('<p class="gc">You have equipped an Iron Sword. Your strength goes up by 2.</p>');
      } else {
        term.append('<p class="gc">You already have it equipped, you FUCKIN MORON.</p>');
      }

    } else if (input === 'new game') {
      button.newCharacterButton();
    } else {
      term.append(`<p class="gc">'${input}' is an unknown command, please try again or type help for options.</p>`);
    }

    // setTimeout($('.gc').remove(), 5000);
  }

  return {

  };
})();



