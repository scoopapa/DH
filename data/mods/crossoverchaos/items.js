'use strict';

exports.BattleItems = {
    "shulkiumz": {
        id: "shulkiumz",
        name: "Shulkium Z",
        onTakeItem: false,
        zMove: "Monado Buster",
        zMoveFrom: "Sacred Sword",
        zMoveUser: ["Shulk"],
        desc: "If held by Shulk with Sacred Sword, he can use Monado Buster.",
    },
	 "christmasspirit": { 
		  id: "christmasspirit",
		  name: "Christmas Spirit",
		  spritenum: "184",
		  megaStone: "Smolitzer-Mega",
		  megaEvolves: "Smolitzer",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by the Smolitzer, this item allows it to Mega Evolve in battle."
	 },
    "siivagunniumz": {
        id: "siivagunniumz",
        name: "SiIvaGunniumZ",
        onTakeItem: false,
        zMove: "Stone Halation",
        zMoveFrom: "Snow Halation",
        zMoveUser: ["SiIvaGunner"],
        desc: "If held by SiIvaGunner with Snow Halation, he can use Stone Halation.",
    },
	 "chaosemeralds": { 
		  id: "chaosemeralds",
		  name: "Chaos Emeralds",
		  megaStone: "Sonic-Super",
		  megaEvolves: "Sonic",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Sonic, this item allows him to become Super Sonic in battle."
	 },
    "zeromiumz": {
        id: "zeromiumz",
        name: "Zeromium Z",
        onTakeItem: false,
        zMove: "Big Bang",
        zMoveFrom: "Thunder",
        zMoveUser: ["True Zeromus"],
        desc: "If held by True Zeromus with Thunder, he can use Big Bang.",
    },
    "galeemiumz": {
        id: "galeemiumz",
        name: "Galeemium Z",
        onTakeItem: false,
        zMove: "Spear of Light",
        zMoveFrom: "Angelic Flare",
        zMoveUser: ["Galeem"],
        desc: "If held by Galeem with Angelic Flare, it can use Spear of Light.",
    },
    "dharkoniumz": {
        id: "dharkoniumz",
        name: "Dharkonium Z",
        onTakeItem: false,
        zMove: "Hammer of Darkness",
        zMoveFrom: "Demonic Rend",
        zMoveUser: ["Dharkon"],
        desc: "If held by Dharkon with Demonic Rend, it can use Hammer of Darkness.",
    },
    "puyoniumz": {
        id: "puyoniumz",
        name: "Puyonium Z",
        onTakeItem: false,
        zMove: "Permutation",
        zMoveFrom: "Thunder",
        zMoveUser: ["Ringo Ando"],
        desc: "If held by Ringo Ando with Thunder, she can use Permutation.",
    },
    "makiniumz": {
        id: "makiniumz",
        name: "Makinium Z",
        onTakeItem: false,
        zMove: "Strike-9 Shot",
        zMoveFrom: "Assassinate",
        zMoveUser: ["Maki Harukawa"],
        desc: "If held by Maki Harukawa with Assassinate, she can use Strike-9 Shot.",
    },
	"falchion": {
		id: "falchion",
		name: "Falchion",
		onTakeItem(item, source) {
			return !(source.baseTemplate.baseSpecies === 'Lucina');
		},
		onSourceEffectiveness(typeMod, target, type, move) {
			if (type === 'Dragon' && move.type === 'Fighting') return 1;
		},
		desc: "If held by Lucina, her Fighting-type moves turn super effective against the Dragon type.",
	},
	"darkcrown": {
		id: "darkcrown",
		name: "Dark Crown",
		onTakeItem(item, source) {
			return !(source.baseTemplate.baseSpecies === 'King Boo');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.baseTemplate.baseSpecies !== 'King Boo') return;
			if (['dazzlinggleam', 'flashcannon', 'lightofruin', 'seedflare', 'aurorabeam', 'lusterpurge', 'mirrorshot', 'prismaticlaser', 'photongeyser', 'lightthatburnsthesky', 'sunsteelstrike', 'moongeistbeam', 'searingsunrazesmash', 'menacingmoonrazemaelstrom', 'doomdesire', 'flashlightpulse', 'technoblast', 'powergem', 'signalbeam'].includes(move.id)) return this.chainModify(0.5);
		},
		desc: "If holder is King Boo, he takes halved damage from light-based moves.",
	},
    "grandoriumz": {
        id: "grandoriumz",
        name: "Grandorium Z",
        onTakeItem: false,
        zMove: "Ortygia Amore Mio",
        zMoveFrom: "Bowman of Three Stars",
        zMoveUser: ["Orion-Grand"],
        desc: "If held by Grand Archer Super Orion with Bowman of Three Stars, he can use Ortygia Amore Mio.",
    },
    "artemiumz": {
        id: "artemiumz",
        name: "Artemium Z",
        onTakeItem: false,
        zMove: "Tri-Star Amore Mio",
        zMoveFrom: "Moonblast",
        zMoveUser: ["Orion-Artemis"],
        desc: "If held by Orion & Artemis with Moonblast, they can use Tri-Star Amore Mio.",
    },
    "iskandiumz": {
        id: "iskandiumz",
        name: "Iskandium Z",
        onTakeItem: false,
        zMove: "Ionioi Hetaroi",
        zMoveFrom: "Via Expugnatio",
        zMoveUser: ["Iskandar"],
        desc: "If held by Iskandar with Via Expugnatio, he can use Ionioi Hetaroi.",
    },
};
