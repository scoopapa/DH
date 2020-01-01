use strict';

/**@type {{[k: string]: ModdedTemplateData}} */
let BattlePokedex = {
butterfree: {
	inherit: true,
	baseStats: {hp: 80, atk: 35, def: 70, spa: 95, spd: 80, spe: 85},
},
vileplume: {
	inherit: true,
	abilities: {0: "Chlorophyll", 1: "Grassy Surge", H: "Effect Spore"},
},
bellossom: {
	inherit: true,
	abilities: {0: "Chlorophyll", 1: "Grassy Surge", H: "Healer"},
	baseStats: {hp: 75, atk: 70, def: 95, spa: 90, spd: 110, spe: 50},
},
galvantula: {
	inherit: true,
	baseStats: {hp: 70, atk: 77, def: 60, spa: 107, spd: 60, spe: 108},
},
seaking: {
	inherit: true,
	baseStats: {hp: 80, atk: 102, def: 65, spa: 65, spd: 80, spe: 108},
},
perrserker: {
	inherit: true,
	baseStats: {hp: 70, atk: 110, def: 100, spa: 50, spd: 60, spe: 100},
},
pikachu: {
	inherit: true,
	baseStats: {hp: 25, atk: 65, def: 40, spa: 45, spd: 50, spe: 135},
},
flapple: {
	inherit: true,
	baseStats: {hp: 80, atk: 110, def: 85, spa: 95, spd: 65, spe: 70},
},
drapion: {
	inherit: true,
	abilities: {0: "Tough Claws", 1: "Sniper", H: "Keen Eye"},
},
qwilfish: {
	inherit: true,
	baseStats: {hp: 85, atk: 95, def: 85, spa: 55, spd: 65, spe: 95},
},
pincurchin: {
	inherit: true,
	baseStats: {hp: 83, atk: 91, def: 95, spa: 91, spd: 85, spe: 40},
},
rotom: {
	inherit: true,
	abilities: {0: "Levitate", 1: "Motor Drive", H: "Reckless"},
	baseStats: hp: 50, atk: 50, def: 85, spa: 101, spd: 85, spe: 121},
},
};

exports.BattlePokedex = BattlePokedex;
