export const Formats: {[k: string]: FormatData} = {
	gen9gbu: {
		effectType: 'ValidatorRule',
		name: 'Gen 9 GBU',
		desc: "The standard ruleset for all official in-game Pok&eacute;mon tournaments and Battle Spot",
		ruleset: ['Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Cancel Mod'],
		banlist: ['Battle Bond',
			'Mewtwo', 'Mew',
			'Lugia', 'Ho-Oh', 'Celebi',
			'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys',
			'Dialga', 'Palkia', 'Giratina', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
			'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
			'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
			'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zeraora',
			'Meltan', 'Melmetal', 'Zacian', 'Zamazenta', 'Eternatus', 'Zarude', 'Calyrex',
      'Wo-Chien', 'Ting-Lu', 'Chien-Pao', 'Chi-Yu', 
		],
		onValidateSet(set, format) {
			if (this.gen < 7 && this.toID(set.item) === 'souldew') {
				return [`${set.name || set.species} has Soul Dew, which is banned in ${format.name}.`];
			}
		},
	},                    
                      
	paldeapokedex: {
		effectType: 'ValidatorRule',
		name: 'Paldea Pokedex',
		desc: "Only allows Pok&eacute;mon native to the Paldea region (SV)",
		banlist: ['Tauros-Base'],
		onValidateSet(set, format) {
			const paldeaDex = [
				"Sprigatito", "Floragato", "Meowscarada", "Fuecoco", "Crocalor", "Skeledirge", "Quaxly", "Quaxwell", "Quaquaval", "Lechonk", "Oinkologne", "Tarountula", "Spidops", "Nymble", "Lokix", "Hoppip", "Skiploom", "Jumpluff", "Fletchling", "Fletchinder", "Talonflame", "Pawmi", "Pawmo", "Pawmot", "Houndour", "Houndoom", "Yungoos", "Gumshoos", "Skwovet", "Greedent", "Sunkern", "Sunflora", "Kricketot", "Kricketune", "Scatterbug", "Spewpa", "Vivillon", "Combee", "Vespiquen", "Rookidee", "Corvisquire", "Corviknight", "Happiny", "Chansey", "Blissey", "Azurill", "Marill", "Azumarill", "Surskit", "Masquerain", "Buizel", "Floatzel", "Wooper", "Clodsire", "Psyduck", "Golduck", "Chewtle", "Drednaw", "Igglybuff", "Jigglypuff", "Wigglytuff", "Ralts", "Kirlia", "Gardevoir", "Gallade", "Drowzee", "Hypno", "Gastly", "Haunter", "Gengar", "Tandemaus", "Maushold", "Pichu", "Pikachu", "Raichu", "Fidough", "Dachsbun", "Slakoth", "Vigoroth", "Slaking", "Bounsweet", "Steenee", "Tsareena", "Smoliv", "Dolliv", "Arboliva", "Bonsly", "Sudowoodo", "Rockruff", "Lycanroc", "Rolycoly", "Carkol", "Coalossal", "Shinx", "Luxio", "Luxray", "Starly", "Staravia", "Staraptor", "Oricorio", "Mareep", "Flaaffy", "Ampharos", "Petilil", "Lilligant", "Shroomish", "Breloom", "Applin", "Flapple", "Appletun", "Spoink", "Grumpig", "Squawkabilly", "Misdreavus", "Mismagius", "Makuhita", "Hariyama", "Crabrawler", "Crabominable", "Salandit", "Salazzle", "Phanpy", "Donphan", "Cufant", "Copperajah", "Gible", "Gabite", "Garchomp", "Nacli", "Naclstack", "Garganacl", "Wingull", "Pelipper", "Magikarp", "Gyarados", "Arrokuda", "Barraskewda", "Basculin", "Gulpin", "Swalot", "Meowth", "Persian", "Drifloon", "Drifblim", "Flabe\u0301be\u0301", "Floette", "Florges", "Diglett", "Dugtrio", "Torkoal", "Numel", "Camerupt", "Bronzor", "Bronzong", "Axew", "Fraxure", "Haxorus", "Mankey", "Primeape", "Annihilape", "Meditite", "Medicham", "Riolu", "Lucario", "Charcadet", "Armarouge", "Ceruledge", "Barboach", "Whiscash", "Tadbulb", "Bellibolt", "Goomy", "Sliggoo", "Goodra", "Croagunk", "Toxicroak", "Wattrel", "Kilowattrel", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Dunsparce", "Dudunsparce", "Deerling", "Sawsbuck", "Girafarig", "Farigiraf", "Grimer", "Muk", "Maschiff", "Mabosstiff", "Toxel", "Toxtricity", "Dedenne", "Pachirisu", "Shroodle", "Grafaiai", "Stantler", "Foongus", "Amoonguss", "Voltorb", "Electrode", "Magnemite", "Magneton", "Magnezone", "Ditto", "Growlithe", "Arcanine", "Teddiursa", "Ursaring", "Zangoose", "Seviper", "Swablu", "Altaria", "Skiddo", "Gogoat", "Tauros", "Litleo", "Pyroar", "Stunky", "Skuntank", "Zorua", "Zoroark", "Sneasel", "Weavile", "Murkrow", "Honchkrow", "Gothita", "Gothorita", "Gothitelle", "Sinistea", "Polteageist", "Mimikyu", "Klefki", "Indeedee", "Bramblin", "Brambleghast", "Toedscool", "Toedscruel", "Tropius", "Fomantis", "Lurantis", "Klawf", "Capsakid", "Scovillain", "Cacnea", "Cacturne", "Rellor", "Rabsca", "Venonat", "Venomoth", "Pineco", "Forretress", "Scyther", "Scizor", "Heracross", "Flittle", "Espathra", "Hippopotas", "Hippowdon", "Sandile", "Krokorok", "Krookodile", "Silicobra", "Sandaconda", "Mudbray", "Mudsdale", "Larvesta", "Volcarona", "Bagon", "Shelgon", "Salamence", "Tinkatink", "Tinkatuff", "Tinkaton", "Hatenna", "Hattrem", "Hatterene", "Impidimp", "Morgrem", "Grimmsnarl", "Wiglett", "Wugtrio", "Bombirdier", "Finizen", "Palafin", "Varoom", "Revavroom", "Cyclizar", "Orthworm", "Sableye", "Shuppet", "Banette", "Falinks", "Hawlucha", "Spiritomb", "Noibat", "Noivern", "Dreepy", "Drakloak", "Dragapult", "Glimmet", "Glimmora", "Rotom", "Greavard", "Houndstone", "Oranguru", "Passimian", "Komala", "Larvitar", "Pupitar", "Tyranitar", "Stonjourner", "Eiscue", "Pincurchin", "Sandygast", "Palossand", "Slowpoke", "Slowbro", "Slowking", "Shellos", "Gastrodon", "Shellder", "Cloyster", "Qwilfish", "Luvdisc", "Finneon", "Lumineon", "Bruxish", "Alomomola", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Tynamo", "Eelektrik", "Eelektross", "Mareanie", "Toxapex", "Flamigo", "Dratini", "Dragonair", "Dragonite", "Snom", "Frosmoth", "Snover", "Abomasnow", "Delibird", "Cubchoo", "Beartic", "Snorunt", "Glalie", "Froslass", "Cryogonal", "Cetoddle", "Cetitan", "Bergmite", "Avalugg", "Rufflet", "Braviary", "Pawniard", "Bisharp", "Kingambit", "Deino", "Zweilous", "Hydreigon", "Veluza", "Dondozo", "Tatsugiri", "Great Tusk", "Scream Tail", "Brute Bonnet", "Flutter Mane", "Slither Wing", "Sandy Shocks", "Iron Treads", "Iron Bundle", "Iron Hands", "Iron Jugulis", "Iron Moth", "Iron Thorns", "Frigibax", "Arctibax", "Baxcalibur", "Gimmighoul", "Gholdengo", "Wo-Chien", "Chien-Pao", "Ting-Lu", "Chi-Yu", "Roaring Moon", "Iron Valiant", "Koraidon", "Miraidon", 'Froakie', 'Frogadier', 'Greninja', 'Scorbunny', 'Raboot', 'Cinderace', 'Charmander', 'Charmeleon', 'Charizard',
			];
			const species = this.dex.getSpecies(set.species || set.name);
			if (!paldeaDex.includes(species.baseSpecies) && !paldeaDex.includes(species.name) &&
				!this.ruleTable.has('+' + species.id)) {
				return [`${species.baseSpecies} is not in the Paldea Pokédex.`];
			}
		},
	},
};
