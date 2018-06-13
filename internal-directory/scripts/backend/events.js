'use strict';
/*global $ config */

const events = (function () {
  function ifWaterNorth() {
    $('.north').remove();
    $('.north-hud').append('<p class="north">Watch out! Water to the north!</p>');
  }

  function ifWaterSouth() {
    $('.south').remove();
    $('.south-hud').append('<p class="south">Watch out! Water to the south!</p>');
  }

  function ifWaterEast() {
    $('.east').remove();
    $('.east-hud').append('<p class="east">Watch out! Water to the east!</p>');
  }

  function ifWaterWest() {
    $('.west').remove();
    $('.west-hud').append('<p class="west">Watch out! Water to the west!</p>');
  }




  return {
    ifWaterNorth,
    ifWaterSouth,
    ifWaterEast,
    ifWaterWest
  };
})();



