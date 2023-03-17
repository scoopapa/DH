export const Pokedex: {[k: string]: ModdedSpeciesData} = {

// Template
	/*
	name: {
 // fusion: ['P1', 'P2'],
		num: x,
		name: "Name",
		types: [""],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: ""},
		weightkg: ,
	},
	
	*/

// OU
	revarantis: {
 // fusion: ['Revavroom', 'Lurantis'],
		num: 1,
		name: "Revarantis",
		types: ["Steel", "Grass"],
		baseStats: {hp: 75, atk: 122, def: 90, spa: 75, spd: 80, spe: 67},
		abilities: {0: "Unfiltered"},
		weightkg: 69.3,
	},
	rotoghold: {
 // fusion: ['Gholdengo', 'Rotom'],
		num: 2,
		name: "Rotoghold",
		types: ["Ghost"],
		baseStats: {hp: 70, atk: 55, def: 87, spa: 115, spd: 85, spe: 88},
		abilities: {0: "Holy Grail"},
		weightkg: 69.3,
	},
	guguzzparce: {
 // fusion: ['Guzzlord', 'Dudunsparce'],
		num: 3,
		name: "Guguzzparce",
		types: ["Dark", "Normal"],
		baseStats: {hp: 179, atk: 101, def: 67, spa: 97, spd: 67, spe: 53},
		abilities: {0: "All-Devouring"},
		weightkg: 463.6,
	},
	toedieleki: {
 // fusion: ['Toedscruel', 'Regieleki'],
		num: 4,
		name: "Toedieleki",
		types: ["Electric", "Ground"],
		baseStats: {hp: 80, atk: 85, def: 60, spa: 100, spd: 85, spe: 155},
		abilities: {0: "Galvanic Relay"},
		weightkg: 101.5,
	},
	arbolosionhisui: {
 // fusion: ['Arboliva', 'Typhlosion-Hisui'],
		num: 5,
		name: "Arbolosion-Hisui",
		types: ["Grass", "Fire"],
		baseStats: {hp: 90, atk: 76, def: 84, spa: 122, spd: 102, spe: 67},
		abilities: {0: "Grassy Surge"},
		weightkg: 63.9,
	},
	zarubok: {
 // fusion: ['Zarude', 'Arbok'],
		num: 6,
		name: "Zarubok",
		types: ["Dark", "Poison"],
		baseStats: {hp: 82, atk: 117, def: 87, spa: 67, spd: 87, spe: 100},
		abilities: {0: "Forest Fury"},
		weightkg: 67.5,
	},


// LCs and NFEs
	varantis: {
 // fusion: ['Varoom', 'Fomantis'],
		num: 1001,
		name: "Varantis",
		types: ["Steel", "Grass"],
		baseStats: {hp: 45, atk: 62, def: 50, spa: 40, spd: 50, spe: 41},
		abilities: {0: "Quickstart"},
		weightkg: 18.3,
		evos: ["Revarantis"],
	},
	dollava: {
 // fusion: ['Dolliv', 'Quilava'],
		num: 1003,
		name: "Dollava",
		types: ["Grass", "Fire"],
		baseStats: {hp: 70, atk: 58, def: 59, spa: 79, spd: 76, spe: 56},
		abilities: {0: "Growth Spurt"},
		weightkg: 15.5,
		evos: ["Arbolosion-Hisui"],
	},
	smoliqwil: {
 // fusion: ['Smoliv', 'Cyndaquil'],
		num: 1002,
		name: "Smoliqwil",
		types: ["Grass", "Fire"],
		baseStats: {hp: 55, atk: 43, def: 44, spa: 59, spd: 55, spe: 47},
		abilities: {0: "Growth Spurt"},
		weightkg: 7.2,
		evos: ["Dollava"],
	},
};
