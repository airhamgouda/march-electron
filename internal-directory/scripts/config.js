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
    4, 60
  ];

  // Character Generation Settings
  const mainCharacterLevelBase = 20;
  const mainCharacterLevelCap = 30;

  // Canvas
  // .player
  const player = {
    playerMainW: 25,
    playerMainH: 10,
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
    tileW: 30 * 2,
    tileH: 15 * 2,
    mapW: 20,
    mapH: 5,
    tileset: './assets/tileset.png'


  };

  // .floorTypes

  const floorTypes = {
    solid: 0,
    path: 1,
    water: 2,
  };

  const tileTypes = {
    // Floor Tiles
    0: { colour: '#685b48', floor: floorTypes.solid, sprite: [{ x: 0, y: 0, w: 40, h: 40 }] },
    1: { colour: '#5aa457', floor: floorTypes.path, sprite: [{ x: 40, y: 0, w: 40, h: 40 }] },
    2: { colour: '#e8bd7a', floor: floorTypes.path, sprite: [{ x: 80, y: 0, w: 40, h: 40 }] },
    3: { colour: '#286625', floor: floorTypes.solid, sprite: [{ x: 120, y: 0, w: 40, h: 40 }] },
    4: { colour: '#678fd9', floor: floorTypes.water, sprite: [{ x: 160, y: 0, w: 40, h: 40 }] },

    // People
    // .grass
    60: { colour: '#678fd9', floor: floorTypes.solid, sprite: [{ x: 40, y: 40, w: 40, h: 40 }] },

    // House Tiles
    // .bedroom
    80: { colour: '#f4426b', floor: floorTypes.path, sprite: [{ x: 200, y: 0, w: 40, h: 40 }] }
  };

  // .maps


  const maps = {

    test: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0,
      0, 2, 2, 2, 2, 2, 2, 1, 60, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0,
      0, 2, 4, 4, 4, 3, 2, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

    ],

    test2: [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 2, 2, 4, 2, 2, 2, 60, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0,
      0, 2, 2, 4, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0,
      0, 2, 4, 4, 4, 3, 2, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]

  };

  const load = maps.test;


  // HTML Templates
  const characterInfoWithLabels = function () {
    return `
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
  };


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
    load,
    player,
    floorTypes,
    tileTypes,
    directions,
    interactive
  };
})();

config;


