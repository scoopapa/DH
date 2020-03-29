'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [
	
	// Sw/Sh Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "Sw/Sh Singles", 
	},
	{
		name: "[Gen 8] Random Battle",
		desc: `Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656537/">Random Battle Suggestions</a>`,
		],

		mod: 'gen8',
		team: 'random',
		ruleset: ['PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 8] Unrated Random Battle",

		mod: 'gen8',
		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 8] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659980/">OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657382/">OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658351/">OU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	/*{
		name: "[Gen 8] OU (Blitz)",
		mod: 'gen8',
		ruleset: ['[Gen 8] OU', 'Blitz'],
	},*/
	{
		name: "[Gen 8] Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659981/">Ubers Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658364/">Ubers Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658509/">Ubers Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard'],
		banlist: [],
	},
	{
		name: "[Gen 8] UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658529/">UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659681/">UU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659427/">UU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] OU'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 8] RU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659533/">RU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660617/">RU Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] UU'],
		banlist: ['UU', 'RUBL'],
	},
	{
		name: "[Gen 8] NU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660646/">NU Metagame Discussion</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] RU'],
		banlist: ['RU', 'NUBL'],
	},
	{
		name: "[Gen 8] PU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660651/">PU Metagame Discussion</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] NU'],
		banlist: ['NU', 'PUBL'],
	},
	{
		name: "[Gen 8] LC",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656348/">LC Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657374/">LC Viability Rankings</a>`,
		],

		mod: 'gen8',
		maxLevel: 5,
		ruleset: ['Little Cup', 'Standard', 'Dynamax Clause'],
		banlist: ['Corsola-Galar', 'Drifloon', 'Gastly', 'Gothita', 'Sneasel', 'Swirlix', 'Vulpix-Base', 'Moody', 'Baton Pass'],
		onBegin() {
			if (this.rated && this.format.id === 'gen8lc') this.add('html', `<div class="broadcast-red"><strong>LC is currently suspecting Alolan Vulpix! For information on how to participate check out the <a href="https://www.smogon.com/forums/threads/3660436/">suspect thread</a>.</strong></div>`);
		},
	},
	{
		name: "[Gen 8] Monotype",
		desc: `All the Pok&eacute;mon on a team must share a type.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656253/">Monotype Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658745/">Monotype Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3660603">Monotype Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Same Type Clause', 'Standard', 'Dynamax Clause'],
		banlist: [
			'Eternatus', 'Kyurem-White', 'Lunala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings',
			'Necrozma-Dusk-Mane', 'Reshiram', 'Solgaleo', 'Zacian', 'Zamazenta', 'Zekrom',
			'Damp Rock', 'Smooth Rock', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Anything Goes",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656317/">Anything Goes</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		ruleset: ['Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 8] NFE",
		desc: `Only Pok&eacute;mon that can evolve are allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656332/">NFE Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657558/">NFE Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['NFE Clause', 'Standard', 'Dynamax Clause'],
		banlist: [
			'Doublade', 'Gurdurr', 'Ivysaur', 'Mr. Mime-Galar', 'Rhydon', 'Rufflet', 'Sneasel',
			'Type: Null', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] 1v1",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656364/">1v1 Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657779/">1v1 Viability Rankings</a>`,
		],

		mod: 'gen8',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Accuracy Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Endless Battle Clause'],
		banlist: [
			'Eternatus', 'Kyurem-Black', 'Kyurem-White', 'Lunala', 'Marshadow', 'Melmetal', 'Mew', 'Mewtwo', 'Necrozma',
			'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Sableye', 'Solgaleo', 'Zacian', 'Zamazenta', 'Zekrom',
			'Focus Sash', 'Moody', 'Perish Song',
		],
	},
	{
		name: "[Gen 8] CAP",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656824/">CAP Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658514/">CAP Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] OU', '+CAP'],
		banlist: ['Crucibelle-Mega', 'Arena Trap'],
		onValidateSet(set) {
			if (Dex.getTemplate(set.species).isUnreleased === 'Past') {
				return [`${set.species} is unreleased.`];
			}
		},
	},
	{
		name: "[Gen 8] Battle Stadium Singles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656336/">BSS Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658806/">BSS Viability Rankings</a>`,
		],

		mod: 'gen8',
		forcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Standard GBU'],
		banlist: ['Copperajah-Gmax', 'Duraludon-Gmax', 'Garbodor-Gmax', 'Gengar-Gmax', 'Machamp-Gmax'],
		minSourceGen: 8,
	},
	{
		name: "[Gen 8] Galar Beginnings",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656359/">Galar Beginnings</a>`,
		],

		mod: 'gen8',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Obtainable', 'Standard GBU'],
		unbanlist: ['Snorlax-Gmax'],
		minSourceGen: 8,
	},
	{
		name: "[Gen 8] Custom Game",

		mod: 'gen8',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		trunc(n) { return Math.trunc(n); },
		defaultLevel: 100,
		teamLength: {
			validate: [1, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// Sw/Sh Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "Sw/Sh Doubles",
	},
	{
		name: "[Gen 8] Random Doubles Battle",

		mod: 'gen8',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
	},
	{
		name: "[Gen 8] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656244/">Doubles OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658826/">Doubles OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658242/">Doubles OU Viability Rankings</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		ruleset: ['Standard Doubles'],
		banlist: ['DUber', 'Beat Up'],
	},
	{
		name: "[Gen 8] Doubles UU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658504/">Doubles UU Metagame Discussion</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		ruleset: ['[Gen 8] Doubles OU'],
		banlist: ['DOU', 'DBL'],
	},
	{
		name: "[Gen 8] VGC 2020",
		threads: [
			`&bullet; <a href="https://www.pokemon.com/us/pokemon-news/2020-pokemon-video-game-championships-vgc-format-rules/">VGC 2020 Rules</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3657818/">VGC 2020 Sample Teams</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU', 'VGC Timer'],
		banlist: [
			// Gigantamax Pokemon
			'Copperajah-Gmax', 'Duraludon-Gmax', 'Garbodor-Gmax', 'Gengar-Gmax', 'Machamp-Gmax',
			// Can't obtain in Galar without transferring
			'Cobalion', 'Raichu-Alola', 'Terrakion', 'Virizion', 'Weezing-Base',
		],
		minSourceGen: 8,
	},
	{
		name: "[Gen 8] Battle Stadium Doubles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658057/">BSD Discussion</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU'],
		banlist: ['Copperajah-Gmax', 'Duraludon-Gmax', 'Garbodor-Gmax', 'Gengar-Gmax', 'Machamp-Gmax'],
		minSourceGen: 8,
	},
	{
		name: "[Gen 8] Galar Newcomers",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3658774">Galar Newcomers</a>`],

		mod: 'gen8',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU'],
		onValidateSet(set) {
			let template = Dex.getTemplate(set.species);
			if (template.gen < 8 || (template.isGigantamax && Dex.getTemplate(template.baseSpecies).gen < 8)) {
				return [`Only Pokemon from Generation 8 are allowed.`, `(${set.species} is from Generation ${template.gen}.)`];
			}
		},
	},
	{
		name: "[Gen 8] 2v2 Doubles",
		desc: `Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656321/">2v2 Doubles</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		searchShow: false,
		teamLength: {
			validate: [2, 4],
			battle: 2,
		},
		ruleset: ['Standard Doubles', 'Accuracy Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: ['DUber', 'Dracovish', 'Focus Sash', 'Perish Song', 'Swagger'],
	},
	{
		name: '[Gen 8] Metronome Battle',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3632075/">Metronome Battle</a>`,
		],

		mod: 'gen8',
		gameType: 'doubles',
		rated: false,
		teamLength: {
			validate: [2, 2],
			battle: 2,
		},
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		banlist: [
			'Pokestar Spirit', 'Battle Bond', 'Cheek Pouch', 'Cursed Body', 'Desolate Land', 'Dry Skin', 'Fluffy', 'Fur Coat', 'Gorilla Tactics',
			'Grassy Surge', 'Huge Power', 'Ice Body', 'Iron Barbs', 'Libero', 'Moody', 'Parental Bond', 'Perish Body', 'Poison Heal', 'Power Construct',
			'Pressure', 'Primordial Sea', 'Protean', 'Pure Power', 'Rain Dish', 'Rough Skin', 'Sand Spit', 'Sand Stream', 'Snow Warning', 'Stamina',
			'Volt Absorb', 'Water Absorb', 'Wonder Guard', 'Abomasite', 'Aguav Berry', 'Assault Vest', 'Berry', 'Berry Juice', 'Berserk Gene',
			'Black Sludge', 'Enigma Berry', 'Figy Berry', 'Gold Berry', 'Iapapa Berry', 'Kangaskhanite', 'Leftovers', 'Mago Berry', 'Medichamite',
			'Oran Berry', 'Rocky Helmet', 'Shell Bell', 'Sitrus Berry', 'Wiki Berry', 'Shedinja + Sturdy', 'Harvest + Jaboca Berry', 'Harvest + Rowap Berry',
		],
		onValidateSet(set) {
			let template = this.dex.getTemplate(set.species);
			if (template.types.includes('Steel')) {
				return [`${template.species} is a Steel-type, which is banned from Metronome Battle.`];
			}
			let bst = 0;
			for (let stat in template.baseStats) {
				// @ts-ignore
				bst += template.baseStats[stat];
			}
			if (bst > 625) {
				return [`${template.species} is banned.`, `(Pok\u00e9mon with a BST higher than 625 are banned)`];
			}
			let item = this.dex.getItem(set.item);
			if (set.item && item.megaStone) {
				let bstMega = 0;
				let megaTemplate = this.dex.getTemplate(item.megaStone);
				for (let stat in megaTemplate.baseStats) {
					// @ts-ignore
					bstMega += megaTemplate.baseStats[stat];
				}
				if (template.baseSpecies === item.megaEvolves && bstMega > 625) {
					return [`${set.name || set.species}'s item ${item.name} is banned.`, `(Pok\u00e9mon with a BST higher than 625 are banned)`];
				}
			}
			if (set.moves.length !== 1 || this.dex.getMove(set.moves[0]).id !== 'metronome') {
				return [`${set.name || set.species} has illegal moves.`, `(Pok\u00e9mon can only have one Metronome in their moveset)`];
			}
		},
	},
	{
		name: "[Gen 8] Doubles Custom Game",

		mod: 'gen8',
		gameType: 'doubles',
		searchShow: false,
		maxLevel: 9999,
		trunc(n) { return Math.trunc(n); },
		defaultLevel: 100,
		debug: true,
		teamLength: {
			validate: [2, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// National Dex
	///////////////////////////////////////////////////////////////////

	{
		section: "National Dex",
	},
	{
		name: "[Gen 8] National Dex",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656899/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659038/">National Dex Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega',
			'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega',
			'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa',
			'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] National Dex AG",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656779/">AG Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658581/">AG Viability Rankings</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard NatDex'],
	},
	// Pet Mods ///////////////////////////////////////////////////////////////////
	{
		section: "Pet Mods",
		column: 2,
	},
	{
		name: "[Gen 8] Bench Abilities",
		desc: [
			"&bullet; <a href=https://www.smogon.com/forums/threads/.3648706/>Bench Abilities</a>",
		],
		ruleset: [ 'Species Clause', 'Moody Clause', 'Baton Pass Clause', 
					'Evasion Moves Clause', 'OHKO Clause', 'Swagger Clause', 'Endless Battle Clause', 
					'Team Preview', 'HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod', 'Standard GBU',
					'Standard Natdex'],
		banlist: ['Unreleased', ],
		mod: "benchabilities",
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		requirePentagon: true,
		
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let pokemon of allPokemon) {
				let benchAbility = ''
				let template = pokemon.template
				if (template.abilities.S){
					benchAbility = toID(template.abilities.S);
				}
				let battle = pokemon.battle;
				if ( !battle.benchPokemon ) {
					battle.benchPokemon = [];
					// use this function to retrieve a pokemon's info table using their bench ability ( retrieves FIRST pokemon with that ability )
					battle.benchPokemon.getPKMNInfo = function( ability, side ) 
					{ 
						let battle = side.battle
						let allyBench = battle.benchPokemon[ side.id ]
						ability = toID( ability )
						for (let i = 0; i < 6; i++ ) {
							let pkmnInfo = allyBench[ i ];
							if ( pkmnInfo && pkmnInfo.ability === ability ) {
								return pkmnInfo;
							}
						}
					};
				}
				let sideID = pokemon.side.id;
				if ( !battle.benchPokemon[ sideID ] ) {
					battle.benchPokemon[ sideID ] = [];
				}
				let allyBench = battle.benchPokemon[ sideID ]
				let pkmnInfo = {}
				// add code here if you need more info about bench pokemon for an ability
				pkmnInfo[ 'id' ] = pokemon.id;
				pkmnInfo[ 'name' ] = pokemon.name;
				pkmnInfo[ 'types' ] = pokemon.types;
				pkmnInfo[ 'ability' ] = benchAbility;
				pkmnInfo[ 'item' ] = pokemon.item;
				//-----------------------------------------------------------------------
				allyBench.push( pkmnInfo )
			}
		},
		onBeforeSwitchIn: function (pokemon) {
			let battle = pokemon.battle;
			let sideID = pokemon.side.id;
			let allyBench = battle.benchPokemon[ sideID ];
			if ( battle.turn === 0 ) {
				for (const ally of pokemon.side.pokemon) {
					for ( var pos in allyBench ) {
						 if ( allyBench[ pos ].id === ally.id 
							|| allyBench[ pos ].id === pokemon.id )
						{					
							 delete allyBench[ pos ];
						}
					}
				}
				//Precocious Pupae move change to Stored Power ----------------------------------
				let precociousPupae = [ 'kakuna', 'metapod', 'silcoon', 'cascoon', 'spewpa' ]
				for (const ally of pokemon.side.pokemon) {
					 if ( precociousPupae.includes( pokemon.speciesid ) 
						&& battle.getPKMNInfo( 'precociouspupae', sideID ))
					{
						console.log( ally.set )
					}
				}
				//-------------------------------------------------------------------------------
			}
			for ( var pos in allyBench ) {  
				let benchAbility = allyBench[ pos ].ability
				if ( benchAbility !== '' ) {
					let effect = 'ability' + benchAbility;
					pokemon.volatiles[effect] = {id: effect, target: pokemon};
				}
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			let battle = pokemon.battle;
			let sideID = pokemon.side.id;
			let allyBench = battle.benchPokemon[ sideID ];
			for ( var pos in allyBench) {
				let benchAbility = allyBench[ pos ].ability
				if ( benchAbility !== '' ) {
					let effect = 'ability' + benchAbility;
					delete pokemon.volatiles[effect];
					pokemon.addVolatile(effect);
				}
			}
		},
		onAfterMega: function (pokemon) {
			let battle = pokemon.battle;
			let sideID = pokemon.side.id;
			let allyBench = battle.benchPokemon[ sideID ];
			pokemon.removeVolatile('ability' + pokemon.baseAbility);
			for (var pos in allyBench) {  
				let benchAbility = allyBench[ pos ].ability
				if ( benchAbility !== '' ) {
					let effect = 'ability' + benchAbility;
					pokemon.addVolatile(effect);
				}
			}
		},
	},
	{
  		name: "[Gen 8] Breeding Variants",
  		desc: ["Breeding Variants, the mod where pokemon degeneracy pays off.",
		      ],
  		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 
					'Baton Pass Clause', 'Standard Natdex'],
		mod: 'breedingvariants',
		banlist: ['Unreleased', ],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
  	},
	{
		name: "[Gen 8] More Balanced Hackmons",
		desc: `A National Dex mod of Balanced Hackmons with new pokemon, moves, and abilities, as well as some additional bans.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-more-balanced-hackmons.3644050/">More Balanced Hackmons</a>`,
		],
		mod: 'morebalancedhackmons',
		ruleset: [ 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Sleep Clause Mod',
					'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 
					'Species Clause', '+Past'],
		banlist: ['Groudon-Primal', 'Eternatus-Eternamax', 'Arena Trap', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 
					'Moody', 'Parental Bond', 'Protean', 'Psychic Surge', 'Pure Power', 'Shadow Tag', 
					'Stakeout', 'Water Bubble', 'Wonder Guard', 'Gengarite', 'Chatter', 'Comatose + Sleep Talk',
					'Libero', 'Neutralizing Gas', 'Gorilla Tactics', 'Contrary'],
		onChangeSet(set) {
			const item = toID(set.item);
			if (set.species === 'Zacian' || set.species === 'Zacian-Crowned') {
				if (item === 'rustedsword') {
					set.species = 'Zacian-Crowned';
					set.ability = 'Intrepid Sword';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothblade';
					}
				} else {
					set.species = 'Zacian';
				}
			}
			else if (set.species === 'Zamazenta' || set.species === 'Zamazenta-Crowned') {
				if (item === 'rustedshield') {
					set.species = 'Zamazenta-Crowned';
					set.ability = 'Dauntless Shield';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothbash';
					}
				} else {
					set.species = 'Zamazenta';
				}
			}
		},
		onValidateTeam(team, format){
			/**@type {{[k: string]: true}} */
			let abilityTable = [];
			for (const set of team) {
				let template = this.dex.getTemplate(set.species);
				if (template.species == 'Zacian-Crowned' && template.ability != 'Intrepid Sword')
					 return ["Zacian-Crowned can only have Intrepid Sword as its ability."]
				if (template.species != 'Zacian-Crowned' && template.ability == 'Intrepid Sword')
					 return ["Only Zacian-Crowned can have Intrepid Sword as its ability."]
				if (!abilityTable.includes( set.ability )){
					abilityTable.push( set.ability );
				}
				else {
					return [`You have more than one pokemon with the ability ${set.ability}.`];
				}
			}
		},
	},
	{
		name: "[Gen 8] Roulettemons",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/roulettemons.3649106/>Roulettemons</a>",
		      ],
		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'roulettemons',
	},
	{
		name: "[Gen 8] Crossover Chaos v2",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-v2.3636780/>Crossover Chaos</a>",
		      ],
		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 
					'Swagger Clause', 'Baton Pass Clause', 'Obtainable', 'Standard Natdex'],
		banlist: ['Uber'],
		mod: 'crossoverchaos',
    onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getTemplate(set.species);
				if ( template.tier === 'V1' || template.tier === 'EX' ) {
					return ["You are not allowed to use pokemon from " + template.tier + ". ( " + template.species + " )"];
				}
			}
		},
	},
	{
		name: "[Gen 8] Crossover Chaos Expanded",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-expanded-side-project.3647108/>Crossover Chaos</a>",
		      ],
		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 
					'Swagger Clause', 'Baton Pass Clause', 'Obtainable', 'Standard Natdex'],
		banlist: ['Uber'],
		mod: 'crossoverchaos',
    onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getTemplate(set.species);
				if ( template.tier === 'V1' || template.tier === 'V2' ) {
					return ["You are not allowed to use pokemon from " + template.tier + ". ( " + template.species + " )"];
				}
			}
		},
	},
	{
		name: "[Gen 8] Crossover Chaos v2 + Expanded Ubers",
		desc: [
				"&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-v2.3636780/>Crossover Chaos</a>",
		      "&bullet; <a href=https://www.smogon.com/forums/threads/crossover-chaos-expanded-side-project.3647108/>Crossover Chaos</a>"],
		ruleset: [ 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
					'Swagger Clause', 'Baton Pass Clause', 'Obtainable', 'Standard Natdex'],
		banlist: [],
		mod: 'crossoverchaos',
	}, 
	{
		name: "[Gen 8] Optimons",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-optimons-gen-4-cross-gen-evos.3657509/">OU Thread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1k_nvLAq1Qh0yfFjYSr-hy9xsoglgkZTGriKdM6oFRDI/edit#gid=0">Spreadsheet</a>`,
		],

		mod: 'optimons',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] Perfect Galar",
		desc: [ "The goal of Perfect Galar is to make a Sword and Shield OU metagame where every single fully evolved Pokemon in the Galar Pokedex has a unique, valuable niche.",
				"&bullet; <a href=https://www.smogon.com/forums/threads/gen-8-perfect-galar.3656660/>Perfect Galar</a>",],
		ruleset: ['Obtainable', 'Standard',],
		banlist: ['Uber', 'Shadow Tag', 'Baton Pass'],
		unbanlist: ['Darmanitan-Galar'],
		mod: 'perfectgalar',
		onBegin: function(){
			this.getMaxBoost = function( statName, pokemon ){
				let statBoosts = {
					dynamax: { hp: 0, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 },
					alcremie: { hp: 0, atk: 0, def: 30, spa: 10, spd: 10, spe: 0 },
					appletun: { hp: 0, atk: 0, def: 30, spa: 20, spd: 0, spe: 0 },
					butterfree: { hp: 0, atk: 0, def: 0, spa: 10, spd: 0, spe: 40 },
					centiscorch: { hp: 0, atk: 20, def: 30, spa: 0, spd: 0, spe: 0 },
					charizard: { hp: 0, atk: 30, def: 0, spa: 10, spd: 0, spe: 10 },
					coalossal: { hp: 0, atk: 0, def: 0, spa: 35, spd: 15, spe: 0 },
					copperajah: { hp: 0, atk: 0, def: 30, spa: 0, spd: 20, spe: 0 },
					corviknight: { hp: 0, atk: 10, def: 10, spa: 0, spd: 30, spe: 0 },
					drednaw: { hp: 0, atk: 25, def: 15, spa: 0, spd: 0, spe: 10 },
					duraludon: { hp: 0, atk: 0, def: 5, spa: 20, spd: 25, spe: 0 },
					eevee: { hp: 0, atk: 50, def: 0, spa: 0, spd: 0, spe: 0 },
					flapple: { hp: 20, atk: 5, def: 10, spa: 0, spd: 10, spe: 5 },
					garbodor: { hp: 0, atk: 10, def: 25, spa: 0, spd: 25, spe: -10 },
					gengar: { hp: 0, atk: 0, def: 25, spa: 10, spd: 15, spe: 0 },
					hatterene: { hp: 0, atk: 10, def: 0, spa: 16, spd: 24, spe: 0 },
					kingler: { hp: 0, atk: 20, def: 0, spa: 0, spd: 0, spe: 30 },
					lapras: { hp: 0, atk: 0, def: 20, spa: 0, spd: 30, spe: 0 },
					machamp: { hp: 0, atk: 30, def: 0, spa: 0, spd: 0, spe: 20 },
					melmetal: { hp: 0, atk: 10, def: 10, spa: 0, spd: 0, spe: 30 },
					meowth: { hp: 0, atk: 5, def: 0, spa: 0, spd: 0, spe: 45 },
					orbeetle: { hp: 0, atk: 0, def: 0, spa: 30, spd: 0, spe: 20 },
					pikachu: { hp: 30, atk: 10, def: 10, spa: 20, spd: 10, spe: -30 },
					sandaconda: { hp: 0, atk: 0, def: 20, spa: 0, spd: 0, spe: 30 },
					toxtricity: { hp: 0, atk: 20, def: 0, spa: 4, spd: 16, spe: 10 },
				}
				let boostType = statBoosts.dynamax;
				if ( pokemon.canGigantamax ) boostType = statBoosts[ pokemon.speciesid ];
				let statBoost = boostType[ statName ];
				return statBoost;
			};
			this.doMaxBoostFormeChange = function( pokemon, isPermanent ){
				if ( !pokemon.hasDynamaxed ) return;
				let template = this.dex.deepClone( pokemon.template );
				if ( pokemon.lastFormeBoosted !== pokemon.template.forme ){ // don't boost the same forme twice in a row
					for ( let statName in template.baseStats ){
						let boost = this.getMaxBoost( statName, pokemon );
						template.baseStats[ statName ] = template.baseStats[ statName ] + boost;
					}
				}
				pokemon.lastFormeBoosted = pokemon.template.forme;
				pokemon.formeChange(template, "dynamax", isPermanent);
			};
			let oldMaxPowers = [100, 110, 120, 130, 140, 150];
			let weakMaxPowers = [75, 80, 85, 90, 95, 100];
			let maxPowers = [85, 90, 95, 100, 105, 110];
			this.newGMaxPower = function( move ){
				let gmaxPower = 90;
				if (!move.basePower) {
					return gmaxPower;
				} else if ( !move.gmaxPower ){
					return null;
				} else if (['Fighting', 'Poison'].includes(move.type)) {
					return move.gmaxPower;
				} else if (['Flying'].includes(move.type)) {
					for ( const i in oldMaxPowers ){
						if ( move.gmaxPower === oldMaxPowers[i] ){
							gmaxPower = weakMaxPowers[i]
							break
						}
					}
				} else {
					for ( const i in oldMaxPowers ){
						if ( move.gmaxPower === oldMaxPowers[i] ){
							gmaxPower = maxPowers[i]
							break
						}
					}
				}
				return gmaxPower;
			};
		},
		onSwitchIn( pokemon ){
			if ( pokemon.hasDynamaxed ) pokemon.addVolatile( pokemon.volatileTag );
		},
	}, 
	{
		name: "[Gen 8] PokeClasses",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/gen-8-pokeclasses-playtesting-phase-1.3657264//>PokeClasses</a>"],
		ruleset: ['Standard Natdex', 'PokeSkills Move Legality'],
		banlist: [],
		mod: 'pokeclasses',
		onBegin() {
			let allPokemon = this.p1.pokemon.concat( this.p2.pokemon );
			for ( let pokemon of allPokemon ) {
				//apply pokeClasses
				if ( this.format.pokeClasses.includes( pokemon.set.name )){
					pokemon.pokeClass = pokemon.set.name;
				}
				//apply pokeSkills
				for ( let i in pokemon.set.moves ) {
					let pokeSkillName = pokemon.set.moves[i];
					if ( this.format.pokeSkills.includes( pokeSkillName )){
						pokemon.pokeSkill = pokeSkillName;
					}
				}
			}
		},
		pokeClasses: ['warrior','mage','thief'],
		pokeSkills: ['blade','destruction','athletics'],
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			if ( pokemon.pokeClass ) pokemon.addVolatile('ability:' + pokemon.pokeClass, pokemon);
			if ( pokemon.pokeSkill ) pokemon.addVolatile(pokemon.pokeSkill);
		},
	}, 
	{
		name: "[Gen 8 Pet Mod] Clean Slate 2",
		desc: `A brand new metagame created from scratch, with the ultimate goal of creating a unique metagame different from any other tier.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/clean-slate-2.3657640/">Clean Slate 2</a>`,
		],
		mod: 'cleanslate2',
		banlist: ['All Pokemon'],
		unbanlist: [
			'Weezing-Galar', 'Orbeetle', 'Stonjourner', 'Cherrim-Sunshine', 'Zacian', 'Dubwool', 'Gumshoos', 'Seismitoad', 'Snorlax-Gmax', 'Walrein', 'Dhelmise', 'Togekiss', 'Scolipede', 'Cursola', 'Torkoal', 'Gligar', 'Octillery', 'Necrozma', 'Dunsparce', 'Victreebel', 'Runerigus', 'Aerodactyl', 'Unown-P', 'Unown-S', 'Unown-M', 'Shaymin', 'Shaymin-Sky', 'Scrafty',
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
		},
	},
	// Old Pet Mods ///////////////////////////////////////////////////////////////////
	{
		section: "Old Pet Mods",
		column: 3,
	},
	{
  		name: "[Gen 7] Clean Slate",
  		desc: [
			"&bullet; <a href=https://www.smogon.com/forums/threads/.3639262/>Clean Slate</a>",
			"&bullet; <a href=https://www.smogon.com/forums/threads/clean-slate-resources.3643897/>Clean Slate Resources</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'cleanslate',
		banlist: ['Unreleased', ],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] Clean Slate: Micro",
		desc: `A brand new micrometagame from scratch, varied compact metagame existing separately from any tier.`,
  		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/.3652540/">Clean Slate: Micro</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1GNLvQsM1F6pw1JS7IA6IyrgME1iJ4M0UWLrieGSPQuU/edit#gid=1994258282">Spreadsheet of Changes</a>`,
		      ],
  		ruleset: ['Obtainable', 'Sleep Clause Mod', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 
					'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Dynamax Clause', 'Standard NatDex'],
		mod: 'cleanslatemicro',
		banlist: ['Baton Pass'],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getTemplate(set.species);
				if (speciesTable[template.species]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different Rotom formes). ", "You have more than one " + template.baseSpecies + "."];
				}
				speciesTable[template.species] = true;
				if ( template.tier !== 'CSM' ) {
					return [template.species + ' is not useable in Clean Slate: Micro.'];
				}
			}
		},
  	},
	{
  		name: "[Gen 7] Community Create a Pet Mod",
  		desc: [
			"&bullet; <a href=https://www.smogon.com/forums/threads/.3644840/>Community Create a Pet Mod</a>",
		      ],
  		ruleset: ['Pokemon2', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'ccam',
		banlist: ['Unreleased', ],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] Eevee'd",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/eeveed-current-slate-sliggoo-and-sunkern-submissions.3602933/>Eeveed</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		banlist: ['Unreleased', ],
		mod: 'eeveed',
  	},
	{
  		name: "[Gen 7] Evos for Everyone",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/evos-for-everyone-slate-10-cryogonal-delibird-moltres.3636813/>Evos for Everyone</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'evosforeveryone',
		banlist: ['Unreleased', ],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] Evos for Everyone LC",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/evos-for-everyone-slate-10-cryogonal-delibird-moltres.3636813/>Evos for Everyone</a>",
		      ],
  		maxLevel: 5,
		mod: 'evosforeveryone',
		ruleset: ['Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: [
			'Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Vulpix-Base', 'Yanma',
			'Eevium Z', 'Dragon Rage', 'Sonic Boom',
		],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] Fresh Takes",
  		desc: ["Fresh Takes, where the takes are fresh and the pokemon are zesty",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'freshtakes',
		banlist: ['Unreleased', ],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] From Untiered to Ubers",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/from-untiereds-to-ubers.3651231/>From Untiered to Ubers</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'fromuntieredtoubers',
		banlist: ['Unreleased', ],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] Fusion Evolution",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/fusion-evolution-v2-submission-phase.3560216/>Fusion Evolution</a>",
  		       "&bullet; <a href=http://www.smogon.com/forums/threads/fusion-moves-fusion-evolution-companion-project.3564805/>Fusion Moves</a>",
  		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Unreleased', /*'Dialcatty', 'Kars', 'Dittsey', 'Diceus', 'Peridot-Mega', 'Kyzor', 'Gonzap', 'Harem', 'Cinshado', 'Enteon', 'Lucashadow-Mega', 'Taiwan', 'Dad', 'Enteon', 'Entir', 'Necrynx-Ultra', 'Shenala', 'Xurkizard-Mega-Y', 'Archedactyl-Mega', 'Miminja', 'Toxicario-Mega', 'Lucasol-Mega-L', 'Alakario-Mega-L', 'Kangorus-Khan-Mega', 'Absoko-Mega', 'Kartaria-Mega', 'Dio', 'Mendoza', 'Deoxurk-Outlet', 'Omneus','Muddy Seed'*/], // Mega Kasukabe Necrozerain-Ultra'
		mod: 'fe',
		onPrepareHit: function(target, source, move) {
			if (!move.contestType) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Celebrate", target);
			}
		},
//   		onModifyTemplate: function (template, pokemon, source) {
//   			//This hack is for something important: The Pokemon's Sprite.
//   			if (!template.base) return template;
//   			let temp = Object.assign({}, template);
//   			temp.species = temp.baseSpecies = template.base;
// 			pokemon.name = template.species;
// 			pokemon.fullname = `${pokemon.side.id}: ${pokemon.name}`;
// 			pokemon.id = pokemon.fullname;
// 			return temp;
//   		},
		onSwitchIn: function (pokemon) {
			if (pokemon.illusion){
			this.add('-start', pokemon, 'typechange', pokemon.illusion.template.types.join('/'), '[silent]');
				let illusionability = this.getAbility(pokemon.illusion.ability);
				this.add('raw',illusionability,illusionability.shortDesc);
			} else {
				let ability = this.getAbility(pokemon.ability);
				if (pokemon.hasAbility('typeillusionist') || pokemon.hasAbility('sleepingsystem')){
			 this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');	
				} else {
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[silent]');
				}
				this.add('raw',ability,ability.shortDesc);
			}
        },
		checkLearnset: function (move, template, lsetData, set) {
           return null
        },
  	},
	{
		name: "[Gen 7] Generation SD",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/.3641374/">Generation SD</a>`,
		],
		mod: 'gensd',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause', 'Team Preview'],
		//banlist: ['DUber', 'Power Construct', 'Eevium Z', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder'],
	},
	{
  		name: "[Gen 7] G-Luke's Ideal World",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/g-lukes-ideal-world-v1.3627945/>G-Luke's Ideal World</a>",
		      ],
  		ruleset: ['Gen 7 [OU]'],
		mod: 'lukemod',
		//banlist: [],
		unbanlist: ['Blaziken', 'Shaymin-Sky', 'Kangaskhanite', 'Gengarite'],
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Ground' && target.hasType('Lev')) {
				this.add('-immune', target, '[msg]');
				return null;
			}
		},
	},
	{
		name: "[Gen 7] Hazards: The Stackening",
		desc: `A metagame with Stealth Rock variants of every type; and they all stack with each other!.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3639262/">Hazards: The Stackening</a>`,
		],
		mod: 'HTS',
		ruleset: [ 'Standard','OHKO Clause','Team Preview','Evasion Moves Clause','Endless Battle Clause','Sleep Clause Mod', 'Freeze Clause Mod'],
		checkLearnset: function (move, template, lsetData, set) {
			const restrictedMoves = this.format.restrictedMoves || [];
			let prevo = template.isMega ? this.getTemplate(template.species.substring(0, template.species.length - 5)).prevo : template.prevo;
			let stealthHazards = ['stealthnormal', 'stealthwater', 'stealthgrass', 'stealthghost', 'stealthground', 'stealthice', 'stealthelectric', 'stealthdark', 'stealthdragon', 'stealthfire', 'stealthfighting', 'stealthfairy', 'stealthbug', 'stealthpoison', 'stealthpsychic', 'stealthrock', 'stealthsteel', 'stealthflying',];
			let types = {};
			if ( stealthHazards.includes(move.id) && !restrictedMoves.includes(move.name) && !move.isZ ) {
				for ( let i in template.learnset ) {
					if ( i !== 'hiddenpower' ) types[ Dex.getMove(i).type ] = true;
				}	
				while (prevo)
				{
					for ( let i in prevo.learnset ) {
						if ( i !== 'hiddenpower' ) types[ Dex.getMove(i).type ] = true;
					}			
					prevo = Dex.getTemplate(prevo).prevo;
				}
				let baseTemplate = Dex.getTemplate(template.baseSpecies);
				if (baseTemplate.otherFormes) {
					for (const formeid of baseTemplate.otherFormes) {
						let forme = Dex.getTemplate(formeid);
						if (!forme.battleOnly) {
							if (forme.forme !== 'Alola' && forme.forme !== 'Alola-Totem' && forme.baseSpecies !== 'Wormadam') {
								for ( let i in forme.learnset ) {
									if ( i !== 'hiddenpower' ) types[ Dex.getMove(i).type ] = true;
								}			
							}
						}
					}
				}
				if (types[ move.type ]) return null;
			}
			return this.checkLearnset(move, template, lsetData, set);
		},
	},	
	{
		name: "[Gen 7] Jillian",
		desc: ["&bullet; A custom region",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'jillian',
	},
	{
		name: "[Gen 7] Megas For All",
		desc: ["&bullet; Megas",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'megasforall',
		searchShow: false,
	},
	{
		name: "[Gen 1 The Pokedex Redone] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3572352/">RBY OU Viability Ranking</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3650478/#post-8133786">RBY Sample Teams</a>`,
		],

		mod: 'tpr',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
  		name: "[Gen 7] Pokemon Let's Go",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/p.3640426/>Pokemon: Let's Go</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'letsgo',
		// banlist: ['Unreleased', ],
  	},
	{
		name: "[Gen 7] Monotype Gen 8",
		desc: [
			"A Monotype-based pet mod with lots of new pokemon.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3642289/\">Monotype Gen 8 Thread</a>",
		],

		mod: 'monotypegen8',
		ruleset: ['Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound',
			'Kartana', 'Kyogre', 'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Shadow Tag', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Medichamite', 'Metagrossite', 'Salamencite', 'Smooth Rock', 'Terrain Extender', 'Baton Pass', , 'Unreleased'
		],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
	},
	
	{
		name: "[Gen 7] Mega Mirrors",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/mega-mirrors-slate-1-voting-abomasnow-absol-aerodactyl.3644178/">Mega Mirrors</a>`,
		],
		mod: 'megamirrors',
		ruleset: ['Standard', 'Team Preview'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
  		name: "[Gen 7] OptiMons",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/.3609208/>OptiMons</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		banlist: ['Unreleased', ],
		mod: 'opti',
  	},
	{
		name: "[Gen 7] Pokemon: The New First Generation",
		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/pokemon-the-new-first-gen-submissions-for-new-pokemon-over.3578653/>Pokemon: The New First Generation</a>",
		       "&bullet; <a href=https://docs.google.com/spreadsheets/d/1RT8-Ntryi_SvlD_AwBCPWTso7bFZNpAGX4F7wuHBPQY/edit>Pokemon: The New First Gen Spreadhseet</a>",
		       "&bullet; Use /dgen (Pokemon/Item/Ability/Move) for more info",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'thefirstnewgen',
	},
	{
  		name: "[Gen 7] Super Smash Mods",
  		desc: ["None Yet!",
		      ],
  		ruleset: ['Gen 7 [Ubers]'],
		mod: 'smashmods',
		//banlist: [],
	},
	{
		name: "[Gen 7] Sylvemons",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3612509/>SylveMons</a>",
				 "&bullet; <a href=https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit>Sylvemons Archive</a>",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [ 'Uber', 'Arena Trap', /*'Time Warp', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stalwart + Calm Mind', 'Stakataka', 'Raichu-Alola', 'Regice', 'Buzzwole + Perseverance', 'Reverse Core'*/],
		unbanlist: ['Blaziken'],
		mod: 'sylvemons',
	},
	{
		name: "[Gen 7] Sylvemons [Test]",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3612509/>SylveMons</a>",
				 "&bullet; <a href=https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit>Sylvemons Archive</a>",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [, 'Uber', 'Arena Trap', 'Time Warp', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stalwart + Calm Mind', 'Stakataka', 'Raichu-Alola', 'Regice', 'Buzzwole + Perseverance', 'Reverse Core'],
		unbanlist: ['Blaziken'],
		mod: 'sylvemonstest',
	},
	{
		name: "[Gen 7] Tennysonmons",
		desc: ["&bullet; Benmons",],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		//banlist: [],
		mod: 'tennysonmons',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 7] The Pokedex According to Spook",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/the-pokedex-according-to-spook.3645318/>The Pokedex According to Spook</a>",],
		ruleset: ['Standard', 'Team Preview'],
		unbanlist: ['Aegislash', 'Aegislash-Blade', 'Shadow Tag', 'Arena Trap'],
		banlist: ['Stance Change', 'Uber'],
		//banlist: [],
		mod: 'Spookdex',
	},
	{
		name: "[Gen 7] Typing: The Mod",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3634253/>Typing: The Mod</a>",],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		//banlist: [],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
		onBegin: function () {
			this.zMoveTable.Space = 'Event Horizon'
			this.zMoveTable.Time = 'Eternal Onslaught'
			this.zMoveTable.Light = 'Radiance Nova'
			this.zMoveTable.Heart = 'Compassion Cannon'
			this.zMoveTable.Food = 'Culinary Cataclysm'
		},
		mod: 'ttm',
		
	},
	{
  		name: "[Gen 7] Type Optimisation",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/type-optimisation-slate-11-submissions-ghost-ghost-psychic-ghost-normal.3602766/>Type Optimisation</a>",
		      ],
  		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		banlist: ['Unreleased', ],
		mod: 'typeopt',
  	},
	{
		name: "[Gen 7] Ultra Space Variants",
		desc: ["&bullet; With the existence of alternate dimensions and regional Variants, why hasn't anyone combined the two? Welcome to the world of Ultra Space. This world is inhabited by strange creatures called Ultra Beasts. However, oddly enough, stranger creatures called Pokémon have slipped into our dimension through wormholes. These Pokemon have gone through odd changes, but somehow make them even stronger than usual. Astonishing, isn't it?",
				 "&bullet; <a href=http://www.smogon.com/forums/threads/ultra-space-variants-submissions-tentaquil-and-lolwutcar.3594692/>Ultra Space Variants V1</a>",
				 "&bullet; <a href=http://www.smogon.com/forums/threads/ultra-space-variants-v2-slate-johto-starters.3602098/>Ultra Space Variants V2",
		      ],
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'usv',
	},
	{
		name: "[Gen 7] Z-Moves Everywhere",
		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/z-moves-everywhere-slate-4-ninetales-torkoal-groudon-submissions-phase-extended.3592186/>Z-Moves Everywhere</a>"],
		ruleset: ['[Gen 7] Ubers'],
		banlist: ['Unreleased', ],
		mod: 'zmoveseverywhere',
	},

	// OM of the Month
	///////////////////////////////////////////////////////////////////

	{
		section: "OM of the Month",
		column: 4,
	},
	{
		name: "[Gen 8] Inheritance",
		desc: `Pok&eacute;mon may use the ability and moves of another, as long as they forfeit their own learnset.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656811/">Inheritance</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] OU'],
		banlist: ['Shedinja', 'Assist', 'Shell Smash', 'Arena Trap', 'Huge Power', 'Imposter', 'Innards Out', 'Pure Power', 'Water Bubble'],
		restricted: ['Dracovish', 'Dracozolt'],
		// @ts-ignore
		getEvoFamily(species) {
			let template = Dex.getTemplate(species);
			while (template.prevo) {
				template = Dex.getTemplate(template.prevo);
			}
			return template.speciesid;
		},
		validateSet(set, teamHas) {
			const bannedDonors = this.format.restricted || [];
			if (!teamHas.abilityMap) {
				teamHas.abilityMap = Object.create(null);
				for (const speciesid in Dex.data.Pokedex) {
					let pokemon = Dex.getTemplate(speciesid);
					if (pokemon.isNonstandard || pokemon.isUnreleased) continue;
					if (pokemon.requiredAbility || pokemon.requiredItem || pokemon.requiredMove) continue;
					if (pokemon.isGigantamax || bannedDonors.includes(pokemon.species)) continue;

					for (const key of Object.values(pokemon.abilities)) {
						let abilityId = toID(key);
						if (abilityId in teamHas.abilityMap) {
							teamHas.abilityMap[abilityId][pokemon.evos ? 'push' : 'unshift'](speciesid);
						} else {
							teamHas.abilityMap[abilityId] = [speciesid];
						}
					}
				}
			}

			const problem = this.validateForme(set);
			if (problem.length) return problem;

			let template = Dex.getTemplate(set.species);
			if (!template.exists || template.num < 1) return [`The Pok\u00e9mon "${set.species}" does not exist.`];
			if (template.isNonstandard || template.isUnreleased) return [`${template.species} is not obtainable in gen 8.`];
			if (toID(template.tier) === 'uber' || this.format.banlist.includes(template.species)) {
				return [`${template.species} is banned.`];
			}

			const name = set.name;

			let ability = Dex.getAbility(set.ability);
			if (!ability.exists || ability.isNonstandard) return [`${name} needs to have a valid ability.`];
			let pokemonWithAbility = teamHas.abilityMap[ability.id];
			if (!pokemonWithAbility) return [`"${set.ability}" is not available on a legal Pok\u00e9mon.`];

			// @ts-ignore
			this.format.debug = true;

			if (!teamHas.abilitySources) teamHas.abilitySources = Object.create(null);
			/** @type {string[]} */
			let validSources = teamHas.abilitySources[toID(set.species)] = []; // Evolution families
			let canonicalSource = ''; // Specific for the basic implementation of Donor Clause (see onValidateTeam).

			for (const donor of pokemonWithAbility) {
				let donorTemplate = Dex.getTemplate(donor);
				// @ts-ignore
				let evoFamily = this.format.getEvoFamily(donorTemplate);
				if (validSources.includes(evoFamily)) continue;
				set.species = donorTemplate.species;
				const problems = this.validateSet(set, teamHas) || [];

				if (!problems.length) {
					validSources.push(evoFamily);
					canonicalSource = donorTemplate.species;
				}
				// Specific for the basic implementation of Donor Clause (see onValidateTeam).
				if (validSources.length > 1) break;
			}
			// @ts-ignore
			this.format.debug = false;

			set.name = name;

			set.species = template.species;
			if (!validSources.length) {
				if (pokemonWithAbility.length > 1) return [`${name}'s set is illegal.`];
				return [`${name} has an illegal set with an ability from ${Dex.getTemplate(pokemonWithAbility[0]).name}.`];
			}

			// Protocol: Include the data of the donor species in the `ability` data slot.
			// Afterwards, we are going to reset the name to what the user intended.
			set.ability = `${set.ability}0${canonicalSource}`;
			return null;
		},
		onValidateTeam(team, format, teamHas) {
			// Donor Clause
			let evoFamilyLists = [];
			for (const set of team) {
				let abilitySources = (teamHas.abilitySources && teamHas.abilitySources[toID(set.species)]);
				if (!abilitySources) continue;
				// @ts-ignore
				evoFamilyLists.push(abilitySources.map(this.format.getEvoFamily));
			}

			// Checking actual full incompatibility would require expensive algebra.
			// Instead, we only check the trivial case of multiple Pokémon only legal for exactly one family. FIXME?
			let requiredFamilies = Object.create(null);
			for (const evoFamilies of evoFamilyLists) {
				if (evoFamilies.length !== 1) continue;
				let [familyId] = evoFamilies;
				if (!(familyId in requiredFamilies)) requiredFamilies[familyId] = 1;
				requiredFamilies[familyId]++;
				if (requiredFamilies[familyId] > 2) {
					return [
						`You are limited to up to two inheritances from each evolution family by the Donor Clause.`,
						`(You inherit more than twice from ${this.dex.getTemplate(familyId).species}).`,
					];
				}
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.baseAbility.includes('0')) {
					let donor = pokemon.baseAbility.split('0')[1];
					pokemon.m.donor = toID(donor);
					pokemon.baseAbility = toID(pokemon.baseAbility.split('0')[0]);
					pokemon.ability = pokemon.baseAbility;
				}
			}
		},
		onSwitchIn(pokemon) {
			if (!pokemon.m.donor) return;
			let donorTemplate = this.dex.getTemplate(pokemon.m.donor);
			if (!donorTemplate.exists) return;
			// Place volatiles on the Pokémon to show the donor details.
			this.add('-start', pokemon, donorTemplate.species, '[silent]');
		},
	},
		// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "Other Metagames",
		column: 4,
	},
	{
		name: "[Gen 8] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656408/">Balanced Hackmons</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Eternatus-Eternamax', 'Shedinja', 'Comatose + Sleep Talk', 'Double Iron Bash', 'Octolock',
			'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull', 'Moody',
			'Neutralizing Gas', 'Parental Bond', 'Protean', 'Psychic Surge', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
		],
		onValidateSet(set) {
			if (set.species === 'Zacian-Crowned' && (toID(set.item) !== 'rustedsword' || toID(set.ability) !== 'intrepidsword')) {
				return [set.species + " is banned."];
			}
		},
		onChangeSet(set) {
			const item = toID(set.item);
			if (set.species === 'Zacian' && item === 'rustedsword') {
				set.species = 'Zacian-Crowned';
				set.ability = 'Intrepid Sword';
				let ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothblade';
				}
			}
			if (set.species === 'Zamazenta' && item === 'rustedshield') {
				set.species = 'Zamazenta-Crowned';
				set.ability = 'Dauntless Shield';
				let ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothbash';
				}
			}
		},
	},
	{
		name: "[Gen 8] Mix and Mega",
		desc: `Mega evolve any Pok&eacute;mon with any mega stone and no limit. Boosts based on mega evolution from gen 7.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656469/">Mix and Mega</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659028/">M&amp;M Resources</a>`,
		],

		mod: 'mixandmega',
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Eternatus', 'Zacian', 'Moody', 'Shadow Tag', 'Baton Pass', 'Electrify',
			'Beedrillite', 'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Pidgeotite',
		],
		restricted: ['Kyurem-Black', 'Kyurem-White', 'Lunala', 'Marshadow', 'Melmetal', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Solgaleo', 'Zamazenta', 'Zekrom'],
		onValidateTeam(team, format) {
			const restrictedPokemon = format.restricted || [];
			/**@type {{[k: string]: true}} */
			let itemTable = {};
			for (const set of team) {
				let item = this.dex.getItem(set.item);
				if (!item || !item.megaStone) continue;
				let template = this.dex.getTemplate(set.species);
				if (template.isNonstandard) return [`${template.baseSpecies} does not exist in gen 8.`];
				if (restrictedPokemon.includes(template.species)) {
					return [`${template.species} is not allowed to hold ${item.name}.`];
				}
				if (itemTable[item.id]) return ["You are limited to one of each mega stone.", "(You have more than one " + item.name + ")"];
				itemTable[item.id] = true;
			}
		},
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.m.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn(pokemon) {
			// @ts-ignore
			let oMegaTemplate = this.dex.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.m.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.dex.getTemplate(pokemon.m.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut(pokemon) {
			// @ts-ignore
			let oMegaTemplate = this.dex.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.m.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 8] Almost Any Ability",
		desc: `Pok&eacute;mon have access to almost any ability.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656414/">Almost Any Ability</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659124/">AAA Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['Obtainable', '!Obtainable Abilities', 'Species Clause', 'Nickname Clause', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Dracovish', 'Eternatus', 'Keldeo', 'Kyurem-Black', 'Kyurem-White', 'Lunala', 'Marshadow', 'Melmetal', 'Mewtwo',
			'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Shedinja', 'Solgaleo', 'Zacian', 'Zamazenta', 'Zekrom',
			'Arena Trap', 'Comatose', 'Contrary', 'Fluffy', 'Fur Coat', 'Gorilla Tactics', 'Huge Power', 'Ice Scales', 'Illusion', 'Imposter', 'Innards Out', 'Intrepid Sword',
			'Libero', 'Moody', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Simple', 'Stakeout', 'Speed Boost', 'Water Bubble', 'Wonder Guard',
			'Baton Pass',
		],
	},
	{
		name: "[Gen 8] STABmons",
		desc: `Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656429/">STABmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658578/">STABmons Resources</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard', 'STABmons Move Legality', 'Dynamax Clause'],
		banlist: [
			'Darmanitan', 'Darmanitan-Galar', 'Eternatus', 'Kyurem-Black', 'Kyurem-White', 'Lunala', 'Marshadow', 'Mewtwo',
			'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Silvally', 'Solgaleo', 'Zacian', 'Zamazenta', 'Zekrom',
			'King\'s Rock', 'Razor Fang', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		restricted: ['Acupressure', 'Belly Drum', 'Bolt Beak', 'Double Iron Bash', 'Extreme Speed', 'Fishious Rend', 'Shell Smash', 'Shift Gear', 'Spore'],
	},
	{
		name: "[Gen 8] Camomons",
		desc: `Pok&eacute;mon change type to match their first two moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656413/">Camomons</a>`,
		],

		mod: 'gen8',
		searchShow: false,
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Darmanitan-Galar', 'Eternatus', 'Kyurem-Black', 'Kyurem-White', 'Lunala', 'Marshadow', 'Mewtwo',
			'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Reshiram', 'Shedinja', 'Solgaleo', 'Zacian', 'Zamazenta', 'Zekrom',
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onModifyTemplate(template, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			let types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.dex.getMove(move.id).type))];
			return Object.assign({}, template, {types: types});
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 8] Pure Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656851/">Pure Hackmons</a>`,
		],

		mod: 'gen8',
		ruleset: ['-Nonexistent', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 8] Trademarked",
		desc: `Sacrifice your Pok&eacute;mon's ability for a status move that activates on switch-in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656980/">Trademarked</a>`,
		],

		mod: 'gen8',
		ruleset: ['[Gen 8] OU'],
		banlist: ['Arena Trap'],
		restricted: [
			'Baneful Bunker', 'Block', 'Copycat', 'Detect', 'Destiny Bond', 'Ingrain', 'King\'s Shield', 'Mean Look', 'Metronome', 'Obstruct',
			'Octolock', 'Nature Power', 'Parting Shot', 'Protect', 'Roar', 'Skill Swap', 'Sleep Talk', 'Spiky Shield', 'Teleport', 'Whirlwind', 'Wish',
		],
		onValidateTeam(team, format, teamHas) {
			for (const trademark in teamHas.trademarks) {
				if (teamHas.trademarks[trademark] > 1) return [`You are limited to 1 of each Trademark.`, `(You have ${teamHas.trademarks[trademark]} of ${trademark}).`];
			}
		},
		validateSet(set, teamHas) {
			const restrictedMoves = (this.format.restricted || []).concat('Yawn');
			const dex = this.dex;
			let ability = dex.getMove(set.ability);
			if (ability.category !== 'Status' || ability.status === 'slp' || restrictedMoves.includes(ability.name) || set.moves.map(toID).includes(ability.id)) return this.validateSet(set, teamHas);
			let customRules = this.format.customRules || [];
			if (!customRules.includes('!obtainableabilities')) customRules.push('!obtainableabilities');
			const TeamValidator = /** @type {new(format: string | Format) => TeamValidator} */ (this.constructor);
			const validator = new TeamValidator(dex.getFormat(`${this.format.id}@@@${customRules.join(',')}`));
			const moves = set.moves;
			set.moves = [ability.id];
			set.ability = dex.getTemplate(set.species).abilities['0'];
			let problems = validator.validateSet(set, {}) || [];
			if (problems.length) return problems;
			set.moves = moves;
			set.ability = dex.getTemplate(set.species).abilities['0'];
			problems = problems.concat(validator.validateSet(set, teamHas) || []);
			set.ability = ability.id;
			if (!teamHas.trademarks) teamHas.trademarks = {};
			teamHas.trademarks[ability.name] = (teamHas.trademarks[ability.name] || 0) + 1;
			return problems.length ? problems : null;
		},
		pokemon: {
			getAbility() {
				const move = this.battle.dex.getMove(toID(this.ability));
				if (!move.exists) return Object.getPrototypeOf(this).getAbility.call(this);
				return {
					id: move.id,
					name: move.name,
					onStart(pokemon) {
						this.add('-activate', pokemon, 'ability: ' + move.name);
						this.useMove(move, pokemon);
					},
					toString() {
						return "";
					},
				};
			},
		},
	},
	{
		name: "[Gen 7] Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3587475/">Balanced Hackmons</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3588586/">BH Suspects and Bans Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3593766/">BH Resources</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['-Nonexistent', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause'],
		banlist: [
			'Groudon-Primal', 'Rayquaza-Mega', 'Gengarite', 'Comatose + Sleep Talk', 'Chatter',
			'Arena Trap', 'Contrary', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond', 'Protean', 'Psychic Surge', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard',
		],
	},
	{
		name: "[Gen 7] Tier Shift",
		desc: `Pok&eacute;mon below OU get all their stats boosted. UU/RUBL get +10, RU/NUBL get +20, NU/PUBL get +30, and PU or lower get +40.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3610073/">Tier Shift</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] OU'],
		banlist: ['Drought', 'Damp Rock', 'Deep Sea Tooth', 'Eviolite', 'Heat Rock'],
		onModifyTemplate(template, target, source, effect) {
			if (!template.abilities) return false;
			/** @type {{[tier: string]: number}} */
			const boosts = {
				'UU': 10,
				'RUBL': 10,
				'RU': 20,
				'NUBL': 20,
				'NU': 30,
				'PUBL': 30,
				'PU': 40,
				'NFE': 40,
				'LC Uber': 40,
				'LC': 40,
			};
			if (target && target.set.ability === 'Drizzle') return;
			let tier = template.tier || 'OU';
			if (target && target.set.item) {
				let item = this.dex.getItem(target.set.item);
				if (item.name === 'Kommonium Z' || item.name === 'Mewnium Z') return;
				if (item.megaEvolves === template.species) tier = this.dex.getTemplate(item.megaStone).tier;
			}
			if (target && target.set.moves.includes('auroraveil')) tier = 'UU';
			if (target && target.set.ability === 'Drought') tier = 'RU';

			if (tier[0] === '(') tier = tier.slice(1, -1);
			if (!(tier in boosts)) return;
			let pokemon = this.dex.deepClone(template);
			let boost = boosts[tier];
			for (let statName in pokemon.baseStats) {
				if (statName === 'hp') continue;
				pokemon.baseStats[statName] = this.dex.clampIntRange(pokemon.baseStats[statName] + boost, 1, 255);
			}
			return pokemon;
		},
	},
	{
		name: "[Gen 7] Almost Any Ability",
		desc: `Pok&eacute;mon can use any ability, barring the few that are restricted to their natural users.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3587901/">Almost Any Ability</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3595753/">AAA Resources</a>`,
		],

		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] OU', '2 Ability Clause', '!Obtainable Abilities'],
		banlist: ['Archeops', 'Dragonite', 'Hoopa-Unbound', 'Kartana', 'Keldeo', 'Kyurem-Black', 'Regigigas', 'Shedinja', 'Slaking', 'Terrakion', 'Victini', 'Weavile'],
		unbanlist: ['Aegislash', 'Genesect', 'Landorus', 'Metagross-Mega', 'Naganadel'],
		restrictedAbilities: [
			'Comatose', 'Contrary', 'Fluffy', 'Fur Coat', 'Huge Power', 'Illusion', 'Imposter', 'Innards Out',
			'Parental Bond', 'Protean', 'Pure Power', 'Simple', 'Speed Boost', 'Stakeout', 'Water Bubble', 'Wonder Guard',
		],
		onValidateSet(set, format) {
			let restrictedAbilities = format.restrictedAbilities || [];
			if (restrictedAbilities.includes(set.ability)) {
				let template = this.dex.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					// @ts-ignore
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
		},
	},
];
