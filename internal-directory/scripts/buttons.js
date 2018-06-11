'use strict';
/*global characters trainer save $ */
//Development
function newCharacterButton() {
  const first = document.getElementById('first-name').value;
  const last = document.getElementById('last-name').value;
  save.localSave = characters.createMainCharacter(first, last);
  const newSheet =
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
  $('.character-data').remove();
  $('.character-sheet').append(newSheet);
}

function saveCharacterButton() {
  save.saveGame(save.localSave);
}

