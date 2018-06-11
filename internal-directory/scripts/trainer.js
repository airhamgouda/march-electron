'use strict';
/*global save $ */
const trainer = (function () {
  let rate = .03;


  // Training
  function trainStrength() {
    save.localSave.experience.strengthXp = save.localSave.experience.strengthXp + rate;
  }

  function trainConstitution() {
    save.localSave.experience.constitutionXp = save.localSave.experience.constitutionXp + rate;
  }

  function trainDexterity() {
    save.localSave.experience.dexterityXp = save.localSave.experience.dexterityXp + rate;
  }

  function trainIntelligence() {
    save.localSave.experience.intelligenceXp = save.localSave.experience.intelligenceXp + rate;
  }

  function trainWisdom() {
    save.localSave.experience.wisdomXp = save.localSave.experience.wisdomXp + rate;
  }

  function trainCharisma() {
    save.localSave.experience.charismaXp = save.localSave.experience.charismaXp + rate;
  }

  // Level Processing
  function processLevels() {
    let strengthCap = save.localSave.skills.strength * 100;
    let constitutionCap = save.localSave.skills.constitution * 100;
    let dexterityCap = save.localSave.skills.dexterity * 100;
    let intelligenceCap = save.localSave.skills.intelligence * 100;
    let wisdomCap = save.localSave.skills.wisdom * 100;
    let charismaCap = save.localSave.skills.charisma * 100;
    let total = save.localSave.skills.strength + save.localSave.skills.constitution + save.localSave.skills.dexterity + save.localSave.skills.intelligence + save.localSave.skills.wisdom + save.localSave.skills.charisma;

    if (save.localSave.experience.strengthXp >= strengthCap) {
      save.localSave.skills.strength++;
      save.localSave.experience.strengthXp = 0;
    }

    if (save.localSave.experience.constitutionXp >= constitutionCap) {
      save.localSave.skills.constitution++;
      save.localSave.experience.constitutionXp = 0;
    }

    if (save.localSave.experience.dexterityXp >= dexterityCap) {
      save.localSave.skills.dexterity++;
      save.localSave.experience.dexterityXp = 0;
    }

    if (save.localSave.experience.intelligenceXp >= intelligenceCap) {
      save.localSave.skills.intelligence++;
      save.localSave.experience.intelligenceXp = 0;
    }

    if (save.localSave.experience.wisdomXp >= wisdomCap) {
      save.localSave.skills.wisdom++;
      save.localSave.experience.wisdomXp = 0;
    }

    if (save.localSave.experience.charismaXp >= charismaCap) {
      save.localSave.skills.charisma++;
      save.localSave.experience.charismaXp = 0;
    }

    save.localSave.skills.level = Math.floor(total / Math.PI);
  }


  return {
    rate,
    trainStrength,
    trainConstitution,
    trainDexterity,
    trainIntelligence,
    trainWisdom,
    trainCharisma,
    processLevels
  };
})();


