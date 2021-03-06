'use strict';
/*global canvas config */

const avatar = (function () {

  // Meta
  let mainPlayer = new Character();
  let tileW = config.values.tileW, tileH = config.values.tileH;
  let mapW = config.values.mapW, mapH = config.values.mapH;





  // Creating character class
  function Character() {
    // Current tile position
    this.tileFrom = [1, 1];
    // Destination tile
    this.tileTo = [1, 1];
    // Time at which movement began to destination
    this.timeMoved = 0;
    // Dimmensions of characters
    this.dimensions = [config.player.playerMainW, config.player.playerMainH];
    // Position relative to top left corner of map
    this.position = [30, 30];
    // How long it will take for character to move
    this.delayMove = 200;

    //Sprite Direction
    this.direction = config.directions.up;

    this.sprites = {};
    this.sprites[config.directions.up] = [{ x: 0, y: 120, w: 30, h: 30 }];
    this.sprites[config.directions.right] = [{ x: 0, y: 150, w: 30, h: 30 }];
    this.sprites[config.directions.down] = [{ x: 0, y: 180, w: 30, h: 30 }];
    this.sprites[config.directions.left] = [{ x: 0, y: 210, w: 30, h: 30 }];
  }
  // Shorthand methods to see if the character can move up, down, left, and right.

  Character.prototype.canMoveUp = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1); };
  Character.prototype.canMoveDown = function () { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1); };
  Character.prototype.canMoveLeft = function () { return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]); };
  Character.prototype.canMoveRight = function () { return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]); };

  Character.prototype.moveLeft = function (t) { this.tileTo[0] -= 1; this.timeMoved = t; this.direction = config.directions.left; };
  Character.prototype.moveRight = function (t) { this.tileTo[0] += 1; this.timeMoved = t; this.direction = config.directions.right; };
  Character.prototype.moveUp = function (t) { this.tileTo[1] -= 1; this.timeMoved = t; this.direction = config.directions.up; };
  Character.prototype.moveDown = function (t) { this.tileTo[1] += 1; this.timeMoved = t; this.direction = config.directions.down; };
  // Character can and can not move list
  Character.prototype.canMoveTo = function (x, y) {
    if (x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
    if (config.tileTypes[config.maps.test[canvas.toIndex(x, y)]].floor !== config.floorTypes.path) { return false; }
    return true;

  };

  // Immediately place character at destination tile
  Character.prototype.placeAt = function (x, y) {
    this.tileFrom = [x, y];
    this.tileTo = [x, y];
    this.position = [((tileW * x) +
      ((tileW - this.dimensions[0]) / 2)),
      ((tileH * y) + ((tileH - this.dimensions[1]) / 2))];
  };
  // Handles movement
  Character.prototype.processMovement = function (t) {
    if (this.tileFrom[0] === this.tileTo[0] && this.tileFrom[1] === this.tileTo[1]) { return false; }

    if ((t - this.timeMoved) >= this.delayMove) {
      this.placeAt(this.tileTo[0], this.tileTo[1]);
    }
    else {
      this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0]) / 2);
      this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1]) / 2);

      if (this.tileTo[0] !== this.tileFrom[0]) {
        let diff = (tileW / this.delayMove) * (t - this.timeMoved);
        this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
      }
      if (this.tileTo[1] !== this.tileFrom[1]) {
        let diff = (tileH / this.delayMove) * (t - this.timeMoved);
        this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
      }

      this.position[0] = Math.round(this.position[0]);
      this.position[1] = Math.round(this.position[1]);
    }

    return true;
  };

  return {
    mainPlayer

  };
})();



