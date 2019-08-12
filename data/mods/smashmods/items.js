'use strict';

/**@type {{[k: string]: ModdedItemData}} */
let BattleItems = {
	"scarixite": {
		id: "scarixite",
		name: "Scarixite",
		spritenum: 575,
		megaStone: "Scarix-Mega",
		megaEvolves: "Scarix",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by an Scarix, this item allows it to Mega Evolve in battle.",
	},
	"scarixite": {
		id: "scarixite",
		name: "Scarixite",
		spritenum: 575,
		megaStone: "Scarix-Mega",
		megaEvolves: "Scarix",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by an Scarix, this item allows it to Mega Evolve in battle.",
	},
	"abomasitex": {
		id: "abomasitex",
		name: "Abomasite X",
		spritenum: 575,
		megaStone: "Abomasnow-Mega-X",
		megaEvolves: "Abomasnow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by an Abomasnow, this item allows it to Mega Evolve in battle.",
	},
	"abomasitey": {
		id: "abomasitey",
		name: "Abomasite Y",
		spritenum: 575,
		megaStone: "Abomasnow-Mega-Y",
		megaEvolves: "Abomasnow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by an Abomasnow, this item allows it to Mega Evolve in battle.",
	},
	"graduationscale": {
		id: "graduationscale",
		name: "Graduation Scale",
		fling: {
			basePower: 20,
		},
		onBasePowerPriority: 6,
		onBasePower: function(basePower, user, target, move) {
			if (move && (user.baseTemplate.num === 746) && (move.type === 'Water')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		gen: 7,
		desc: "If holder is a Wishiwashi, it becomes School Form. It's ability becomes Intimidate. Water moves are boosted by 1.2x",
	},
	"alogengarite": {
		id: "alogengarite",
		name: "Alogengarite",
		spritenum: 575,
		megaStone: "Gengar-Alola-Mega",
		megaEvolves: "Gengar-Alola",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Gengar-Alola, this item allows it to Mega Evolve in battle.",
	},
	"banettitex": {
		id: "banettitex",
		name: "Banettite X",
		spritenum: 575,
		megaStone: "Banette-Mega-X",
		megaEvolves: "Banette",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by an Banette, this item allows it to Mega Evolve in battle.",
	},
	"banettitey": {
		id: "banettitey",
		name: "Banettite Y",
		spritenum: 575,
		megaStone: "Banette-Mega-Y",
		megaEvolves: "Banette",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by an Banette, this item allows it to Mega Evolve in battle.",
	},
};

exports.BattleItems = BattleItems;
