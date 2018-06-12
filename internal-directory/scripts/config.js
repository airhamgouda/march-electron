'use strict';
/*global save*/
// Control Center
// Adjust settings here!

// This is a happy place, full of nice clean code. Don't mess it up.

const config = (function () {

  // Swithces 
  // 0 = Off
  // 1 = On

  const Switch = {
    fpsCounter: 1,
    mapSwitch: 1,
  };


  // Character Generation Settings
  const mainCharacterLevelBase = 25;
  const mainCharacterLevelCap = 35;

  // Canvas
  // .player
  const player = {
    playerMainW: 25,
    playerMainH: 10,
  };
  // .colors
  const colors = {
    playerMain: '#f44242',
    dirt: '#685b48',
    grass: '#5aa457'

  };
  // .values
  const values = {
    tileW: 30,
    tileH: 15,
    mapW: 20,
    mapH: 20,


  };
  // .maps
  const maps = {
    test: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
      0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
      0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0,
      0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0,
      0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0,
      0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
      0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
      0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0,
      0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
  };


  // HTML Templates
  const characterInfoWithLabels =
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


  const characterInfo =
    `
        <table class="character-data-plus" style="width:100%">
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
  return {
    mainCharacterLevelBase,
    mainCharacterLevelCap,
    characterInfoWithLabels,
    characterInfo,
    maps,
    values,
    Switch,
    colors,
    player
  };
})();

config;


