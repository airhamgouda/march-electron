'use strict';
/*global save config */

const garbage = (function () {
  function collection() {
    save.localSave = null;
    save.localVillageSave = null;
  }

  return {
    collection
  };
})();



