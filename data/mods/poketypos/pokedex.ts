export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	soaperior: {
		num: 1,
	   name: "Soaperior",
	  	types: ["Water", "Fairy"],
	  	baseStats: {hp: 75, atk: 65, def: 95, spa: 65, spd: 95, spe: 133},
	  	abilities: {0: "Water Veil", H: "Water Bubble"},
	  	weightkg: 41,
   },
   starizard: {
      num: 2,
      name: "Starizard",
		types: ["Psychic", "Dragon"],
		baseStats: {hp: 78, atk: 64, def: 78, spa: 109, spd: 105, spe: 100},
		abilities: {0: "Telepathy", H: "Analytic"},
		weightkg: 75.5,
	},
	smoninja: {
		num: 3,
		name: "Smoninja", 
		types: ["Flying", "Ghost"],
		baseStats: {hp: 71, atk: 85, def: 72, spa: 108, spd: 72, spe: 122},
		abilities: {0: "Cursed Body", 1: "White Smoke", H: "Magic Guard"},
		weightkg: 19.5,
	},
};

