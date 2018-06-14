'use strict';
/*global $ config */

const events = (function () {

  // Water

  const water = {
    north: function () {
      $('.north').remove();
      $('.north-hud').append('<p class="north">Watch out! Water to the north!</p>');
    },

    south: function () {
      $('.south').remove();
      $('.south-hud').append('<p class="south">Watch out! Water to the south!</p>');
    },

    east: function () {
      $('.east').remove();
      $('.east-hud').append('<p class="east">Watch out! Water to the east!</p>');
    },

    west: function () {
      $('.west').remove();
      $('.west-hud').append('<p class="west">Watch out! Water to the west!</p>');
    }

  };


  // Npc Demo

  const npcDemo = {
    north: function () {
      $('.north').remove();
      $('.north-hud').append('<p class="north">Hello there children!</p>');
    },

    south: function () {
      $('.south').remove();
      $('.south-hud').append('<p class="south">Hello there children!</p>');
    },

    east: function () {
      $('.east').remove();
      $('.east-hud').append('<p class="east">Hello there children!</p>');
    },

    west: function () {
      $('.west').remove();
      $('.west-hud').append('<p class="west">Hello there children!</p>');
    }
  };




  return {
    water,
    npcDemo

  };
})();



