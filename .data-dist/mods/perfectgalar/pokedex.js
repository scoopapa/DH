"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Pokedex = {
	butterfree: {
		inherit: true,
		baseStats: {hp: 80, atk: 35, def: 70, spa: 95, spd: 80, spe: 85},
	},
	butterfreegmax: {
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
	flapplegmax: {
		inherit: true,
		baseStats: {hp: 80, atk: 110, def: 85, spa: 95, spd: 65, spe: 70},
	},
	appletun: {
		inherit: true,
		baseStats: {hp: 120, atk: 85, def: 85, spa: 100, spd: 85, spe: 30},
	},
	appletungmax: {
		inherit: true,
		baseStats: {hp: 120, atk: 85, def: 85, spa: 100, spd: 85, spe: 30},
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
		baseStats: {hp: 50, atk: 50, def: 85, spa: 101, spd: 85, spe: 121},
	},
	weezinggalar: {
		inherit: true,
		baseStats: {hp: 75, atk: 80, def: 120, spa: 105, spd: 70, spe: 50},
		abilities: {0: "Levitate", 1: "Neutralizing Gas", H: "Corrosion"},
	},
	melmetal: {
		inherit: true,
		baseStats: {hp: 125, atk: 123, def: 123, spa: 80, spd: 65, spe: 84},
	},
	melmetalgmax: {
		inherit: true,
		baseStats: {hp: 125, atk: 123, def: 123, spa: 80, spd: 65, spe: 84},
	},
	persian: {
		inherit: true,
		baseStats: {hp: 65, atk: 95, def: 65, spa: 65, spd: 65, spe: 135},
		abilities: {0: "Limber", 1: "Technician", H: "Scrappy"},
	},
	persianalola: {
		inherit: true,
		baseStats: {hp: 95, atk: 60, def: 60, spa: 85, spd: 70, spe: 125},
	},
	meowstic: {
		inherit: true,
		baseStats: {hp: 84, atk: 48, def: 91, spa: 83, spd: 91, spe: 104},
		abilities: {0: "Screen Cleaner", 1: "Infiltrator", H: "Prankster"},
	},
	meowsticf: {
		inherit: true,
		baseStats: {hp: 74, atk: 48, def: 76, spa: 98, spd: 81, spe: 124},
		abilities: {0: "Psychic Surge", 1: "Infiltrator", H: "Competitive"},
	},
	luxray: {
		inherit: true,
		baseStats: {hp: 80, atk: 126, def: 80, spa: 95, spd: 80, spe: 75},
	},
	bouffalant: {
		inherit: true,
		baseStats: {hp: 95, atk: 130, def: 95, spa: 40, spd: 95, spe: 65},
	},
	exploud: {
		inherit: true,
		baseStats: {hp: 109, atk: 91, def: 75, spa: 111, spd: 81, spe: 68},
	},
	regice: {
		inherit: true,
		abilities: {0: "Clear Body", H: "Heatproof"},
	},
	regieleki: {
		inherit: true,
		abilities: {0: "Clear Body", H: "Transistor"},
	},
	regidrago: {
		inherit: true,
		abilities: {0: "Clear Body", H: "Dragon's Maw"},
	},
	articunogalar: {
		inherit: true,
		abilities: {0: "Pressure", H: "Competitive"},
	},
	zapdosgalar: {
		inherit: true,
		abilities: {0: "Pressure", H: "Defiant"},
	},
	moltresgalar: {
		inherit: true,
		abilities: {0: "Pressure", H: "Berserk"},
	},
	crobat: {
		inherit: true,
		abilities: {0: "Competitive", 1: "Infiltrator", H: "Corrosion"},
		baseStats: {hp: 85, atk: 70, def: 80, spa: 90, spd: 80, spe: 130},
	},
	urshifurapidstrike: {
		inherit: true,
		baseStats: {hp: 100, atk: 115, def: 80, spa: 63, spd: 80, spe: 112},
	},
	regigigas: {
		inherit: true,
		baseStats: {hp: 110, atk: 160, def: 100, spa: 100, spd: 100, spe: 100},
	},
	rapidashgalar: {
		inherit: true,
		baseStats: {hp: 65, atk: 120, def: 60, spa: 70, spd: 100, spe: 110},
	},
	rapidash: {
		inherit: true,
		baseStats: {hp: 65, atk: 120, def: 60, spa: 70, spd: 100, spe: 110},
	},
	raichu: {
		inherit: true,
		baseStats: {hp: 80, atk: 90, def: 65, spa: 90, spd: 80, spe: 110},
		abilities: {0: "Static", 1: "Competitve", H: "Lightning Rod"},
	},
	cursola: {
		inherit: true,
		baseStats: {hp: 80, atk: 50, def: 95, spa: 145, spd: 130, spe: 30},
		abilities: {0: "Regenerator", H: "Perish Body"},
	},
	manectric: {
		inherit: true,
		baseStats: {hp: 70, atk: 75, def: 80, spa: 105, spd: 60, spe: 125},
		abilities: {0: "Intimidate", 1: "Lightning Rod", H: "Minus"},
	},
	vespiquen: {
		inherit: true,
		baseStats: {hp: 70, atk: 80, def: 112, spa: 70, spd: 102, spe: 40},
		abilities: {0: "Pressure", H: "Prankster"},
	},
	calyrex: {
		inherit: true,
		baseStats: {hp: 100, atk: 60, def: 63, spa: 130, spd: 97, spe: 100},
	},
	zamazenta: {
		inherit: true,
		baseStats: {hp: 92, atk: 90, def: 115, spa: 80, spd: 115, spe: 108},
	},
	zacian: {
		inherit: true,
		baseStats: {hp: 92, atk: 130, def: 95, spa: 90, spd: 95, spe: 108},
	},
	heatmor: {
		inherit: true,
		baseStats: {hp: 78, atk: 102, def: 61, spa: 102, spd: 61, spe: 80},
		abilities: {0: "Gluttony", 1: "Flash Fire", H: "Stakeout"},		
	},
	pangoro: {
		inherit: true,
		baseStats: {hp: 95, atk: 134, def: 98, spa: 54, spd: 86, spe: 68},
	},
	cherrim: {
		inherit: true,
		baseStats: {hp: 70, atk: 100, def: 70, spa: 67, spd: 78, spe: 95},
	},
	cherrimsunshine: {
		inherit: true,
		baseStats: {hp: 70, atk: 100, def: 70, spa: 67, spd: 78, spe: 95},
	},
	machamp: {
		inherit: true,
		baseStats: {hp: 90, atk: 130, def: 80, spa: 55, spd: 85, spe: 65},
	},
	spectrier: {
		inherit: true,
		baseStats: {hp: 110, atk: 85, def: 60, spa: 145, spd: 80, spe: 100},
	},
}; exports.Pokedex = Pokedex;
