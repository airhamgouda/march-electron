'use strict';
/*global config save $ village events trainer canvas renderMap*/
var sound = document.getElementById('sound');
sound.volume = 0;

// Check for death

if (save.localSave.death) {

  if (save.localSave.death.companion === true) {

    $('.terminal').append(`<p class="gc">${save.localSave.death.name} is dead. That much you know for sure. As you wake up in an unfamilar area, you see the smoke off in the distance. Surely, your companions must be that way. You better check to see if there are any survivors.</p>`);
  } else {
    $('.terminal').append(`<p class="gc">${save.localSave.death.name} is dead. That much you know for sure. As you wake up in an unfamilar area, you see the smoke off in the distance. You better check to see if there are any survivors.</p>`);
  }

  delete save.localSave.death;
}

// Detect Overflow

var element = document.querySelector('.terminal');

$('.terminal').on('DOMNodeInserted DOMNodeRemoved', function () {

  element.scrollTop = element.scrollHeight;

});
// setInterval(function () {
//   console.log('check');
//   if ((element.offsetHeight < element.scrollHeight) || (element.offsetWidth < element.scrollWidth)) {
//     // your element have overflow
//     element.scrollTop = element.scrollHeight;
//     if (config.cooldown[1] === 0) {
//       setTimeout(function () {
//         // $('.gc').remove();
//       }, 10000);
//       config.cooldown[1] = 10;
//     }

//   }
//   else {
//     //your element don't have overflow
//   }
// }, 500);


let loadSheet =
  `
<table class="character-data" style="width:100%">
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Strength</th>
            <th>Constitution</th>
            <th>Dexterity</th>
            <th>Intelligence</th>
            <th>Wisdom</th>
            <th>Charisma</th>
            <th>Level</th>
            <th>HP</th>
          </tr>
          <tr>
            <td>${save.localSave.name.first}</td>
            <td>${save.localSave.name.last}</td>
            <td>${save.localSave.skills.strength} + ${save.localSave.buffs.strength}</td>
            <td>${save.localSave.skills.constitution} + ${save.localSave.buffs.constitution}</td>
            <td>${save.localSave.skills.dexterity} + ${save.localSave.buffs.dexterity}</td>
            <td>${save.localSave.skills.intelligence} + ${save.localSave.buffs.intelligence}</td>
            <td>${save.localSave.skills.wisdom} + ${save.localSave.buffs.wisdom}</td>
            <td>${save.localSave.skills.charisma} + ${save.localSave.buffs.charisma}</td>
             <td>${save.localSave.skills.level}</td>
             <td>${save.localSave.skills.hp}</td>

          </tr>
        </table>


`;



// Startup
$('.character-sheet').append(loadSheet);


// Update UI

function updateUI() {

  let loadSheet =
    `
<table class="character-data" style="width:100%">
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Strength</th>
            <th>Constitution</th>
            <th>Dexterity</th>
            <th>Intelligence</th>
            <th>Wisdom</th>
            <th>Charisma</th>
            <th>Level</th>
            <th>HP</th>
          </tr>
          <tr>
            <td>${save.localSave.name.first}</td>
            <td>${save.localSave.name.last}</td>
            <td>${save.localSave.skills.strength} + ${save.localSave.buffs.strength}</td>
            <td>${save.localSave.skills.constitution} + ${save.localSave.buffs.constitution}</td>
            <td>${save.localSave.skills.dexterity} + ${save.localSave.buffs.dexterity}</td>
            <td>${save.localSave.skills.intelligence} + ${save.localSave.buffs.intelligence}</td>
            <td>${save.localSave.skills.wisdom} + ${save.localSave.buffs.wisdom}</td>
            <td>${save.localSave.skills.charisma} + ${save.localSave.buffs.charisma}</td>
             <td>${save.localSave.skills.level}</td>
             <td>${save.localSave.skills.hp}</td>

          </tr>
        </table>

`;

  $('.character-data').remove();
  $('.character-sheet').append(loadSheet);
}

// Initiate trainer
let terminalCount = 0;

setInterval(function () {
  village.calculateVillagerCount();

  try {
    if (village.cap !== village.villagerCount) {
      village.generateVillagers();
    }
    trainer.processRate();
    trainer.trainStrength();
    trainer.trainConstitution();
    trainer.trainDexterity();
    trainer.trainIntelligence();
    trainer.trainWisdom();
    trainer.trainCharisma();
    trainer.processLevels();
    updateUI();
    save.saveGame(save.localSave, save.localVillageSave, save.localEnemySave);
    village.solveCap();
    // $('.terminal').append('<p class="trained">Trained</p>');
    // terminalCount++;
    // if (terminalCount > 7) {
    //   $('.trained').remove();
    //   terminalCount = 0;
    // }
  }
  catch (err) {
    console.log('Error caught: ' + err.messsage);
    //village.generateVillagers();
  }
}, 1000);

// Render map
canvas.startCanvas();
// Handled in canvas.js


// Cooldown handler


setInterval(function () {
  for (let i = 0; i < config.cooldown.length; i++) {
    if (config.cooldown[i] > 0)
      config.cooldown[i]--;
  }
}, 1000);




