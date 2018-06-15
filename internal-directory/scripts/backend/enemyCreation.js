'use strict';
/*global save config characters */



const enemy = (function () {

  let enemy = save.localEnemySave;
  let enemyCount = 0;
  function spawn(num, type) {
    console.log(this.enemyCount);
    let newTotal = this.enemyCount + num;
    console.log(newTotal);
    // Create enemies
    // .goblin
    if (type === 'goblin') {
      for (let i = 0; i < newTotal; i++) {

        let id = i;
        if (enemy[id]) {
          console.log('Enemy already exists');

        } else {
          this.enemyCount++;
          enemy[id] = {
            id,
            type: 'goblin',

          };
        }
      }
    } else {
      console.log('Pleace specify enemy on list');
    }
    // 

    return enemy;
  }

  return {
    spawn,
    enemyCount
  };
})();



