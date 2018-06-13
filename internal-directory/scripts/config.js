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
  // Designate tiles as interactive

  const interactive = [
    4
  ];

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
  // .directions
  const directions = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
  };
  // .values
  const values = {
    tileW: 30,
    tileH: 15,
    mapW: 20,
    mapH: 20,
    tileset: './assets/tileset.png'


  };

  // .floorTypes

  const floorTypes = {
    solid: 0,
    path: 1,
    water: 2
  };

  const tileTypes = {
    0: { colour: '#685b48', floor: floorTypes.solid, sprite: [{ x: 0, y: 0, w: 30, h: 15 }] },
    1: { colour: '#5aa457', floor: floorTypes.path, sprite: [{ x: 40, y: 0, w: 30, h: 15 }] },
    2: { colour: '#e8bd7a', floor: floorTypes.path, sprite: [{ x: 80, y: 0, w: 30, h: 15 }] },
    3: { colour: '#286625', floor: floorTypes.solid, sprite: [{ x: 120, y: 0, w: 30, h: 15 }] },
    4: { colour: '#678fd9', floor: floorTypes.water, sprite: [{ x: 160, y: 0, w: 30, h: 15 }] }
  };

  // .maps
  const maps = {
    test: [
      0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 2, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0,
      0, 2, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0,
      0, 2, 3, 1, 4, 4, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 0,
      0, 2, 3, 1, 1, 4, 4, 1, 2, 3, 3, 2, 1, 1, 2, 1, 0, 0, 0, 0,
      0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 1, 0,
      0, 1, 1, 1, 1, 2, 3, 2, 1, 1, 4, 1, 1, 1, 1, 3, 3, 2, 1, 0,
      0, 1, 2, 2, 2, 2, 1, 2, 1, 1, 4, 1, 1, 1, 1, 1, 3, 2, 1, 0,
      0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4,
      0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0,
      0, 1, 2, 3, 4, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0,
      0, 3, 2, 3, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 1, 0,
      0, 3, 2, 3, 4, 4, 3, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
      0, 3, 2, 3, 4, 1, 3, 2, 1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
      0, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 3, 0,
      0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 4, 0,
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
    player,
    floorTypes,
    tileTypes,
    directions,
    interactive
  };
})();

config;


