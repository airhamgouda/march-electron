'use strict';
/*global characters save */
//Development
function newCharacterButton() {
  console.log('click');
  const first = document.getElementById('first-name').value;
  const last = document.getElementById('last-name').value;
  console.log(first, last);
  save.localSave = characters.createMainCharacter(first, last);
}