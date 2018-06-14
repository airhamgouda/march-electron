'use strict';
/*global $ save */

const events = (function () {

  // Water

  const water = {
    north: function () {
      $('.north').remove();
      $('.north-hud').append('<button class="north">Watch out! Water to the north!</button>');
    },

    south: function () {
      $('.south').remove();
      $('.south-hud').append('<button class="south">Watch out! Water to the south!</button>');
    },

    east: function () {
      $('.east').remove();
      $('.east-hud').append('<button class="east">Watch out! Water to the east!</button>');
    },

    west: function () {
      $('.west').remove();
      $('.west-hud').append('<button class="west">Watch out! Water to the west!</button>');
    }

  };


  // Npc Demo

  function test() {
    console.log('test');
  }
  const npcDemo = {


    north: function () {
      $('.north').remove();
      $('.north-hud').append(`<button id="0" class="north">${save.localVillageSave[0].name.first}</button>`);


    },

    south: function () {
      $('.south').remove();
      $('.south-hud').append(`<button class="south">${save.localVillageSave[0].name.first}</button>`);
    },

    east: function () {
      $('.east').remove();
      $('.east-hud').append(`<button class="east">${save.localVillageSave[0].name.first}</button>`);
    },

    west: function () {
      $('.west').remove();
      $('.west-hud').append(`<button class="west">${save.localVillageSave[0].name.first}</button>`);
    }
  };




  return {
    water,
    npcDemo,
    test

  };
})();



