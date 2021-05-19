export const Pokedex: {[speciesid: string]: SpeciesData} = {
	shayminsky: {
		num: 492,
		name: "Shaymin-Sky",
		baseSpecies: "Shaymin",
		forme: "Sky",
		types: ["Grass", "Flying"],
		gender: "N",
		baseStats: {hp: 100, atk: 103, def: 75, spa: 120, spd: 75, spe: 127},
		abilities: {0: "Flower Veil"},
		heightm: 0.4,
		weightkg: 5.2,
		color: "Green",
		eggGroups: ["Undiscovered"],
		changesFrom: "Shaymin",
	},
	landorus: {
		num: 645,
		name: "Landorus",
		baseForme: "Incarnate",
		types: ["Ground", "Flying"],
		gender: "M",
		baseStats: {hp: 89, atk: 125, def: 90, spa: 115, spd: 80, spe: 101},
		abilities: {0: "Sand Force", H: "Competitive"},
		heightm: 1.5,
		weightkg: 68,
		color: "Brown",
		eggGroups: ["Undiscovered"],
		otherFormes: ["Landorus-Therian"],
		formeOrder: ["Landorus", "Landorus-Therian"],
	},
	genesect: {
		num: 649,
		name: "Genesect",
		types: ["Bug", "Steel"],
		gender: "N",
		baseStats: {hp: 91, atk: 100, def: 95, spa: 120, spd: 95, spe: 99},
		abilities: {0: "Sniper"},
		heightm: 1.5,
		weightkg: 82.5,
		color: "Purple",
		eggGroups: ["Undiscovered"],
		otherFormes: ["Genesect-Douse", "Genesect-Shock", "Genesect-Burn", "Genesect-Chill"],
		formeOrder: ["Genesect", "Genesect-Douse", "Genesect-Shock", "Genesect-Burn", "Genesect-Chill"],
	},
	genesectdouse: {
		num: 649,
		name: "Genesect-Douse",
		baseSpecies: "Genesect",
		forme: "Douse",
		types: ["Bug", "Steel"],
		gender: "N",
		baseStats: {hp: 91, atk: 100, def: 95, spa: 120, spd: 95, spe: 99},
		abilities: {0: "Sniper"},
		heightm: 1.5,
		weightkg: 82.5,
		color: "Purple",
		eggGroups: ["Undiscovered"],
		requiredItem: "Douse Drive",
		changesFrom: "Genesect",
	},
	genesectshock: {
		num: 649,
		name: "Genesect-Shock",
		baseSpecies: "Genesect",
		forme: "Shock",
		types: ["Bug", "Steel"],
		gender: "N",
		baseStats: {hp: 91, atk: 100, def: 95, spa: 120, spd: 95, spe: 99},
		abilities: {0: "Sniper"},
		heightm: 1.5,
		weightkg: 82.5,
		color: "Purple",
		eggGroups: ["Undiscovered"],
		requiredItem: "Shock Drive",
		changesFrom: "Genesect",
	},
	genesectburn: {
		num: 649,
		name: "Genesect-Burn",
		baseSpecies: "Genesect",
		forme: "Burn",
		types: ["Bug", "Steel"],
		gender: "N",
		baseStats: {hp: 91, atk: 100, def: 95, spa: 120, spd: 95, spe: 99},
		abilities: {0: "Sniper"},
		heightm: 1.5,
		weightkg: 82.5,
		color: "Purple",
		eggGroups: ["Undiscovered"],
		requiredItem: "Burn Drive",
		changesFrom: "Genesect",
	},
	genesectchill: {
		num: 649,
		name: "Genesect-Chill",
		baseSpecies: "Genesect",
		forme: "Chill",
		types: ["Bug", "Steel"],
		gender: "N",
		baseStats: {hp: 91, atk: 100, def: 95, spa: 120, spd: 95, spe: 99},
		abilities: {0: "Sniper"},
		heightm: 1.5,
		weightkg: 82.5,
		color: "Purple",
		eggGroups: ["Undiscovered"],
		requiredItem: "Chill Drive",
		changesFrom: "Genesect",
	},
};