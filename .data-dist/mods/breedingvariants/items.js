"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Items = {
  "banettiteb": {
    id: "banettiteb",
    name: "Banettite B",
    megaStone: "Banette-Mega-Blademaster",
    megaEvolves: "Banette",
    onTakeItem: function (item, source) {
      if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
      return true;
    },
    desc: "If held by a Banettite-Blademaster, this item allows it to Mega Evolve in battle.",
  },
}; exports.Items = Items;