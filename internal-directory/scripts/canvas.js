'use strict';


let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

let grass = new Image();
let water = new Image();
let dirt = new Image();

grass.src = './assets/grass1.png';
water.src = './assets/snow1.png';
dirt.src = './assets/rock1.png';



let xPos = 0;
let yPos = 0;

let map = [
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 0, 0, 0, 0]
];

for (let i = 0; i < map.length; i++) {
  for (let y = 0; y < map[i].length; y++) {
    if (map[i][y] === 0) {
      context.drawImage(grass, xPos, yPos);
    }
    if (map[i][y] === 1) {
      context.drawImage(dirt, xPos, yPos);
    }
    if (map[i][y] === 2) {
      context.drawImage(water, xPos, yPos);
    }
    // xPos += 50;
  }
  // yPos += 50;
}



