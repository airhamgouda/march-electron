'use strict';
/*global save $ trainer*/

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
  </tr>
  <tr>
    <td>${save.localSave.name.first}</td>
    <td>${save.localSave.name.last}</td>
    <td>${save.localSave.skills.strength}</td>
    <td>${save.localSave.skills.constitution}</td>
    <td>${save.localSave.skills.dexterity}</td>
    <td>${save.localSave.skills.intelligence}</td>
    <td>${save.localSave.skills.wisdom}</td>
    <td>${save.localSave.skills.charisma}</td>
    <td>${save.localSave.skills.level}</td>
  </tr>
</table>


`;

// Startup
$('.character-sheet').append(loadSheet);


// Initiate trainer
let terminalCount = 0;

setInterval(function () {
  trainer.processRate();
  trainer.trainStrength();
  trainer.trainConstitution();
  trainer.trainDexterity();
  trainer.trainIntelligence();
  trainer.trainWisdom();
  trainer.trainCharisma();
  trainer.processLevels();
  $('.terminal').append('<p class="gc">Trained</p>');
  terminalCount++;
  if (terminalCount > 7) {
    $('.gc').remove();
    save.saveGame(save.localSave);
    terminalCount = 0;
  }
}, 1000);
