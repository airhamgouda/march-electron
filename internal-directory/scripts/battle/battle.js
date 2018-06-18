'use strict';
/*global save $ death village canvas  enemy config characters */



const battle = (function () {
  // Meta
  let player = save.localSave;
  let villagers = save.localVillageSave.villagers;
  let enemies = save.localEnemySave.enemies;
  let term = $('.terminal');


  let playerDamage = 10 + (player.skills.strength + player.buffs.strength + player.attributes.damage);
  let playerDefence = 10 + (player.skills.constitution + player.buffs.constitution + player.attributes.defence);
  let playerDexterity = 10 + (player.skills.dexterity + player.buffs.dexterity + player.attributes.speed);




  // Holding for combatants
  let allyTeam = [];
  let enemyTeam = [];
  let attacker = 0;
  let defender = 0;

  // Dice roll
  function rollDice(cap) {
    return Math.floor(Math.random() * Math.floor(cap));
  }

  // Run to prepare holding 
  function startBattle(num, type) {
    // Calculate player battle stats
    save.localSave.battle = {
      damage: playerDamage,
      defence: playerDefence,
      dexterity: playerDexterity,
    };

    // Reset
    enemy.clearEnemies();
    $('.left').remove();
    $('.right').remove();
    this.allyTeam = [];
    this.enemyTeam = [];

    // Halt movement

    config.battle = true;
    // Friendly spawn

    this.allyTeam.push(player);
    for (let i = 0; i < villagers.length; i++) {
      if (villagers[i].party === true) {
        this.allyTeam.push(villagers[i]);
      }
    }

    // Enemy Spawn
    enemy.spawn(num, type);
    for (let e = 0; e < save.localEnemySave.enemies.length; e++) {

      this.enemyTeam.push(save.localEnemySave.enemies[e]);


    }



    console.log(this.enemyTeam);
    term.append(`
    <div class="battle-stats">
    <table class="left ally-team" style="width:50%;height:150px;">
          <tr>
            <th>Ally</th>
          </tr>
          <tr>
            <td>[${player.skills.hp}]${player.name.first} ${player.name.last}</td>
          </tr>
        </table>
        
        <table class="right enemy-team" style="width:50%;height:150px;">
          <tr>
            <th>Enemy</th>
          </tr>
          <tr>
            <td>[${this.enemyTeam[0].skills.hp}]${this.enemyTeam[0].name}</td>
          </tr>
        </table>
        </div>
        `);
    //battleSequence();
    // List allies
    for (let a = 1; a < this.allyTeam.length; a++) {
      $('.ally-team').append(`
          <tr>
            <td>[${this.allyTeam[a].skills.hp}]${this.allyTeam[a].name.first} ${this.allyTeam[a].name.last}</td>
          </tr>`
      );
    }
    // List enemies
    for (let p = 1; p < this.enemyTeam.length; p++) {
      $('.enemy-team').append(`
          <tr>
            <td>[${this.enemyTeam[p].skills.hp}]${this.enemyTeam[p].name}</td>
          </tr>`
      );
    }
  }

  function battleSequence() {

    // Remove
    $('.bc').remove();
    $('.bc').remove();
    $('.bc').remove();

    if (attacker === null || defender === null) {
      term.append('<p class="gc">Please select a combatant</p>');
      return;
    }
    // Set who attacks and their target 
    let allyAttacker = this.allyTeam[attacker];
    let enemyDefender = this.enemyTeam[defender];



    // Determine which enemy is attacking this turn
    let enemyAttacker = this.enemyTeam[rollDice(this.enemyTeam.length)];
    let allyDefender = this.allyTeam[rollDice(this.allyTeam.length)];
    // Calculate who strikes first
    let firstStrike;
    let enemyStrikeRoll = enemyAttacker.skills.dexterity * rollDice(20);
    let allyStrikeRoll = allyAttacker.battle.dexterity * rollDice(20);

    // If true, ally strikes first.
    if (allyStrikeRoll > enemyStrikeRoll) {
      firstStrike = true;
    }

    // How much damage to HP each attacker will do
    let allyAttack = (allyAttacker.battle.damage + rollDice(5)) - ((enemyDefender.skills.defence / 4) + rollDice(enemyDefender.skills.dexterity / 4));

    let enemyAttack = (enemyAttacker.skills.damage + rollDice(5)) - ((allyDefender.battle.defence / 4) + rollDice(allyDefender.skills.dexterity / 4));
    console.log(allyDefender);

    // TURN START
    if (firstStrike) {
      // Ally goes First
      if (rollDice(100 + allyAttacker.battle.dexterity) < enemyDefender.skills.dexterity) {
        // Attack Missed
        term.append(`<p class="bc">${allyAttacker.name.first} strikes at ${enemyDefender.name} but misses.</p>`);
      } else {
        // Attack Hit
        enemyDefender.skills.hp -= allyAttack;
        term.append(`<p class="bc">${allyAttacker.name.first} strikes ${enemyDefender.name} for ${allyAttack} damage.</p>`);
      }
      if (enemyDefender.skills.hp <= 0) {
        // Enemy Dead
        death.killEnemy(enemyDefender);

        term.append(`<p class="bc">${enemyDefender.name} is dead. </p>`);
      } else {

        // Enemy Attack
        allyDefender.skills.hp -= enemyAttack;
        term.append(`<p class="bc">${enemyAttacker.name} strikes ${allyDefender.name.first} for ${enemyAttack} damage.</p>`);

        if (allyDefender.skills.hp <= 0) {
          // Ally Dead
          death.killVillager(allyDefender.name.first, allyDefender.name.last);
          term.append(`<p class="bc">${allyDefender.name} is dead. </p>`);

        }
      }


    } else {
      // Ally goes First
      if (rollDice(100 + enemyAttacker.skills.dexterity) < allyDefender.battle.dexterity) {
        // Attack Missed
        term.append(`<p class="bc">${enemyAttacker.name} strikes at ${allyDefender.name.first} but misses.</p>`);
      } else {
        // Attack Hit
        allyDefender.skills.hp -= enemyAttack;
        term.append(`<p class="bc">${enemyAttacker.name} strikes ${allyDefender.name.first} for ${enemyAttack} damage.</p>`);
      }
      if (allyDefender.skills.hp <= 0) {
        // ally Dead
        death.killVillager(allyDefender.name.first, allyDefender.name.last);

        term.append(`<p class="bc">${allyDefender.name.first} is dead. </p>`);
      } else {

        // ally Attack
        enemyDefender.skills.hp -= allyAttack;
        term.append(`<p class="bc">${allyAttacker.name.first} strikes ${enemyDefender.name} for ${allyAttack} damage.</p>`);

        if (enemyDefender.skills.hp <= 0) {
          // enemy Dead
          death.killEnemy(enemyDefender);
          term.append(`<p class="bc">${enemyDefender.name} is dead. </p>`);

        }
      }

    }

    // End Sequence to reset all

    if (this.allyTeam.length === 0) {
      // enemies Win

      term.append('Enemies win');

      if (this.enemyTeam.length === 0) {
        // allies Win
        term.append('Allies win');
      }

    }

    save.saveGame(save.localSave, save.localVillageSave, save.localEnemySave);





    $('.left').remove();
    $('.right').remove();




    term.prepend(`
    <div class="battle-stats">
    <table class="left ally-team" style="width:50%;height:150px;">
          <tr>
            <th>Ally</th>
          </tr>
          
        </table>
        
        <table class="right enemy-team" style="width:50%;height:150px;">
          <tr>
            <th>Enemy</th>
          </tr>
          
        </table>
        </div>
       `);
    //battleSequence();
    // List allies
    for (let a = 0; a < this.allyTeam.length; a++) {
      $('.ally-team').append(`
          <tr>
            <td>[${this.allyTeam[a].skills.hp}]${this.allyTeam[a].name.first} ${this.allyTeam[a].name.last}</td>
          </tr>`
      );
    }
    // List enemies
    for (let p = 0; p < this.enemyTeam.length; p++) {
      $('.enemy-team').append(`
          <tr>
            <td>[${this.enemyTeam[p].skills.hp}]${this.enemyTeam[p].name}</td>
          </tr>`
      );
    }





  }

  return {
    startBattle,
    battleSequence,
    allyTeam,
    enemyTeam,
    rollDice
  };



})();



