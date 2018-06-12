'use strict';
/*global save $ */
const trainer = (function () {
  // Rates

  function processRate() {
    strengthRate = (save.localSave.skills.strength / 100) + (save.localSave.skills.intelligence / 100);
    constitutionRate = (save.localSave.skills.constitution / 100) + (save.localSave.skills.intelligence / 100);
    dexterityRate = (save.localSave.skills.dexterity / 100) + (save.localSave.skills.intelligence / 100);
    intelligenceRate = (save.localSave.skills.intelligence / 150) + (save.localSave.skills.intelligence / 100);
    wisdomRate = (save.localSave.skills.wisdom / 100) + (save.localSave.skills.intelligence / 100);
    charismaRate = (save.localSave.skills.charisma / 100) + (save.localSave.skills.intelligence / 100);
  }

  let strengthRate = 0;
  let constitutionRate = 0;
  let dexterityRate = 0;
  let intelligenceRate = 0;
  let wisdomRate = 0;
  let charismaRate = 0;


  // Training
  function trainStrength() {
    save.localSave.experience.strengthXp = save.localSave.experience.strengthXp + strengthRate;
  }

  function trainConstitution() {
    save.localSave.experience.constitutionXp = save.localSave.experience.constitutionXp + constitutionRate;
  }

  function trainDexterity() {
    save.localSave.experience.dexterityXp = save.localSave.experience.dexterityXp + dexterityRate;
  }

  function trainIntelligence() {
    save.localSave.experience.intelligenceXp = save.localSave.experience.intelligenceXp + intelligenceRate;
  }

  function trainWisdom() {
    save.localSave.experience.wisdomXp = save.localSave.experience.wisdomXp + wisdomRate;
  }

  function trainCharisma() {
    save.localSave.experience.charismaXp = save.localSave.experience.charismaXp + charismaRate;
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
      save.localSave.experience.strengthXp = save.localSave.experience.strengthXp - strengthCap;
    }

    if (save.localSave.experience.constitutionXp >= constitutionCap) {
      save.localSave.skills.constitution++;
      save.localSave.experience.constitutionXp = save.localSave.experience.constitutionXp - constitutionCap;
    }

    if (save.localSave.experience.dexterityXp >= dexterityCap) {
      save.localSave.skills.dexterity++;
      save.localSave.experience.dexterityXp = save.localSave.experience.dexterityXp - dexterityCap;
    }

    if (save.localSave.experience.intelligenceXp >= intelligenceCap) {
      save.localSave.skills.intelligence++;
      save.localSave.experience.intelligenceXp = save.localSave.experience.intelligenceXp - intelligenceCap;
    }

    if (save.localSave.experience.wisdomXp >= wisdomCap) {
      save.localSave.skills.wisdom++;
      save.localSave.experience.wisdomXp = save.localSave.experience.wisdomXp - wisdomCap;
    }

    if (save.localSave.experience.charismaXp >= charismaCap) {
      save.localSave.skills.charisma++;
      save.localSave.experience.charismaXp = save.localSave.experience.charismaXp - charismaCap;
    }

    save.localSave.skills.level = Math.floor(total / Math.PI);
  }


  return {
    processRate,
    trainStrength,
    trainConstitution,
    trainDexterity,
    trainIntelligence,
    trainWisdom,
    trainCharisma,
    processLevels
  };
})();


