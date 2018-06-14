'use strict';
/*global $ avatar events config */

// HOW TO FIND INDEX
// index = ((y * mapW) + x)


const canvas = (function () {

  // Meta
  let ctx = null;
  let gameMap = config.load;

  // Waiting menu


  // Configs
  let tileW = config.values.tileW, tileH = config.values.tileH;
  let mapW = config.values.mapW, mapH = config.values.mapH;

  let tileset = null, tilesetURL = config.values.tileset, tilesetLoaded = false;
  // Framerate Tracking
  let currentSecond = 0, frameCount = 0, framesLastSecond = 0;
  let lastFrameTime = 0;

  // Key set to false
  let keysDown = {
    37: false,
    38: false,
    39: false,
    40: false
  };

  // Viewport
  var viewport = {
    screen: [0, 0],
    startTile: [0, 0],
    endTile: [0, 0],
    offset: [0, 0],
    update: function (px, py) {
      this.offset[0] = Math.floor((this.screen[0] / 2) - px);
      this.offset[1] = Math.floor((this.screen[1] / 2) - py);

      var tile = [Math.floor(px / tileW), Math.floor(py / tileH)];

      this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / tileW);
      this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / tileH);

      if (this.startTile[0] < 0) { this.startTile[0] = 0; }
      if (this.startTile[1] < 0) { this.startTile[1] = 0; }

      this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / tileW);
      this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1] / 2) / tileH);

      if (this.endTile[0] >= mapW) { this.endTile[0] = mapW - 1; }
      if (this.endTile[1] >= mapH) { this.endTile[1] = mapH - 1; }
    }
  };

  // Process indexing
  function toIndex(x, y) {
    return ((y * mapW) + x);
  }


  // Load on start
  function startCanvas() {
    let gameMap = config.load;
    ctx = document.getElementById('canvas').getContext('2d');
    requestAnimationFrame(drawGame);
    ctx.font = 'bold 10pt sans-serif';

    window.addEventListener('keydown', function (e) {
      if (e.keyCode >= 37 && e.keyCode <= 40) { keysDown[e.keyCode] = true; }
    });
    window.addEventListener('keyup', function (e) {
      if (e.keyCode >= 37 && e.keyCode <= 40) { keysDown[e.keyCode] = false; }
    });

    viewport.screen = [document.getElementById('canvas').width,
      document.getElementById('canvas').height];


    tileset = new Image();

    tileset.onerror = function () {
      ctx = null;
      alert('Failed loading tileset');
    };

    tileset.onload = function () { tilesetLoaded = true; };

    tileset.src = tilesetURL;
  }



  // Draw Game
  function drawGame() {
    if (ctx === null) {
      return;
    }
    if (!tilesetLoaded) { requestAnimationFrame(drawGame); return; }

    let currentFrameTime = Date.now();

    // Current second to track framerate
    let sec = Math.floor(Date.now() / 1000);
    if (sec !== currentSecond) {
      currentSecond = sec;
      framesLastSecond = frameCount;
      frameCount = 1;
    } else { frameCount++; }

    // Is avatar.mainPlayer processing movement?
    if (!avatar.mainPlayer.processMovement(currentFrameTime)) {
      if (keysDown[38] && avatar.mainPlayer.canMoveUp()) { avatar.mainPlayer.moveUp(currentFrameTime); }
      else if (keysDown[40] && avatar.mainPlayer.canMoveDown()) { avatar.mainPlayer.moveDown(currentFrameTime); }
      else if (keysDown[37] && avatar.mainPlayer.canMoveLeft()) { avatar.mainPlayer.moveLeft(currentFrameTime); }
      else if (keysDown[39] && avatar.mainPlayer.canMoveRight()) { avatar.mainPlayer.moveRight(currentFrameTime); }
    }



    // For loop to draw game map

    viewport.update(avatar.mainPlayer.position[0] + (avatar.mainPlayer.dimensions[0] / 2),
      avatar.mainPlayer.position[1] + (avatar.mainPlayer.dimensions[1] / 2));

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

    for (let y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y) {
      for (let x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x) {
        let tile = config.tileTypes[gameMap[toIndex(x, y)]];
        ctx.drawImage(tileset,
          tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
          viewport.offset[0] + (x * tileW), viewport.offset[1] + (y * tileH),
          tileW, tileH);
      }
    }
    // Draw main character
    let sprite = avatar.mainPlayer.sprites[avatar.mainPlayer.direction];

    ctx.drawImage(tileset,
      sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
      viewport.offset[0] + avatar.mainPlayer.position[0], viewport.offset[1] + avatar.mainPlayer.position[1],
      avatar.mainPlayer.dimensions[0], avatar.mainPlayer.dimensions[1]);

    // Drawing Framerate
    if (config.Switch.fpsCounter === 1) {
      ctx.fillStyle = '#ff0000';
      ctx.fillText('FPS: ' + framesLastSecond, 10, 20);
    }

    // Events
    for (let e = 0; e < config.interactive.length; e++) {
      let posX = avatar.mainPlayer.tileFrom[0];
      let posY = avatar.mainPlayer.tileFrom[1];
      let ind = (posY * mapW) + posX;
      let northTile = gameMap[ind - mapW];
      let southTile = gameMap[ind + mapW];
      let eastTile = gameMap[ind + 1];
      let westTile = gameMap[ind - 1];
      // console.log(northTile);

      // North
      if (northTile === 4) {
        events.water.north();
      } else if (northTile === 60) {
        events.npcDemo.north();
      } else {
        $('.north').remove();
        $('.north-hud').append('<button class="north">North</button>');
      }

      // South
      if (southTile === 4) {
        events.water.south();
      } else if (southTile === 60) {
        events.npcDemo.south();
      } else {
        $('.south').remove();
        $('.south-hud').append('<button class="south">South</button>');
      }

      // East
      if (eastTile === 4) {
        events.water.east();
      } else if (eastTile === 60) {
        events.npcDemo.east();
      } else {
        $('.east').remove();
        $('.east-hud').append('<button class="east">East</button>');
      }

      // West
      if (westTile === 4) {
        events.water.west();
      } else if (westTile === 60) {
        events.npcDemo.west();
      } else {
        $('.west').remove();
        $('.west-hud').append('<button class="west">West</button>');
      }

    }


    // Draw new frame to canvas
    lastFrameTime = currentFrameTime;
    requestAnimationFrame(drawGame);
  }

  // Quit Game



  return {
    toIndex,
    gameMap,
    startCanvas
  };
})();



