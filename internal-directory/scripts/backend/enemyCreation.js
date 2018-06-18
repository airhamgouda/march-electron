'use strict';
/*global save config characters */



const enemy = (function () {
  let player = save.localSave;
  let enemy = save.localEnemySave;
  let enemyCount = 0;


  function enemySkills() {
    let damage = 10 + Math.floor(Math.random() * ((player.skills.level / 2) + 2) + (player.skills.level / 2) - 5);
    let defence = 10 + Math.floor(Math.random() * ((player.skills.level / 2) + 2) + (player.skills.level / 2) - 5);
    let dexterity = 10 + Math.floor(Math.random() * ((player.skills.level / 2) + 2) + (player.skills.level / 2) - 5);
    let level = Math.floor((damage + defence + dexterity) / 3);
    let hp = 20 + Math.floor((((((damage - 10) + (defence - 10)) / 2) / 2) + (level / 3)) * 5);


    return {
      ID: config.ID(),
      damage: damage,
      defence: defence,
      dexterity: dexterity,
      level: level,
      hp: hp,
    };
  }

  function enemyLeaderSkills() {
    let damage = 10 + Math.floor(Math.random() * ((player.skills.level / 2) + 5) + (player.skills.level / 2) - 5);
    let defence = 10 + Math.floor(Math.random() * ((player.skills.level / 2) + 5) + (player.skills.level / 2) - 5);
    let dexterity = 10 + Math.floor(Math.random() * ((player.skills.level / 2) + 5) + (player.skills.level / 2) - 5);
    let wisdom = 10 + Math.floor(Math.random() * ((player.skills.level / 2) + 5) + (player.skills.level / 2) - 5);
    let level = Math.floor(((damage + defence + dexterity + wisdom) / 4) + 3);
    let hp = 30 + Math.floor((((((damage - 10) + (defence - 10)) / 2) / 2) + (level / 3)) * 5);


    return {
      ID: config.ID(),
      damage: damage,
      defence: defence,
      dexterity: dexterity,
      wisdom: wisdom,
      level: level,
      hp: hp,
    };
  }

  function spawn(num, type) {
    console.log(this.enemyCount);
    let newTotal = this.enemyCount + num;
    console.log(newTotal);
    // Create enemies
    // .goblin
    if (type === 'goblin') {
      save.localEnemySave.enemies.push({
        name: 'Goblin Leader',
        type: 'goblin-leader',
        leader: 'true',
        skills: enemyLeaderSkills()
      });

      for (let i = 0; i < newTotal; i++) {

        let id = i;
        if (enemy.enemies[id]) {
          console.log('Enemy already exists');

        } else {
          save.localEnemySave.enemies.push({
            name: 'Goblin Warrior',
            type: 'goblin',
            leader: false,
            skills: enemySkills(),
          });

          enemyCount = enemy.enemies.length;
        }
      }

    } else {
      console.log('Pleace specify enemy on list');
    }
    //

    return enemy;
  }

  function clearEnemies() {

    save.localEnemySave.enemies = [];
  }

  return {
    spawn,
    enemyCount,
    clearEnemies
  };
})();



