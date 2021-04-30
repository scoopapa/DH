"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Pokedex = {
	scyther: {
		inherit: true,
		canGigantamax: "G-Max Beheading",
	},
	scythergmax: {
		num: 123,
		name: "Scyther-Gmax",
		baseSpecies: "Scyther",
		forme: "Gmax",
		types: ["Bug", "Flying"],
		baseStats: {hp: 70, atk: 110, def: 80, spa: 55, spd: 80, spe: 105},
		abilities: {0: "Swarm", 1: "Technician", H: "Steadfast"},
		heightm: 15,
		weightkg: 0,
		color: "Green",
		eggGroups: ["Bug"],
		changesFrom: "Scyther",
	},
	heracross: {
		inherit: true,
		canGigantamax: "G-Max Horn Sharpening",
	},
	heracrossgmax: {
		num: 214,
		name: "Heracross-Gmax",
		baseSpecies: "Heracross",
		forme: "Gmax",
		types: ["Bug", "Fighting"],
		baseStats: {hp: 80, atk: 125, def: 75, spa: 40, spd: 95, spe: 85},
		abilities: {0: "Swarm", 1: "Guts", H: "Moxie"},
		heightm: 15,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Bug"],
		changesFrom: "Heracross",
	},
	lycanrocdusk: {
		inherit: true,
		canGigantamax: "G-Max Rock Crash",
	},
	lycanrocduskgmax: {
		num: 745,
		name: "Lycanroc-Dusk-Gmax",
		baseSpecies: "Lycanroc",
		forme: "Dusk-Gmax",
		types: ["Rock"],
		baseStats: {hp: 75, atk: 117, def: 65, spa: 55, spd: 65, spe: 110},
		abilities: {0: "Tough Claws"},
		heightm: 8,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Field"],
		battleOnly: "Lycanroc-Dusk",
		changesFrom: "Lycanroc-Dusk",
	},
	magnezone: {
		inherit: true,
		canGigantamax: "G-Max Anion",
	},
	magnezonegmax: {
		num: 462,
		name: "Magnezone-Gmax",
		baseSpecies: "Magnezone",
		forme: "Gmax",
		types: ["Electric", "Steel"],
		gender: "N",
		baseStats: {hp: 70, atk: 70, def: 115, spa: 130, spd: 90, spe: 60},
		abilities: {0: "Magnet Pull", 1: "Sturdy", H: "Analytic"},
		heightm: 12,
		weightkg: 0,
		color: "Gray",
		eggGroups: ["Mineral"],
		changesFrom: "Magnezone",
	},
	arctozolt: {
		inherit: true,
		canGigantamax: "G-Max Subzero Fossil",
	},
	arctozoltgmax: {
		num: 881,
		name: "Arctozolt-Gmax",
		baseSpecies: "Arctozolt",
		forme: "Gmax",
		types: ["Electric", "Ice"],
		gender: "N",
		baseStats: {hp: 90, atk: 100, def: 90, spa: 90, spd: 80, spe: 55},
		abilities: {0: "Volt Absorb", 1: "Static", H: "Slush Rush"},
		heightm: 23,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Undiscovered"],
		changesFrom: "Arctozolt",
	},
	scolipede: {
		inherit: true,
		canGigantamax: "G-Max Venomous Strike",
	},
	scolipedegmax: {
		num: 545,
		name: "Scolipede-Gmax",
		baseSpecies: "Scolipede",
		forme: "Gmax",
		types: ["Bug", "Poison"],
		baseStats: {hp: 60, atk: 100, def: 89, spa: 55, spd: 69, spe: 112},
		abilities: {0: "Poison Point", 1: "Swarm", H: "Speed Boost"},
		heightm: 25,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Bug"],
		changesFrom: "Scolipede",
	},
	
	cursola: {
		inherit: true,
		canGigantamax: "G-Max Coral Curse",
	},
	cursolagmax: {
		num: 864,
		name: "Cursola-Gmax",
		baseSpecies: "Cursola",
		forme: "Gmax",
		types: ["Ghost"],
		genderRatio: {M: 0.25, F: 0.75},
		baseStats: {hp: 60, atk: 95, def: 50, spa: 145, spd: 130, spe: 30},
		abilities: {0: "Weak Armor", H: "Perish Body"},
		heightm: 10,
		weightkg: 0,
		color: "White",
		eggGroups: ["Water 1", "Water 3"],
		changesFrom: "Cursola",
	},
	excadrill: {
		inherit: true,
		canGigantamax: "G-Max Construction Hazards",
	},
	excadrillgmax: {
		num: 530,
		name: "Excadrill-Gmax",
		baseSpecies: "Excadrill",
		forme: "Gmax",
		types: ["Ground", "Steel"],
		baseStats: {hp: 110, atk: 135, def: 60, spa: 50, spd: 65, spe: 88},
		abilities: {0: "Sand Rush", 1: "Sand Force", H: "Mold Breaker"},
		heightm: 7,
		weightkg: 0,
		color: "Gray",
		eggGroups: ["Field"],
		changesFrom: "Excadrill",
	},
	/*
	tyranitar: {
		inherit: true,
		canGigantamax: "G-Max Darker Pursuit",
	},
	tyranitargmax: {
		num: 248,
		name: "Tyranitar-Gmax",
		baseSpecies: "Tyranitar",
		forme: "Gmax",
		types: ["Rock", "Dark"],
		baseStats: {hp: 100, atk: 134, def: 110, spa: 95, spd: 100, spe: 61},
		abilities: {0: "Sand Stream", H: "Unnerve"},
		heightm: 20,
		weightkg: 0,
		color: "Green",
		eggGroups: ["Monster"],
		changesFrom: "Tyranitar",
	},
	*/
	primarina: {
		inherit: true,
		canGigantamax: "G-Max Operetta",
	},
	primarinagmax: {
		num: 730,
		name: "Primarina-Gmax",
		baseSpecies: "Primarina",
		forme: "Gmax",
		types: ["Water", "Fairy"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 80, atk: 74, def: 74, spa: 126, spd: 116, spe: 60},
		abilities: {0: "Torrent", H: "Liquid Voice"},
		heightm: 18,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Water 1", "Field"],
		changesFrom: "Primarina",
	},
	
	jirachi: {
		inherit: true,
		canGigantamax: "G-Max Doomsday",
	},
	jirachigmax: {
		num: 385,
		name: "Jirachi-Gmax",
		baseSpecies: "Jirachi",
		forme: "Gmax",
		types: ["Steel", "Psychic"],
		gender: "N",
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
		abilities: {0: "Serene Grace"},
		heightm: 5,
		weightkg: 0,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
		changesFrom: "Jirachi",
	},
	
	flygon: {
		inherit: true,
		canGigantamax: "G-Max Kaleidoscope",
	},
	flygongmax: {
		num: 330,
		name: "Flygon-Gmax",
		baseSpecies: "Flygon",
		forme: "Gmax",
		types: ["Ground", "Bug"],
		genderRatio: {M: 0.500, F: 0.500},
		baseStats: {hp: 80, atk: 100, def: 80, spa: 80, spd: 80, spe: 100},
		abilities: {0: "Levitate"},
		heightm: 20,
		weightkg: 0,
		color: "Green",
		eggGroups: ["Bug", "Dragon"],
		changesFrom: "Flygon",
	},
 
	polteageist: {
		inherit: true,
		canGigantamax: "G-Max Green Tea",
	},
	polteageistgmax: {
		num: 855,
		name: "Polteageist-Gmax",
		baseSpecies: "Polteageist",
		forme: "Gmax",
		types: ["Ghost", "Grass"],
		baseStats: {hp: 60, atk: 65, def: 65, spa: 134, spd: 114, spe: 70},
		abilities: {0: "Weak Armor", H: "Cursed Body"},
		heightm: 7,
		weightkg: 0,
		color: "Purple",
		eggGroups: ["Mineral", "Amorphous"],
		changesFrom: "Polteageist",
	},
 
	polteageistantique: {
		inherit: true,
		canGigantamax: "G-Max Green Tea",
	},
	polteageistantiquegmax: {
		num: 855,
		name: "Polteageist-Antique-Gmax",
		baseSpecies: "Polteageist",
		forme: "Antique-Gmax",
		types: ["Ghost", "Grass"],
		baseStats: {hp: 60, atk: 65, def: 65, spa: 134, spd: 114, spe: 70},
		abilities: {0: "Weak Armor", H: "Cursed Body"},
		heightm: 7,
		weightkg: 0,
		color: "Purple",
		eggGroups: ["Mineral", "Amorphous"],
		changesFrom: "Polteageist-Antique",
		battleOnly: "Polteageist-Antique",
	},
 
	rapidashgalar: {
		inherit: true,
		canGigantamax: "G-Max Land Tremble",
	},
	rapidashgalargmax: {
		num: 78,
		name: "Rapidash-Galar-Gmax",
		baseSpecies: "Rapidash",
		forme: "Galar-Gmax",
		types: ["Psychic", "Ground"],
		baseStats: {hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 105},
		abilities: {0: "Run Away", 1: "Pastel Veil", H: "Anticipation"},
		heightm: 7,
		weightkg: 0,
		color: "White",
		eggGroups: ["Field"],
		changesFrom: "Rapidash-Galar",
		battleOnly: "Rapidash-Galar",
	},
  
	incineroar: {
		inherit: true,
		canGigantamax: "G-Max Moonsault",
	},
	incineroargmax: {
		num: 727,
		name: "Incineroar-Gmax",
		baseSpecies: "Incineroar",
		forme: "Gmax",
		types: ["Fire", "Dark"],
		baseStats: {hp: 95, atk: 115, def: 90, spa: 80, spd: 90, spe: 60},
		abilities: {0: "Blaze", H: "Intimidate"},
		heightm: 7,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Field"],
		changesFrom: "Incineroar",
	},
  
	darmanitangalar: {
		inherit: true,
		canGigantamax: "G-Max Sharpened Iceberg",
	},
	darmanitangalargmax: {
		num: 555,
		name: "Darmanitan-Galar-Gmax",
		baseSpecies: "Darmanitan",
		forme: "Galar-Gmax",
		types: ["Ice"],
		baseStats: {hp: 105, atk: 145, def: 55, spa: 30, spd: 55, spe: 95},
		abilities: {0: "Gorilla Tactics", H: "Zen Mode"},
		heightm: 7,
		weightkg: 0,
		color: "White",
		eggGroups: ["Field"],
		changesFrom: "Darmanitan-Galar",
		battleOnly: "Darmanitan-Galar",
	},
  
	decidueye: {
		inherit: true,
		canGigantamax: "G-Max Arrow Raid",
	},
	decidueyegmax: {
		num: 724,
		name: "Decidueye-Gmax",
		baseSpecies: "Decidueye",
		forme: "Gmax",
		types: ["Grass", "Ghost"],
		baseStats: {hp: 78, atk: 107, def: 75, spa: 100, spd: 100, spe: 70},
		abilities: {0: "Overgrow", H: "Long Reach"},
		heightm: 7,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Flying"],
		changesFrom: "Decidueye",
	},
 /*
	kyuremblack: {
		inherit: true,
		canGigantamax: "G-Max Future Shock",
	},
	kyuremblackgmax: {
		num: 646,
		name: "Kyurem-Black-Gmax",
		baseSpecies: "Kyurem",
		forme: "Black-Gmax",
		types: ["Dragon", "Ice"],
		baseStats: {hp: 125, atk: 130, def: 90, spa: 130, spd: 90, spe: 95},
		abilities: {0: "Pressure"},
		heightm: 7,
		weightkg: 0,
		color: "Black",
		eggGroups: ["Undiscovered"],
		changesFrom: "Kyurem-Black",
		battleOnly: "Kyurem-Black",
	},
 */
	scizor: {
		inherit: true,
		canGigantamax: "G-Max Bug Shield",
	},
	scizorgmax: {
		num: 212,
		name: "Scizor-Gmax",
		baseSpecies: "Scizor",
		forme: "Gmax",
		types: ["Bug", "Steel"],
		baseStats: {hp: 70, atk: 130, def: 100, spa: 55, spd: 80, spe: 65},
		abilities: {0: "Swarm", 1: "Technician", H: "Light Metal"},
		heightm: 7,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Bug"],
		changesFrom: "Scizor",
	},
 
	sableye: {
		inherit: true,
		canGigantamax: "G-Max Meddling",
	},
	sableyegmax: {
		num: 302,
		name: "Sableye-Gmax",
		baseSpecies: "Sableye",
		forme: "Gmax",
		types: ["Dark", "Ghost"],
		baseStats: {hp: 50, atk: 75, def: 75, spa: 65, spd: 65, spe: 50},
		abilities: {0: "Keen Eye", 1: "Stall", H: "Prankster"},
		heightm: 7,
		weightkg: 0,
		color: "Purple",
		eggGroups: ["Human-Like"],
		changesFrom: "Sableye",
	},
 /*
	poliwrath: {
		inherit: true,
		canGigantamax: "G-Max Belly Swirl",
	},
	poliwrathgmax: {
		num: 62,
		name: "Poliwrath-Gmax",
		baseSpecies: "Poliwrath",
		forme: "Gmax",
		types: ["Water", "Fighting"],
		baseStats: {hp: 90, atk: 95, def: 95, spa: 70, spd: 90, spe: 70},
		abilities: {0: "Water Absorb", 1: "Damp", H: "Swift Swim"},
		heightm: 7,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Water 1"],
		changesFrom: "Poliwrath",
	},
 
	talonflame: {
		inherit: true,
		canGigantamax: "G-Max Gale Force",
	},
	talonflamegmax: {
		num: 663,
		name: "Talonflame-Gmax",
		baseSpecies: "Talonflame",
		forme: "Gmax",
		types: ["Fire", "Flying"],
		baseStats: {hp: 78, atk: 81, def: 71, spa: 74, spd: 69, spe: 126},
		abilities: {0: "Flame Body", H: "Gale Wings"},
		heightm: 7,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Flying"],
		changesFrom: "Talonflame",
	},
 */
	lurantis: {
		inherit: true,
		canGigantamax: "G-Max Petal Shake",
	},
	lurantisgmax: {
		num: 754,
		name: "Lurantis-Gmax",
		baseSpecies: "Lurantis",
		forme: "Gmax",
		types: ["Grass", "Fairy"],
		baseStats: {hp: 70, atk: 105, def: 90, spa: 80, spd: 90, spe: 45},
		abilities: {0: "Leaf Guard", H: "Contrary"},
		heightm: 7,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Grass"],
		changesFrom: "Lurantis",
	},
 /*
	porygonz: {
		inherit: true,
		canGigantamax: "G-Max Conversion Seizure",
	},
	porygonzgmax: {
		num: 474,
		name: "Porygon-Z-Gmax",
		baseSpecies: "Porygon-Z",
		forme: "Gmax",
		types: ["Normal"],
		baseStats: {hp: 85, atk: 80, def: 70, spa: 135, spd: 75, spe: 90},
		abilities: {0: "Adaptability", 1: "Download", H: "Analytic"},
		heightm: 7,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Mineral"],
		changesFrom: "Porygon-Z",
	},
 */
	klefki: {
		inherit: true,
		canGigantamax: "G-Max Key Lock",
	},
	klefkigmax: {
		num: 707,
		name: "Klefki-Gmax",
		baseSpecies: "Klefki",
		forme: "Gmax",
		types: ["Steel", "Fairy"],
		baseStats: {hp: 57, atk: 80, def: 91, spa: 80, spd: 87, spe: 75},
		abilities: {0: "Prankster", H: "Magician"},
		heightm: 7,
		weightkg: 0,
		color: "Gray",
		eggGroups: ["Mineral"],
		changesFrom: "Klefki",
	},
 
	slowbrogalar: {
		inherit: true,
		canGigantamax: "G-Max Shell Shock",
	},
	slowbrogalargmax: {
		num: 80,
		name: "Slowbro-Galar-Gmax",
		baseSpecies: "Slowbro",
		forme: "Galar-Gmax",
		types: ["Poison", "Psychic"],
		baseStats: {hp: 95, atk: 100, def: 95, spa: 100, spd: 70, spe: 30},
		abilities: {0: "Quick Draw", 1: "Own Tempo", H: "Regenerator"},
		heightm: 7,
		weightkg: 0,
		color: "Pink",
		eggGroups: ["Monster", "Water 1"],
		changesFrom: "Slowbro-Galar",
		battleOnly: "Slowbro-Galar",
	},
	jigglypuff: {
		inherit: true,
		canGigantamax: "G-Max Puff Up",
	},
	jigglypuffgmax: {
		num: 39,
		name: "Jigglypuff-Gmax",
		baseSpecies: "Jigglypuff",
		forme: "Gmax",
		types: ["Normal", "Fairy"],
		baseStats: {hp: 115, atk: 45, def: 20, spa: 45, spd: 25, spe: 20},
		abilities: {0: "Cute Charm", 1: "Competitive", H: "Friend Guard"},
		heightm: 7,
		weightkg: 0,
		color: "Pink",
		eggGroups: ["Fairy"],
		changesFrom: "Jigglypuff",
	},
  /*
	palossand: {
		inherit: true,
		canGigantamax: "G-Max Gravedig",
	},
	palossandgmax: {
		num: 770,
		name: "Palossand-Gmax",
		baseSpecies: "Palossand",
		forme: "Gmax",
		types: ["Ghost", "Ground"],
		baseStats: {hp: 85, atk: 75, def: 110, spa: 100, spd: 75, spe: 35},
		abilities: {0: "Water Compaction", H: "Sand Veil"},
		heightm: 7,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Amorphous"],
		changesFrom: "Palossand",
	},
 
	aggron: {
		inherit: true,
		canGigantamax: "G-Max Beastly Iron",
	},
	aggrongmax: {
		num: 306,
		name: "Aggron-Gmax",
		baseSpecies: "Aggron",
		forme: "Gmax",
		types: ["Steel", "Ground"],
		baseStats: {hp: 70, atk: 110, def: 180, spa: 60, spd: 60, spe: 50},
		abilities: {0: "Sturdy", 1: "Rock Head", H: "Heavy Metal"},
		heightm: 7,
		weightkg: 0,
		color: "Gray",
		eggGroups: ["Monster"],
		changesFrom: "Aggron",
	},
 */
	articunogalar: {
		inherit: true,
		canGigantamax: "G-Max Cruel Chill",
	},
	articunogalargmax: {
		num: 144,
		name: "Articuno-Galar-Gmax",
		baseSpecies: "Articuno",
		forme: "Galar-Gmax",
		types: ["Psychic", "Flying"],
		baseStats: {hp: 90, atk: 85, def: 85, spa: 125, spd: 100, spe: 95},
		abilities: {0: "Competitive"},
		heightm: 7,
		weightkg: 0,
		color: "Purple",
		eggGroups: ["Undiscovered"],
		changesFrom: "Articuno-Galar",
		battleOnly: "Articuno-Galar",
	},
 /*
	zapdosgalar: {
		inherit: true,
		canGigantamax: "G-Max Sparking Strikes",
	},
	zapdosgalargmax: {
		num: 145,
		name: "Zapdos-Galar-Gmax",
		baseSpecies: "Zapdos",
		forme: "Galar-Gmax",
		types: ["Fighting", "Flying"],
		baseStats: {hp: 90, atk: 125, def: 90, spa: 85, spd: 90, spe: 100},
		abilities: {0: "Defiant"},
		heightm: 7,
		weightkg: 0,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
		changesFrom: "Zapdos-Galar",
		battleOnly: "Zapdos-Galar",
	},
 
	moltresgalar: {
		inherit: true,
		canGigantamax: "G-Max Devastation",
	},
	moltresgalargmax: {
		num: 146,
		name: "Moltres-Galar-Gmax",
		baseSpecies: "Moltres",
		forme: "Galar-Gmax",
		types: ["Dark", "Flying"],
		baseStats: {hp: 90, atk: 85, def: 90, spa: 100, spd: 125, spe: 90},
		abilities: {0: "Berserk"},
		heightm: 7,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Undiscovered"],
		changesFrom: "Moltres-Galar",
		battleOnly: "Moltres-Galar",
	},
 
	braviary: {
		inherit: true,
		canGigantamax: "G-Max Rebellion",
	},
	bravaiarygmax: {
		num: 628,
		name: "Braviary-Gmax",
		baseSpecies: "Braviary",
		forme: "Gmax",
		types: ["Normal", "Flying"],
		baseStats: {hp: 100, atk: 123, def: 75, spa: 57, spd: 75, spe: 80},
		abilities: {0: "Keen Eye", 1: "Sheer Force", H: "Defiant"},
		heightm: 7,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Flying"],
		changesFrom: "Braviary",
	},
 
	wobbuffet: {
		inherit: true,
		canGigantamax: "G-Max Recoil",
	},
	wobbuffetgmax: {
		num: 202,
		name: "Wobbuffet-Gmax",
		baseSpecies: "Wobbuffet",
		forme: "Gmax",
		types: ["Psychic"],
		baseStats: {hp: 190, atk: 33, def: 58, spa: 33, spd: 58, spe: 33},
		abilities: {0: "Shadow Tag", H: "Telepathy"},
		heightm: 7,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Amorphous"],
		changesFrom: "Wobbuffet",
	},
 
	groudon: {
		inherit: true,
		canGigantamax: "G-Max Desolating Drought",
	},
	groudongmax: {
		num: 383,
		name: "Groudon-Gmax",
		baseSpecies: "Groudon",
		forme: "Gmax",
		types: ["Ground", "Fire"],
		baseStats: {hp: 100, atk: 150, def: 140, spa: 100, spd: 90, spe: 90},
		abilities: {0: "Drought"},
		heightm: 7,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Undiscovered"],
		changesFrom: "Groudon",
	},
 
	kyogre: {
		inherit: true,
		canGigantamax: "G-Max Drizzling Downpour",
	},
	kyogregmax: {
		num: 382,
		name: "Kyogre-Gmax",
		baseSpecies: "Kyogre",
		forme: "Gmax",
		types: ["Water", "Electric"],
		baseStats: {hp: 100, atk: 100, def: 90, spa: 150, spd: 140, spe: 90},
		abilities: {0: "Drizzle"},
		heightm: 7,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Undiscovered"],
		changesFrom: "Kyogre",
	},
 */
	aurorus: {
		inherit: true,
		canGigantamax: "G-Max Crystal Hail",
	},
	aurorusgmax: {
		num: 699,
		name: "Aurorus-Gmax",
		baseSpecies: "Aurorus",
		forme: "Gmax",
		types: ["Rock", "Ice"],
		baseStats: {hp: 123, atk: 77, def: 77, spa: 99, spd: 92, spe: 58},
		abilities: {0: "Refrigerate", H: "Snow Warning"},
		heightm: 7,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Monster"],
		changesFrom: "Aurorus",
	},
 
	quagsire: {
		inherit: true,
		canGigantamax: "G-Max Slime Slide",
	},
	quagsiregmax: {
		num: 195,
		name: "Quagsire-Gmax",
		baseSpecies: "Quagsire",
		forme: "Gmax",
		types: ["Water", "Ground"],
		baseStats: {hp: 95, atk: 85, def: 85, spa: 65, spd: 65, spe: 35},
		abilities: {0: "Damp", 1: "Water Absorb", H: "Unaware"},
		heightm: 7,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Water 1", "Field"],
		changesFrom: "Quagsire",
	},
 
	reshiram: {
		inherit: true,
		canGigantamax: "G-Max Azure Flare",
	},
	reshiramgmax: {
		num: 643,
		name: "Reshiram-Gmax",
		baseSpecies: "Reshiram",
		forme: "Gmax",
		types: ["Dragon", "Fire"],
		baseStats: {hp: 100, atk: 120, def: 100, spa: 150, spd: 120, spe: 90},
		abilities: {0: "Turboblaze"},
		heightm: 7,
		weightkg: 0,
		color: "White",
		eggGroups: ["Undiscovered"],
		changesFrom: "Reshiram",
	},
 
	obstagoon: {
		inherit: true,
		canGigantamax: "G-Max Breakdown",
	},
	obstagoongmax: {
		num: 863,
		name: "Obstagoon-Gmax",
		baseSpecies: "Obstagoon",
		forme: "Gmax",
		types: ["Dark", "Normal"],
		baseStats: {hp: 93, atk: 90, def: 101, spa: 60, spd: 81, spe: 95},
		abilities: {0: "Reckless", 1: "Guts", H: "Defiant"},
		heightm: 7,
		weightkg: 0,
		color: "Gray",
		eggGroups: ["Field"],
		changesFrom: "Obstagoon",
	},

	starmie: {
		inherit: true,
		canGigantamax: "G-Max Shooting Star",
	},
	starmiegmax: {
		num: 121,
		name: "Starmie-Gmax",
		baseSpecies: "Starmie",
		forme: "Gmax",
		types: ["Water", "Psychic"],
		baseStats: {hp: 60, atk: 75, def: 85, spa: 100, spd: 85, spe: 115},
		abilities: {0: "Illuminate", 1: "Natural Cure", H: "Analytic"},
		heightm: 7,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Water 3"],
		changesFrom: "Starmie",
	},
 
	gastrodon: {
		inherit: true,
		canGigantamax: "G-Max Swamp",
	},
	gastrodongmax: {
		num: 423,
		name: "Gastrodon-Gmax",
		baseSpecies: "Gastrodon",
		forme: "Gmax",
		types: ["Water", "Ground"],
		baseStats: {hp: 111, atk: 83, def: 68, spa: 92, spd: 82, spe: 39},
		abilities: {0: "Sticky Hold", 1: "Storm Drain", H: "Sand Force"},
		heightm: 7,
		weightkg: 0,
		color: "Purple",
		eggGroups: ["Water 1", "Amorphous"],
		changesFrom: "Gastrodon",
	},
 
	// gastrodoneast: {
		// inherit: true,
		// canGigantamax: "G-Max Swamp",
	// },
	// gastrodoneastgmax: {
		// num: 423,
		// name: "Gastrodon-East-Gmax",
		// baseSpecies: "Gastrodon",
		// forme: "East-Gmax",
		// types: ["Water", "Ground"],
		// baseStats: {hp: 111, atk: 83, def: 68, spa: 92, spd: 82, spe: 39},
		// abilities: {0: "Sticky Hold", 1: "Storm Drain", H: "Sand Force"},
		// heightm: 7,
		// weightkg: 0,
		// color: "Purple",
		// eggGroups: ["Water 1", "Amorphous"],
		// changesFrom: "Gastrodon-East",
		// battleOnly: "Gastrodon-East",
	// },
 
	regirock: {
		inherit: true,
		canGigantamax: "G-Max Mountain Crash",
	},
	regirockgmax: {
		num: 377,
		name: "Regirock-Gmax",
		baseSpecies: "Regirock",
		forme: "Gmax",
		types: ["Rock"],
		baseStats: {hp: 80, atk: 100, def: 200, spa: 50, spd: 100, spe: 50},
		abilities: {0: "Clear Body", H: "Sturdy"},
		heightm: 7,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Undiscovered"],
		changesFrom: "Regirock",
	},
 
	regice: {
		inherit: true,
		canGigantamax: "G-Max Ice Age",
	},
	regicegmax: {
		num: 378,
		name: "Regice-Gmax",
		baseSpecies: "Regice",
		forme: "Gmax",
		types: ["Ice"],
		baseStats: {hp: 80, atk: 50, def: 100, spa: 100, spd: 200, spe: 50},
		abilities: {0: "Clear Body", H: "Ice Body"},
		heightm: 7,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Undiscovered"],
		changesFrom: "Regice",
	},
 
	registeel: {
		inherit: true,
		canGigantamax: "G-Max Molten Iron",
	},
	registeelgmax: {
		num: 379,
		name: "Registeel-Gmax",
		baseSpecies: "Registeel",
		forme: "Gmax",
		types: ["Steel"],
		baseStats: {hp: 80, atk: 75, def: 150, spa: 75, spd: 150, spe: 50},
		abilities: {0: "Clear Body", H: "Light Metal"},
		heightm: 7,
		weightkg: 0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
		changesFrom: "Registeel",
	},
 
	xurkitree: {
		inherit: true,
		canGigantamax: "G-Max Haywire",
	},
	xurkitreegmax: {
		num: 796,
		name: "Xurkitree-Gmax",
		baseSpecies: "Xurkitree",
		forme: "Gmax",
		types: ["Electric", "Grass"],
		baseStats: {hp: 83, atk: 89, def: 71, spa: 173, spd: 71, spe: 83},
		abilities: {0: "Beast Boost"},
		heightm: 7,
		weightkg: 0,
		color: "Black",
		eggGroups: ["Undiscovered"],
		changesFrom: "Xurkitree",
	},
 /*
	necrozma: {
		inherit: true,
		canGigantamax: "G-Max Supernova",
	},
	necrozmadawnwings: {
		inherit: true,
		canGigantamax: "G-Max Supernova",
	},
	necrozmaduskmane: {
		inherit: true,
		canGigantamax: "G-Max Supernova",
	},
 
	necrozmagmax: {
		num: 800,
		name: "Necrozma-Gmax",
		baseSpecies: "Necrozma",
		forme: "Gmax",
		types: ["Psychic"],
		baseStats: {hp: 97, atk: 107, def: 101, spa: 127, spd: 89, spe: 79},
		abilities: {0: "Prism Armor"},
		heightm: 7,
		weightkg: 0,
		color: "Black",
		eggGroups: ["Undiscovered"],
		changesFrom: "Necrozma",
	},
	necrozmadawnwingsgmax: {
		num: 800,
		name: "Necrozma-Dawn-Wings-Gmax",
		baseSpecies: "Necrozma",
		forme: "Dawn-Wings-Gmax",
		types: ["Psychic", "Ghost"],
		baseStats: {hp: 97, atk: 113, def: 109, spa: 157, spd: 127, spe: 77},
		abilities: {0: "Prism Armor"},
		heightm: 7,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Undiscovered"],
		changesFrom: "Necrozma-Dawn-Wings",
		battleOnly: "Necrozma-Dawn-Wings",
	},
	necrozmaduskmanegmax: {
		num: 800,
		name: "Necrozma-Dusk-Mane-Gmax",
		baseSpecies: "Necrozma",
		forme: "Dusk-Mane-Gmax",
		types: ["Psychic", "Steel"],
		baseStats: {hp: 97, atk: 157, def: 127, spa: 113, spd: 109, spe: 77},
		abilities: {0: "Prism Armor"},
		heightm: 7,
		weightkg: 0,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
		changesFrom: "Necrozma-Dusk-Mane",
		battleOnly: "Necrozma-Dusk-Mane",
	},
	necrozmaultragmax: {
		num: 800,
		name: "Necrozma-Ultra-Gmax",
		baseSpecies: "Necrozma",
		forme: "Ultra-Gmax",
		types: ["Psychic", "Dragon"],
		baseStats: {hp: 97, atk: 167, def: 97, spa: 167, spd: 97, spe: 129},
		abilities: {0: "Neuroforce"},
		heightm: 7,
		weightkg: 0,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
		changesFrom: "Necrozma-Ultra",
		battleOnly: "Necrozma-Ultra",
	},
 */
	latias: {
		inherit: true,
		canGigantamax: "G-Max Misty Mayhem",
	},
	latiasgmax: {
		num: 380,
		name: "Latias-Gmax",
		baseSpecies: "Latias",
		forme: "Gmax",
		types: ["Dragon", "Fairy"],
		baseStats: {hp: 80, atk: 80, def: 90, spa: 110, spd: 130, spe: 110},
		abilities: {0: "Levitate"},
		heightm: 7,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Undiscovered"],
		changesFrom: "Latias",
	},
 /*
	rayquaza: {
		inherit: true,
		canGigantamax: "G-Max Descending Dragon",
	},
	rayquazagmax: {
		num: 384,
		name: "Rayquaza-Gmax",
		baseSpecies: "Rayquaza",
		forme: "Gmax",
		types: ["Dragon", "Flying"],
		baseStats: {hp: 105, atk: 150, def: 90, spa: 150, spd: 90, spe: 95},
		abilities: {0: "Air Lock"},
		heightm: 7,
		weightkg: 0,
		color: "Green",
		eggGroups: ["Undiscovered"],
		changesFrom: "Rayquaza",
	},
*/	
	glaceon: {
		inherit: true,
		canGigantamax: "G-Max Evo-Glace",
	},
	glaceongmax: {
		num: 471,
		name: "Glaceon-Gmax",
		baseSpecies: "Glaceon",
		forme: "Gmax",
		types: ["Ice"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 65, atk: 60, def: 110, spa: 130, spd: 95, spe: 65},
		abilities: {0: "Snow Cloak", H: "Ice Body"},
		heightm: 7,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Field"],
		changesFrom: "Glaceon",
	},
	
	chandelure: {
		inherit: true,
		canGigantamax: "G-Max Soulraze",
	},
	chandeluregmax: {
		num: 609,
		name: "Chandelure-Gmax",
		baseSpecies: "Chandelure",
		forme: "Gmax",
		types: ["Ghost", "Fire"],
		baseStats: {hp: 60, atk: 55, def: 90, spa: 145, spd: 90, spe: 80},
		abilities: {0: "Flash Fire", 1: "Flame Body", H: "Infiltrator"},
		heightm: 1,
		weightkg: 34.3,
		color: "Black",
		eggGroups: ["Amorphous"],
		changesFrom: "Chandelure",
	},
/*	
	weavile: {
		inherit: true,
		canGigantamax: "G-Max Robbery",
	},
	weavilegmax: {
		num: 461,
		name: "Weavile-Gmax",
		baseSpecies: "Weavile",
		forme: "Gmax",
		types: ["Dark", "Ice"],
		baseStats: {hp: 70, atk: 120, def: 65, spa: 45, spd: 85, spe: 125},
		abilities: {0: "Pressure", H: "Pickpocket"},
		heightm: 20,
		weightkg: 0,
		color: "Black",
		eggGroups: ["Field"],
		changesFrom: "Weavile",
	},
 
	bellossom: {
		inherit: true,
		canGigantamax: "G-Max Petal Rain",
	},
	bellossomgmax: {
		num: 182,
		name: "Bellossom-Gmax",
		baseSpecies: "Bellossom",
		forme: "Gmax",
		types: ["Grass", "Fairy"],
		baseStats: {hp: 75, atk: 80, def: 95, spa: 90, spd: 100, spe: 50},
		abilities: {0: "Chlorophyll", H: "Healer"},
		heightm: 20,
		weightkg: 0,
		color: "Green",
		eggGroups: ["Grass"],
		changesFrom: "Bellossom",
	},
 
 */
	goodra: {
		inherit: true,
		canGigantamax: "G-Max Slime Splash",
	},
	goodragmax: {
		num: 706,
		name: "Goodra-Gmax",
		baseSpecies: "Goodra",
		forme: "Gmax",
		types: ["Dragon", "Water"],
		baseStats: {hp: 90, atk: 100, def: 70, spa: 110, spd: 150, spe: 80},
		abilities: {0: "Sap Sipper", 1: "Hydration", H: "Gooey"},
		heightm: 20,
		weightkg: 0,
		color: "Purple",
		eggGroups: ["Dragon"],
		changesFrom: "Goodra",
	},
 
	ribombee: {
		inherit: true,
		canGigantamax: "G-Max Pollen Rain",
	},
	ribombeegmax: {
		num: 743,
		name: "Ribombee-Gmax",
		baseSpecies: "Ribombee",
		forme: "Gmax",
		types: ["Bug", "Fairy"],
		baseStats: {hp: 60, atk: 55, def: 60, spa: 95, spd: 70, spe: 124},
		abilities: {0: "Honey Gather", 1: "Shield Dust", H: "Sweet Veil"},
		heightm: 20,
		weightkg: 0,
		color: "Yellow",
		eggGroups: ["Bug", "Fairy"],
		changesFrom: "Ribombee",
	},
 /*
	uxie: {
		inherit: true,
		canGigantamax: "G-Max Shrewd Spirit",
	},
	uxiegmax: {
		num: 480,
		name: "Uxie-Gmax",
		baseSpecies: "Uxie",
		forme: "Gmax",
		types: ["Psychic", "Grass"],
		baseStats: {hp: 75, atk: 75, def: 130, spa: 75, spd: 130, spe: 95},
		abilities: {0: "Levitate"},
		heightm: 20,
		weightkg: 0,
		color: "Yellow",
		eggGroups: ["Undiscovered"],
		changesFrom: "Uxie",
	},
 
	azelf: {
		inherit: true,
		canGigantamax: "G-Max Courageous Spirit",
	},
	azelfgmax: {
		num: 482,
		name: "Azelf-Gmax",
		baseSpecies: "Azelf",
		forme: "Gmax",
		types: ["Psychic", "Fire"],
		baseStats: {hp: 75, atk: 120, def: 70, spa: 120, spd: 70, spe: 115},
		abilities: {0: "Levitate"},
		heightm: 20,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Undiscovered"],
		changesFrom: "Azelf",
	},
	
	mesprit: {
		inherit: true,
		canGigantamax: "G-Max Benevolent Spirit",
	},
	mespritgmax: {
		num: 481,
		name: "Mesprit-Gmax",
		baseSpecies: "Mesprit",
		forme: "Gmax",
		types: ["Psychic", "Ice"],
		baseStats: {hp: 80, atk: 105, def: 105, spa: 105, spd: 105, spe: 80},
		abilities: {0: "Levitate"},
		heightm: 20,
		weightkg: 0,
		color: "Pink",
		eggGroups: ["Undiscovered"],
		changesFrom: "Mesprit",
	},
 
	absol: {
		inherit: true,
		canGigantamax: "G-Max Devestational Force",
	},
	absolgmax: {
		num: 359,
		name: "Absol-Gmax",
		baseSpecies: "Absol",
		forme: "Gmax",
		types: ["Dark", "Fairy"],
		baseStats: {hp: 65, atk: 130, def: 60, spa: 75, spd: 60, spe: 75},
		abilities: {0: "Pressure", 1: "Super Luck", H: "Justified"},
		heightm: 20,
		weightkg: 0,
		color: "White",
		eggGroups: ["Field"],
		changesFrom: "Absol",
	},
 
	umbreon: {
		inherit: true,
		canGigantamax: "G-Max Venomous Moonlight",
	},
	umbreongmax: {
		num: 197,
		name: "Umbreon-Gmax",
		baseSpecies: "Umbreon",
		forme: "Gmax",
		types: ["Dark"],
		baseStats: {hp: 95, atk: 65, def: 110, spa: 60, spd: 130, spe: 55},
		abilities: {0: "Synchronize", H: "Inner Focus"},
		heightm: 20,
		weightkg: 0,
		color: "Black",
		eggGroups: ["Field"],
		changesFrom: "Umbreon",
	},
 */
	skuntank: {
		inherit: true,
		canGigantamax: "G-Max Stink Bomb",
	},
	skuntankgmax: {
		num: 435,
		name: "Skuntank-Gmax",
		baseSpecies: "Skuntank",
		forme: "Gmax",
		types: ["Poison", "Dark"],
		baseStats: {hp: 103, atk: 93, def: 67, spa: 71, spd: 61, spe: 84},
		abilities: {0: "Stench", 1: "Aftermath", H: "Keen Eye"},
		heightm: 20,
		weightkg: 0,
		color: "Purple",
		eggGroups: ["Field"],
		changesFrom: "Skuntank",
	},
 
	giratina: {
		inherit: true,
		canGigantamax: "G-Max Gravitational Spike",
	},
	giratinagmax: {
		num: 487,
		name: "Giratina-Gmax",
		baseSpecies: "Giratina",
		forme: "Gmax",
		types: ["Ghost", "Psychic"],
		baseStats: {hp: 150, atk: 100, def: 120, spa: 100, spd: 120, spe: 90},
		abilities: {0: "Pressure", H: "Telepathy"},
		heightm: 20,
		weightkg: 0,
		color: "Black",
		eggGroups: ["Undiscovered"],
		changesFrom: "Giratina",
	},
 /*
	dusknoir: {
		inherit: true,
		canGigantamax: "G-Max Reap",
	},
	dusknoirgmax: {
		num: 477,
		name: "Dusknoir-Gmax",
		baseSpecies: "Dusknoir",
		forme: "Gmax",
		types: ["Ghost", "Normal"],
		baseStats: {hp: 45, atk: 100, def: 135, spa: 65, spd: 135, spe: 45},
		abilities: {0: "Pressure", H: "Frisk"},
		heightm: 20,
		weightkg: 0,
		color: "Black",
		eggGroups: ["Amorphous"],
		changesFrom: "Dusknoir",
	},
 
	leafeon: {
		inherit: true,
		canGigantamax: "G-Max Evo-Leaf",
	},
	leafeongmax: {
		num: 470,
		name: "Leafeon-Gmax",
		baseSpecies: "Leafeon",
		forme: "Gmax",
		types: ["Grass"],
		baseStats: {hp: 65, atk: 110, def: 130, spa: 60, spd: 65, spe: 95},
		abilities: {0: "Leaf Guard", H: "Chlorophyll"},
		heightm: 20,
		weightkg: 0,
		color: "Green",
		eggGroups: ["Field"],
		changesFrom: "Leafeon",
	},	
*/	
	beheeyem: {
		inherit: true,
		canGigantamax: "G-Max Blue Star",
	},
	beheeyemgmax: {
		num: 606,
		name: "Beheeyem-Gmax",
		baseSpecies: "Beheeyem",
		forme: "Gmax",
		types: ["Psychic"],
		baseStats: {hp: 75, atk: 75, def: 75, spa: 125, spd: 95, spe: 40},
		abilities: {0: "Telepathy", 1: "Synchronize", H: "Analytic"},
		heightm: 20,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Human-Like"],
		changesFrom: "Beheeyem",
	},
 /*
	zoroark: {
		inherit: true,
		canGigantamax: "G-Max Delusion",
	},
	zoroarkgmax: {
		num: 571,
		name: "Zoroark-Gmax",
		baseSpecies: "Zoroark",
		forme: "Gmax",
		types: ["Dark"],
		baseStats: {hp: 60, atk: 105, def: 60, spa: 120, spd: 60, spe: 105},
		abilities: {0: "Illusion"},
		heightm: 20,
		weightkg: 0,
		color: "Black",
		eggGroups: ["Field"],
		changesFrom: "Zoroark",
	},
 */
	sceptile: {
		inherit: true,
		canGigantamax: "G-Max Vegetal Sword",
	},
	sceptilegmax: {
		num: 254,
		name: "Sceptile-Gmax",
		baseSpecies: "Sceptile",
		forme: "Gmax",
		types: ["Grass"],
		baseStats: {hp: 70, atk: 85, def: 65, spa: 105, spd: 85, spe: 120},
		abilities: {0: "Overgrow", H: "Unburden"},
		heightm: 20,
		weightkg: 0,
		color: "Green",
		eggGroups: ["Monster", "Dragon"],
		changesFrom: "Sceptile",
	},
 /*
	sandslash: {
		inherit: true,
		canGigantamax: "G-Max Quaking Ferocity",
	},
	sandslashgmax: {
		num: 28,
		name: "Sandslash-Gmax",
		baseSpecies: "Sandslash",
		forme: "Gmax",
		types: ["Ground", "Steel"],
		baseStats: {hp: 75, atk: 100, def: 110, spa: 45, spd: 55, spe: 65},
		abilities: {0: "Sand Veil", H: "Sand Rush"},
		heightm: 20,
		weightkg: 0,
		color: "Yellow",
		eggGroups: ["Field"],
		changesFrom: "Sandslash",
	},
 */
	sandslashalola: {
		inherit: true,
		canGigantamax: "G-Max Crystaline Crash",
	},
	sandslashalolagmax: {
		num: 28,
		name: "Sandslash-Alola-Gmax",
		baseSpecies: "Sandslash-Alola",
		forme: "Alola-Gmax",
		types: ["Ice", "Steel"],
		baseStats: {hp: 75, atk: 100, def: 120, spa: 25, spd: 65, spe: 65},
		abilities: {0: "Snow Cloak", H: "Slush Rush"},
		heightm: 20,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Field"],
		changesFrom: "Sandslash-Alola",
		battleOnly: "Sandslash-Alola",
	},
 
	tauros: {
		inherit: true,
		canGigantamax: "G-Max Stampede",
	},
	taurosgmax: {
		num: 128,
		name: "Tauros-Gmax",
		baseSpecies: "Tauros",
		forme: "Gmax",
		types: ["Normal", "Fighting"],
		baseStats: {hp: 75, atk: 100, def: 95, spa: 40, spd: 70, spe: 110},
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Sheer Force"},
		heightm: 20,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Field"],
		changesFrom: "Tauros",
	},
	sirfetchd: {
		inherit: true,
		canGigantamax: "G-Max Bravery",
	},
	sirfetchdgmax: {
		num: 865,
		name: "Sirfetch\u2019d-Gmax",
		baseSpecies: "Sirfetch\u2019d",
		forme: "Gmax",
		types: ["Fighting", "Flying"],
		baseStats: {hp: 62, atk: 135, def: 95, spa: 68, spd: 82, spe: 65},
		abilities: {0: "Steadfast", H: "Scrappy"},
		heightm: 30,
		weightkg: 0,
		color: "White",
		eggGroups: ["Field", "Flying"],
		changesFrom: "Sirfetch\u2019d",
	},
/*
	palkia: {
		inherit: true,
		canGigantamax: "G-Max Spacerip",
	},
	palkiagmax: {
		num: 484,
		name: "Palkia-Gmax",
		baseSpecies: "Palkia",
		forme: "Gmax",
		types: ["Water", "Dragon"],
		baseStats: {hp: 90, atk: 120, def: 100, spa: 150, spd: 120, spe: 100},
		abilities: {0: "Pressure", H: "Telepathy"},
		heightm: 20,
		weightkg: 0,
		color: "Purple",
		eggGroups: ["Undiscovered"],
		changesFrom: "Palkia",
	},
 
	dialga: {
		inherit: true,
		canGigantamax: "G-Max Rewind",
	},
	dialgagmax: {
		num: 483,
		name: "Dialga-Gmax",
		baseSpecies: "Dialga",
		forme: "Gmax",
		types: ["Steel", "Dragon"],
		baseStats: {hp: 100, atk: 120, def: 120, spa: 150, spd: 100, spe: 90},
		abilities: {0: "Pressure", H: "Telepathy"},
		heightm: 20,
		weightkg: 0,
		color: "White",
		eggGroups: ["Undiscovered"],
		changesFrom: "Dialga",
	},
 
	regigigas: {
		inherit: true,
		canGigantamax: "G-Max Regi-lution",
	},
	regigigasgmax: {
		num: 486,
		name: "Regigigas-Gmax",
		baseSpecies: "Regigigas",
		forme: "Gmax",
		types: ["Normal"],
		baseStats: {hp: 110, atk: 160, def: 110, spa: 80, spd: 110, spe: 100},
		abilities: {0: "Slow Start"},
		heightm: 20,
		weightkg: 0,
		color: "White",
		eggGroups: ["Undiscovered"],
		changesFrom: "Regigigas",
	},
 */
	sudowoodo: {
		inherit: true,
		canGigantamax: "G-Max Petrify",
	},
	sudowoodogmax: {
		num: 185,
		name: "Sudowoodo-Gmax",
		baseSpecies: "Sudowoodo",
		forme: "Gmax",
		types: ["Rock", "Ghost"],
		baseStats: {hp: 70, atk: 100, def: 115, spa: 30, spd: 65, spe: 30},
		abilities: {0: "Sturdy", 1: "Rock Head", H: "Rattled"},
		heightm: 20,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Mineral"],
		changesFrom: "Sudowoodo",
	},
 /*
	cryogonal: {
		inherit: true,
		canGigantamax: "G-Max Sudden Light",
	},
	cryogonalgmax: {
		num: 615,
		name: "Cryogonal-Gmax",
		baseSpecies: "Cryogonal",
		forme: "Gmax",
		types: ["Ice"],
		baseStats: {hp: 80, atk: 50, def: 50, spa: 95, spd: 135, spe: 105},
		abilities: {0: "Levitate"},
		heightm: 20,
		weightkg: 0,
		color: "Blue",
		eggGroups: ["Mineral"],
		changesFrom: "Cryogonal",
	},
	
	gourgeist: {
		inherit: true,
		canGigantamax: "G-Max Jack-O-Bomb",
	},
	gourgeistgmax: {
		num: 711,
		name: "Gourgeist-Gmax",
		baseSpecies: "Gourgeist",
		forme: "Gmax",
		types: ["Ghost", "Grass"],
		baseStats: {hp: 65, atk: 90, def: 122, spa: 58, spd: 75, spe: 84},
		abilities: {0: "Pickup", 1: "Frisk", H: "Insomnia"},
		heightm: 20,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Amorphous"],
		changesFrom: "Gourgeist",
	},
	
	gourgeistsmall: {
		inherit: true,
		canGigantamax: "G-Max Jack-O-Bomb",
	},
	gourgeistsmallgmax: {
		num: 711,
		name: "Gourgeist-Small-Gmax",
		baseSpecies: "Gourgeist-Small",
		forme: "Small-Gmax",
		types: ["Ghost", "Grass"],
		baseStats: {hp: 55, atk: 85, def: 122, spa: 58, spd: 75, spe: 99},
		abilities: {0: "Pickup", 1: "Frisk", H: "Insomnia"},
		heightm: 15,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Amorphous"],
		changesFrom: "Gourgeist-Small",
	},

	gourgeistlarge: {
		inherit: true,
		canGigantamax: "G-Max Jack-O-Bomb",
	},
	gourgeistlargegmax: {
		num: 711,
		name: "Gourgeist-Large-Gmax",
		baseSpecies: "Gourgeist-Large",
		forme: "Large-Gmax",
		types: ["Ghost", "Grass"],
		baseStats: {hp: 75, atk: 95, def: 122, spa: 58, spd: 75, spe: 69},
		abilities: {0: "Pickup", 1: "Frisk", H: "Insomnia"},
		heightm: 25,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Amorphous"],
		changesFrom: "Gourgeist-Large",
	},
	
	gourgeistsuper: {
		inherit: true,
		canGigantamax: "G-Max Jack-O-Bomb",
	},
	gourgeistsupergmax: {
		num: 711,
		name: "Gourgeist-Super-Gmax",
		baseSpecies: "Gourgeist-Super",
		forme: "Super-Gmax",
		types: ["Ghost", "Grass"],
		baseStats: {hp: 75, atk: 95, def: 122, spa: 58, spd: 75, spe: 69},
		abilities: {0: "Pickup", 1: "Frisk", H: "Insomnia"},
		heightm: 25,
		weightkg: 0,
		color: "Brown",
		eggGroups: ["Amorphous"],
		changesFrom: "Gourgeist-Super",
	},

	flareon: {
		inherit: true,
		canGigantamax: "G-Max Evo-Flare",
	},
	flareongmax: {
		num: 136,
		name: "Flareon-Gmax",
		baseSpecies: "Flareon",
		forme: "Gmax",
		types: ["Fire"],
		baseStats: {hp: 65, atk: 130, def: 60, spa: 95, spd: 110, spe: 65},
		abilities: {0: "Flash Fire", H: "Guts"},
		heightm: 20,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Field"],
		changesFrom: "Flareon",
	},
/*
	wigglytuff: {
		inherit: true,
		canGigantamax: "G-Max Power Hug",
	},
	wigglytuffgmax: {
		num: 40,
		name: "Wigglytuff-Gmax",
		baseSpecies: "Wigglytuff",
		forme: "Gmax",
		types: ["Normal", "Fairy"],
		baseStats: {hp: 140, atk: 70, def: 45, spa: 85, spd: 50, spe: 45},
		abilities: {0: "Cute Charm", 1: "Competitive", H: "Frisk"},
		heightm: 20,
		weightkg: 0,
		color: "Pink",
		eggGroups: ["Fairy"],
		changesFrom: "Wigglytuff",
	},
*/	
	drampa: {
		inherit: true,
		canGigantamax: "G-Max War Story",
	},
	drampagmax: {
		num: 780,
		name: "Drampa-Gmax",
		baseSpecies: "Drampa",
		forme: "Gmax",
		types: ["Normal", "Dragon"],
		baseStats: {hp: 78, atk: 60, def: 85, spa: 135, spd: 91, spe: 36},
		abilities: {0: "Berserk", 1: "Sap Sipper", H: "Cloud Nine"},
		heightm: 20,
		weightkg: 0,
		color: "White",
		eggGroups: ["Monster", "Dragon"],
		changesFrom: "Drampa",
	},
	
	turtonator: {
		inherit: true,
		canGigantamax: "G-Max Minefield",
	},
	turtonatorgmax: {
		num: 776,
		name: "Turtonator-Gmax",
		baseSpecies: "Turtonator",
		forme: "Gmax",
		types: ["Fire", "Dragon"],
		baseStats: {hp: 78, atk: 60, def: 85, spa: 135, spd: 91, spe: 36},
		abilities: {0: "Shell Armor"},
		heightm: 20,
		weightkg: 0,
		color: "Red",
		eggGroups: ["Monster", "Dragon"],
		changesFrom: "Turtonator",
	},

}; exports.Pokedex = Pokedex;
