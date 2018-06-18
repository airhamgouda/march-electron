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
      term.append('<p class="gc">equip / unequip - ex: "equip sword"</p>');
      term.append('<p class="gc">inventory - Show all items in bag as well as their stats</p>');
      term.append('<p class="gc">equipped - Show all items you are currently using</p>');
      term.append('<p class="gc">new game - Creates a new character and map, resetting any progress.</p>');
      term.append('<p class="gc">clear - Clear the terminal.</p>');
    } else if (input === 'clear') {
      $('.gc').remove();
    }
    // Show equipped
    else if (input === 'equipped') {
      let status = false;
      term.append('<p class="gc">You are currently holding..</p>');
      for (let i = 0; i < save.localSave.inventory.length; i++) {


        if (save.localSave.inventory[i].equipped === true) {
          let string1 = `<p class="gc">${save.localSave.inventory[i].name}</p>`;
          term.append(string1);
          status = true;
        }
      }
      if (status === false) {
        term.append('<p class"gc">nothing.</p>');
      }
    }
    // Show Inventory
    else if (input === 'inventory') {
      term.append('<p class="gc">You open your bag to find...</p>');
      term.append('<p class="gc">----------------------------------------</p>');
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
            term.append('<p class="gc">----------------------------------------</p>');
          }

          if (save.localSave.inventory[i].class === 'helmet') {
            let string1 = `<p class="gc">${save.localSave.inventory[i].name}</p>`;
            let string2 = `<p class="gc">${save.localSave.inventory[i].description}</p>`;
            let string3 = `<p class="gc">This armor provides ${save.localSave.inventory[i].defence} defence.</p>`;

            term.append(string1);
            term.append(string2);
            term.append(string3); term.append('<p class="gc">----------------------------------------</p>');
          }
        }
      }
    }
    // Equip sword in demo
    else if (input.slice(0, 6) === 'equip ') {

      let query = input.slice(6);
      let inventory = save.localSave.inventory;
      let item = [];
      let found = false;

      // Match query with items in inventory
      for (let i = 0; i < inventory.length; i++) {
        for (let x = 0; x < inventory[i].tags.length; x++) {
          if (inventory[i].tags[x] === query) {
            item.push(inventory[i]);
            found = true;
          }
        }
      }
      // Compare highest level


      if (found === true) {

        let high = item[0];
        let index = 0;
        for (let y = 0; y < item.length; y++) {
          if (item[y].level > high.level) {
            high = item[y];
            index = y;
          }
        }

        let buffType = high.buffType;
        let buffAmt = high.buffAmt;
        console.log(high);
        // Check to see if already equipped
        if (high.equipped === true) {
          term.append(`<p class="gc">You look to see the ${high.name} [${high.level}] already out......</p>`);
        } else {
          high.equipped = true;

          save.localSave.buffs[buffType] += buffAmt;
          if (high.damage) {
            save.localSave.attributes.damage += high.damage;
          }
          if (high.defence) {
            save.localSave.attributes.defence += high.defence;
          }
          term.append(`<p class="gc">You have equipped the ${high.name} [${high.level}]</p>`);
        }

        //If none are found
      } else {
        term.append(`<p class="gc">You look for the ${query}, but to no avail, you don't have one.</p>`);
      }

    } else if (input.slice(0, 8) === 'unequip ') {
      let query = input.slice(8);
      let inventory = save.localSave.inventory;
      let item = [];
      let found = false;
      let unequip = false;

      // Match query with items in inventory
      for (let i = 0; i < inventory.length; i++) {
        for (let x = 0; x < inventory[i].tags.length; x++) {
          if (inventory[i].tags[x] === query) {
            found = true;
            if (inventory[i].equipped === true) {
              item = inventory[i];
              unequip = true;
            }
          }

          if (found === true && unequip === true) {
            item.equipped = false;
            save.localSave.buffs[item.buffType] -= item.buffAmt;
            if (item.damage) {
              save.localSave.attributes.damage -= item.damage;
            }
            if (item.defence) {
              save.localSave.attributes.defence -= item.defence;
            }
            console.log(item);
            term.append(`<p class="gc">You put away the ${item.name} [${item.level}], feeling lighter, but a bit more exposed.</p>`);
            return;
          }
        }
      }

      if (found === true) {
        console.log('item unequipped');
      } else {
        term.append(`<p class="gc">You try to put away the ${query}, but realize you never had one to begin with.</p>`);
      }
      if (found === true && unequip === false) {
        term.append(`<p class="gc">You try to put away the ${query}, but quickly come to find that it is already in your bag.</p>`);

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



