'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Smash Mods",
		column: 1,
	},
	
	{
  		name: "[Gen 7] Super Smash Mods",
  		desc: ["None Yet!",
		      ],
  		ruleset: ['Gen 7 [Ubers]'],
		mod: 'smashmods',
		//banlist: ['Illegal'],
	},
	
	{
		section: "Randomized Metas",
		column: 1,
	},
	
	{
		name: "[Gen 7] BH Battle Factory",

		mod: 'gen7',
		team: 'randomOMFactory',
		ruleset: ['Pokemon', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 6] Battle Factory",

		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 7] Hackmons Cup",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item."],

		mod: 'gen7',
		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Doubles Hackmons Cup",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Triples Hackmons Cup",

		gameType: 'triples',
		team: 'randomHC',

		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Challenge Cup",
		column: 1,

		mod: 'gen7',
		team: 'randomCC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{	//creds: Kris n me
		name: "[Gen 7] Linked Randoms [WIP]",
		desc: [
			`The first two moves in a Pok&eacute;mon's moveset are used simultaneously.`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3627804/">Linked</a>`,
		],
		team: 'randomFactory',
		mod: 'linked',
		ruleset: ['[Gen 7] OU'],
	},
	{
		name: "[Gen 7] Prioritize Randoms",
		desc: [
			"&bullet; In this format, moves with 60 power or fewer gains +1 priority.",
		],
		ruleset: ['[Gen 7] Random Battle'],
		team: 'random',
		onModifyPriority: function (priority, pokemon, target, move) {
			// @ts-ignore
			if (move.category === 'Status' || move.basePower > 60 || !pokemon) return priority;
			if (!pokemon.hasAbility('technician')) return priority + 1;
		},
	},
	{
		name: "[Gen 7] Super Staff Bros Brawl",
		desc: "Super Staff Bros returns for another round! Battle with a random team of pokemon created by the sim staff.",
		threads: [
			`&bullet; <a href="https://www.smogon.com/articles/super-staff-bros-brawl">Introduction &amp; Roster</a>`,
		],

		mod: 'ssb',
		team: 'randomStaffBros',
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('raw|SUPER STAFF BROS <b>BRAWL</b>!!');
			this.add('message', 'GET READY FOR THE NEXT BATTLE!');
			this.add(`raw|<div class='broadcast-green'><b>Wondering what all these custom moves, abilities, and items do?<br />Check out the <a href="https://www.smogon.com/articles/super-staff-bros-brawl" target="_blank">Super Staff Bros Brawl Guide</a> and find out!</b></div>`);
		},
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (this.getTemplate(name).exists) {
				// Certain pokemon have volatiles named after their speciesid
				// To prevent overwriting those, and to prevent accidentaly leaking
				// that a pokemon is on a team through the onStart even triggering
				// at the start of a match, users with pokemon names will need their
				// statuse's to end in "user".
				name += 'user';
			}
			// Add the mon's status effect to it as a volatile.
			let status = this.getEffect(name);
			if (status && status.exists) {
				pokemon.addVolatile(name, pokemon);
			}
		},
},
	{
		name: "[Gen 7] Dragon Heaven Super Staff Bros",
		desc: ["&bullet; The staff here becomes a Pokemon and battles! <br> &bullet; <a href=\"https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/README.md\">Movesets</a>"],
		mod: 'dhssb',
		team: 'randomSeasonalMelee',
		ruleset: ['PotD', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function() {
			this.add("raw|Dragon Heaven Super Staff Bros. <b>RAWWWWWWWWWWWWWR!!!!</b>");
			this.add('message', "SURVIVAL! GET READY FOR THE NEXT BATTLE!");

			let globalRenamedMoves = {};
			let customRenamedMoves = {};

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];		
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveSlots[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveSlots[last].move = pokemon.set.signatureMove;
				}
				let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
				if (name == "thetruefalcon")
				{
					pokemon.types[1] = "Fighting";
				}
				if (name == "theswordbreaker")
				{
					pokemon.types = ["Dragon"];
				}
				for (let j = 0; j < pokemon.moveSlots.length; j++) {
					let moveData = pokemon.moveSlots[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveSlots[j].move = globalRenamedMoves[moveData.id];
					}

					let customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveSlots[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function(pokemon) {
			let name = toId(pokemon.name);
			if (!this.shownTip) {
				this.add('raw|<div class=\"broadcast-green\">Huh? But what do all these weird moves do??<br><b>Protip: Refer to the <a href="https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/README.md">PLAYER\'S MANUAL</a>!</b></div>');
				this.shownTip = true;
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// Wonder Guard is available, but it curses you.
			if (pokemon.getAbility().id === 'wonderguard' && pokemon.baseTemplate.baseSpecies !== 'Shedinja' && pokemon.baseTemplate.baseSpecies !== 'Kakuna') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}
			if (this.data.Statuses[name] && this.data.Statuses[name].exists) {
				pokemon.addVolatile(name, pokemon);
			}
			if (name === 'thetruefalcon') {
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			}
		},
		onModifyPokemon: function(pokemon) {
			let name = toId(pokemon.name);
		},
	},
		{
		name: "[Gen 7] Dragon Heaven Super Staff Bros Doubles",
		desc: ["&bullet; The staff here becomes a Pokemon and battles! <br> &bullet; <a href=\"https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/README.md\">Movesets</a>"],
		mod: 'dhssb',
		gameType: 'doubles',
		team: 'randomSeasonalMelee',
		ruleset: ['PotD', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function() {
			this.add("raw|Dragon Heaven Super Staff Bros. <b>RAWWWWWWWWWWWWWR!!!!</b>");
			this.add('message', "SURVIVAL! GET READY FOR THE NEXT BATTLE!");

			let globalRenamedMoves = {};
			let customRenamedMoves = {};

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];		
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveSlots[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveSlots[last].move = pokemon.set.signatureMove;
				}
				let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
				if (name == "thetruefalcon")
				{
					pokemon.types[1] = "Fighting";
				}
				if (name == "theswordbreaker")
				{
					pokemon.types = ["Dragon"];
				}
				for (let j = 0; j < pokemon.moveSlots.length; j++) {
					let moveData = pokemon.moveSlots[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveSlots[j].move = globalRenamedMoves[moveData.id];
					}

					let customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveSlots[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function(pokemon) {
			let name = toId(pokemon.name);
			if (!this.shownTip) {
				this.add('raw|<div class=\"broadcast-green\">Huh? But what do all these weird moves do??<br><b>Protip: Refer to the <a href="https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/README.md">PLAYER\'S MANUAL</a>!</b></div>');
				this.shownTip = true;
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// Wonder Guard is available, but it curses you.
			if (pokemon.getAbility().id === 'wonderguard' && pokemon.baseTemplate.baseSpecies !== 'Shedinja' && pokemon.baseTemplate.baseSpecies !== 'Kakuna') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}
			if (this.data.Statuses[name] && this.data.Statuses[name].exists) {
				pokemon.addVolatile(name, pokemon);
			}
			if (name === 'thetruefalcon') {
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			}
		},
		onModifyPokemon: function(pokemon) {
			let name = toId(pokemon.name);
		},
	}, 
	{
		name: "[Gen 7] [Main] Super Staff Bros. Melee",
		mod: 'ssbm',
		team: 'randomSeasonalMelee',
		ruleset: ['Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function() {
			this.add("raw|Super Staff Bros. <b>MELEEEEEEEEEEEEEE</b>!!");
			this.add('message', "SURVIVAL! GET READY FOR THE NEXT BATTLE!");

			let globalRenamedMoves = {};
			let customRenamedMoves = {};

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveSlots[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveSlots[last].move = pokemon.set.signatureMove;
				}
				for (let j = 0; j < pokemon.moveSlots.length; j++) {
					let moveData = pokemon.moveSlots[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveSlots[j].move = globalRenamedMoves[moveData.id];
					}

					let customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveSlots[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},
		// Here we add some flavour or design immunities.
		onImmunity: function(type, pokemon) {
			if (toId(pokemon.name) === 'juanma' && type === 'Fire') {
				this.add('-message', "Did you think fire would stop __him__? You **fool**!");
				return false;
			}
		},
		onNegateImmunity: function(pokemon, type) {
			if (pokemon.volatiles['flipside']) return false;
			const foes = pokemon.side.foe.active;
			if (foes.length && foes[0].volatiles['samuraijack'] && pokemon.hasType('Dark') && type === 'Psychic') return false;
		},
		onEffectiveness: function(typeMod, target, type, move) {
			if (!target.volatiles['flipside']) return;
			if (move && move.id === 'retreat') return;
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function(pokemon) {
			let name = toId(pokemon.name);
			if (pokemon.template.isMega) {
				if (name === 'andy' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Adaptability');
				}
				if (name === 'reisen' && pokemon.getAbility().id === 'hugepower') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Tough Claws');
				}
				if (name === 'crestfall' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('simple');
					this.add('-ability', pokemon, 'Simple');
				}
				if (name === 'dreameatergengar' && pokemon.getAbility().id === 'shadowtag') {
					pokemon.setAbility('infiltrator');
					this.add('-ability', pokemon, 'Infiltrator');
				}
				if (name === 'overneat' && pokemon.getAbility().id === 'speedboost') {
					pokemon.setAbility('noguard');
					this.add('-ability', pokemon, 'No Guard');
				}
				if (name === 'skitty' && pokemon.getAbility().id === 'healer') {
					pokemon.setAbility('shedskin');
					this.add('-ability', pokemon, 'Shed Skin');
				}
				if (name === 'theimmortal' && pokemon.getAbility().id === 'megalauncher') {
					pokemon.setAbility('cloudnine');
				}
			}
			if (!this.shownTip) {
				this.add('raw|<div class=\"broadcast-green\">Huh? But what do all these weird moves do??<br><b>Protip: Refer to the <a href="https://github.com/Zarel/Pokemon-Showdown/blob/129d35d5eefb295b1ec24f3e1985a586da3f049c/mods/seasonal/README.md">PLAYER\'S MANUAL</a>!</b></div>');
				this.shownTip = true;
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// Wonder Guard is available, but it curses you.
			if (pokemon.getAbility().id === 'wonderguard' && pokemon.baseTemplate.baseSpecies !== 'Shedinja' && pokemon.baseTemplate.baseSpecies !== 'Kakuna') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}

			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.
			if (pokemon.template.isMega) {
				if (name === 'andy' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Adaptability');
				}
				if (name === 'reisen' && pokemon.getAbility().id === 'hugepower') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Tough Claws');
				}
				if (name === 'crestfall' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('simple');
					this.add('-ability', pokemon, 'Simple');
				}
				if (name === 'dreameatergengar' && pokemon.getAbility().id === 'shadowtag') {
					pokemon.setAbility('infiltrator');
					this.add('-ability', pokemon, 'Infiltrator');
				}
				if (name === 'overneat' && pokemon.getAbility().id === 'speedboost') {
					pokemon.setAbility('noguard');
					this.add('-ability', pokemon, 'No Guard');
				}
				if (name === 'skitty' && pokemon.getAbility().id === 'healer') {
					pokemon.setAbility('shedskin');
					this.add('-ability', pokemon, 'Shed Skin');
				}
				if (name === 'theimmortal' && pokemon.getAbility().id === 'megalauncher') {
					pokemon.setAbility('cloudnine');
				}
			} else {
				// Bypass one mega limit.
				pokemon.canMegaEvo = this.canMegaEvo(pokemon);
			}

			// Innate effects.
			if (name === 'ascriptmaster') {
				pokemon.addVolatile('ascriptinnate', pokemon);
			}
			if (name === 'atomicllamas') {
				pokemon.addVolatile('baddreamsinnate', pokemon);
			}
			if (name === 'blastchance') {
				pokemon.addVolatile('flipside', pokemon);
			}
			if (name === 'bondie') {
				pokemon.addVolatile('crabstance', pokemon);
			}
			if (name === 'clefairy') {
				pokemon.addVolatile('coldsteel', pokemon);
			}
			if (name === 'duck') {
				pokemon.addVolatile('firstblood', pokemon);
			}
			if (name === 'eeveegeneral') {
				this.add('detailschange', pokemon, pokemon.details); //run mega evo animation
				this.add('-mega', pokemon, 'Eevee', null);
				for (let i = 0; i < pokemon.stats.length; i++) {
					pokemon.stats[i] += 50;
				}
			}
			if (name === 'formerhope') {
				pokemon.addVolatile('cursedbodyinnate', pokemon);
			}
			if (name === 'galbia' || name === 'aurora') {
				this.setWeather('sandstorm');
			}
			if (name === 'rodan') {
				pokemon.addVolatile('gonnamakeyousweat', pokemon);
			}
			if (name === 'giagantic') {
				pokemon.addVolatile('deltastreaminnate', pokemon);
			}
			if (name === 'hashtag') {
				this.boost({
					spe: 1
				}, pokemon, pokemon, 'innate ability');
			}
			if (name === 'haund') {
				pokemon.addVolatile('prodigy', pokemon);
			}
			if (name === 'innovamania' && !pokemon.illusion) {
				this.boost({
					atk: 6,
					def: 6,
					spa: 6,
					spd: 6,
					spe: 6,
					accuracy: 6
				}, pokemon, pokemon, 'divine grace');
			}
			if (name === 'jackhiggins') {
				this.setWeather('sunnyday');
			}
			if (name === 'lemonade') {
				pokemon.addVolatile('adaptabilityinnate', pokemon);
			}
			if (name === 'manu11') {
				pokemon.addVolatile('arachnophobia', pokemon);
			}
			if (name === 'marshmallon') {
				this.boost({
					def: 1
				}, pokemon, pokemon, 'fur coat innate');
			}
			if (name === 'mizuhime' || name === 'kalalokki' || name === 'sweep') {
				this.setWeather('raindance');
			}
			if (name === 'nv') {
				pokemon.addVolatile('cuteness', pokemon);
			}
			if (name === 'pikachuun') {
				this.boost({
					spe: 1
				}, pokemon, pokemon, 'Reisen Cosplay');
			}
			if (name === 'qtrx') {
				pokemon.addVolatile('qtrxinnate', pokemon);
			}
			if (name === 'raseri') {
				this.useMove('hypnosis', pokemon);
			}
			if (name === 'rssp1') {
				pokemon.addVolatile('speedboostinnate', pokemon);
			}
			if (name === 'scythernoswiping') {
				pokemon.addVolatile('mountaineerinnate', pokemon);
			}
			if (name === 'sigilyph') {
				pokemon.addVolatile('samuraijack', pokemon);
			}
			if (name === 'sonired') {
				this.boost({
					def: -1,
					spd: -1,
					atk: 1,
					spe: 1
				}, pokemon, pokemon, 'Weak Skin');
			}
			if (name === 'snobalt') {
				pokemon.addVolatile('amityabsorb', pokemon);
			}
			if (name === 'spacebass') {
				pokemon.addVolatile('badtrip', pokemon);
			}
			if (name === 'sparktrain') {
				pokemon.addVolatile('refrigerateinnate', pokemon);
			}
			if (name === 'specsmegabeedrill') {
				pokemon.addVolatile('weed', pokemon);
			}
			if (name === 'starmei') {
				this.useMove('cosmicpower', pokemon);
			}
			if (name === 'talkingtree') {
				this.useMove('synthesis', pokemon);
				this.useMove('bulkup', pokemon);
			}
			if (name === 'teremiare') {
				pokemon.addVolatile('coinflip', pokemon);
			}
			if (name === 'trickster' || name === 'blitzamirin') {
				let target = pokemon.battle[pokemon.side.id === 'p1' ? 'p2' : 'p1'].active[0];
				let targetBoosts = {};
				let sourceBoosts = {};
				for (let i in target.boosts) {
					targetBoosts[i] = target.boosts[i];
					sourceBoosts[i] = pokemon.boosts[i];
				}
				target.setBoost(sourceBoosts);
				pokemon.setBoost(targetBoosts);
				this.add('-swapboost', pokemon, target);
			}
			if (name === 'unfixable') {
				pokemon.addVolatile('ironbarbsinnate', pokemon);
			}
			if (name === 'urkerab') {
				pokemon.addVolatile('focusenergy', pokemon);
				this.useMove('magnetrise', pokemon);
			}
			if (name === 'uselesstrainer') {
				pokemon.addVolatile('ninja', pokemon);
			}
			if (name === 'winry') {
				pokemon.addVolatile('hellacute', pokemon);
			}

			// Edgy switch-in sentences go here.
			// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
			let sentences = [];
			let sentence = '';

			if (name === 'acast') {
				this.add('c|%Acast|__A wild Castform appeared!__');
			}
			if (name === 'ace') {
				this.add('c|@Ace|Lmaonade');
			}
			if (name === 'aelita') {
				this.add('c|%Aelita|Transfer, Aelita. Scanner, Aelita. Virtualization!');
			}
			if (name === 'ajhockeystar') {
				this.add('c|+ajhockeystar|Here comes the greatest hockey player alive!');
			}
			if (name === 'albacore') {
				this.add('c|@Albacore|do I have to?');
			}
			if (name === 'albert') {
				this.add('c|+Albert|Art is risk.');
			}
			if (name === 'always') {
				sentence = (pokemon.side.foe.active.length && pokemon.side.foe.active[0].hp ? pokemon.side.foe.active[0].name : "... ohh nobody's there...");
				this.add('c|+Always|Oh it\'s ' + sentence);
			}
			if (name === 'am') {
				this.add('c|+AM|Lucky and Bad');
			}
			if (name === 'andy') {
				this.add('c|%AndrewGoncel|:I');
			}
			if (name === 'antemortem') {
				this.add('c|&antemortem|I Am Here To Oppress Users');
			}
			if (name === 'anttya') {
				this.add('c|+Anttya|Those crits didn\'t even matter');
			}
			if (name === 'anty') {
				this.add('c|+Anty|mhm');
			}
			if (name === 'articuno') {
				this.add('c|%Articuno|Abolish the patriarchy!');
			}
			if (name === 'ascriptmaster') {
				this.add("c|@Ascriptmaster|It's time for a hero to take the stage!");
			}
			if (name === 'astara') {
				this.add('c|%Ast☆arA|I\'d rather take a nap, I hope you won\'t be a petilil shit, Eat some rare candies and get on my level.');
			}
			if (name === 'asty') {
				this.add('c|@Asty|Top kek :^)');
			}
			if (name === 'spandan') {
				this.add('c|~Spandan|o shit waddup!');
			}
			if (name === 'classyz') {
				this.add('c|%ClassyZ|pro tip: if u kill me go straight to hell do not pass go do not collect $200');
			}
			if (name === 'flygonerz') {
				this.add('c|@Flygonerz|The Sand Dweller has arrived');
			}
			if (name === 'pieddychomp') {
				this.add('c|&PI★EddyChomp|Hey guys, watch me KO this guy lmao xaa :)');
			}
			if (name === 'thegodofhaxorus') {
				this.add('c|@The God of Haxorus|Hi! I\'m a **Hax**orus :3');
			}
			if (name === 'loominite') {
				this.add('c|&Loominite|Okay, lets go :I');
			}
			if (name === 'charizard8888') {
				this.add('c|&charizard8888|It\'s **Outragin\' Time !!**');
			}
			if (name === 'ransei') {
				this.add('c|~Ransei|yo');
			}
			if (name === 'xprienzo') {
				this.add('c|⚔XpRienzo ☑-☑|Wait, was I supposed to do something?');
			}
			if (name === 'atomicllamas') {
				this.add('c|&atomicllamas|(celebrate)(dog)(celebrate)');
			}
			if (name === 'aurora') {
				this.add('c|@Aurora|Best of luck to all competitors!');
			}
			if (name === 'reisen') {
				this.add('c|%Reisen|Fite me irl bruh.');
			}
			if (name === 'beowulf') {
				this.add('c|@Beowulf|Grovel peasant, you are in the presence of the RNGesus');
			}
			if (name === 'biggie') {
				sentences = ["Now I'm in the limelight cause I rhyme tight", "HAPPY FEET! WOMBO COMBO!", "You finna mess around and get dunked on"];
				this.add('c|@biggie|' + sentences[this.random(3)]);
			}
			if (name === 'blastchance') {
				this.add("c|+Blast Chance|MAN BALAMAR");
			}
			if (name === 'blitzamirin') {
				this.add('c|@Blitzamirin|How Can Mirrors Be Real If Our Eyes Aren\'t Real? ╰( ~ ◕ ᗜ ◕ ~ )੭━☆ﾟ.*･｡ﾟ');
			}
			if (name === 'bludz') {
				this.add('c|+bludz|420 blaze it');
			}
			if (name === 'bondie') {
				this.add('c|+Bondie|__(\\/) snip snip (\\/)__');
			}
			if (name === 'bottt') {
				this.add('c|boTTT|Beep, boop');
			}
			if (name === 'brandon') {
				this.add("c|+Brrandon|Life's too short to take it seriously ALL the time.");
			}
			if (name === 'bumbadadabum') {
				this.add('c|@bumbadadabum|Time for card games on motorcycles!');
				if (pokemon.side.foe.active.length && pokemon.side.foe.active[0].name === 'Scotteh') this.add('c|@bumbadadabum|Also, fuck you Scotteh');
			}
			if (name === 'bummer') {
				this.add("c|&Bummer|Oh hi.");
			}
			if (name === 'chaos') {
				this.add("c|~chaos|I always win");
			}
			if (name === 'ciran') {
				this.add("c|+Ciran|You called?");
			}
			if (name === 'clefairy') {
				this.add('c|+Clefairy|google "dj clefairyfreak" now');
			}
			if (name === 'coolstorybrobat') {
				sentence = [
					"Time to GET SLAYED", "BRUH!", "Ahem! Gentlemen...", "I spent 6 months training in the mountains for this day!",
					"Shoutout to all the pear...",
				][this.random(5)];
				this.add('c|@CoolStoryBrobat|' + sentence);
			}
			if (name === 'crestfall') {
				this.add('c|%Crestfall|To say that we\'re in love is dangerous');
			}
			if (name === 'deathonwings') {
				this.add('c|+Death on Wings|rof');
			}
			if (name === 'dirpz') {
				this.add('c|+Dirpz|IT\'S A WATER/FAIRY TYPE!!11!');
			}
			if (name === 'dmt') {
				this.add('c|+DMT|DMT');
			}
			if (name === 'dreameatergengar') {
				this.add('c|+Dream Eater Gengar|Goodnight sweet prince.');
			}
			if (name === 'duck') {
				this.add('c|@Duck|Don\'t duck with me!');
			}
			if (name === 'e4flint') {
				this.add('c|+E4 Flint|hf lul');
			}
			if (name === 'eeveegeneral') {
				sentences = ['yo', 'anyone seen goku?'];
				this.add('c|~Eevee General|' + sentences[this.random(2)]);
			}
			if (name === 'eyan') {
				this.add('c|@Eyan|░░░░░░░░▄▄▄▀▀▀▄▄███▄░░░░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░░░░░▄▀▀░░░░░░░▐░▀██▌░░░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░░░▄▀░░░░▄▄███░▌▀▀░▀█░░░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░░▄█░░▄▀▀▒▒▒▒▒▄▐░░░░█▌░░░░░░░░░░░░░░░ ');
				this.add('c|@Eyan|░▐█▀▄▀▄▄▄▄▀▀▀▀▌░░░░░▐█▄░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░▌▄▄▀▀░░░░░░░░▌░░░░▄███████▄░░░░░░░░░');
				this.add('c|@Eyan|░░░░░░░░░░░░░▐░░░░▐███████████▄░░░░░░');
				this.add('c|@Eyan|░░░░░le░░░░░░░▐░░░░▐█████████████▄░░░');
				this.add('c|@Eyan|░░░░toucan░░░░░░▀▄░░░▐██████████████▄');
				this.add('c|@Eyan|░░░░░░has░░░░░░░░▀▄▄████████████████▄');
				this.add('c|@Eyan|░░░░░arrived░░░░░░░░░░░░█▀██████░░░░░');
				this.add('c|@Eyan|WELCOME TO COMPETITIVE TOUCANNING');
			}
			if (name === 'feliburn') {
				this.add('c|@Feliburn|you don\'t go hand to hand with a fighter noob');
			}
			if (name === 'fireburn') {
				this.add('c|+Fireburn|:V');
			}
			if (name === 'flyingkebab') {
				this.add("c|+Flying Kebab|Kebab > Pizza");
			}
			if (name === 'formerhope') {
				this.add('c|@Former Hope|I have Hope');
			}
			if (name === 'freeroamer') {
				this.add('c|%Freeroamer|lol this is a wrap');
			}
			if (name === 'frysinger') {
				this.add("c|+Frysinger|Nice boosts kid.");
			}
			if (name === 'fx') {
				this.add("c|+f(x)|love is 4 wawawawawawawalls");
			}
			if (name === 'galbia') {
				this.add('c|@galbia|(dog)');
			}
			if (name === 'galom') {
				this.add('c|+Galom|To the end.');
			}
			if (name === 'rodan') { // don't delete
				this.add("c|+RODAN|Here I Come, Rougher Than The Rest of 'Em.");
			}
			if (name === 'geoffbruedly') {
				this.add("c|%GeoffBruedly|FOR WINRY");
			}
			if (name === 'giagantic') {
				this.add("c|%Giagantic|e.e");
			}
			if (name === 'golui') {
				this.add("c|+Golui|Golly gee");
			}
			if (name === 'goodmorningespeon') {
				this.add("c|+GoodMorningEspeon|type /part to continue participating in this battle :)");
			}
			if (name === 'grimauxiliatrix') {
				this.add("c|%grimAuxiliatrix|ᕕ( ᐛ )ᕗ");
			}
			if (name === 'halite') {
				this.add('c|@Halite|You’re gonna get haxxed kid :^)');
			}
			if (name === 'hannah') {
				this.add('c|+Hannahh|♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥');
			}
			if (name === 'hashtag') {
				this.add("c|#Hashtag|hey opponent, you get 5 hashtag points if you forfeit right now ;}");
			}
			if (name === 'haund') {
				this.add('c|%Haund|le balanced normal flying bird has arrived');
			}
			if (name === 'healndeal') {
				this.add('c|+HeaLnDeaL|screw clerics');
			}
			if (name === 'himynamesl') {
				this.add('c|@HiMyNamesL|There’s no such thing as winning or losing. There is won and there is lost, there is victory and defeat. There are absolutes. Everything in between is still left to fight for.');
				this.add('c|@HiMyNamesL|' + pokemon.side.foe.name + ' will have won only when there is no one left to stand against them. Until then, there is only the struggle, because tides do what tides do – they turn.');
			}
			if (name === 'hippopotas') {
				this.add('-message', '@Hippopotas\'s Sand Stream whipped up a sandstorm!');
			}
			if (name === 'hollywood') {
				this.add('c|+hollywood|Kappa');
			}
			if (name === 'ih8ih8sn0w') {
				this.add('c|+ih8ih8sn0w|*sips tea*');
			}
			if (name === 'imanalt') {
				this.add('c|+imanalt|muh bulk');
			}
			if (name === 'imas234') {
				this.add('c|@imas234|hlo');
			}
			if (name === 'innovamania') {
				sentences = ['Don\'t take this seriously', 'These Black Glasses sure look cool', 'Ready for some fun?( ͡° ͜ʖ ͡°)', '( ͡° ͜ʖ ͡°'];
				this.add('c|@innovamania|' + sentences[this.random(4)]);
			}
			if (name === 'iplaytennislol') {
				this.add('c|%iplaytennislol|KACAW');
			}
			if (name === 'iyarito') {
				this.add('c|+Iyarito|Welp');
			}
			if (name === 'jackhiggins') {
				this.add("c|+Jack Higgins|Ciran was right, fun deserved to be banned");
			}
			if (name === 'jasmine') {
				this.add("c|+Jasmine|I'm still relevant!");
			}
			if (name === 'jdarden') {
				this.add('c|@jdarden|Did someone call for some BALK?');
			}
			if (name === 'jetpack') {
				this.add('c|+Jetpack|You\'ve met with a terrible fate, haven\'t you?');
			}
			if (name === 'joim') {
				let dice = this.random(8);
				if (dice === 1) {
					this.add('c|~Joim|░░░░░░░░░░░░▄▐');
					this.add('c|~Joim|░░░░░░▄▄▄░░▄██▄');
					this.add('c|~Joim|░░░░░▐▀█▀▌░░░░▀█▄');
					this.add('c|~Joim|░░░░░▐█▄█▌░░░░░░▀█▄');
					this.add('c|~Joim|░░░░░░▀▄▀░░░▄▄▄▄▄▀▀');
					this.add('c|~Joim|░░░░▄▄▄██▀▀▀▀');
					this.add('c|~Joim|░░░█▀▄▄▄█░▀▀');
					this.add('c|~Joim|░░░▌░▄▄▄▐▌▀▀▀');
					this.add('c|~Joim|▄░▐░░░▄▄░█░▀▀ U HAVE BEEN SPOOKED');
					this.add('c|~Joim|▀█▌░░░▄░▀█▀░▀');
					this.add('c|~Joim|░░░░░░░▄▄▐▌▄▄ BY THE');
					this.add('c|~Joim|░░░░░░░▀███▀█░▄');
					this.add('c|~Joim|░░░░░░▐▌▀▄▀▄▀▐▄ SPOOKY SKILENTON');
					this.add('c|~Joim|░░░░░░▐▀░░░░░░▐▌');
					this.add('c|~Joim|░░░░░░█░░░░░░░░█');
					this.add('c|~Joim|░░░░░▐▌░░░░░░░░░█');
					this.add('c|~Joim|░░░░░█░░░░░░░░░░▐▌ SEND THIS TO 7 PPL OR SKELINTONS WILL EAT YOU');
				} else {
					sentences = [
						"Finally a good reason to punch a teenager in the face!", "WUBBA LUBBA DUB DUB",
						"``So here we are again, it's always such a pleasure.``", "My ex-wife still misses me, BUT HER AIM IS GETTING BETTER!",
						"A man chooses, a slave obeys.", "You're gonna have a bad time.", "Would you kindly let me win?",
						"I'm sorry, but I only enjoy vintage memes from the early 00's.",
					];
					sentence = sentences[this.random(8)];
					this.add('c|~Joim|' + sentence);
				}
			}
			if (name === 'juanma') {
				this.add("c|+Juanma|Okay, well, sometimes, science is more art than science, " + pokemon.side.name + ". A lot of people don't get that.");
			}
			if (name === 'kalalokki') {
				this.add('c|+Kalalokki|(•_•)');
				this.add('c|+Kalalokki|( •_•)>⌐■-■');
				this.add('c|+Kalalokki|(⌐■_■)');
			}
			if (name === 'kidwizard') {
				this.add('c|+Kid Wizard|Eevee General room mod me.');
			}
			if (name === 'layell') {
				this.add('c|@Layell|Enter stage left');
			}
			if (name === 'legitimateusername') {
				sentence = ["This isn't my fault.", "I'm not sorry."][this.random(2)];
				this.add('c|@LegitimateUsername|``' + sentence + '``');
			}
			if (name === 'lemonade') {
				this.add('c|+Lemonade|Pasta');
			}
			if (name === 'level51') {
				this.add('c|@Level 51|n_n!');
			}
			if (name === 'lj') {
				this.add('c|%LJDarkrai|Powerfulll');
			}
			if (name === 'lyto') {
				sentences = ["This is divine retribution!", "I will handle this myself!", "Let battle commence!"];
				this.add('c|@Lyto|' + sentences[this.random(3)]);
			}
			if (name === 'macle') {
				this.add("c|+macle|Follow the Frog Blog");
			}
			if (name === 'manu11') {
				this.add("c|@manu 11|/me is pet by ihateyourpancreas");
			}
			if (name === 'marshmallon') {
				this.add("c|%Marshmallon|Marshtomb be like");
				this.add("c|%Marshmallon|- He sees you when you're sleeping -");
				this.add("c|%Marshmallon|- He knows when you're awake -");
				this.add("c|%Marshmallon|- He knows if you've been bad or good -");
				this.add("c|%Marshmallon|- So be good for goodness sake -");
			}
			if (name === 'mattl') {
				this.add('c|+MattL|If you strike me down, I shall become more powerful than you can possibly imagine.');
			}
			if (name === 'mcmeghan') {
				this.add("c|&McMeghan|A Game of Odds");
			}
			if (name === 'megazard') {
				this.add('c|+Megazard|New tricks');
			}
			if (name === 'mizuhime') {
				this.add('c|+Mizuhime|Thou Shalt Double Laser From The Edge');
			}
			if (name === 'nv') {
				this.add('c|+nv|Who tf is nv?');
			}
			if (name === 'omegaxis') {
				this.add('c|+Omega-Xis|lol this isn’t even my final form');
			}
			if (name === 'orday') {
				this.add('c|%Orda-Y|❄');
			}
			if (name === 'overneat') {
				this.add('c|+Overneat|tsk, tsk, is going to be funny');
			}
			if (name === 'paradise') {
				this.add('c|%Paradise~|I sexually identify as a hazard setter');
			}
			if (name === 'pikachuun') {
				sentences = ['Reisen is best waifu', 'Hey look I coded myself into the game', 'sup (\'.w.\')'];
				this.add('c|+Pikachuun|' + sentences[this.random(3)]);
			}
			if (name === 'pluviometer') {
				this.add('c|+pluviometer|p^2laceholder');
			}
			if (name === 'qtrx') {
				sentences = ["cutie are ex", "q-trix", "quarters", "cute T-rex", "Qatari", "random letters", "spammy letters", "asgdf"];
				this.add("c|@qtrx|omg DONT call me '" + sentences[this.random(8)] + "' pls respect my name its very special!!1!");
			}
			if (name === 'quitequiet') {
				this.add("c|@Quite Quiet|I'll give it a shot.");
			}
			if (name === 'raseri') {
				this.add('c|&Raseri|gg');
			}
			if (name === 'raven') {
				this.add('c|&Raven|Are you ready? Then let the challenge... Begin!');
			}
			if (name === 'rekeri') {
				this.add('c|@rekeri|Get Rekeri\'d :]');
			}
			if (name === 'rosiethevenusaur') {
				sentences = ['!dt party', 'Are you Wifi whitelisted?', 'Read the roomintro!'];
				this.add('c|@RosieTheVenusaur|' + sentences[this.random(3)]);
			}
			if (name === 'rssp1') {
				this.add('c|+rssp1|Witness the power of the almighty Rufflet!');
			}
			if (name === 'sailorcosmos') {
				this.add("c|+SailorCosmos|Cosmos Prism Power Make Up!");
			}
			if (name === 'scotteh') {
				this.add('c|&Scotteh|─────▄▄████▀█▄');
				this.add('c|&Scotteh|───▄██████████████████▄');
				if (pokemon.side.foe.active.length && pokemon.side.foe.active[0].name === 'bumbadadabum') this.add('c|@bumbadadabum|Fuck you Scotteh');
				this.add('c|&Scotteh|─▄█████.▼.▼.▼.▼.▼.▼.▼');
			}
			if (name === 'scpinion') {
				this.add('c|@scpinion|/me welcomes funbro');
			}
			if (name === 'scythernoswiping') {
				this.add('c|%Scyther NO Swiping|/me prepares to swipe victory');
			}
			if (name === 'shrang') {
				this.add('raw| [15:30] @<b>Scrappie</b>: It is I, the great and powerful shrang, who is superior to you proles in every conceivable way.');
			}
			if (name === 'sigilyph') {
				this.add('c|@Sigilyph|Prepare to feel the mighty power of an exploding star!');
			}
			if (name === 'sirdonovan') {
				this.add('c|&sirDonovan|Oh, a battle? Let me finish my tea and crumpets');
			}
			if (name === 'skitty') {
				this.add('c|@Skitty|\\_$-_-$_/');
			}
			if (name === 'snobalt') {
				this.add('c|+Snobalt|By the power vested in me from the great Lord Tomohawk...');
			}
			if (name === 'snowy') {
				this.add('c|+Snowy|Why do a lot of black people call each other monica?');
			}
			if (name === 'solarisfox') {
				this.add('raw|<div class="chat chatmessage-solarisfox"><small>%</small><b><font color="#2D8F1E"><span class="username" data-name="SolarisFox">SolarisFox</span>:</font></b> <em><marquee behavior="alternate" scrollamount=3 scrolldelay="60" width="108">[Intense vibrating]</marquee></em></div>');
			}
			if (name === 'sonired') {
				this.add('c|+Sonired|~');
			}
			if (name === 'spacebass') {
				this.add('c|@SpaceBass|He aims his good ear best he can towards conversation and sometimes leans in awkward toward your seat');
				this.add('c|@SpaceBass|And if by chance one feels their space too invaded, then try your best to calmly be discreet');
				this.add('c|@SpaceBass|Because this septic breathed man that stands before you is a champion from days gone by');
			}
			if (name === 'sparktrain') {
				this.add('c|+sparktrain|hi');
			}
			if (name === 'specsmegabeedrill') {
				this.add('c|+SpecsMegaBeedrill|(◕‿◕✿)');
			}
			if (name === 'spy') {
				sentences = ['curry consumer', 'try to keep up', 'fucking try to knock me down', 'Sometimes I slather myself in vasoline and pretend I\'m a slug', 'I\'m really feeling it!'];
				this.add('c|+Spy|' + sentences[this.random(5)]);
			}
			if (name === 'starmei') {
				this.add('c|+Starmei|Starmei wins again');
			}
			if (name === 'starry') {
				this.add('c|%starry|oh');
			}
			if (name === 'steamroll') {
				this.add('c|@Steamroll|Banhammer ready!');
			}
			if (name === 'sunfished') {
				this.add('c|+Sunfished|*raptor screeches*');
			}
			if (name === 'sweep') {
				this.add('c|&Sweep|(ninjacat)(beer)');
			}
			if (name === 'talkingtree') {
				this.add('c|+talkingtree|I am Groot n_n');
			}
			if (name === 'teg') {
				this.add("c|+TEG|It's __The__ Eevee General");
			}
			if (name === 'temporaryanonymous') {
				sentences = ['Hey, hey, can I gently scramble your insides (just for laughs)? ``hahahaha``', 'check em', 'If you strike me down, I shall become more powerful than you can possibly imagine! I have a strong deathrattle effect and I cannot be silenced!'];
				this.add('c|@Temporaryanonymous|' + sentences[this.random(3)]);
			}
			if (name === 'teremiare') {
				this.add('c|%Teremiare|I like to call it skill');
			}
			if (name === 'theimmortal') {
				this.add('c|~The Immortal|Give me my robe, put on my crown!');
			}
			if (name === 'tone114') {
				this.add('c|+TONE114|Haven\'t you heard the new sensation sweeping the nation?');
			}
			if (name === 'trickster') {
				sentences = ["heh….watch out before you get cut on my edge", "AaAaAaAAaAaAAa"];
				this.add('c|@Trickster|' + sentences[this.random(2)]);
			}
			if (name === 'unfixable') {
				this.add('c|+unfixable|eevee general sucks lol');
			}
			if (name === 'urkerab') {
				this.add('j|urkerab');
			}
			if (name === 'uselesstrainer') {
				sentences = ['huehuehuehue', 'PIZA', 'SPAGUETI', 'RAVIOLI RAVIOLI GIVE ME THE FORMUOLI', 'get ready for PUN-ishment', 'PIU\' RUSPE PER TUTTI, E I MARO\'???'];
				this.add('c|@useless trainer|' + sentences[this.random(6)]);
			}
			if (name === 'vapo') {
				this.add('c|%Vapo|/me vapes');
			}
			if (name === 'vexeniv') {
				this.add('c|+Vexen IV|The Arcana is the means by which all is revealed.');
			}
			if (name === 'winry') {
				this.add('c|@Winry|fight me irl');
			}
			if (name === 'xfix') {
				if (this.random(2)) {
					// The classic one
					const hazards = {
						stealthrock: 1,
						spikes: 1,
						toxicspikes: 1,
						burnspikes: 1,
						stickyweb: 1
					};
					let hasHazards = false;
					for (const hazard in hazards) {
						if (pokemon.side.getSideCondition(hazard)) {
							hasHazards = true;
							break;
						}
					}
					if (hasHazards) {
						this.add('c|+xfix|(no haz... too late)');
					} else {
						this.add('c|+xfix|(no hazards, attacks only, final destination)');
					}
				} else {
					this.add("c|+xfix|//starthunt 1 + 1 | 2 | 2 + 2 | 4 | Opponent's status soon (answer with three letters) | FNT :)");
				}
			}
			if (name === 'xjoelituh') {
				this.add("c|%xJoelituh|I won't be haxed again, you will be the next one. UUUUUU");
			}
			if (name === 'xshiba') { // dd
				this.add("c|+xShiba|LINDA IS INDA");
			}
			if (name === 'zarel') {
				this.add('c|~Zarel|Your mom');
			}
			if (name === 'zebraiken') {
				pokemon.phraseIndex = this.random(3);
				//  Zeb's faint and entry phrases correspond to each other.
				if (pokemon.phraseIndex === 2) {
					this.add('c|&Zebraiken|bzzt n_n');
				} else if (pokemon.phraseIndex === 1) {
					this.add('c|&Zebraiken|bzzt *_*');
				} else {
					this.add('c|&Zebraiken|bzzt o_o');
				}
			}
			if (name === 'zeroluxgiven') {
				this.add('c|%Zero Lux Given|This should be an electrifying battle!');
			}
			if (name === 'zodiax') {
				this.add('c|%Zodiax|Introducing 7 time Grand Champion to the battle!');
			}
		},
		onFaint: function(pokemon, source, effect) {
			let name = toId(pokemon.name);

			if (name === 'innovamania') {
				pokemon.side.addSideCondition('healingwish', pokemon, this);
			}
			// Add here salty tears, that is, custom faint phrases.
			let sentences = [];
			// This message is different from others, as it triggers when
			// opponent faints
			if (source && source.name === 'galbia') {
				this.add('c|@galbia|literally 2HKOged');
			}
			// Actual faint phrases
			if (name === 'acast') {
				this.add('c|%Acast|If only I had more screens...');
			}
			if (name === 'ace') {
				this.add('c|@Ace|inhale all of this');
			}
			if (name === 'aelita') {
				this.add('c|%Aelita|CODE: LYOKO. Tower deactivated...');
			}
			if (name === 'ajhockeystar') {
				this.add('c|+ajhockeystar|You may have beaten me in battle, but never in hockey.');
			}
			if (name === 'albacore') {
				this.add('c|@Albacore|Joke\'s on you, I was just testing!');
			}
			if (name === 'albert') {
				this.add("c|+Albert|You may be good looking, but you're not a piece of art.");
			}
			if (name === 'always') {
				this.add('c|+Always|i swear to fucking god how can a single person be this lucky after getting played all the fucking way. you are a mere slave you glorified heap of trash.');
			}
			if (name === 'am') {
				this.add('c|+AM|RIP');
			}
			if (name === 'andy') {
				this.add('c|%AndrewGoncel|wow r00d! :c');
			}
			if (name === 'antemortem') {
				this.add('c|&antemortem|FUCKING CAMPAIGNERS');
			}
			if (name === 'anttya') {
				this.add('c|+Anttya|Can\'t beat hax ¯\\_(ツ)_/¯');
			}
			if (name === 'anty') {
				this.add('c|+Anty|k');
			}
			if (name === 'articuno') {
				this.add('c|%Articuno|This is why you don\'t get any girls.');
			}
			if (name === 'ascriptmaster') {
				this.add('c|@Ascriptmaster|Farewell, my friends. May we meet another day...');
			}
			if (name === 'astara') {
				sentences = ['/me twerks into oblivion', 'good night ♥', 'Astara Vista Baby'];
				this.add('c|%Ast☆arA|' + sentences[this.random(3)]);
			}
			if (name === 'asty') {
				this.add('c|@Asty|Bottom kek :^(');
			}
			if (name === 'spandan') {
				this.add('c|~Spandan|Gr8 b8, m8. I rel8, str8 appreci8, and congratul8. I r8 this b8 an 8/8. Plz no h8, I\'m str8 ir8. Cre8 more, can\'t w8. We should convers8, I won\'t ber8, my number is 8888888, ask for N8. No calls l8 or out of st8. If on a d8, ask K8 to loc8. Even with a full pl8, I always have time to communic8 so don\'t hesit8');
			}
			if (name === 'classyz') {
				this.add('c|%ClassyZ|go straight to hell do not pass go do not collect $200');
			}
			if (name === 'flygonerz') {
				this.add('c|@Flygonerz|Plox nerf, Ninten__doh__!');
			}
			if (name === 'pieddychomp') {
				this.add("c|&PI★EddyChomp|Fuck this shit, I got rekt. I\'ll get MY REVENGE! RAWR!!!!");
			}
			if (name === 'loominite') {
				this.add('c|&Loominite|eh, i\'m out!');
			}
			if (name === 'thegodofhaxorus') {
				this.add('c|@The God of Haxorus|My own hax against me -3-');
			}
			if (name === 'charizard8888') {
				this.add('c|&charizard8888|I\'m Outta here!');
			}
			if (name === 'xprienzo') {
				this.add('c|⚔XpRienzo ☑-☑|Bleh');
			}
			if (name === 'ransei') {
				this.add('c|~Ransei|ripsei');
			}
			if (name === 'atomicllamas') {
				this.add('c|&atomicllamas|(puke)');
			}
			if (name === 'aurora') {
				this.add('c|@Aurora|are you serious you\'re so bad oh my god haxed ughhhhh');
			}
			if (name === 'reisen') {
				this.add("c|%Reisen|No need for goodbye. I'll see you on the flip side.");
			}
			if (name === 'beowulf') {
				this.add('c|@Beowulf|There is no need to be mad');
			}
			if (name === 'biggie') {
				sentences = ['It was all a dream', 'It\'s gotta be the shoes', 'ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ'];
				this.add('c|@biggie|' + sentences[this.random(3)]);
			}
			if (name === 'blastchance') {
				this.add("c|+Blast Chance|**oh no!**");
			}
			if (name === 'blitzamirin') {
				this.add('c|@Blitzamirin|The Mirror Can Lie It Doesn\'t Show What\'s Inside ╰( ~ ◕ ᗜ ◕ ~ )੭━☆ﾟ.*･｡ﾟ');
			}
			if (name === 'bludz') {
				this.add('c|+bludz|zzz');
			}
			if (name === 'bondie') {
				this.add('c|+Bondie|Sigh...');
			}
			if (name === 'bottt') {
				this.add("c| boTTT|No longer being maintained...");
			}
			if (name === 'brandon') {
				this.add("c|+Brrandon|Always leave the crowd wanting more~");
			}
			if (name === 'bumbadadabum') {
				this.add("c|@bumbadadabum|Find another planet make the same mistakes.");
			}
			if (name === 'bummer') {
				this.add('c|&Bummer|Thanks for considering me!');
			}
			if (name === 'chaos') {
				this.add('c|~chaos|//forcewin chaos');
				if (this.random(1000) === 420) {
					// Shouldn't happen much, but if this happens it's hilarious.
					this.add('c|~chaos|actually');
					this.add('c|~chaos|//forcewin ' + pokemon.side.name);
					this.win(pokemon.side);
				}
			}
			if (name === 'ciran') {
				this.add("c|+Ciran|Fun is still banned in the Wi-Fi room!");
			}
			if (name === 'clefairy') {
				this.add('c|+Clefairy|flex&no flex zone nightcore remix dj clefairyfreak 2015');
			}
			if (name === 'coolstorybrobat') {
				let sentence = [
					"Lol I got slayed", "BRUH!", "I tried", "Going back to those mountains to train brb", "I forgot what fruit had... tasted like...",
				][this.random(5)];
				this.add('c|@CoolStoryBrobat|' + sentence);
			}
			if (name === 'crestfall') {
				this.add("c|%Crestfall|Her pistol go (bang bang, boom boom, pop pop)");
			}
			if (name === 'deathonwings') {
				this.add('c|+Death on Wings|DEG\'s a nub');
			}
			if (name === 'dirpz') {
				this.add('c|+Dirpz|sylveon is an eeeveeeeeeelutioooooon....');
			}
			if (name === 'dmt') {
				this.add('c|+DMT|DMT');
			}
			if (name === 'dreameatergengar') {
				this.add('c|+Dream Eater Gengar|In the darkness I fade. Remember ghosts don\'t die!');
			}
			if (name === 'duck') {
				this.add('c|@Duck|Duck you!');
			}
			if (name === 'e4flint') {
				this.add('c|#E4 Flint|+n1');
				this.add('c|+sparkyboTTT|nice 1');
			}
			if (name === 'eeveegeneral') {
				sentences = ["bye room, Electrolyte is in charge", "/me secretly cries", "inap!"];
				this.add("c|~Eevee General|" + sentences[this.random(3)]);
			}
			if (name === 'eyan') {
				this.add("c|@Eyan|;-;7");
			}
			if (name === 'feliburn') {
				this.add('c|@Feliburn|gg la verga de tu madre');
			}
			if (name === 'fireburn') {
				this.add('c|+Fireburn|>:Y');
			}
			if (name === 'flyingkebab') {
				this.add("c|+Flying Kebab|" + ["I\'ll see you in hell!", "/me vanishes to the depths of hell"][this.random(2)]);
			}
			if (name === 'formerhope') {
				this.add('c|@Former Hope|Now I have Former Hope.');
			}
			if (name === 'freeroamer') {
				this.add('c|%Freeroamer|how do people get these matchups...');
			}
			if (name === 'frysinger') {
				this.add("c|+Frysinger|/me teleports away from the battle and eats a senzu bean");
			}
			if (name === 'fx') {
				this.add("c|+f(x)|mirror, mirror");
			}
			if (name === 'galbia') {
				this.add('c|@galbia|(dog)');
			}
			if (name === 'galom') {
				this.add('c|+Galom|GAME OVER.');
			}
			if (name === 'rodan') {
				this.add("c|+RODAN|The Great Emeralds power allows me to feel... ");
			}
			if (name === 'geoffbruedly') {
				this.add("c|%GeoffBruedly|IM SORRY WINRY");
			}
			if (name === 'giagantic') {
				this.add("c|%Giagantic|x.x");
			}
			if (name === 'golui') {
				this.add("c|+Golui|Freeze in hell");
			}
			if (name === 'goodmorningespeon') {
				this.add("c|+GoodMorningEspeon|gg wp good hunt would scavenge again");
			}
			if (name === 'grimauxiliatrix') {
				this.add("c|%grimAuxiliatrix|∠( ᐛ 」∠)_");
			}
			if (name === 'halite') {
				this.add('c|@Halite|Today was your lucky day...');
			}
			if (name === 'hannah') {
				this.add('c|+Hannahh|Nooo! ;~;');
			}
			if (name === 'hashtag') {
				this.add("c|#Hashtag|fukn immigrants,,, slash me spits");
			}
			if (name === 'haund') {
				this.add('c|%Haund|omg noob team report');
			}
			if (name === 'healndeal') {
				this.add('c|+HeaLnDeaL|sadface I should have been a Sylveon');
			}
			if (name === 'himynamesl') {
				this.add('c|@HiMyNamesL|hey ' + pokemon.side.name + ', get good');
			}
			if (name === 'hippopotas') {
				this.add('-message', 'The sandstorm subsided.');
			}
			if (name === 'hollywood') {
				this.add('c|+hollywood|BibleThump');
			}
			if (name === 'ih8ih8sn0w') {
				this.add('c|+ih8ih8sn0w|nice hax :(');
			}
			if (name === 'imanalt') {
				this.add('c|+imanalt|bshax imo');
			}
			if (name === 'imas234') {
				this.add('c|@imas234|bg no re');
			}
			if (name === 'innovamania') {
				sentences = ['Did you rage quit?', 'How\'d you lose with this set?'];
				this.add('c|@innovamania|' + sentences[this.random(2)]);
			}
			if (name === 'iplaytennislol') {
				this.add('c|%iplaytennislol|/me des');
			}
			if (name === 'iyarito') {
				this.add('c|+Iyarito|Owwnn ;_;');
			}
			if (name === 'jackhiggins') {
				this.add("c|+Jack Higgins|I blame HiMyNamesL");
			}
			if (name === 'jasmine') {
				this.add("raw|<div class=\"broadcast-red\"><b>The server is restarting soon.</b><br />Please finish your battles quickly. No new battles can be started until the server resets in a few minutes.</div>");
			}
			if (name === 'jdarden') {
				this.add('c|@jdarden|;-;7');
			}
			if (name === 'jetpack') {
				this.add('c|+Jetpack|You shouldn\'t of done that. ;_;');
			}
			if (name === 'joim') {
				sentences = ['AVENGE ME, KIDS! AVEEEENGEEE MEEEEEE!!', 'OBEY!', '``This was a triumph, I\'m making a note here: HUGE SUCCESS.``', '``Remember when you tried to kill me twice? Oh how we laughed and laughed! Except I wasn\'t laughing.``', '``I\'m not even angry, I\'m being so sincere right now, even though you broke my heart and killed me. And tore me to pieces. And threw every piece into a fire.``'];
				this.add('c|~Joim|' + sentences[this.random(4)]);
			}
			if (name === 'juanma') {
				this.add("c|+Juanma|I guess you were right, now you must be the happiest person in the world, " + pokemon.side.name + "! You get to be major of 'I-told-you-so' town!");
			}
			if (name === 'kalalokki') {
				this.add('c|+Kalalokki|(⌐■_■)');
				this.add('c|+Kalalokki|( •_•)>⌐■-■');
				this.add('c|+Kalalokki|(x_x)');
			}
			if (name === 'kidwizard') {
				this.add('c|+Kid Wizard|Go to hell.');
			}
			if (name === 'layell') {
				this.add('c|@Layell|' + ['Alas poor me', 'Goodnight sweet prince'][this.random(2)]);
			}
			if (name === 'legitimateusername') {
				this.add('c|@LegitimateUsername|``This isn\'t brave. It\'s murder. What did I ever do to you?``');
			}
			if (name === 'lemonade') {
				this.add('c|+Lemonade|Pasta');
			}
			if (name === 'level51') {
				this.add('c|@Level 51|u_u!');
			}
			if (name === 'lj') {
				this.add('c|%LJDarkrai|.Blast');
			}
			if (name === 'lyto') {
				this.add('c|@Lyto|' + ['Unacceptable!', 'Mrgrgrgrgr...'][this.random(2)]);
			}
			if (name === 'macle') {
				this.add("c|+macle|Follow the Frog Blog - https://gonefroggin.wordpress.com/");
			}
			if (name === 'manu11') {
				this.add("c|@manu 11|so much hax, why do I even try");
			}
			if (name === 'marshmallon') {
				this.add("c|%Marshmallon|Shoutouts to sombolo and Rory Mercury ... for this trash set -_-");
			}
			if (name === 'mattl') {
				this.add('c|+MattL|Forgive me. I feel it again... the call from the light.');
			}
			if (name === 'mcmeghan') {
				this.add("c|&McMeghan|Out-odded");
			}
			if (name === 'megazard') {
				this.add('c|+Megazard|Old dog');
			}
			if (name === 'mizuhime') {
				this.add('c|+Mizuhime|I got Gimped.');
			}
			if (name === 'nv') {
				this.add('c|+nv|Too cute for this game ;~;');
			}
			if (name === 'omegaxis') {
				this.add('c|+Omega-Xis|bull shit bull sHit thats ✖️ some bullshit rightth ere right✖️there ✖️✖️if i do ƽaү so my selｆ ‼️ i say so ‼️ thats what im talking about right there right there (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ‼️ HO0ОଠＯOOＯOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ ‼️ Bull shit');
			}
			if (name === 'orday') {
				this.add('c|%Orda-Y|❄_❄');
			}
			if (name === 'overneat') {
				this.add('c|+Overneat|Ugh! I failed you Iya-sama');
			}
			if (name === 'paradise') {
				this.add('c|%Paradise~|RIP THE DREAM');
			}
			if (name === 'pikachuun') {
				sentences = ['press f to pay respects ;_;7', 'this wouldn\'t have happened in my version', 'wait we were battling?'];
				this.add('c|+Pikachuun|' + sentences[this.random(3)]);
			}
			if (name === 'pluviometer') {
				this.add('c|+pluviometer|GP 2/2');
			}
			if (name === 'qtrx') {
				sentences = ['Keyboard not found; press **Ctrl + W** to continue...', 'hfowurfbiEU;DHBRFEr92he', 'At least my name ain\'t asgdf...'];
				this.add('c|@qtrx|' + sentences[this.random(3)]);
			}
			if (name === 'quitequiet') {
				this.add('c|@Quite Quiet|Well, I tried at least.');
			}
			if (name === 'raseri') {
				this.add('c|&Raseri|you killed a mush :(');
			}
			if (name === 'raven') {
				this.add('c|&Raven|I failed the challenge, and for that, I must lose a life. At least I had one to lose in the first place, nerd.');
			}
			if (name === 'rekeri') {
				this.add('c|@rekeri|lucky af :[');
			}
			if (name === 'rssp1') {
				this.add('c|+rssp1|Witness the power of the almighty Rufflet!');
			}
			if (name === 'rosiethevenusaur') {
				this.add('c|@RosieTheVenusaur|' + ['SD SKARM SHALL LIVE AGAIN!!!', 'Not my WiFi!'][this.random(2)]);
			}
			if (name === 'sailorcosmos') {
				this.add("c|+SailorCosmos|Cosmos Gorgeous Retreat!");
			}
			if (name === 'scotteh') {
				this.add('c|&Scotteh|▄███████▄.▲.▲.▲.▲.▲.▲');
				this.add('c|&Scotteh|█████████████████████▀▀');
			}
			if (name === 'scpinion') {
				this.add("c|@scpinion|guys, I don't even know how to pronounce scpinion");
			}
			if (name === 'scythernoswiping') {
				this.add('c|%Scyther NO Swiping|Aww man!');
			}
			if (name === 'shrang') {
				this.add('c|@shrang|FUCKING 2 YO KID');
			}
			if (name === 'sigilyph') {
				this.add('c|@Sigilyph|FROM THE BACK FROM THE BACK FROM THE BACK FROM THE BACK **ANDD**');
			}
			if (name === 'sirdonovan') {
				this.add('-message', 'RIP sirDonovan');
			}
			if (name === 'skitty') {
				this.add('c|@Skitty|!learn skitty, roleplay');
				this.add('raw|<div class="infobox">In Gen 6, Skitty <span class="message-learn-cannotlearn">can\'t</span> learn Role Play</div>');
			}
			if (name === 'solarisfox') {
				this.add('c|%SolarisFox|So long, and thanks for all the fish.');
			}
			if (name === 'sonired') {
				this.add('c|+Sonired|sigh lucky players.');
			}
			if (name === 'sparktrain') {
				this.add('c|+sparktrain|nice');
			}
			if (name === 'spy') {
				sentences = ['lolhax', 'crit mattered', 'bruh cum @ meh', '>thinking Pokemon takes any skill'];
				this.add('c|+Spy|' + sentences[this.random(4)]);
			}
			if (name === 'snobalt') {
				this.add('c|+Snobalt|Blasphemy!');
			}
			if (name === 'snowy') {
				this.add('c|+Snowy|i never understood this i always hear them be like "yo whats up monica" "u tryna blaze monica"');
			}
			if (name === 'spacebass') {
				this.add('c|@SpaceBass|And the tales of whales and woe off his liquored toungue will flow, the light will soft white twinkle off the cataracts in his eye');
				this.add("c|@SpaceBass|So if by chance you're cornered near the bathroom, or he blocks you sprawled in his aisle seat");
				this.add("c|@SpaceBass|Embrace the chance to hear some tales of greatness, 'cause he's the most interesting ball of toxins you're ever apt to meet");
			}
			if (name === 'specsmegabeedrill') {
				this.add('c|+SpecsMegaBeedrill|Tryhard.');
			}
			if (name === 'starmei') {
				this.add('c|+Starmei|//message AM, must be nice being this lucky');
			}
			if (name === 'starry') {
				this.add('c|%starry|o-oh');
			}
			if (name === 'steamroll') {
				this.add('c|@Steamroll|Not my problem anymore!');
			}
			if (name === 'sunfished') {
				this.add('c|+Sunfished|*raptor screeches*');
			}
			if (name === 'sweep') {
				this.add('c|&Sweep|You offended :C');
			}
			if (name === 'talkingtree') {
				this.add('c|+talkingtree|I am Groot u_u');
			}
			if (name === 'teg') {
				sentences = ['Save me, Joim!', 'Arcticblast is the worst OM leader in history'];
				this.add('c|+TEG|' + sentences[this.random(2)]);
			}
			if (name === 'temporaryanonymous') {
				sentences = [';_;7', 'This kills the tempo', 'I\'m kill. rip.', 'S-senpai! Y-you\'re being too rough! >.<;;;;;;;;;;;;;;;;;', 'A-at least you checked my dubs right?', 'B-but that\'s impossible! This can\'t be! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHGH'];
				this.add('c|@Temporaryanonymous|' + sentences[this.random(6)]);
			}
			if (name === 'teremiare') {
				this.add('c|%Teremiare|sigh...');
			}
			if (name === 'theimmortal') {
				this.add('c|~The Immortal|Oh how wrong we were to think immortality meant never dying.');
			}
			if (name === 'tone114') {
				this.add('c|+TONE114|I don\'t have to take this. I\'m going for a walk.');
			}
			if (name === 'trickster') {
				this.add('c|@Trickster|UPLOADING VIRUS.EXE \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 99% COMPLETE');
			}
			if (name === 'unfixable') {
				this.add('c|+unfixable|i may be dead but my eyebrows are better than yours will ever be');
			}
			if (name === 'urkerab') {
				this.add('l|urkerab');
			}
			if (name === 'uselesstrainer') {
				sentences = ['TIME TO SET UP', 'One day I\'ll become a beautiful butterfly'];
				this.add('c|@useless trainer|' + sentences[this.random(2)]);
			}
			if (name === 'vapo') {
				this.add('c|%Vapo|( ; _> ;)');
			}
			if (name === 'vexeniv') {
				this.add('c|+Vexen IV|brb burning my dread');
			}
			if (name === 'winry') {
				this.add('c|@Winry|I AM NOT A WEEB');
			}
			if (name === 'xfix') {
				const foe = pokemon.side.foe.active[0];
				if (foe.name === 'xfix') {
					this.add("c|+xfix|(I won. I lost. I... huh... ~~can somebody tell me what actually happened?~~)");
				} else if (foe.ability === 'magicbounce') {
					this.add('c|+xfix|(How do mirrors work... oh right, when you use a mirror, your opponent has a mirror as well... or something, ~~that\'s how you "balance" this game~~)');
				} else {
					this.add('c|+xfix|~~That must have been a glitch. Hackers.~~');
				}
			}
			if (name === 'xjoelituh') {
				this.add("c|%xJoelituh|THAT FOR SURE MATTERED. Blame Nayuki. I'm going to play CSGO then.");
			}
			if (name === 'xshiba') {
				this.add("c|+xShiba|Lol that feeling when you just win but get haxed..");
			}
			if (name === 'zarel') {
				this.add('c|~Zarel|your mom');
				// Followed by the usual '~Zarel fainted'.
				this.add('-message', '~Zarel used your mom!');
			}
			if (name === 'zebraiken') {
				if (pokemon.phraseIndex === 2) {
					this.add('c|&Zebraiken|bzzt u_u');
				} else if (pokemon.phraseIndex === 1) {
					this.add('c|&Zebraiken|bzzt ._.');
				} else {
					// Default faint.
					this.add('c|&Zebraiken|bzzt x_x');
				}
			}
			if (name === 'zeroluxgiven') {
				this.add('c|%Zero Lux Given|I\'ve been beaten, what a shock!');
			}
			if (name === 'zodiax') {
				this.add('c|%Zodiax|We need to go full out again soon...');
			}
		},
		// Special switch-out events for some mons.
		onSwitchOut: function(pokemon) {
			let name = toId(pokemon.name);

			if (!pokemon.illusion) {
				if (name === 'hippopotas') {
					this.add('-message', 'The sandstorm subsided.');
				}
			}

			// Transform
			if (pokemon.originalName) pokemon.name = pokemon.originalName;
		},
		onModifyPokemon: function(pokemon) {
			let name = toId(pokemon.name);
			// Enforce choice item locking on custom moves.
			// qtrx only has one move anyway.
			if (name !== 'qtrx') {
				let moves = pokemon.moveset;
				if (pokemon.getItem().isChoice && pokemon.lastMove === moves[3].id) {
					for (let i = 0; i < 3; i++) {
						if (!moves[i].disabled) {
							pokemon.disableMove(moves[i].id, false);
							moves[i].disabled = true;
						}
					}
				}
			}
		},
		// Specific residual events for custom moves.
		// This allows the format to have kind of custom side effects and volatiles.
		onResidual: function(battle) {
			// Deal with swapping from qtrx's mega signature move.
			let swapmon1, swapmon2;
			let swapped = false;
			for (let i = 1; i < 6 && !swapped; i++) {
				swapmon1 = battle.sides[0].pokemon[i];
				if (swapmon1.swapping && swapmon1.hp > 0) {
					swapmon1.swapping = false;
					for (let j = 1; j < 6; j++) {
						swapmon2 = battle.sides[1].pokemon[j];
						if (swapmon2.swapping && swapmon2.hp > 0) {
							swapmon2.swapping = false;

							this.add('message', "Link standby... Please wait.");
							swapmon1.side = battle.sides[1];
							swapmon1.fullname = swapmon1.side.id + ': ' + swapmon1.name;
							swapmon1.id = swapmon1.fullname;
							swapmon2.side = battle.sides[0];
							swapmon2.fullname = swapmon2.side.id + ': ' + swapmon2.name;
							swapmon2.id = swapmon2.fullname;
							let oldpos = swapmon1.position;
							swapmon1.position = swapmon2.position;
							swapmon2.position = oldpos;
							battle.sides[0].pokemon[i] = swapmon2;
							battle.sides[1].pokemon[j] = swapmon1;

							this.add("c|\u2605" + swapmon1.side.name + "|Bye-bye, " + swapmon2.name + "!");
							this.add("c|\u2605" + swapmon2.side.name + "|Bye-bye, " + swapmon1.name + "!");
							if (swapmon1.side.active[0].hp && swapmon2.side.active[0].hp) {
								this.add('-anim', swapmon1.side.active, "Healing Wish", swapmon1.side.active);
								this.add('-anim', swapmon2.side.active, "Aura Sphere", swapmon2.side.active);
								this.add('message', swapmon2.side.name + " received " + swapmon2.name + "! Take good care of " + swapmon2.name + "!");
								this.add('-anim', swapmon2.side.active, "Healing Wish", swapmon2.side.active);
								this.add('-anim', swapmon1.side.active, "Aura Sphere", swapmon1.side.active);
								this.add('message', swapmon1.side.name + " received " + swapmon1.name + "! Take good care of " + swapmon1.name + "!");
							} else {
								this.add('message', swapmon2.side.name + " received " + swapmon2.name + "! Take good care of " + swapmon2.name + "!");
								this.add('message', swapmon1.side.name + " received " + swapmon1.name + "! Take good care of " + swapmon1.name + "!");
							}
							swapped = true;
							break;
						}
					}
				}
			}
		},
	},
	{
		name: "[Gen 7] Monotype Random Battle",

		mod: 'gen7',
		team: 'random',
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Random Battle",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable."],

		mod: 'gen7',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Rock Paper Shedinja",
		desc: ["challenge your friends to a friendly game of rock paper scissors on Pokemon Showdown"],
		team: 'randomRPS',
		onBegin: function () {
			this.add("raw|All moves won't miss. First move is Rock, second is Paper, third is Scissors. Moves will do nothing if the same move type is used.");
			let allPokemon = [this.p1.pokemon[0], this.p2.pokemon[0]];
			for (let i = 0; i < 2; i++) { //Give infinite PP just in case both players love to tie
				let pokemon = allPokemon[i];
				for (let j = 0; j < 3; j++) {
					pokemon.moveset[j].pp = Infinity;
					pokemon.moveset[j].maxpp = Infinity;
				}
			}
		},
		onModifyMove: function (move) {
			move.accuracy = true;
			if (move.id === 'suckerpunch') { //Paper
				move.onTry = function (source, target) {
					source.rps = "paper";
					let decision = this.willMove(target);
					if (!decision || decision.move.category === 'Status' || decision.move.id === 'suckerpunch') {
						this.attrLastMove('[still]');
						this.add('-fail', source);
						return null;
					}
				};
			} else if (move.id === 'phantomforce') { //Special case for Phantom Force
				move.onTry = function (source, target, move) {
					source.rps = "rock";
					let decision = this.willMove(target);
					if (!decision && target.rps !== "scissors" || decision && decision.move.category !== 'Status') {
						this.attrLastMove('[still]');
						this.add('-fail', source);
						return null;
					}
					if (source.removeVolatile(move.id)) {
						return;
					}
					this.add('-prepare', source, move.name, target);
					if (!this.runEvent('ChargeMove', source, target, move)) {
						this.add('-anim', source, move.name, target);
						return;
					}
					source.addVolatile('twoturnmove', target);
					return null;
				};
			} else if (move.category !== 'Status') { //Rock
				move.onTry = function (source, target) {
					source.rps = "rock";
					let decision = this.willMove(target);
					if (!decision && target.rps !== "scissors" || decision && decision.move.category !== 'Status') {
						this.attrLastMove('[still]');
						this.add('-fail', source);
						return null;
					}
				};
			} else { //Scissors
				move.onTry = function (source, target) {
					source.rps = "scissors";
					let decision = this.willMove(target);
					if (!decision && target.rps !== "paper" || decision && decision.move.category === 'Status') {
						this.attrLastMove('[still]');
						this.add('-fail', source);
						return null;
					}
				};
			}
		},
		mod: 'gen7', //this can be replaced with a seperate mod folder if you wanted it to
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Random Benjamin Butterfree",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/benjamin-butterfree-aka-pokemon-deevolution.3581895/\">Benjamin Butterfee (Pokemon DeEvolution)</a>"],
		mod: 'bb',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', "Team Preview"],
		onAfterDamage: function(damage, target, source, move) {
			if (!target.willDevolve) return;
			let template = target.template.isMega ? this.getTemplate(this.getTemplate(target.template.baseSpecies).prevo) : this.getTemplate(target.template.prevo);
			target.willDevolve = false;
			target.formeChange(template);
			target.baseTemplate = template;
			target.details = template.species + (target.level === 100 ? '' : ', L' + target.level) + (target.gender === '' ? '' : ', ' + target.gender) + (target.set.shiny ? ', shiny' : '');
			this.add('detailschange', target, target.details);
			this.add('-message', "" + target.name + " has de-volved into " + template.name + "!");
			target.setAbility(template.abilities['0']);
			target.baseAbility = target.ability;
			let newHP = Math.floor(Math.floor(2 * target.template.baseStats['hp'] + target.set.ivs['hp'] + Math.floor(target.set.evs['hp'] / 4) + 100) * target.level / 100 + 10);
			target.hp = newHP;
			target.maxhp = newHP;
			this.add('-heal', target, target.getHealth, '[silent]');
			this.heal(target.maxhp, target, source, 'devolution', '[silent]');
			let movepool = template.learnset;
			let prevo = template.prevo;
			while (prevo) {
				let learnset = this.getTemplate(prevo).learnset;
				for (let i in learnset) {
					movepool[i] = learnset[i];
				}
				prevo = this.getTemplate(prevo).prevo;
			}
			let newmoves = [],
				newbasemoves = [];
			for (let i = 0; i < target.baseMoveset.length; i++) {
				if (movepool[target.baseMoveset[i].id]) {
					newbasemoves.push(target.baseMoveset[i]);
					newmoves.push(target.moveset[i]);
				}
			}
			target.baseMoveset = newbasemoves;
			target.moveset = newmoves;
			target.clearBoosts();
			this.add('-clearboost', target, "[silent]");
			target.species = target.template.species;
			target.canMegaEvo = false;
			target.cureStatus('[silent]');
			target.volatiles = {};
		},
	},
	{
		name: "[Gen 7] Random Camomon",
		desc: [
			"Pok&eacute;mon change type to match their first two moves.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3513059/\">Camomons</a>",
		],
		team: 'random',

		ruleset: ['[Gen 7] OU'],
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let types = [this.getMove(pokemon.moves[0]).type];
				if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
				pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
				pokemon.types = pokemon.template.types = types;
			}
		},
		onSwitchIn: function(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onAfterMega: function(pokemon) {
			let types = [this.getMove(pokemon.moves[0]).type];
			if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
			pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
			pokemon.types = pokemon.template.types = types;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 7] Random Camomons++",
		desc: [
			"Pok&eacute;mon change type to match their moves. Hence, a Pokemon can now have a maximum of 4 types.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3513059/\">Camomons</a>",
		],
		team: 'random',

		ruleset: ['Random Battle', 'Team Preview'],
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let types = [this.getMove(pokemon.moves[0]).type],
					type = {};
				type[this.getMove(pokemon.moves[0]).type] = true;
				for (let j = 1; j < pokemon.moves.length; j++)
				{
					if (pokemon.moves[j] && !type[this.getMove(pokemon.moves[j]).type]) {
						types.push(this.getMove(pokemon.moves[j]).type);
						type[this.getMove(pokemon.moves[j]).type] = true;
					}
				}
				pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
				pokemon.types = pokemon.template.types = types;
			}
		},
		onSwitchIn: function(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onAfterMega: function(pokemon) {
			let types = [this.getMove(pokemon.moves[0]).type],
				type = {};
			type[this.getMove(pokemon.moves[0]).type] = true;
			for (let j = 1; j < pokemon.moves.length; j++)
			{
				if (pokemon.moves[j] && !type[this.getMove(pokemon.moves[j]).type]) {
					types.push(this.getMove(pokemon.moves[j]).type);
					type[this.getMove(pokemon.moves[j]).type] = true;
				}
			}
			pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
			pokemon.types = pokemon.template.types = types;
		},
	},
	{
		name: "[Gen 7] Random Partners in Crime",
		desc: [
			"Doubles-based metagame where both active ally Pok&eacute;mon share abilities and moves.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3618488/\">Partners in Crime</a>",
		],

		mod: 'pic',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['[Gen 7] Doubles OU', 'Sleep Clause Mod'],

		banlist: ['Huge Power', 'Imposter', 'Parental Bond', 'Pure Power', 'Wonder Guard', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Mimic', 'Sketch', 'Transform'],
		onDisableMovePriority: -1,
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			if (this.p1.active.every(ally => ally && !ally.fainted)) {
				let p1a = this.p1.active[0], p1b = this.p1.active[1];
				if (p1a.ability !== p1b.ability) {
					let p1a_innate = 'ability' + p1b.ability;
					p1a.volatiles[p1a_innate] = {id: p1a_innate, target: p1a};
					let p1b_innate = 'ability' + p1a.ability;
					p1b.volatiles[p1b_innate] = {id: p1b_innate, target: p1b};
				}
			}
			if (this.p2.active.every(ally => ally && !ally.fainted)) {
				let p2a = this.p2.active[0], p2b = this.p2.active[1];
				if (p2a.ability !== p2b.ability) {
					let p2a_innate = 'ability' + p2b.ability;
					p2a.volatiles[p2a_innate] = {id: p2a_innate, target: p2a};
					let p2b_innate = 'ability' + p2a.ability;
					p2b.volatiles[p2b_innate] = {id: p2b_innate, target: p2b};
				}
			}
			let ally = pokemon.side.active.find(ally => ally && ally !== pokemon && !ally.fainted);
			if (ally && ally.ability !== pokemon.ability) {
				if (!pokemon.innate) {
					pokemon.innate = 'ability' + ally.ability;
					delete pokemon.volatiles[pokemon.innate];
					pokemon.addVolatile(pokemon.innate);
				}
				if (!ally.innate) {
					ally.innate = 'ability' + pokemon.ability;
					delete ally.volatiles[ally.innate];
					ally.addVolatile(ally.innate);
				}
			}
		},
		onSwitchOut: function (pokemon) {
			if (pokemon.innate) {
				pokemon.removeVolatile(pokemon.innate);
				delete pokemon.innate;
			}
			let ally = pokemon.side.active.find(ally => ally && ally !== pokemon && !ally.fainted);
			if (ally && ally.innate) {
				ally.removeVolatile(ally.innate);
				delete ally.innate;
			}
		},
		onFaint: function (pokemon) {
			if (pokemon.innate) {
				pokemon.removeVolatile(pokemon.innate);
				delete pokemon.innate;
			}
			let ally = pokemon.side.active.find(ally => ally && ally !== pokemon && !ally.fainted);
			if (ally && ally.innate) {
				ally.removeVolatile(ally.innate);
				delete ally.innate;
			}
		},
	},
	{
		name: "[Gen 7] Random Quantumbility",
		desc: [
			"&bullet; Quantumbilityg is an OU-based meta where you basically share your ability with your opponent, with a reset every switch. (your ability isn't replaced by the ability of the opponent, but you still can profit of it)",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3598275/#post-7271345\">Quantumbility</a>",
		],
		mod: 'franticfusions',
		ruleset: ['[Gen 7] OU'],
		banlist: ["Liepard", "Serperior"],
		team: 'random',
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			if (!pokemon.side.foe.active[0]) return;
			let statusability = {
				"aerilate": true,
				"aurabreak": true,
				"flashfire": true,
				"parentalbond": true,
				"pixilate": true,
				"refrigerate": true,
				"sheerforce": true,
				"slowstart": true,
				"truant": true,
				"unburden": true,
				"zenmode": true,
			};
			let sec = statusability[pokemon.ability] ? ("other" + pokemon.ability) : pokemon.ability;
			pokemon.side.foe.active[0].sec = sec;
			pokemon.side.foe.active[0].addVolatile(sec);
			sec = statusability[pokemon.side.foe.active[0].ability] ? ("other" + pokemon.side.foe.active[0].ability) : pokemon.side.foe.active[0].ability;
			pokemon.sec = sec;
		},
		onSwitchOut: function (pokemon) {
			if (!pokemon.side.foe.active[0]) return;
			pokemon.side.foe.active[0].removeVolatile(pokemon.side.foe.active[0].sec);
			delete pokemon.side.foe.active[0].sec;
		},
		onFaint: function (pokemon) {
			if (!pokemon.side.foe.active[0]) return;
			pokemon.side.foe.active[0].removeVolatile(pokemon.side.foe.active[0].sec);
			delete pokemon.side.foe.active[0].sec;
		},
	},
	{
		name: "[Gen 7] Random Haxmons",

		team: 'random',
		ruleset: ['[Gen 7] OU', 'Freeze Clause'],
		banlist: ["King's Rock", 'Razor Fang', 'Stench'],
		onModifyMovePriority: -100,
		onModifyMove: function(move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 0;
			move.willCrit = true;
			if (move.secondaries) {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 100;
				}
			}
		}
	},
	{
		name: "[Gen 7] Random Open House",
		desc: ["Every 5 turns, one of Trick Room, Magic Room or Wonder Room is set up.", "&bullet; <a href=\"http://www.smogon.com/forums/threads/open-house.3584274/\">Open House</a>"],
		mod: "openhouse",
		team: 'random',
		ruleset: ["Team Preview", 'Random Battle'],
		onBegin: function()
		{
			this.houses = ["Wonder Room", "Trick Room", "Magic Room"];
			this.nexthouse = this.houses[this.random(3)];
			this.add("-message", "Starting next turn, the battle will take place in the " + this.nexthouse + "!");
		},
		onResidualOrder: 999,
		onResidual: function()
		{
			if (this.turn % 5 == 4)
			{
				let nexthouse = this.houses[this.random(3)];
				while (nexthouse == this.curhouse) nexthouse = this.houses[this.random(3)];
				this.nexthouse = nexthouse;
				this.add("-message", "Starting next turn, the battle will take place in the " + this.nexthouse + "!");
			}
		}
	},
	{
		name: "[Gen 7] Random Meta Man",
		desc: [
			"When a Pokemon faints, the opposing Pokemon replaces its current ability with the fainted Pokemon's and gains its last-used move in a new slot (for up to 9 total moves). These changes last the entire match. If a Pokemon faints before using a move during the match, no move is gained by the opponent.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/meta-man.3565966/\">Meta Man</a>",
		],
		team: 'random',
		ruleset: ['Team Preview', 'Random Battle'],
		mod: "metaman",
		onFaint: function(pokemon)
		{
			this.add("-message", pokemon.side.foe.pokemon[0].name + " received " + pokemon.name + "'s " + this.data.Abilities[pokemon.ability].name + "!");
			pokemon.side.foe.pokemon[0].setAbility(pokemon.ability);
			pokemon.side.foe.pokemon[0].baseAbility = pokemon.ability;
			let lastMove = pokemon.lastM;
			let has
			if (pokemon.side.foe.pokemon[0].moveset.length <= 9 && lastMove && !pokemon.side.foe.pokemon[0].hasMove(lastMove.id))
			{
				pokemon.side.foe.pokemon[0].moveset.push(lastMove);
				pokemon.side.foe.pokemon[0].baseMoveset.push(lastMove);
				this.add("-message", pokemon.side.foe.pokemon[0].name + " received " + pokemon.name + "'s " + pokemon.lastM.move + "!");
			}
		},
	},
	{
		name: "[Gen 7] Random Hot Potato",
		desc: `Moves that deal direct damage to an opponent will 'pass' any hazard, status/volatile effects and stat debuffs currently on your side or Pokemon to your opponent's.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3643676/">Hot Potato</a>`,
		],

		mod: 'hotpotato',
		team: "random",
		ruleset: ['[Gen 7] Random Battle'],
		//banlist: ['Blast Burn', 'Frenzy Plant', 'Giga Impact', 'Hydro Cannon', 'Hyper Beam', 'Prismatic Laser', 'Roar of Time', 'Rock Wrecker'],
	},
	{
		name: "[Gen 7] Random Hot Potato [No Mod]",
		desc: `Moves that deal direct damage to an opponent will 'pass' any hazard, status/volatile effects and stat debuffs currently on your side or Pokemon to your opponent's.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3643676/">Hot Potato</a>`,
		],
		team: 'random',
		ruleset: ['[Gen 7] Random Battle'],

		onAfterDamage: function (damage, pokemon, target, moveData) {
			if (pokemon === target || moveData.category === 'Status' || !target.hp || !damage) return;
			let passableConditions = ['stealthrock', 'stickyweb', 'spikes', 'toxicspikes'];
			if (Object.keys(pokemon.side.sideConditions).length > 0) {
				for (let i in pokemon.side.sideConditions) {
					if (!passableConditions.includes(i)) continue;
					let condition = pokemon.side.sideConditions[i];
					target.side.addSideCondition(condition.id);
					if (pokemon.side.sideConditions.layers) target.side.sideConditions.layers = pokemon.side.sideConditions.layers;
					pokemon.side.removeSideCondition(condition.id);
					this.add('-sideend', pokemon.side, this.getEffect(condition.id).name, '[silent]');
				}
			}
			//status
			if (pokemon.status) {
				let status = pokemon.status, statusData = Object.assign({}, pokemon.statusData);
				pokemon.cureStatus('');
				target.trySetStatus(status);
				target.statusData = statusData;
				target.statusData.target = target;
			}

			//boosts
			let boosts = {};
			for (let i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					boosts[i] = pokemon.boosts[i];
					pokemon.boosts[i] = 0;
				}
			}
			if (Object.keys(boosts).length) {
		        this.add('-clearnegativeboost', pokemon);
				this.boost(boosts, target, pokemon);
			}

			// attract
			if (pokemon.volatiles.attract) {
				target.volatiles.attract = {
					id: 'attract',
					source: pokemon,
					target: target,
					sourcePosition: 0,
					sourceEffect: pokemon.volatiles.attract.sourceEffect
				};
				pokemon.removeVolatile('attract');
			}

			//mean look n stuff
			if (pokemon.volatiles.trapped) {
				target.addVolatile('trapped', pokemon, pokemon.volatiles.trapped.sourceMove, 'trapper');
				pokemon.removeVolatile('trapped')
			}

			//magma storm, infestation, etc
			if (pokemon.volatiles.partiallytrapped) {
				target.addVolatile('trapped', pokemon, pokemon.volatiles.partiallytrapped.sourceMove, 'trapper');
				pokemon.removeVolatile('partiallytrapped')
			}

			//perish song. exists here because metronome
			if (pokemon.volatiles.perishsong) {
				target.volatiles.perishsong = Object.assign({}, pokemon.volatiles.perishsong);
				target.volatiles.perishsong.target = target;
				pokemon.removeVolatile('perishsong');
				this.add('-start', pokemon, `perish${target.volatiles.perishsong.duration}`, '[silent]');
			}

			// other passable volatiles
			let passableVolatiles = ['confusion', 'curse', 'disable', 'embargo', 'encore', 'foresight', 'healblock', 'imprison', 'leechseed', 'miracleeye', 'nightmare', 'taunt', 'telekinesis', 'torment'];
			for (let i in pokemon.volatiles) {
				if (passableVolatiles.includes(i)) {
					let duration = pokemon.volatiles[i].duration;
					pokemon.removeVolatile(i);
					target.addVolatile(i);
					if (duration) target.volatiles[i].duration = duration;
				}
			}
		}
	},
	{
		name: "[Gen 7] Random Top Percentage",
		mod: 'toppercentage',
		desc: ["&lt; <a href=\"http://www.smogon.com/forums/threads/top-percentage.3564459/\">Top Percentage</a>"],
		ruleset: ['Random Battle', "Team Preview"],
		team: "random",
		onBegin: function() {
			this.add("raw|Welcome to Top Percentage! The first Player to deal 400% damage wins! HAHAHAH!");
			for (var i = 0; i < this.sides.length; i++) {
				this.sides[i].metaCount = 400;
			}
		},
		onAfterDamage: function(damage, target, source, move) {
			//only should work if does not make target faint
			let percentage = 100 * damage / target.maxhp;
			if (damage >= target.hp) {
				percentage = 100 * target.hp / target.maxhp;
			}
			target.side.metaCount -= percentage;
			this.add('-message', target.side.name + " has " + Math.round(target.side.metaCount) + "% left!");
			if (target.side.metaCount <= 0.1) {
				//note: making this 0.1 because I got 1.10 times 10^-15 once
				//something silly with rounding
				//this works well enough
				this.add('raw|' + target.side.foe.name + " has dealt 400% damage!");
				this.win(target.side.foe);
			}
		},
	},
	{
		name: "[Gen 7] Random Last Will",
		desc: ["&bullet; Every Pokemon will use the move in their last moveslot before fainting in battle."],
		ruleset: ['Random Battle'],
		mod: ['gen7'],
		team: 'random',
		onBeforeFaint: function (pokemon, source) {
			this.add('-hint', `${pokemon.name || pokemon.species}'s Last Will let it use one last move!`);
			this.runMove(pokemon.moves[pokemon.moves.length - 1], pokemon);
		},
	},
	{
		name: "[Gen 7] Random Move Equality",
		desc: ["&bullet; Every Move has 100 base power with the exception of moves that have varying base powers."],
		mod: 'gen7',
		ruleset: ['Random Battle'],
		team: 'random',
		onModifyMovePriority: 5,
		onModifyMove: function(move, pokemon) {
			if (move.category === 'Status' || move.priority !== 0 || move.onBasePower || move.basePowerCallback) return move;
			if (move.isZ) {
				move.basePower = 180;
				return move;
			}
			if (move.multihit) {
				move.basePower = parseInt(100 / move.multihit[move.multihit.length - 1]);
				return move;
			}
			move.basePower = 100;
			return move;
		},
	},
	{
		name: "[Gen 7] BSS Factory",
		desc: [
			"Randomised 3v3 Singles featuring Pok&eacute;mon and movesets popular in Battle Spot Singles.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3604845/\">Information and Suggestions Thread</a>",
		],

		mod: 'gen7',
		team: 'randomBSSFactory',
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
	},
	

	// SM Singles
	///////////////////////////////////////////////////////////////////
	{
		section: "SM Singles",
		column: 1,
	},
	{
		name: "[Gen 7] OU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3608656/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587177/\">OU Banlist</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3590726/\">OU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3606650/\">OU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
        name: "[Gen 7] OU (No Preview)",
        desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3608656/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587177/\">OU Banlist</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3590726/\">OU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3606650/\">OU Sample Teams</a>",
		],
        mod: 'gen7',
        ruleset: ['Pokemon', 'Standard'],
        banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
     },
	{
		name: "[Gen 7] Ubers",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587184/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3591388/\">Ubers Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3599816/\">Ubers Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: ['Baton Pass'],
	},
	{
		name: "[Gen 7] UU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3618821/\">UU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3613279/\">UU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3591880/\">UU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Mewnium Z'],
	},
	{
		name: "[Gen 7] RU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3619225/\">RU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3602279/\">RU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3598090/\">RU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] UU'],
		banlist: ['UU', 'BL2', 'Kommonium Z', 'Aurora Veil'],
	},
	{
		name: "[Gen 7] NU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3616091/\">NU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3607629/\">NU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3606112/\">NU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] RU'],
		banlist: ['RU', 'BL3', 'Drought'],
	},
	{
		name: "[Gen 7] PU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3614120/\">PU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3614892/\">PU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3614470/\">PU Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] NU'],
		banlist: ['NU', 'BL4'],
	},
	{
		name: "[Gen 7] LC",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587196/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/dex/sm/formats/lc/\">LC Banlist</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3609771/\">LC Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3588679/\">LC Sample Teams</a>",
		],

		mod: 'gen7',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: [
			'Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Vulpix-Base', 'Yanma',
			'Eevium Z', 'Dragon Rage', 'Sonic Boom',
		],
	},
	{
		name: "[Gen 7] Monotype",
		desc: [
			"All the Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587204/\">Monotype Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3589809/\">Monotype Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3599682/\">Monotype Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound',
			'Kartana', 'Kyogre', 'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Shadow Tag', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Medichamite', 'Metagrossite', 'Salamencite', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
	},
	{
		name: "[Gen 7] Anything Goes",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587441/\">Anything Goes</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3591711/\">AG Resources</a>",
			"&bullet; <a href=\"http://www.smogon.com/tiers/om/analyses/ag/\">AG Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] CAP",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587865/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3597893/\">CAP Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/posts/7203358/\">CAP Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU', 'Allow CAP'],
		banlist: ['Tomohawk + Earth Power', 'Tomohawk + Reflect'],
	},
	{
		name: "[Gen 7] Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3601012/\">Introduction to Battle Spot Singles</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3605970/\">Battle Spot Singles Viability Ranking</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3601658/\">Battle Spot Singles Roles Compendium</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3593055/\">Battle Spot Singles Sample Teams</a>",
		],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU'],
		requirePentagon: true,
	},
	{
		name: "[Gen 7] Battle Spot Special 7",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3621403/\">Battle Spot Special: Season 7</a>"],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Alola Pokedex'],
		banlist: ['Poipole', 'Naganadel', 'Stakataka', 'Blacephalon'],
		requirePlus: true,
	},
	{
		name: "[Gen 7] Dragon Cup",
		desc: [`&bullet; <a href="https://3ds.pokemon-gl.com/dl-regulation/6010">Dragon Cup: Official rules</a>`],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		timer: {starting: 15 * 60 - 10, perTurn: 10, maxPerTurn: 60, maxFirstTurn: 90, timeoutAutoChoose: true},
		ruleset: ['Pokemon', 'Minimal GBU', 'Team Preview'],
		onValidateTeam: function (team) {
			const restrictedLegends = ['Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon', 'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Reshiram', 'Zekrom', 'Kyurem', 'Xerneas', 'Yveltal', 'Zygarde', 'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma'];
			let count = 0;
			for (const set of team) {
				const baseSpecies = this.getTemplate(set.species).baseSpecies;
				if (restrictedLegends.includes(baseSpecies)) count++;
				if (count > 1) return ["You can only use one Restricted Legendary Pok\u00E9mon."];
			}
		},
		requirePentagon: true,
	},
	{
		name: "[Gen 7] Custom Game",

		mod: 'gen7',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		teamLength: {
			validate: [1, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////
	{
		section: "Other Metagames",
		column: 2,
	},
	{
		name: "[Gen 7] Balanced Hackmons",
		desc: [
			"Anything that can be hacked in-game and is usable in local battles is allowed.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587475/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3588586/\">BH Suspects and Bans Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3593766/\">BH Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/bh/\">BH Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Innards Out', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Water Bubble', 'Wonder Guard', 'Chatter', 'Comatose + Sleep Talk'],
	},
	{
		name: "[Gen 7] 1v1",
		desc: [
			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587523/\">1v1</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3592842/\">1v1 Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/1v1/\">1v1 Analyses</a>",
		],

		mod: 'gen7',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: [
			'Illegal', 'Unreleased', 'Arceus', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Defense', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Perish Song', 'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Chansey + Charm + Seismic Toss', 'Chansey + Charm + Psywave',
			'Flash', 'Kinesis', 'Leaf Tornado', 'Mirror Shot', 'Mud Bomb', 'Mud-Slap', 'Muddy Water', 'Night Daze', 'Octazooka', 'Sand Attack', 'Smokescreen',
		],
	},
	{
		name: "[Gen 7] Mix and Mega",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587740/\">Mix and Mega</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591580/\">Mix and Mega Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/mix_and_mega/\">Mix and Mega Analyses</a>",
		],

		mod: 'mixandmega',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Mega Rayquaza Clause', 'Team Preview'],
		banlist: ['Baton Pass'],
		onValidateTeam: function (team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (!(item in itemTable)) {
					itemTable[item] = 1;
				} else if (itemTable[item] < 2) {
					itemTable[item]++;
				} else {
					if (item.megaStone) return ["You are limited to two of each Mega Stone.", "(You have more than two " + this.getItem(item).name + ")"];
					if (item.id === 'blueorb' || item.id === 'redorb') return ["You are limited to two of each Primal Orb.", "(You have more than two " + this.getItem(item).name + ")"];
				}
			}
		},
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			let uberStones = ['beedrillite', 'blazikenite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || set.ability === 'Power Construct' || uberStones.includes(item.id)) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 7] Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587901/\">Almost Any Ability</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3595753/\">AAA Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/aaa/\">AAA Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Ignore Illegal Abilities', 'Swagger Clause', 'Team Preview'],
		banlist: ['Aegislash', 'Arceus', 'Archeops', 'Blaziken', 'Darkrai', 'Deoxys', 'Dialga', 'Dragonite', 'Dugtrio-Base', 'Giratina', 'Groudon',
			'Ho-Oh', 'Kartana', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Pheromosa',
			'Rayquaza', 'Regigigas', 'Reshiram', 'Shaymin-Sky', 'Shedinja', 'Slaking', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Shadow Tag', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite', 'Baton Pass',
		],
		onValidateSet: function (set) {
			let bannedAbilities = {'Arena Trap': 1, 'Comatose': 1, 'Contrary': 1, 'Fluffy': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Illusion': 1, 'Imposter': 1, 'Innards Out': 1, 'Parental Bond': 1, 'Protean': 1, 'Pure Power': 1, 'Simple':1, 'Speed Boost': 1, 'Stakeout': 1, 'Water Bubble': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
		},
	},
	{
		name: "[Gen 7] Sketchmons",
		desc: [
			"Pok&eacute;mon gain access to one Sketched move.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587743/\">Sketchmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/sketchmons/\">Sketchmons Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU', 'Allow One Sketch', 'Sketch Clause'],
		banlist: ['Dugtrio-Base'],
		noSketch: ['Belly Drum', 'Celebrate', 'Conversion', "Forest's Curse", 'Geomancy', 'Happy Hour', 'Hold Hands', 'Lovely Kiss', 'Purify', 'Shell Smash', 'Shift Gear', 'Sketch', 'Spore', 'Sticky Web', 'Trick-or-Treat'],
	},
	{
		name: "[Gen 7] Classic Hackmons",
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		maxLevel: 100,
		defaultLevel: 100,
		onValidateSet: function(set) {
			let template = this.getTemplate(set.species);
			let item = this.getItem(set.item);
			let problems = [];
			if (template.isNonstandard) {
				problems.push(set.species + ' is not a real Pokemon.');
			}
			if (item.isNonstandard) {
				problems.push(item.name + ' is not a real item.');
			}
			let ability = {};
			if (set.ability) ability = this.getAbility(set.ability);
			if (ability.isNonstandard) {
				problems.push(ability.name + ' is not a real ability.');
			}
			if (set.moves) {
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' is not a real move.');
					}
				}
				if (set.moves.length > 4) {
					problems.push((set.name || set.species) + ' has more than four moves.');
				}
			}
			return problems;
		}
	},
	{
		name: "[Gen 7] Pure Hackmons",
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		maxLevel: 100,
		defaultLevel: 100,
		onValidateSet: function(set) {
			let template = this.getTemplate(set.species);
			let item = this.getItem(set.item);
			let problems = [];
			if (template.isNonstandard) {
				problems.push(set.species + ' is not a real Pokemon.');
			}
			if (item.isNonstandard) {
				problems.push(item.name + ' is not a real item.');
			}
			let ability = {};
			if (set.ability) ability = this.getAbility(set.ability);
			if (ability.isNonstandard) {
				problems.push(ability.name + ' is not a real ability.');
			}
			if (set.moves) {
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' is not a real move.');
					}
				}
				if (set.moves.length > 4) {
					problems.push((set.name || set.species) + ' has more than four moves.');
				}
			}
			return problems;
		}
	},
	/*{
		name: "[Gen 7] Tier Shift",
		ruleset: ['[Gen 7] OU'],
		desc: ['<a href="http://www.smogon.com/forums/threads/3610073/">Tier Shift</a>: Pokemon get a +10 boost to each stat per tier below OU they are in. UU gets +10, RU +20, NU +30, and PU +40.'],
		mod: 'gen7',
		onModifyTemplate: function (template, pokemon) {
			if (pokemon.tierShifted) return template;
			let tierShift = Object.assign({}, template);
			const boosts = {
				'UU': 5,
				'BL2': 5,
				'RU': 10,
				'BL3': 10,
				'NU': 15,
				'BL4': 15,
				'PU': 20,
				'NFE': 20,
				'LC Uber': 20,
				'LC': 20,
			};
			let tier = template.tier;
			if (pokemon.set.item) {
				let item = this.getItem(pokemon.set.item);
				if (item.megaEvolves === template.species) tier = this.getTemplate(item.megaStone).tier;
			}
			if (tier.charAt(0) === '(') tier = tier.slice(1, -1);
			let boost = (tier in boosts) ? boosts[tier] : 0;
			for (let statName in template.baseStats) {
				tierShift.baseStats[statName] = this.clampIntRange(template.baseStats[statName] + boost, 1, 255);
			}
			pokemon.tierShifted = true;
			return tierShift;
		},
	},*/
	{
		name: "[Gen 7] Inverse",
		desc: [
			"The effectiveness of each attack is inverted.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3590154/\">Inverse</a>",
		],

		mod: 'gen7',
		//searchShow: false,
		ruleset: ['[Gen 7] OU', 'Inverse Mod'],
		banlist: ['Hoopa-Unbound', 'Kyurem-Black', 'Serperior'],
		unbanlist: ['Aegislash', 'Dialga', 'Giratina', 'Pheromosa', 'Solgaleo', 'Lucarionite'],
	},
	// New Other Metagames ///////////////////////////////////////////////////////////////////
	{
		section: "New Other Metagames",
		column: 2,
	},
		{
		name: "[Gen 7] 2v2 Doubles",
		desc: [
			"Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547040/\">2v2 Doubles</a>",
		],
		mod: 'gen7',
		gameType: 'doubles',

		teamLength: {
			validate: [2, 4],
			battle: 2,
		},
		ruleset: ['[Gen 7] Doubles OU'],
	},
	{
		name: "[Gen 7] 350 Cup",
		desc: [
			"Pok&eacute;mon with a base stat total of 350 or lower get their stats doubled.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3589641/\">350 Cup</a>",
 		],
		mod: 'gen7',
		ruleset: ['[Gen 7] Ubers'],
		banlist: ['Deep Sea Tooth', 'Eevium Z', 'Eviolite', 'Light Ball'],
		onModifyTemplate: function (template, pokemon) {
			let bst = 0;
			Object.values(template.baseStats).forEach(stat => {
				bst += stat;
			});
			if (bst <= 350) {
				for (let i in template.baseStats) {
					template.baseStats[i] *= 2;
				}
			}
			return template;
		},
	},
	{
		name: "[Gen 7] All Terrain",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3596038/\">All Terrain</a>: All Terrain is a metagame in which all terrains are active permanently. Yes, Grassy, Electric, Misty and Psychic terrain are all active all at once."],
		ruleset: ['[Gen 7] OU'],
		banlist: ['Nature Power', 'Secret Power', 'Camoflauge', 'Raichu-Alola'],
		unbanlist: ["Landorus"],
		mod: 'allterrain',
		onBegin: function() {
			this.setTerrain('allterrain');
		},
	},
	{
		name: "[Gen 7] Alphabet Cup",
		desc: [
			"Pok&eacute;mon can learn any move it shares the first letter of its name with.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3617977/\">Alphabet Cup</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		noLearn: ['Geomancy', 'Shell Smash', 'Sketch'],
		onValidateTeam: function (team) {
			let alphabetTable = {};
			for (const set of team) {
				let letter = toId(set.species).slice(0, 1);
				if (alphabetTable[letter]) {
					return ["You are limited to one Pokémon per letter.", "(You have more than one Pokémon beginning with " + letter.toUpperCase() + ")"];
				}
				alphabetTable[letter] = true;
			}
		},
	},
	{
		name: "[Gen 7] Automagic",
		desc: [
			"Whenever an attack's secondary effect is triggered, any setup moves in that Pok&eacute;mon's moveset are run.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3594333/\">Automagic</a>",
		],

		mod: 'automagic',
		ruleset: ['[Gen 7] OU'],
		banlist: ["King's Rock", 'Razor Fang'],
		onAfterSecondaryEffect: function (target, source, move) {
			let moreSetup = ['acupressure', 'bellydrum', 'stockpile'];
			if (!source.types.includes("Ghost")) moreSetup.push("curse");
			source.baseMoveset.forEach(curmove => {
				let move = this.getMove(curmove.id);
				if (moreSetup.includes(move.id) || (move.category === "Status" && move.boosts && move.target === "self")) {
					this.useMove(move, source);
				}
			});
		},
		onAfterMove: function (source, target, move) {
			if (move.id !== "genesissupernova") return;
			source.baseMoveset.forEach(curmove => {
				let move = this.getMove(curmove.id);
				if ((move.id === 'bellydrum' || (move.category === "Status" && move.boosts && move.target === "self")) && this.terrain === "psychicterrain") { // Confirm that it successfully set Psychic Terrain
					this.useMove(move, source);
				}
			});
		},
	},
	{
		name: "[Gen 7] Averagemons",
		desc: `Every Pok&eacute;mon, including formes, has base 100 in every stat.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3590605/">Averagemons</a>`,
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: [
			'Gengar-Mega', 'Mawile-Mega', 'Medicham-Mega', 'Smeargle',
			'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Deep Sea Tooth', 'Eviolite', 'Light Ball', 'Thick Club', 'Baton Pass', 'Chatter',
		],
		onModifyTemplate: function (template) {
			let dex = this && this.deepClone ? this : Dex;
			let newTemplate = dex.deepClone(template);
			newTemplate.baseStats = {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100};
			return newTemplate;
		},
	},
	{
		name: "[Gen 7] Bad 'n Boosted",
		desc: ["&bullet; All the stats of a pokemon which are 70 or below get doubled.<br>For example, Growlithe's stats are 55/70/45/70/50/60 in BnB they become 110/140/90/140/100/120<br><b>Banlist:</b>Eviolite, Huge Power, Pure Power"],
		mod: 'gen7',
		ruleset: ['[Gen 7] Ubers'],
		banlist: ['Eviolite', 'Huge Power', 'Pure Power', 'Eevium Z'],
		onModifyTemplate: function (template, pokemon) {
			for (let i in template.baseStats) {
				if(template.baseStats[i] <= 70) template.baseStats[i] *= 2;
			}
			return template;
		},
	},
	{
		name: "[Gen 7] Benjamin Butterfree",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/benjamin-butterfree.3605680/\">Benjamin Butterfee (Pokemon DeEvolution)</a>"],
		mod: 'bb',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', "Team Preview"],
		onAfterDamage: function(damage, target, source, move) {
			if (!target.willDevolve) return;
			let template = target.template.isMega ? this.getTemplate(this.getTemplate(target.template.baseSpecies).prevo) : this.getTemplate(target.template.prevo);
			target.willDevolve = false;
			target.formeChange(template);
			target.baseTemplate = template;
			target.details = template.species + (target.level === 100 ? '' : ', L' + target.level) + (target.gender === '' ? '' : ', ' + target.gender) + (target.set.shiny ? ', shiny' : '');
			this.add('detailschange', target, target.details);
			this.add('-message', "" + target.name + " has de-volved into " + template.name + "!");
			target.setAbility(template.abilities['0']);
			target.baseAbility = target.ability;
			let newHP = Math.floor(Math.floor(2 * target.template.baseStats['hp'] + target.set.ivs['hp'] + Math.floor(target.set.evs['hp'] / 4) + 100) * target.level / 100 + 10);
			target.hp = newHP;
			target.maxhp = newHP;
			this.add('-heal', target, target.getHealth, '[silent]');
			this.heal(target.maxhp, target, source, 'devolution', '[silent]');
			let movepool = template.learnset;
			let prevo = template.prevo;
			while (prevo) {
				let learnset = this.getTemplate(prevo).learnset;
				for (let i in learnset) {
					movepool[i] = learnset[i];
				}
				prevo = this.getTemplate(prevo).prevo;
			}
			let newmoves = [],
				newbasemoves = [];
			for (let i = 0; i < target.baseMoveset.length; i++) {
				if (movepool[target.baseMoveset[i].id]) {
					newbasemoves.push(target.baseMoveset[i]);
					newmoves.push(target.moveset[i]);
				}
			}
			target.baseMoveset = newbasemoves;
			target.moveset = newmoves;
			target.clearBoosts();
			this.add('-clearboost', target, "[silent]");
			target.species = target.template.species;
			target.canMegaEvo = false;
			target.cureStatus('[silent]');
			target.volatiles = {};
		},
	},
		{
		name: "[Gen 7] Camomons",
			//code has been tested
		desc: `Pok&eacute;mon change type to match their first two moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3598418/">Camomons</a>`,
		],
		mod: 'gen7',
		searchShow: false,
		ruleset: ['[Gen 7] OU'],
		banlist: ['Kartana', 'Kyurem-Black', 'Shedinja'],
		onModifyTemplate: function (template, target, source) {
			if (!source) return;
			let types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.getMove(move.id).type))];
			return Object.assign({}, template, {types: types});
		},
		onSwitchIn: function (pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onAfterMega: function (pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 7] Chimera 1v1",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3607451/\">Chimera 1v1</a>: The six Pokemon in your team are fused",
		],
		mod: 'chimera1v1',
		ruleset: ['Pokemon', 'Standard', 'OHKO Clause','Evasion Clause','Species Clause','Endless Battle Clause', 'Team Preview'],
		banlist: ['Shedinja','Smeargle','Pure Power','Huge Power','Moody','Focus Sash','Perish Song','Transform'],
		onBegin: function () {
			for (let s = 0; s < this.sides.length; s++) {
				this.sides[s].pokemon[5].baseBaseAbility = this.sides[s].pokemon[5].baseAbility;
				this.sides[s].pokemon[5].baseAbility = 'illusion';
			}
		},
		onBeforeSwitchIn: function (pokemon) {
			let chimera = {}, pokemons = pokemon.side.pokemon;
			for (let i = 0; i < pokemons.length; i++) {
				if (pokemons[i].baseBaseAbility) pokemons[i].baseAbility = pokemons[i].ability = pokemons[i].baseBaseAbility;
			}
			chimera.types = Object.assign([], pokemons[0].types);
			chimera.species = chimera.baseSpecies = pokemons[0].species;
			chimera.set = Object.assign({}, pokemons[0].set);
			chimera.set.name = chimera.set.name || pokemons[0].species;
			chimera.item = pokemons[1].item;
			chimera.ability = pokemons[2].ability;
			chimera.baseAbility = pokemons[2].baseAbility;
			chimera.BSTBak = Object.assign({}, pokemons[3].baseStats);
			chimera.set.evs = pokemons[3].set.evs;
			chimera.set.level = pokemons[3].set.level;
			chimera.set.ivs = pokemons[3].set.ivs;
			chimera.level = pokemons[3].level;
			chimera.set.hpType = chimera.hpType = pokemons[3].hpType;
			chimera.hp = chimera.maxhp = pokemons[3].maxhp;
			chimera.moves = chimera.baseMoves = [];
			chimera.moveset = chimera.baseMoveset = [];
			for (let i = 0; i < 2; i++) {
				if (!pokemons[4].moves[i]) continue;
				chimera.moves.push(pokemons[4].moves[i]);
				chimera.moveset.push(pokemons[4].moveset[i]);
			}
			for (let i = 2; i < 4; i++) {
				if (!pokemons[5].moves[i]) continue;
				chimera.moves.push(pokemons[5].moves[i]);
				chimera.moveset.push(pokemons[5].moveset[i]);
			}
			chimera.canMegaEvo = false;
			pokemon.species = chimera.species;
			pokemon.baseTemplate = pokemon.template = Object.assign(this.getTemplate(pokemon.species), chimera);
			pokemon.formeChange(pokemon.template);
			pokemon = Object.assign(pokemon, chimera);
			pokemon.baseStats = Object.assign({}, chimera.BSTBak);
			pokemon.stats = Object.assign({}, chimera.BSTBak);
			pokemon.side.team = pokemon.side.team.slice(0, 1);
			pokemon.side.pokemon = pokemon.side.pokemon.slice(0, 1);
			pokemon.side.pokemonLeft = 1;
		},
		onValidateTeam: function (team) {
			if (team.length < 6) return ["You need to have 6 Pokemon on your team."];
		},
	},
	{
		name: "[Gen 7] Cross Evolution",
		desc: [
			"You can \"cross-evolve\" your Pok&eacute;mon by naming them after the intended Pok&eacute;mon.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3594854/\">Cross Evolution</a>",
		],
		mod: 'gen7',
		ruleset: ['[Gen 7] Ubers', 'Baton Pass Clause'],
		banlist: ['Rule:nicknameclause'],
		onValidateTeam: function (team) {
			let nameTable = {};
			for (let i = 0; i < team.length; i++) {
				let name = team[i].name;
				if (name) {
					if (nameTable[name]) {
						return ["Your Pokémon must have different nicknames.", "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
		},
		validateSet: function (set, teamHas) {
			let crossTemplate = Dex.getTemplate(set.name);
			if (!crossTemplate.exists || crossTemplate.isNonstandard) return this.validateSet(set, teamHas);
			let template = Dex.getTemplate(set.species);
			if (!template.exists) return [`The Pokemon ${set.species} does not exist.`];
			if (!template.evos.length) return [`${template.species} cannot cross evolve because it doesn't evolve.`];
			if (template.species === 'Sneasel') return [`Sneasel as a base Pokemon is banned.`];
			let crossBans = {'shedinja': 1, 'solgaleo': 1, 'lunala': 1};
			if (crossTemplate.id in crossBans) return [`${template.species} cannot cross evolve into ${crossTemplate.species} because it is banned.`];
			if (crossTemplate.battleOnly || !crossTemplate.prevo) return [`${template.species} cannot cross evolve into ${crossTemplate.species} because it isn't an evolution.`];
			let crossPrevoTemplate = Dex.getTemplate(crossTemplate.prevo);
			if (!crossPrevoTemplate.prevo !== !template.prevo) return [`${template.species} cannot cross into ${crossTemplate.species} because they are not consecutive evolutionary stages.`];

			// Make sure no stat is too high/low to cross evolve to
			let stats = {
				'hp': 'HP',
				'atk': 'Attack',
				'def': 'Defense',
				'spa': 'Special Attack',
				'spd': 'Special Defense',
				'spe': 'Speed',
			};
			for (let statid in template.baseStats) {
				let evoStat = template.baseStats[statid] + crossTemplate.baseStats[statid] - crossPrevoTemplate.baseStats[statid];
				if (evoStat < 1) {
					return [`${template.species} cannot cross evolve to ${crossTemplate.species} because its ${stats[statid]} would be too low.`];
				} else if (evoStat > 255) {
					return [`{template.species} cannot cross evolve to ${crossTemplate.species} because its ${stats[statid]} would be too high.`];
				}
			}

			let mixedTemplate = Object.assign({}, template);
			// Ability test
			let ability = Dex.getAbility(set.ability);
			let abilityBans = {'hugepower': 1, 'purepower': 1, 'shadowtag': 1};
			if (!(ability.id in abilityBans)) mixedTemplate.abilities = crossTemplate.abilities;

			mixedTemplate.learnset = Object.assign({}, template.learnset);
			let newMoves = 0;
			for (let i in set.moves) {
				let move = toId(set.moves[i]);
				if (!this.checkLearnset(move, template)) continue;
				if (this.checkLearnset(move, crossTemplate)) continue;
				if (++newMoves > 2) continue;
				mixedTemplate.learnset[move] = ['7T'];
			}
			return this.validateSet(set, teamHas, mixedTemplate);
		},
		onModifyTemplate: function (template, pokemon) {
			if (pokemon.crossEvolved || pokemon.set.name === pokemon.species) return template;
			let crossTemplate = this.getTemplate(pokemon.name);
			if (!crossTemplate.exists || crossTemplate.num === template.num) return template;
			let crossPrevoTemplate = this.getTemplate(crossTemplate.prevo);
			let mixedTemplate = Object.assign({}, template);
			mixedTemplate.baseSpecies = mixedTemplate.species = template.species + '-' + crossTemplate.species;
			mixedTemplate.weightkg = Math.max(0.1, template.weightkg + crossTemplate.weightkg - crossPrevoTemplate.weightkg);
			mixedTemplate.nfe = false;

			mixedTemplate.baseStats = {};
			for (let statid in template.baseStats) {
				mixedTemplate.baseStats[statid] = template.baseStats[statid] + crossTemplate.baseStats[statid] - crossPrevoTemplate.baseStats[statid];
			}

			mixedTemplate.types = template.types.slice();
			if (crossTemplate.types[0] !== crossPrevoTemplate.types[0]) mixedTemplate.types[0] = crossTemplate.types[0];
			if (crossTemplate.types[1] !== crossPrevoTemplate.types[1]) mixedTemplate.types[1] = crossTemplate.types[1] || crossTemplate.types[0];
			if (mixedTemplate.types[0] === mixedTemplate.types[1]) mixedTemplate.types.length = 1;

			pokemon.baseTemplate = mixedTemplate;
			pokemon.crossEvolved = "Yes";
			return mixedTemplate;
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			if (pokemon.crossEvolved === "Yes") {
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			}
		},
	},
	{
		name: "[Gen 7] Dual Wielding",
		desc: [
			"Pok&eacute;mon can forgo their Ability in order to use a second item.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3608611//\">Dual Wielding</a>",
		],

		mod: 'dualwielding',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Regigigas', 'Slaking'],
		validateSet: function (set, teamHas) {
			let dual = this.dex.getItem(set.ability);
			if (!dual.exists) return this.validateSet(set, teamHas);
			let item = this.dex.getItem(set.item);
			let validator = new this.constructor(Dex.getFormat(this.format.id, ['Ignore Illegal Abilities']));
			let problems = validator.validateSet(Object.assign({}, set, {ability: ''}), teamHas) || validator.validateSet(Object.assign({}, set, {ability: '', item: set.ability}, teamHas)) || [];
			if (dual.id === item.id) problems.push(`You cannot have two of the same item on a Pokemon. (${set.name || set.species} has two of ${item.name})`);
			if (item.isChoice && dual.isChoice) problems.push(`You cannot have two choice items on a Pokemon. (${set.name || set.species} has ${item.name} and ${dual.name})`);
			return problems;
	  },
	},
	{
		name: "[Gen 7] Follow the Leader",
		desc: ['&bullet; <a href="https://www.smogon.com/forums/threads/3603860/">Follow the Leader</a>: The first Pokemon provides the moves and abilities for all other Pokemon on the team.'],
		ruleset: ['[Gen 7] OU'],
		banlist: ['Shedinja', 'Slaking', 'Regigigas', 'Imposter', 'Smeargle', 'Pure Power', 'Huge Power'],
		mod: 'gen7',
		validateSet: function (set, teamHas) {
			let species = toId(set.species);
			let template = Dex.getTemplate(species);
			if (!template.exists || template.isNonstandard) return ["" + set.species + " is not a real Pok\u00E9mon."];
			if (template.battleOnly) template = Dex.getTemplate(template.baseSpecies);
			if (Dex.getBanlistTable(this.format)[template.id] || template.tier in {'Uber': 1, 'Unreleased': 1} && template.species !== 'Aegislash') {
				return ["" + template.species + " is banned by Follow The Leader."];
			}

			if (!teamHas.donorTemplate) teamHas.donorTemplate = template;
			let name = set.name;
			if (name === set.species) delete set.name;
			set.species = teamHas.donorTemplate.species;
			let problems = this.validateSet(set, teamHas, teamHas.donorTemplate);

			set.species = template.species;
			set.name = (name === set.species ? "" : name);

			return problems;
		},
	},
	{
		name: "[Gen 7] Fortemons",
		desc: `Pok&eacute;mon have all of their moves inherit the properties of the move in their item slot.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3638520/">Fortemons</a>`,
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Serene Grace'],
		restrictedMoves: ['Bide', 'Chatter', 'Dynamic Punch', 'Fake Out', 'Frustration', 'Inferno', 'Power Trip', 'Power-Up Punch', 'Pursuit', 'Return', 'Stored Power', 'Zap Cannon'],
		validateSet: function (set, teamHas) {
			const restrictedMoves = this.format.restrictedMoves || [];
			let item = set.item;
			let move = this.dex.getMove(set.item);
			if (!move.exists || move.type === 'Status' || restrictedMoves.includes(move.name) || move.flags['charge'] || move.priority > 0) return this.validateSet(set, teamHas);
			set.item = '';
			let problems = this.validateSet(set, teamHas) || [];
			set.item = item;
			// @ts-ignore
			if (this.format.checkLearnset.call(this, move, this.dex.getTemplate(set.species))) problems.push(`${set.species} can't learn ${move.name}.`);
			// @ts-ignore
			if (move.secondaries && move.secondaries.some(secondary => secondary.boosts && secondary.boosts.accuracy < 0)) problems.push(`${set.name || set.species}'s move ${move.name} can't be used as an item.`);
			return problems.length ? problems : null;
		},
		checkLearnset: function (move, template, lsetData, set) {
			if (move.id === 'beatup' || move.id === 'fakeout' || move.damageCallback || move.multihit) return {type: 'invalid'};
			return this.checkLearnset(move, template, lsetData, set);
		},
		onValidateTeam: function (team, format) {
			/**@type {{[k: string]: true}} */
			let itemTable = {};
			for (const set of team) {
				let move = this.getMove(set.item);
				if (!move.exists) continue;
				if (itemTable[move.id]) {
					return ["You are limited to one of each forte by Forte Clause.", "(You have more than one " + move.name + ")"];
				}
				itemTable[move.id] = true;
			}
		},
		onBegin: function () {
			for (const pokemon of this.p1.pokemon.concat(this.p2.pokemon)) {
				let move = this.getActiveMove(pokemon.set.item);
				if (move.exists && move.category !== 'Status') {
					// @ts-ignore
					pokemon.forte = move;
					pokemon.item = 'ultranecroziumz';
				}
			}
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			// @ts-ignore
			if (move.category !== 'Status' && pokemon && pokemon.forte) {
				let ability = pokemon.getAbility();
				// @ts-ignore
				if (ability.id === 'triage' && pokemon.forte.flags['heal']) return priority + (move.flags['heal'] ? 0 : 3);
				// @ts-ignore
				return priority + pokemon.forte.priority;
			}
		},
		onModifyMovePriority: 1,
		onModifyMove: function (move, pokemon) {
			// @ts-ignore
			if (move.category !== 'Status' && pokemon.forte) {
				// @ts-ignore
				Object.assign(move.flags, pokemon.forte.flags);
				// @ts-ignore
				if (pokemon.forte.self) {
					// @ts-ignore
					if (pokemon.forte.self.onHit && move.self && move.self.onHit) {
						// @ts-ignore
						for (let i in pokemon.forte.self) {
							if (i.startsWith('onHit')) continue;
							// @ts-ignore
							move.self[i] = pokemon.forte.self[i];
						}
					} else {
						// @ts-ignore
						move.self = Object.assign(move.self || {}, pokemon.forte.self);
					}
				}
				// @ts-ignore
				if (pokemon.forte.secondaries) move.secondaries = (move.secondaries || []).concat(pokemon.forte.secondaries);
				// @ts-ignore
				move.critRatio = (move.critRatio - 1) + (pokemon.forte.critRatio - 1) + 1;
				for (let prop of ['basePowerCallback', 'breaksProtect', 'defensiveCategory', 'drain', 'forceSwitch', 'ignoreAbility', 'ignoreDefensive', 'ignoreEvasion', 'ignoreImmunity', 'pseudoWeather', 'recoil', 'selfSwitch', 'sleepUsable', 'stealsBoosts', 'thawsTarget', 'useTargetOffensive', 'volatileStatus', 'willCrit']) {
					// @ts-ignore
					if (pokemon.forte[prop]) {
						// @ts-ignore
						if (typeof pokemon.forte[prop] === 'number') {
							// @ts-ignore
							let num = move[prop] || 0;
							// @ts-ignore
							move[prop] = num + pokemon.forte[prop];
						} else {
							// @ts-ignore
							move[prop] = pokemon.forte[prop];
						}
					}
				}
			}
		},
		// @ts-ignore
		onHitPriority: 1,
		onHit: function (target, source, move) {
			// @ts-ignore
			if (move && move.category !== 'Status' && source.forte) {
				// @ts-ignore
				if (source.forte.onHit) this.singleEvent('Hit', source.forte, {}, target, source, move);
				// @ts-ignore
				if (source.forte.self && source.forte.self.onHit) this.singleEvent('Hit', source.forte.self, {}, source, source, move);
				// @ts-ignore
				if (source.forte.onAfterHit) this.singleEvent('AfterHit', source.forte, {}, target, source, move);
			}
		},
		// @ts-ignore
		onAfterSubDamagePriority: 1,
		onAfterSubDamage: function (damage, target, source, move) {
			// @ts-ignore
			if (move && move.category !== 'Status' && source.forte && source.forte.onAfterSubDamage) this.singleEvent('AfterSubDamage', source.forte, null, target, source, move);
		},
		onModifySecondaries: function (secondaries, target, source, move) {
			if (secondaries.some(s => !!s.self)) move.selfDropped = false;
		},
		// @ts-ignore
		onAfterMoveSecondarySelfPriority: 1,
		onAfterMoveSecondarySelf: function (source, target, move) {
			// @ts-ignore
			if (move && move.category !== 'Status' && source.forte && source.forte.onAfterMoveSecondarySelf) this.singleEvent('AfterMoveSecondarySelf', source.forte, null, source, target, move);
		},
	},
	{
		name: "[Gen 7] Full Potential",
		desc: [
			"Moves use the Pok&eacute;mon's highest effective stat, barring HP, for damage calculation.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3596777/\">Full Potential</a>",
		],

		mod: 'fullpotential',
		ruleset: ['[Gen 7] OU', 'Item Clause'],
		banlist: ['Raichu-Alola', 'Shuckle', 'Tapu Koko', 'Chlorophyll', 'Sand Rush', 'Slush Rush', 'Speed Boost', 'Swift Swim', 'Unburden', 'Swampertite'],
	},
	{
		name: "[Gen 7] Godly Gift",
		desc: [
			"Each Pok&eacute;mon receives one base stat, depending on its position, from the Uber.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3597618/\">Godly Gift</a>",
		],
		mod: 'gen7',
		ruleset: ['Ubers', 'Baton Pass Clause'],
		banlist: ['Uber > 1', 'AG ++ Uber', 'Blissey', 'Chansey', 'Eviolite', 'Gengarite', 'Sablenite', 'Huge Power', 'Pure Power', 'Shadow Tag'],
		onBegin: function() {
			let stats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
			for (let j = 0; j < this.sides.length; j++) {
				// onBegin happens before Mega Rayquaza clause
				let uber = this.sides[j].pokemon.find(pokemon => ['AG', 'Uber'].includes(this.getTemplate(pokemon.canMegaEvo || pokemon.baseTemplate).tier)) || this.sides[j].pokemon[0];
				for (let i = 0, len = this.sides[j].pokemon.length; i < len; i++) {
					let pokemon = this.sides[j].pokemon[i];
					["baseTemplate", "canMegaEvo"].forEach(key => {
						if (pokemon[key]) {
							let template = Object.assign({}, this.getTemplate(pokemon[key]));
							template.baseStats = Object.assign({}, template.baseStats);
							template.baseStats[stats[i]] = uber.baseTemplate.baseStats[stats[i]];
							pokemon[key] = template;
						}
					});
					pokemon.formeChange(pokemon.baseTemplate);
					if (i === 0 && !pokemon.template.maxHP) {
						pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * pokemon.template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
					}
				}
			}
		},
	},
	{
		name: "[Gen 7] Gods and Followers",
		desc: [
			"The Pok&eacute;mon in the first slot is the God; the Followers must share a type with the God. If the God Pok&eacute;mon faints, the Followers are inflicted with Embargo.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3589187/\">Gods and Followers</a>",
		],
		mod: 'godsandfollowers',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause', 'Followers Clause', 'Cancel Mod'],
		banlist: ['Illegal']
	},
	{
		name: "[Gen 7] Hidden Type",
		desc: [
			"Pok&eacute;mon have an added type determined by their IVs. Same as the Hidden Power type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591194/\">Hidden Type</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		onModifyTemplate: function (template, pokemon) {
			if (template.types.includes(pokemon.hpType)) return;
			return Object.assign({addedType: pokemon.hpType}, template);
		},
	},
	{
		name: "[Gen 7] Hot Potato",
		desc: `Moves that deal direct damage to an opponent will 'pass' any hazard, status/volatile effects and stat debuffs currently on your side or Pokemon to your opponent's.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3643676/">Hot Potato</a>`,
		],

		mod: 'hotpotato',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Blast Burn', 'Frenzy Plant', 'Giga Impact', 'Hydro Cannon', 'Hyper Beam', 'Perish Song', 'Prismatic Laser', 'Roar of Time', 'Rock Wrecker', 'Victini'],
		unbanlist: ['Aegislash'],
	},
	{
		name: "[Gen 7] Hot Potato [No Mod]",
		desc: `Moves that deal direct damage to an opponent will 'pass' any hazard, status/volatile effects and stat debuffs currently on your side or Pokemon to your opponent's.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3643676/">Hot Potato</a>`,
		],

		ruleset: ['[Gen 7] OU'],
		banlist: ['Blast Burn', 'Frenzy Plant', 'Giga Impact', 'Hydro Cannon', 'Hyper Beam', 'Perish Song', 'Prismatic Laser', 'Roar of Time', 'Rock Wrecker', 'Victini'],
		unbanlist: ['Aegislash'],

		onAfterDamage: function(damage, pokemon, target, moveData) {
			if (pokemon === target || moveData.category === 'Status' || !target.hp || !damage) return;
			let passableConditions = ['stealthrock', 'stickyweb', 'spikes', 'toxicspikes'];
			if (Object.keys(pokemon.side.sideConditions).length > 0) {
				for (let i in pokemon.side.sideConditions) {
					if (!passableConditions.includes(i)) continue;
					let condition = pokemon.side.sideConditions[i];
					target.side.addSideCondition(condition.id);
					if (pokemon.side.sideConditions.layers) target.side.sideConditions.layers = pokemon.side.sideConditions.layers;
					pokemon.side.removeSideCondition(condition.id);
					this.add('-sideend', pokemon.side, this.getEffect(condition.id).name, '[silent]');
				}
			}
			//status
			if (pokemon.status) {
				let status = pokemon.status, statusData = Object.assign({}, pokemon.statusData);
				pokemon.cureStatus('');
				target.trySetStatus(status);
				target.statusData = statusData;
				target.statusData.target = target;
			}

			//boosts
			let boosts = {};
			for (let i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					boosts[i] = pokemon.boosts[i];
					pokemon.boosts[i] = 0;
				}
			}
			if (Object.keys(boosts).length) {
		        this.add('-clearnegativeboost', pokemon);
				this.boost(boosts, target, pokemon);
			}

			// attract
			if (pokemon.volatiles.attract) {
				target.volatiles.attract = {
					id: 'attract',
					source: pokemon,
					target: target,
					sourcePosition: 0,
					sourceEffect: pokemon.volatiles.attract.sourceEffect
				};
				pokemon.removeVolatile('attract');
			}

			//mean look n stuff
			if (pokemon.volatiles.trapped) {
				target.addVolatile('trapped', pokemon, pokemon.volatiles.trapped.sourceMove, 'trapper');
				pokemon.removeVolatile('trapped')
			}

			//magma storm, infestation, etc
			if (pokemon.volatiles.partiallytrapped) {
				target.addVolatile('trapped', pokemon, pokemon.volatiles.partiallytrapped.sourceMove, 'trapper');
				pokemon.removeVolatile('partiallytrapped')
			}

			//perish song. exists here because metronome
			if (pokemon.volatiles.perishsong) {
				target.volatiles.perishsong = Object.assign({}, pokemon.volatiles.perishsong);
				target.volatiles.perishsong.target = target;
				pokemon.removeVolatile('perishsong');
				this.add('-start', pokemon, `perish${target.volatiles.perishsong.duration}`, '[silent]');
			}

			// other passable volatiles
			let passableVolatiles = ['confusion', 'curse', 'disable', 'embargo', 'encore', 'foresight', 'healblock', 'imprison', 'leechseed', 'miracleeye', 'nightmare', 'taunt', 'telekinesis', 'torment'];
			for (let i in pokemon.volatiles) {
				if (passableVolatiles.includes(i)) {
					let duration = pokemon.volatiles[i].duration;
					pokemon.removeVolatile(i);
					target.addVolatile(i);
					if (duration) target.volatiles[i].duration = duration;
				}
			}
		}
	},
	{
		name: "[Gen 7] Inheritance",
		desc: [
			"Pok&eacute;mon may use the ability and moves of another, as long as they forfeit their own learnset.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3592844/\">Inheritance</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: [
			'Hoopa-Unbound', 'Kartana', 'Kyurem-Black', 'Regigigas', 'Shedinja', 'Slaking', 'Gyaradosite',
			'Huge Power', 'Imposter', 'Innards Out', 'Pure Power', 'Speed Boost', 'Water Bubble', 'Assist', 'Chatter', 'Shell Smash',
		],
		noChangeForme: true,
		noChangeAbility: true,
		getEvoFamily: function (species) {
			let template = Dex.getTemplate(species);
			while (template.prevo) {
				template = Dex.getTemplate(template.prevo);
			}
			return template.speciesid;
		},
		validateSet: function (set, teamHas) {
			if (!this.format.abilityMap) {
				let abilityMap = Object.create(null);
				for (let speciesid in Dex.data.Pokedex) {
					let pokemon = Dex.data.Pokedex[speciesid];
					if (pokemon.num < 1 || pokemon.species === 'Smeargle') continue;
					if (Dex.data.FormatsData[speciesid].requiredItem || Dex.data.FormatsData[speciesid].requiredMove) continue;
					for (let key in pokemon.abilities) {
						let abilityId = toId(pokemon.abilities[key]);
						if (abilityMap[abilityId]) {
							abilityMap[abilityId][pokemon.evos ? 'push' : 'unshift'](speciesid);
						} else {
							abilityMap[abilityId] = [speciesid];
						}
					}
				}
				this.format.abilityMap = abilityMap;
			}

			this.format.noChangeForme = false;
			let problems = Dex.getFormat('Pokemon').onChangeSet.call(Dex, set, this.format) || [];
			this.format.noChangeForme = true;

			if (problems.length) return problems;

			let species = toId(set.species);
			let template = Dex.getTemplate(species);
			if (!template.exists) return [`The Pokemon "${set.species}" does not exist.`];
			if (template.isUnreleased) return [`${template.species} is unreleased.`];
			let megaTemplate = Dex.getTemplate(Dex.getItem(set.item).megaStone);
			if (template.tier === 'Uber' || megaTemplate.tier === 'Uber' || this.format.banlist.includes(template.species)) return [`${megaTemplate.tier === 'Uber' ? megaTemplate.species : template.species} is banned.`];

			let name = set.name;

			let abilityId = toId(set.ability);

			if (!abilityId || !(abilityId in Dex.data.Abilities)) return [`${name} needs to have a valid ability.`];
			let pokemonWithAbility = this.format.abilityMap[abilityId];
			if (!pokemonWithAbility) return [`"${set.ability}" is not available on a legal Pokemon.`];

			let canonicalSource = ''; // Specific for the basic implementation of Donor Clause (see onValidateTeam).
			let validSources = set.abilitySources = []; // Evolution families
			for (const donor of pokemonWithAbility) {
				let donorTemplate = Dex.getTemplate(donor);
				let evoFamily = this.format.getEvoFamily(donorTemplate);

				if (validSources.indexOf(evoFamily) >= 0) continue;

				if (set.name === set.species) delete set.name;
				set.species = donorTemplate.species;
				problems = this.validateSet(set, teamHas) || [];

				if (!problems.length) {
					canonicalSource = donorTemplate.species;
					validSources.push(evoFamily);
				}
				if (validSources.length > 1) {
					// Specific for the basic implementation of Donor Clause (see onValidateTeam).
					break;
				}
			}

			set.species = template.species;
			if (!validSources.length && pokemonWithAbility.length > 1) {
				return [`${template.species}'s set is illegal.`];
			}
			if (!validSources.length) {
				problems.unshift(`${template.species} has an illegal set with an ability from ${Dex.getTemplate(pokemonWithAbility[0]).name}.`);
				return problems;
			}

			// Protocol: Include the data of the donor species in the `ability` data slot.
			// Afterwards, we are going to reset the name to what the user intended. :]
			set.ability = `${set.ability}0${canonicalSource}`;
		},
		onValidateTeam: function (team, format) {
			// Donor Clause
			let evoFamilyLists = [];
			for (const set of team) {
				if (!set.abilitySources) continue;
				evoFamilyLists.push(set.abilitySources.map(format.getEvoFamily));
			}

			// Checking actual full incompatibility would require expensive algebra.
			// Instead, we only check the trivial case of multiple Pokémon only legal for exactly one family. FIXME?
			// This clause has only gotten more complex over time, so this is probably a won't fix.
			let requiredFamilies = Object.create(null);
			for (const evoFamilies of evoFamilyLists) {
				if (evoFamilies.length !== 1) continue;
				let [familyId] = evoFamilies;
				if (!(familyId in requiredFamilies)) requiredFamilies[familyId] = 1;
				requiredFamilies[familyId]++;
				if (requiredFamilies[familyId] > 2) return [`You are limited to up to two inheritances from each evolution family by the Donor Clause.`, `(You inherit more than twice from ${this.getTemplate(familyId).species}).`];
			}
		},
		onBegin: function () {
			for (const pokemon of this.p1.pokemon.concat(this.p2.pokemon)) {
				if (pokemon.baseAbility.includes('0')) {
					let donor = pokemon.baseAbility.split('0')[1];
					pokemon.donor = toId(donor);
					pokemon.baseAbility = pokemon.baseAbility.split('0')[0];
					pokemon.ability = pokemon.baseAbility;
				}
			}
		},
		onSwitchIn: function (pokemon) {
			if (!pokemon.donor) return;
			let donorTemplate = Dex.getTemplate(pokemon.donor);
			if (!donorTemplate.exists) return;
			// Place volatiles on the Pokémon to show the donor details.
			this.add('-start', pokemon, donorTemplate.species, '[silent]');
		},
	},
	{
		name: "[Gen 7] Last Will",
		desc: [
			"Before fainting, Pok&eacute;mon will use the move in their last moveslot.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3601362/\">Last Will</a>",
		],
		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Endeavor', 'Blast Burn + Explosion + Frenzy Plant + Giga Impact + Hydro Cannon + Hyper Beam + Self Destruct + V-Create > 2'],
		onBeforeFaint: function (pokemon, source) {
			this.add('-hint', `${pokemon.name || pokemon.species}'s Last Will let it use one last move!`);
			this.runMove(pokemon.moves[pokemon.moves.length - 1], pokemon);
		},
	},
	{
		name: "[Gen 7] Linked",
		desc: `The first two moves in a Pok&eacute;mon's moveset are used simultaneously.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3627804/">Linked</a>`,
		],
		mod: 'linked',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['[Gen 7] OU'],
		banlist: ['Chlorophyll', 'Sand Rush', 'Slush Rush', 'Surge Surfer', 'Swift Swim', 'Unburden', 'King\'s Rock', 'Razor Fang', 'Swampertite'],
		restrictedMoves: ['Baneful Bunker', 'Bounce', 'Detect', 'Dig', 'Dive', 'Fly', 'Nature\'s Madness', 'Night Shade', 'Phantom Force', 'Protect', 'Seismic Toss', 'Shadow Force', 'Sky Drop', 'Spiky Shield', 'Super Fang'],
		onValidateSet: function (set, format) {
			const restrictedMoves = format.restrictedMoves || [];
			let problems = [];
			for (const [i, moveid] of set.moves.entries()) {
				let move = this.getMove(moveid);
				if ((i === 0 || i === 1) && restrictedMoves.includes(move.name)) {
					problems.push(`${set.name || set.species}'s move ${move.name} cannot be linked.`);
				}
			}
			return problems;
		},
	},
	{
		name: "[Gen 7] Lockdown",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3593815\">Lockdown</a>",
			"At the end of Turn 6, battlefield changes become permanent.",
		],
		mod: 'lockdown',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Damp Rock', 'Heat Rock', 'Smooth Rock', 'Icy Rock', 'Terrain Extender'],
		unbanlist: ['Genesect'],
		onBegin: function() {
			this.lockdownMoves = ['sunnyday', 'raindance', 'hail', 'sandstorm', 'magicroom', 'wonderroom', 'trickroom', 'gravity', 'electricterrain', 'mistyterrain', 'grassyterrain', 'psychicterrain', 'mudsport', 'watersport'];
			this.lockdownHazards = ['stealthrock', 'spikes', 'toxicspikes', 'stickyweb'];
		},
		onTryHitSide: function(target, source, move) {
			if (this.lockdownHazards.indexOf(move.id) > -1 && this.turn > 6) return false;
		},
		onTryHitField: function(target, source, move) {
			if (this.lockdownMoves.indexOf(move.id) > -1 && this.turn > 6) return false;
		},
		onResidualOrder: 999,
		onResidual: function() {
			if (this.turn !== 6) return;
			let pseudo = ['magicroom', 'wonderroom', 'trickroom', 'gravity', 'mudsport', 'watersport'];
			this.add("-message", "The Lockdown has commenced! Battlefield changes are now permanent!");
			if (this.weatherData.duration) this.weatherData.duration = 0;
			if (this.terrainData.duration) this.terrainData.duration = 0;
			for (let i in this.pseudoWeather) {
				if (pseudo.includes(i)) {
					this.pseudoWeather[i].duration = 0;
				}
			}
		},
	},
	{
		name: "[Gen 7] Mediocremons",
		desc: ['&bullet; <a href="http://www.smogon.com/forums/threads/mediocremons.3602094/">Medicoremons</a>: Only Pokemon with stats below 100 are allowed.'],
		ruleset: ['[Gen 7] OU'],
		banlist: ['Silvally', 'Type: Null', 'Huge Power', 'Pure Power'],
		mod: 'gen7',
		onValidateSet: function (set) {
			let stats = this.getTemplate(set.species).baseStats;
			for (let i = 0; i < stats.length; i++) {
				let stat = stats[i];
				if(stat >= 100) return [`${set.name || set.species} is banned by Mediocremons.`];
			}
		},
	},
	{
		name: "[Gen 7] Megamons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3566648/\">Megamons</a>"],
		mod: 'gen7',
		ruleset: ['Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Mega Rayquaza Clause', 'Sleep Clause Mod', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Gengar-Mega', 'Mewtwo-Mega-Y', 'Rayquaza-Mega'],
		onValidateTeam: function(team) {
			let problems = [];
			let kyurems = 0;
			for (let i = 0; i < team.length; i++) {
				if (team[i].species === 'Kyurem-White' || team[i].species === 'Kyurem-Black') {
					if (kyurems > 0) {
						problems.push('You cannot have more than one Kyurem-Black/Kyurem-White.');
						break;
					}
					kyurems++;
				}
			}
			return problems;
		},
		onChangeSet: function(set, format) {
			let item = this.getItem(set.item);
			let template = this.getTemplate(set.species);
			let problems = [];
			let totalEV = 0;

			if (set.species === set.name) delete set.name;
			if (set.moves) {
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' does not exist.');
					}
				}
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name || set.species) + ' has more than four moves.');
			}
			if (set.level && set.level > 100) {
				problems.push((set.name || set.species) + ' is higher than level 100.');
			}

			if (template.isNonstandard) {
				problems.push(set.species + ' does not exist.');
			}
			if (this.getAbility(set.ability).isNonstandard) {
				problems.push(set.ability + ' does not exist.');
			}
			if (item.isNonstandard) {
				if (item.isNonstandard === 'gen2') {
					problems.push(item.name + ' does not exist outside of gen 2.');
				} else {
					problems.push(item.name + ' does not exist.');
				}
			}
			for (let k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			if (totalEV > 510) {
				problems.push((set.name || set.species) + " has more than 510 total EVs.");
			}

			if (template.gender) {
				if (set.gender !== template.gender) {
					set.gender = template.gender;
				}
			} else {
				if (set.gender !== 'M' && set.gender !== 'F') {
					set.gender = undefined;
				}
			}

			let baseTemplate = this.getTemplate(template.baseSpecies);
			if (set.ivs && baseTemplate.gen >= 6 && (template.eggGroups[0] === 'Undiscovered' || template.species === 'Manaphy') && !template.prevo && !template.nfe && template.species !== 'Unown' && template.baseSpecies !== 'Pikachu' && (template.baseSpecies !== 'Diancie' || !set.shiny)) {
				let perfectIVs = 0;
				for (let i in set.ivs) {
					if (set.ivs[i] >= 31) perfectIVs++;
				}
				if (perfectIVs < 3) problems.push((set.name || set.species) + " must have at least three perfect IVs because it's a legendary in gen 6.");
			}

			let moves = [];
			if (set.moves) {
				let hasMove = {};
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					let moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;

			let battleForme = template.battleOnly && template.species;
			if (battleForme && !template.isMega) {
				if (template.requiredAbility && set.ability !== template.requiredAbility) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredAbility + "."); // Darmanitan-Zen
				}
				if (template.requiredItem && item.name !== template.requiredItem) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredItem + '.'); // Primal
				}
				if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredMove + "."); // Meloetta-Pirouette
				}
				if (!format.noChangeForme) set.species = template.baseSpecies; // Fix forme for Aegislash, Castform, etc.
			} else {
				if (template.requiredItem && item.name !== template.requiredItem && !template.isMega) {
					problems.push("" + (set.name || set.species) + " needs to hold " + template.requiredItem + '.'); // Plate/Drive/Griseous Orb
				}
				if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0 && !template.isMega) {
					problems.push("" + (set.name || set.species) + " needs to have the move " + template.requiredMove + "."); // Keldeo-Resolute
				}

				if (item.forcedForme && template.species === this.getTemplate(item.forcedForme).baseSpecies && !format.noChangeForme) {
					set.species = item.forcedForme;
				}
			}

			if (set.species !== template.species) {
				template = this.getTemplate(set.species);
				if (!format.noChangeAbility) {
					let legalAbility = false;
					for (let i in template.abilities) {
						if (template.abilities[i] !== set.ability) continue;
						legalAbility = true;
						break;
					}
					if (!legalAbility) {
						set.ability = template.abilities['0'];
					}
				}
			}

			if (set.shiny && template.unobtainableShiny) {
				problems.push("It's currently not possible to get a shiny " + template.species + ".");
			}

			return problems;
		},
		onSwitchIn: function(pokemon) {
			let item = pokemon.getItem();
			if (item.megaEvolves && pokemon.template.species === item.megaEvolves) {
				pokemon.canMegaEvo = item.megaStone;
			}
		},
	},
	{
		name: "[Gen 7] Mergemons",
		desc: [
			"Pok&eacute;mon gain the movepool of the previous and the next fully evolved Pok&eacute;mon, according to the Pok&eacute;dex.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591780/\">Mergemons</a>",
		],

		mod: 'mergemons',
		ruleset: ['[Gen 7] OU'],
		banlist: [],
	},
	{
		name: "[Gen 7] Metagamiate",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3604808/\">Metagamiate</a>"],
		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Dragonite', 'Kyurem-Black'],
		onModifyMovePriority: -2,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && !move.isZ && move.id !== 'hiddenpower'&& !pokemon.hasAbility(['aerilate', 'galvanize', 'normalize', 'pixilate', 'refrigerate'])) {
				let types = pokemon.getTypes();
				let type = types.length < 2 || !pokemon.set.shiny ? types[0] : types[1];
				move.type = type;
				move.isMetagamiate = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (!move.isMetagamiate) return;
			return this.chainModify([0x1333, 0x1000]);
		},
		validateSet: function (set, teamHas) {
			let trueTemplate = this.dex.getTemplate(set.species)
			let forgedTemplate = Object.assign({}, this.dex.getTemplate(set.species));
			if (forgedTemplate.eventPokemon) {
				let ep = []; //Avoid format crosstalk by using an empty array as a base
				for (let i = 0; i < forgedTemplate.eventPokemon.length; i++) {
					ep.push(Object.assign({}, forgedTemplate.eventPokemon[i])); //Avoid format crosstalk by using Object.assign
					ep[i].shiny = 1;
				}
				forgedTemplate.eventPokemon = ep;
			}
			return this.validateSet(set, teamHas, forgedTemplate);
		},
	},
	{
		name: "[Gen 7] Move Equality",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3599280/\">Move Equality</a>: Every Move has 100 base power with the exception of moves that have varying base powers."],
		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Fell Stinger', 'Mud Slap', 'Power Up Punch'],
		onModifyMovePriority: 5,
		onModifyMove: function(move, pokemon) {
			if (move.category === 'Status' || move.priority !== 0 || move.onBasePower || move.basePowerCallback) return move;
			if (move.isZ) {
				move.basePower = 180;
				return move;
			}
			if (move.multihit) {
				move.basePower = parseInt(100 / move.multihit[move.multihit.length - 1]);
				return move;
			}
			move.basePower = 100;
			return move;
		},
	},
	{
		name: "[Gen 7] Nature Swap",
		desc: `Pok&eacute;mon have their base stats swapped depending on their nature.`,
		threads: [
			`&bullet; <a href="http://www.smogon.com/forums/threads/3612727/">Nature Swap</a>`,
		],

		mod: 'natureswap',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Blissey', 'Chansey', 'Cloyster', 'Hoopa-Unbound', 'Kyurem-Black', 'Stakataka'],
	},
	{
		name: "[Gen 7] No Status",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3540979/\">No Status</a>"],
		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Landorus', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew'
		],
		validateSet: function (set) {
			var problems = [];
			if (set.moves) {
				for (var i in set.moves) {
					var move = this.getMove(set.moves[i]);
					if (move.category === 'Status') problems.push(set.species + "'s move " + move.name + " is banned by No Status.");
				}
			}
			return problems;
		}
	},
	{
		name: "[Gen 7] Offensification",
		desc: [
			"All attacks are caclulated from the user's highest attacking stat.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/offensification-hoopa-u-banned.3524512/\">Offensification</a>",
		],
		ruleset: ['[Gen 7] OU'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Flatter', 'Kyurem-Black'],
		mod:'gen7',
		onModifyMove: function(move, pokemon) {
			if (pokemon.stats.atk > pokemon.stats.spa) {
				move.category = (move.category === "Status") ? "Status" : "Physical";
			} else if (pokemon.stats.spa > pokemon.stats.atk) {
				move.category = (move.category === "Status") ? "Status" : "Special";
			}

			if (move.id === 'bellydrum') {
				move.onHit = function(target) {
					if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) { // Shedinja clause
						return false;
					}
					this.directDamage(target.maxhp / 2);
					if (target.stats.atk >= target.stats.spa) {
						target.setBoost({
							atk: 6
						});
						this.add('-setboost', target, 'atk', '6', '[from] move: Belly Drum');
					} else {
						target.setBoost({
							spa: 6
						});
						this.add('-setboost', target, 'spa', '6', '[from] move: Belly Drum');
					}
				}
			}
		},
		onBoost: function(boost, target, source, effect) {
			var boostee = target;
			if (source && target === source) boostee = source;
			var phys = false;
			if (boostee.stats.atk > boostee.stats.spa) phys = true;
			var spec = false;
			if (boostee.stats.atk < boostee.stats.spa) spec = true;
			if (phys || spec) {
				for (var i in boost) {
					if (phys && i === 'spa') {
						if (boost['atk']) boost['atk'] += boost[i];
						else boost['atk'] = boost[i];
						boost[i] = 0;
					} else if (phys && i === 'spd') {
						if (boost['def']) boost['def'] += boost[i];
						else boost['def'] = boost[i];
						boost[i] = 0;
					} else if (spec && i === 'atk') {
						if (boost['spa']) boost['spa'] += boost[i];
						else boost['spa'] = boost[i];
						boost[i] = 0;
					} else if (spec && i === 'def') {
						if (boost['spd']) boost['spd'] += boost[i];
						else boost['spd'] = boost[i];
						boost[i] = 0;
					}
				}
			}
		}
	},
	{
		name: "[Gen 7] Partners in Crime",
		desc: `Doubles-based metagame where both active ally Pok&eacute;mon share abilities and moves.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3618488/">Partners in Crime</a>`,
		],

		mod: 'pic',
		gameType: 'doubles',
		ruleset: ['[Gen 7] Doubles OU', 'Sleep Clause Mod'],
		banlist: ['Kangaskhanite', 'Mawilite', 'Medichamite', 'Huge Power', 'Imposter', 'Normalize', 'Pure Power', 'Wonder Guard', 'Mimic', 'Sketch', 'Transform'],
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			if (this.p1.active.every(ally => ally && !ally.fainted)) {
				let p1a = this.p1.active[0], p1b = this.p1.active[1];
				if (p1a.ability !== p1b.ability) {
					let p1aInnate = 'ability' + p1b.ability;
					p1a.volatiles[p1aInnate] = {id: p1aInnate, target: p1a};
					let p1bInnate = 'ability' + p1a.ability;
					p1b.volatiles[p1bInnate] = {id: p1bInnate, target: p1b};
				}
			}
			if (this.p2.active.every(ally => ally && !ally.fainted)) {
				let p2a = this.p2.active[0], p2b = this.p2.active[1];
				if (p2a.ability !== p2b.ability) {
					let p2a_innate = 'ability' + p2b.ability;
					p2a.volatiles[p2a_innate] = {id: p2a_innate, target: p2a};
					let p2b_innate = 'ability' + p2a.ability;
					p2b.volatiles[p2b_innate] = {id: p2b_innate, target: p2b};
				}
			}
			let ally = pokemon.side.active.find(ally => ally && ally !== pokemon && !ally.fainted);
			if (ally && ally.ability !== pokemon.ability) {
				// @ts-ignore
				if (!pokemon.innate) {
					// @ts-ignore
					pokemon.innate = 'ability' + ally.ability;
					// @ts-ignore
					delete pokemon.volatiles[pokemon.innate];
					// @ts-ignore
					pokemon.addVolatile(pokemon.innate);
				}
				// @ts-ignore
				if (!ally.innate) {
					// @ts-ignore
					ally.innate = 'ability' + pokemon.ability;
					// @ts-ignore
					delete ally.volatiles[ally.innate];
					// @ts-ignore
					ally.addVolatile(ally.innate);
				}
			}
		},
		onSwitchOut: function (pokemon) {
			// @ts-ignore
			if (pokemon.innate) {
				// @ts-ignore
				pokemon.removeVolatile(pokemon.innate);
				// @ts-ignore
				delete pokemon.innate;
			}
			let ally = pokemon.side.active.find(ally => ally && ally !== pokemon && !ally.fainted);
			// @ts-ignore
			if (ally && ally.innate) {
				// @ts-ignore
				ally.removeVolatile(ally.innate);
				// @ts-ignore
				delete ally.innate;
			}
		},
		onFaint: function (pokemon) {
			// @ts-ignore
			if (pokemon.innate) {
				// @ts-ignore
				pokemon.removeVolatile(pokemon.innate);
				// @ts-ignore
				delete pokemon.innate;
			}
			let ally = pokemon.side.active.find(ally => ally && ally !== pokemon && !ally.fainted);
			// @ts-ignore
			if (ally && ally.innate) {
				// @ts-ignore
				ally.removeVolatile(ally.innate);
				// @ts-ignore
				delete ally.innate;
			}
		},
	},
	{
		name: "[Gen 7] Pokebilities",
		desc: `Pok&eacute;mon have all of their released Abilities simultaneously.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3588652/">Pok&eacute;bilities</a>`,
		],

		mod: 'pokebilities',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Bibarel', 'Bidoof', 'Diglett', 'Dugtrio', 'Excadrill', 'Glalie', 'Gothita', 'Gothitelle', 'Gothorita', 'Octillery', 'Remoraid', 'Smeargle', 'Snorunt', 'Trapinch', 'Wobbuffet', 'Wynaut'],
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let pokemon of allPokemon) {
				if (pokemon.ability === toId(pokemon.template.abilities['S'])) {
					continue;
				}
				// @ts-ignore
				pokemon.innates = Object.keys(pokemon.template.abilities).filter(key => key !== 'S' && (key !== 'H' || !pokemon.template.unreleasedHidden)).map(key => toId(pokemon.template.abilities[key])).filter(ability => ability !== pokemon.ability);
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			if (pokemon.innates) pokemon.innates.forEach(innate => pokemon.addVolatile("ability" + innate, pokemon));
		},
		onAfterMega: function (pokemon) {
			Object.keys(pokemon.volatiles).filter(innate => innate.startsWith('ability')).forEach(innate => pokemon.removeVolatile(innate));
			pokemon.innates = undefined;
		},
	},
	{
		name: "[Gen 7] Poketrade",
		desc: [
			"Pok&eacute;mon with the same item swap base stats.",
			"&bullet; <a href=\"https://cloud.githubusercontent.com/assets/19758381/23832074/f89d6c1e-0753-11e7-94c8-42f8c3dcfbda.png\">Pok&eacute;trade</a>",
		],
		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: [],
		onBegin: function () {
			for (let j = 0; j < this.sides.length; j++) {
				let itemTable = {};
				for (let i = 0; i < this.sides[j].pokemon.length; i++) {
					let pokemon = item = this.sides[j].pokemon[i].getItem();
					if(!item) return;
					if(!(item.id in itemTable)) itemTable[item.id] = [];
					itemTable[item.id].push(i);
				}
				for (let i in itemTable) {
					for (let k = 0; k < itemTable[i].length; k++) {
						let pokemon = this.sides[j].pokemon[k], swapmon = itemTable[k+1] || itemTable[0];
						["baseTemplate", "canMegaEvo"].forEach(key => {
							if (pokemon[key]) {
								let template = Object.assign({}, this.getTemplate(pokemon[key])), template2 = this.getTemplate(swapmon);
								template.baseStats = Object.assign({}, template2.baseStats);
								pokemon[key] = template;
							}
						});
						pokemon.formeChange(pokemon.baseTemplate);
						pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * pokemon.template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
					}
				}
			}
		},
	},
		{
		name: "[Gen 7] Protean Palace",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/protean-palace.3496299/\">Protean Palace</a>"],
		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		onPrepareHit: function(source, target, move) {
			var type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type);
			}
		}
	},
	{
		name: "[Gen 7] Reversed",
		desc: `Every Pok&eacute;mon has its base Atk and Sp. Atk stat, as well as its base Def and Sp. Def stat, swapped.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3623871/">Reversed</a>`,
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Kyurem-Black', 'Tapu Koko'],
		unbanlist: ['Kyurem-White', 'Marshadow', 'Metagross-Mega', 'Naganadel', 'Reshiram'],
		onModifyTemplate: function (template, target, source) {
			template = Object.assign({}, template);
			template.baseStats = Object.assign({}, template.baseStats);
			const atk = template.baseStats.atk;
			const def = template.baseStats.def;
			template.baseStats.atk = template.baseStats.spa;
			template.baseStats.def = template.baseStats.spd;
			template.baseStats.spa = atk;
			template.baseStats.spd = def;
			return template;
		},
	},
	{
		name: "[Gen 7] Scalemons",
		desc: [
			"All Pok&eacute;mon have their stats, barring HP, scaled to give them a BST of around 600.",
			"&bullet; <a href=\"https://docs.google.com/spreadsheets/d/1Qg9Q2KC2U7aSfOb25rBxGZ7A-uvYM6xNwjdQsclp56E/edit#gid=1841107233\">Spreadsheet of all stats</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview'],
		banlist: ['Deep Sea Scale', 'Deep Sea Tooth', 'Eviolite', 'Light Ball', 'Thick Club', 'Baton Pass'],
		onModifyTemplate: function (template, pokemon) {
			let bst = 0;
			let hp = template.baseStats['hp'];
			Object.values(template.baseStats).forEach(stat => {bst += stat;});
			for (let i in template.baseStats) {
				template.baseStats['hp'] = hp;
				template.baseStats[i] = Math.floor((template.baseStats[i] * (600 - template.baseStats['hp'])) / (bst - template.baseStats['hp']));
				if (template.baseStats[i] > 255) template.baseStats[i] = 255;
			}
			return template;
		},
	},
	{
		name: "[Gen 7] Shared Power New",
		desc: ["&bullet; Every Pokemon on the team shares its ability with the two Pokemon surrounding it."],
		mod: 'pokebilities',
		ruleset: ["[Gen 7] OU"],
		banlist: ['Shedinja', 'Huge Power', 'Pure Power', 'Speed Boost', 'Illusion', 'Fur Coat'],
		onBegin: function () {
			for (let s = 1; s <= 2; s++) {
				let side = this[`p${s}`];
				for (let i = 0; i < side.pokemon.length; i++) {
					let pokemon = side.pokemon[i];
					pokemon.innatePartners = [
						side.pokemon[i - 1] || side.pokemon[side.pokemon.length - 1],
						side.pokemon[i + 1] || side.pokemon[0],
					];
					/* if (!pokemon.innatePartners[0]) pokemon.innatePartners[0] = side.pokemon[side.pokemon.length - 1];
					if (!pokemon.innatePartners[1]) pokemon.innatePartners[1] = side.pokemon[0]; */
				}
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			if (pokemon.innatePartners) pokemon.innatePartners.forEach(partner => pokemon.addVolatile("ability" + partner.ability, pokemon));
		},
	},
	{
		name: "[Gen 7] Shared Power Old",
		desc: [
			`All of the team's abilities are active at once, except those that are restricted.`,
			`&bullet; <a href="http://www.smogon.com/forums/threads/3623341/">Shared Power</a>`,
		],
		mod: 'sharedpower',
		ruleset: ['[Gen 7] OU', 'Evasion Abilities Clause'],
		banlist: ['Gyarados-Mega', 'Shedinja'],
		unbanlist: ['Aegislash', 'Blaziken', 'Blaziken-Mega', 'Deoxys-Defense'],
		restrictedAbilities: [
			'Chlorophyll', 'Comatose', 'Fluffy', 'Fur Coat', 'Huge Power', 'Illusion', 'Imposter', 'Mold Breaker',
			'Protean', 'Pure Power', 'Quick Feet', 'Rattled', 'Sand Rush', 'Simple', 'Slush Rush', 'Speed Boost',
			'Surge Surfer', 'Swift Swim', 'Teravolt', 'Tinted Lens', 'Trace', 'Unburden', 'Water Bubble', 'Weak Armor',
		],
		onBeforeSwitchIn: function (pokemon) {
			let restrictedAbilities = this.getFormat().restrictedAbilities.map(toId);
			for (const ally of pokemon.side.pokemon) {
				if (ally.baseAbility !== pokemon.baseAbility && !restrictedAbilities.includes(ally.baseAbility)) {
					let effect = 'ability' + ally.baseAbility;
					pokemon.volatiles[effect] = {id: effect, target: pokemon};
				}
			}
		},
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			let restrictedAbilities = this.getFormat().restrictedAbilities.map(toId);
			for (const ally of pokemon.side.pokemon) {
				if (ally.baseAbility !== pokemon.baseAbility && !restrictedAbilities.includes(ally.baseAbility)) {
					let effect = 'ability' + ally.baseAbility;
					delete pokemon.volatiles[effect];
					pokemon.addVolatile(effect);
				}
			}
		},
		onAfterMega: function (pokemon) {
			let restrictedAbilities = this.getFormat().restrictedAbilities.map(toId);
			pokemon.removeVolatile('ability' + pokemon.baseAbility);
			for (const ally of pokemon.side.pokemon) {
				if (ally.baseAbility !== pokemon.baseAbility && !restrictedAbilities.includes(ally.baseAbility)) {
					let effect = 'ability' + ally.baseAbility;
					pokemon.addVolatile(effect);
				}
			}
		},
	},
		{
		name: "[Gen 7] STABmons [Ubers]",
		desc: [
			"Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587949/\">STABmons</a>",
			"&bullet; <a href=http://www.smogon.com/forums/threads/ubers-stabmons-tour.3625366/>STABmons Ubers Tour</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] Ubers', 'STABmons Move Legality'],
		banlist: ['Arceus', 'King\'s Rock', 'Razor Fang'],
		restrictedMoves: ['Acupressure', 'Belly Drum', 'Chatter', 'Extreme Speed', 'Geomancy', 'Lovely Kiss', 'Shell Smash', 'Shift Gear', 'Spore', 'Thousand Arrows'],
	},
	{
		name: "[Gen 7] Suicide Cup",
		desc: `Victory is obtained when all of your Pok&eacute;mon have fainted.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3633603/">Suicide Cup</a>`,
		],

		mod: 'suicidecup',
		forcedLevel: 100,
		ruleset: ['Cancel Mod', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Moody Clause', 'Nickname Clause', 'Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Team Preview'],
		banlist: [
			'Illegal', 'Unreleased', 'Shedinja', 'Infiltrator', 'Magic Guard', 'Misty Surge', 'Assault Vest', 'Choice Scarf', 'Explosion',
			'Final Gambit', 'Healing Wish', 'Lunar Dance', 'Magic Room', 'Memento', 'Misty Terrain', 'Self-Destruct',
		],
		onValidateTeam: function (team, format) {
			let problems = [];
			if (team.length !== 6) problems.push(`Your team cannot have less than 6 Pok\u00e9mon.`);
			// Family Clause
			let getEvoFamily = function (species) {
				let template = Dex.getTemplate(species);
				while (template.prevo) {
					template = Dex.getTemplate(template.prevo);
				}
				return template.speciesid;
			};
			for (const [i, set] of team.entries()) {
				if (getEvoFamily(set.species) === getEvoFamily(team[i + 1].species)) {
					problems.push(`You cannot have more than one Pokemon from their respective evolutionary line. (${set.name || set.species} and ${team[i + 1].name || team[i + 1].species} are from the same evolutionary line)`);
				}
			}
			return problems;
		},
	},
	{
		name: "[Gen 7] Trademarked",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/trademarked.3572949/\">Trademarked</a>"],
		column: 1,

		mod: 'trademarked',
		ruleset: ['[Gen 7] OU', 'trademarkclause'],
		banlist: ['Slaking', 'Regigigas', 'Nature Power'],
		validateSet: function(set, teamHas) {
			if (!this.validateSet(set, teamHas).length) return [];
			let ability = Dex.getAbility(set.ability);
			let template = Dex.getTemplate(set.species);
			if (!set.moves.includes(ability.id) && !set.moves.includes(ability.name) && !this.checkLearnset(ability.id, template, {
					set: set
				})) {
				template = Object.assign({}, template);
				template.abilities = {
					0: ability.name
				};
			}
			return this.validateSet(set, teamHas, template);
		},

	},
	{
		name: "[Gen 7] Ultimate Z",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3609393/\">Ultimate Z</a> (or UZ for short) allows you to use any type of Z-Crystal on any move and as many times per battle as desired. The Z-Move becomes the type of the Z-Crystal used."],
		ruleset: ['[Gen 7] OU'],
		mod: 'ultimatez',
	},
	{
		name: "[Gen 7] VoltTurn Mayhem",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/voltturn-mayhem-lcotm.3527847/\">VoltTurn Mayhem</a>"],
		ruleset: ['[Gen 7] OU'],
		mod: 'gen7',
		onModifyMove: function(move) {
			if (move.target && !move.nonGhostTarget && (move.target === "normal" || move.target === "any" || move.target === "randomNormal" || move.target === "allAdjacent" || move.target === "allAdjacentFoes")) {
				move.selfSwitch = true;
			}
		}
	},
	{
		name: "[Gen 7] Z-Shift",
		desc: ["&bullet; In Z-Shift, the Type, Base Power and Priority of the move in the first slot is transferred to the Z-Move being used.<br><br>Necrozma @ <b>Electrium Z</b>  <br>Ability: Prism Armor  <br>EVs: 252 HP / 252 SpA / 4 SpD<br>Modest Nature  <br>IVs: 0 Atk  <br>- <b>Prismatic Laser</b> <br>- Dark Pulse  <br>- <b>Charge Beam</b>  <br>- Moonlight<br><br>So if this is the set then<br><b>Z-Charge Beam:</b> 160 Base Power, 90% Accuracy, Psychic type move with 70% chance to raise the user's SpA by 1 stage"],
		ruleset: ['[Gen 7] OU'],
		mod: 'zshift',
		onValidateSet: function(set) {
			let problems = [];
			set.moves.forEach(move => {
				let moveData = this.getMove(move);
				if (moveData.multihit) {
					problems.push((set.name || set.species) + " has " + moveData.name + ", which is a multihit move and is banned by Z-Shift.")
				}
			});
			return problems;
		},
		onPrepareHit: function(target, source, move) {
			if (!(move.isZ && move.baseMove)) return;
			this.attrLastMove('[still]');
			this.add('-anim', target, move.baseMove, source);
		},
		onModifyPriority: function (priority, pokemon, target, move) {
			this.add(`html|Priority: ${priority.name || priority}, Pokemon: ${pokemon.name || pokemon}, Target: ${(target ? target.name : target) || target}, Move: ${move.name || move}`);
			if (move.isShifted) return this.getMove(pokemon.moves[0]).priority || priority;
		},
	},
	// Pet Mods ///////////////////////////////////////////////////////////////////
	{
		section: "Pet Mods",
		column: 3,
	},
	{
  		name: "[Gen 7] All Type Terrain",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/all-type-terrain-stage-4-playtesting.3600531/unread>ATT V2</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'alltypeterrain',
		banlist: ['Unreleased', 'Illegal'],
  	},
	{
  		name: "[Gen 7] AbNormal",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/abnormal-v2-submission-phase.3628089/page-2>AbNormal V2</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'abnormal',
		// banlist: ['Unreleased', 'Illegal'],
  	},
	{
  		name: "[Gen 7] Alola Formes",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/alola-formes-v3.3617314/>Alola Formes</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'alola',
		// banlist: ['Unreleased', 'Illegal'],
  	},
	{
		name: "Ascension",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3546114/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3571990/\">OU Viability Ranking</a>",
		],
		mod: "ascension",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "[Gen 7] Choonmons δ",
		desc: ["Choonmons is a pet mod created by Choon. Yup.<br>&bullet; <a href=\"http://www.smogon.com/forums/threads/3546063/\">Choonmons</a>"],
		mod: 'choonmons',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Lucarionite', 'Mawilite', 'Salamencite', 'Rayquaza-Mega'],

		onSwitchIn: function(pokemon) {
			let changed = {
				'Venusaur-Mega-X': true,
				'Blastoise': true,
				'Butterfree': true,
				'Pikachu': true,
				'Raichu': true,
				'Golduck': true,
				'Happiny': true,
				'Blissey': true,
				'Gyarados': true,
				'Aerodactyl': true,
				'Feraligatr-Mega': true,
				'Sceptile': true
			};
			let bt = pokemon.baseTemplate;
			if (bt.baseSpecies in changed || (bt.actualSpecies && bt.actualSpecies in changed)) {
				let types = bt.types;
				let bTypes = (types.length === 1 || types[1] === 'caw') ? types[0] : types.join('/');
				this.add('-start', pokemon, 'typechange', bTypes, '[silent]');
			}
			if (bt.actualSpecies) this.add('-start', pokemon, bt.actualSpecies, '[silent]'); //Show the pokemon's actual species
		},
		onSwitchOut: function(pokemon) {
			if (pokemon.baseTemplate.actualSpecies) this.add('-end', pokemon, pokemon.baseTemplate.actualSpecies, '[silent]');
		},
	},
		{
		name: "[Gen 7] [Random] Choonmons δ",
		mod: 'choonmons',
		team: 'randomSeasonalMelee',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		onBegin: function() {
			this.add("raw|Choonmons<b>RAWWWWWWWWWWWWWR!!!!</b>");
			this.add('message', "SURVIVAL! GET READY FOR THE NEXT BATTLE!");

			let globalRenamedMoves = {};
			let customRenamedMoves = {};

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];		
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveSlots[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveSlots[last].move = pokemon.set.signatureMove;
				}
				let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
				if (name == "thetruefalcon")
				{
					pokemon.types[1] = "Fighting";
				}
				if (name == "theswordbreaker")
				{
					pokemon.types = ["Dragon"];
				}
				for (let j = 0; j < pokemon.moveSlots.length; j++) {
					let moveData = pokemon.moveSlots[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveSlots[j].move = globalRenamedMoves[moveData.id];
					}

					let customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveSlots[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function(pokemon) {
			let name = toId(pokemon.name);
			if (!this.shownTip) {
				this.add('raw|<div class=\"broadcast-green\">Huh? But what do all these weird moves do??<br><b>Protip: Refer to the <a href="https://github.com/XpRienzo/DragonHeaven/blob/master/mods/dhssb/README.md">PLAYER\'S MANUAL</a>!</b></div>');
				this.shownTip = true;
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// Wonder Guard is available, but it curses you.
			if (pokemon.getAbility().id === 'wonderguard' && pokemon.baseTemplate.baseSpecies !== 'Shedinja' && pokemon.baseTemplate.baseSpecies !== 'Kakuna') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}
			if (this.data.Statuses[name] && this.data.Statuses[name].exists) {
				pokemon.addVolatile(name, pokemon);
			}
			if (name === 'thetruefalcon') {
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			}
		},
		onModifyPokemon: function(pokemon) {
			let name = toId(pokemon.name);
		},
	},
	
	/*{	THis needs a "randomCHOONMONSFactory function in mods/choonmons/scripts.js"
		name: "[Gen 7] Choonmons Factory",

		mod: 'choonmons',
		team: 'randomCHOONMONSFactory',
		ruleset: ['Pokemon', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
	},*/
	{
  		name: "[Gen 7] Clean Slate",
  		desc: [
			"&bullet; <a href=https://www.smogon.com/forums/threads/.3639262/>Clean Slate</a>",
			"&bullet; <a href=https://www.smogon.com/forums/threads/clean-slate-resources.3643897/>Clean Slate Resources</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'cleanslate',
		banlist: ['Unreleased', 'Illegal'],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] Community Create a Pet Mod",
  		desc: [
			"&bullet; <a href=https://www.smogon.com/forums/threads/.3644840/>Community Create a Pet Mod</a>",
		      ],
  		ruleset: ['Pokemon2', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'ccam',
		banlist: ['Unreleased', 'Illegal'],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
  	},
	{
		name: "[Gen 7] Crossover Chaos",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3623813/>Crossover Chaos</a>",
		      ],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'crossoverchaos',
	},
	{
  		name: "[Gen 7] Eevee'd",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/eeveed-current-slate-sliggoo-and-sunkern-submissions.3602933/>Eeveed</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		banlist: ['Unreleased', 'Illegal'],
		mod: 'eeveed',
  	},
	{
  		name: "[Gen 7] Eternal Pokemon",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/eternal-pok%C3%A9mon-voting-phase-pidgeotto-spearow-hoothoot.3594809/>Eternal Pokemon</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'eternal',
		banlist: ['Unreleased', 'Illegal'],
  	},
	{
  		name: "[Gen 7] Evos for Everyone",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/evos-for-everyone-slate-10-cryogonal-delibird-moltres.3636813/>Evos for Everyone</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'evosforeveryone',
		banlist: ['Unreleased', 'Illegal'],
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
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: [
			'Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Vulpix-Base', 'Yanma',
			'Eevium Z', 'Dragon Rage', 'Sonic Boom',
		],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
  	},
	{
  		name: "[Gen 7] Fusion Evolution",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/fusion-evolution-v2-submission-phase.3560216/>Fusion Evolution</a>",
  		       "&bullet; <a href=http://www.smogon.com/forums/threads/fusion-moves-fusion-evolution-companion-project.3564805/>Fusion Moves</a>",
  		      ],
  		ruleset: ['Ate Clause', 'Extreme Speed Clause', 'Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Unreleased', 'Dialcatty', 'Kars', 'Dittsey', 'Diceus', 'Peridot-Mega', 'Kyzor', 'Gonzap', 'Harem', 'Cinshado', 'Enteon', 'Lucashadow-Mega', 'Taiwan', 'Dad', 'Enteon', 'Entir', 'Necrynx-Ultra', 'Shenala', 'Xurkizard-Mega-Y', 'Archedactyl-Mega', 'Miminja', 'Toxicario-Mega', 'Lucasol-Mega-L', 'Alakario-Mega-L', 'Kangorus-Khan-Mega', 'Absoko-Mega', 'Kartaria-Mega', 'Dio', 'Mendoza', 'Deoxurk-Outlet', 'Omneus','Muddy Seed'], // Mega Kasukabe Necrozerain-Ultra'

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
		ruleset: ['Pokemon', 'Standard Doubles', 'Swagger Clause', 'Team Preview'],
		//banlist: ['DUber', 'Power Construct', 'Eevium Z', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder'],
	},
	{
  		name: "[Gen 7] G-Luke's Ideal World",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/g-lukes-ideal-world-v1.3627945/>G-Luke's Ideal World</a>",
		      ],
  		ruleset: ['Gen 7 [OU]'],
		mod: 'lukemod',
		//banlist: ['Illegal'],
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
		ruleset: [ 'Pokemon', 'Standard','OHKO Clause','Team Preview','Evasion Moves Clause','Endless Battle Clause','Sleep Clause Mod', 'Freeze Clause Mod'],
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
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'jillian',
	},
	{
		name: "[Gen 7] Megas For All",
		desc: ["&bullet; Megas",
		      ],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Illegal'],
		mod: 'megasforall',
		searchShow: false,
	},
	{
  		name: "[Gen 7] Pokemon Let's Go",
  		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/p.3640426/>Pokemon: Let's Go</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		mod: 'letsgo',
		// banlist: ['Unreleased', 'Illegal'],
  	},
	{
		name: "[Gen 7] Tennysonmons",
		desc: ["&bullet; Benmons",],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		//banlist: ['Illegal'],
		mod: 'tennysonmons',
		searchShow: false,
		//challengeShow: false,
	},
	{
		name: "[Gen 7] Typing: The Mod",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3634253/>Typing: The Mod</a>",],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		//banlist: ['Illegal'],
		mod: 'ttm',
	},
	{
		name: "[Gen 7] Monotype Gen 8",
		desc: [
			"A Monotype-based pet mod with lots of new pokemon.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3642289/\">Monotype Gen 8 Thread</a>",
		],

		mod: 'monotypegen8',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Groudon', 'Ho-Oh', 'Hoopa-Unbound',
			'Kartana', 'Kyogre', 'Kyurem-White', 'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Tapu Lele', 'Xerneas', 'Yveltal', 'Zekrom', 'Zygarde',
			'Battle Bond', 'Shadow Tag', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Medichamite', 'Metagrossite', 'Salamencite', 'Smooth Rock', 'Terrain Extender', 'Baton Pass',
		],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
        },
	},
	{
		name: "[Gen 7] More Balanced Hackmons",
		desc: `Anything that can be hacked in-game and is usable in local battles is allowed.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/more-balanced-hackmons-slate-2-submissions-tapu-gang.3644050/">More Balanced Hackmons</a>`,
		],

		mod: 'morebalancedhackmons',
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Groudon-Primal', 'Arena Trap', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond', 'Protean', 'Psychic Surge', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard', 'Gengarite', 'Chatter', 'Comatose + Sleep Talk'],
	},
	{
		name: "[Gen 7] Mega Mirrors",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/mega-mirrors-slate-1-voting-abomasnow-absol-aerodactyl.3644178/">Mega Mirrors</a>`,
		],
		mod: 'megamirrors',
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 7] Move Mastery",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/move-mastery.3590075/\">Move Mastery</a>"],
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'Baton Pass Clause', 'Evasion Moves Clause', 'OHKO Clause', 'Swagger Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		banlist: ['Unreleased', 'Illegal'],
		mod: 'gen7',
		validateSet: function(set, teamHas) {
			if (!this.validateSet(set, teamHas).length) return [];
			let ability = Dex.getAbility(set.ability);
			let template = Dex.getTemplate(set.species);
			let movemasters = {
				adaptability: [],
				angerpoint: ["Frost Breath", "Storm Throw"],
				anticipation: [],
				aromaveil: ["Taunt", "Torment", "Encore", "Disable", "Heal Block", "Attract"],
				battlearmor: ["Frost Breath", "Storm Throw"],
				bigpecks: ["Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Leer", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Tail Whip", "Tickle", "Screech"],
				blaze: ["Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create"],
				bulletproof: ["Acid Spray", "Aura Sphere", "Barrage", "Beak Blast", "Bullet Seed", "Egg Bomb", "Electro Ball", "Energy Ball", "Focus Blast", "Gyro Ball", "Ice Ball", "Magnet Bomb", "Mist Ball", "Mud Bomb", "Octazooka", "Rock Wrecker", "Searing Shot", "Seed Bomb", "Shadow Ball", "Sludge Bomb", "Weather Ball", "Zap Cannon"],
				chlorophyll: ["Sunny Day"],
				clearbody: ["Aurora Beam", "Baby-Doll Eyes", "Growl", "Lunge", "Noble Roar", "Parting Shot", "Play Nice", "Play Rough", "Strength Sap", "Tearful Look", "Tickle", "Trop Kick", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Leer", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Tail Whip", "Tickle", "Screech", "Confide", "Mist Ball", "Moonblast", "Mystical Fire", "Noble Roar", "Parting Shot", "Snarl", "Struggle Bug", "Tearful Look", "Venom Drench", "Captivate", "Eerie Impulse", "Memento", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Fake Tears", "Metal Sound", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Sticky Web", "Toxic Thread", "Venom Drench", "Cotton Spore", "Scary Face", "String Shot", "Defog", "Sweet Scent", "Flash", "Kinesis", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Sand Attack", "Smokescreen"],
				comatose: ["Hex", "Wake-Up Slap", "Sleep Talk", "Snore", "Uproar", "Rest"],
				competitive: ["Aurora Beam", "Baby-Doll Eyes", "Growl", "Lunge", "Noble Roar", "Parting Shot", "Play Nice", "Play Rough", "Strength Sap", "Tearful Look", "Tickle", "Trop Kick", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Leer", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Tail Whip", "Tickle", "Screech", "Confide", "Mist Ball", "Moonblast", "Mystical Fire", "Noble Roar", "Parting Shot", "Snarl", "Struggle Bug", "Tearful Look", "Venom Drench", "Captivate", "Eerie Impulse", "Memento", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Fake Tears", "Metal Sound", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Sticky Web", "Toxic Thread", "Venom Drench", "Cotton Spore", "Scary Face", "String Shot", "Defog", "Sweet Scent", "Flash", "Kinesis", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Sand Attack", "Smokescreen"],
				compoundeyes: [],
				corrosion: ["Cross Poison", "Fling", "Gunk Shot", "Poison Jab", "Poison Powder", "Poison Sting", "Poison Tail", "Sludge", "Sludge Bomb", "Sludge Wave", "Smog", "Toxic Thread", "Twineedle", "Poison Fang", "Toxic"],
				damp: ["Self-Destruct", "Explosion"],
				dancer: ["Feather Dance", "Fiery Dance", "Dragon Dance", "Lunar Dance", "Petal Dance", "Revelation Dance", "Quiver Dance", "Swords Dance", "Teeter Dance"],
				dazzling: ["Fake Out", "Extreme Speed", "Feint", "First Impression", "Accelerock", "Aqua Jet", "Baby-Doll Eyes", "Bullet Punch", "Ice Shard", "Ion Deluge", "Mach Punch", "Powder", "Quick Attack", "Shadow Sneak", "Sucker Punch", "Vacuum Wave", "Water Shuriken"],
				defiant: ["Aurora Beam", "Baby-Doll Eyes", "Growl", "Lunge", "Noble Roar", "Parting Shot", "Play Nice", "Play Rough", "Strength Sap", "Tearful Look", "Tickle", "Trop Kick", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Leer", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Tail Whip", "Tickle", "Screech", "Confide", "Mist Ball", "Moonblast", "Mystical Fire", "Noble Roar", "Parting Shot", "Snarl", "Struggle Bug", "Tearful Look", "Venom Drench", "Captivate", "Eerie Impulse", "Memento", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Fake Tears", "Metal Sound", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Sticky Web", "Toxic Thread", "Venom Drench", "Cotton Spore", "Scary Face", "String Shot", "Defog", "Sweet Scent", "Flash", "Kinesis", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Sand Attack", "Smokescreen"],
				dryskin: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Soak", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool", "Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create"],
				filter: [],
				flareboost: ["Beak Blast", "Blaze Kick", "Blue Flare", "Ember", "Fire Blast", "Fire Fang", "Fire Punch", "Flamethrower", "Flame Wheel", "Flare Blitz", "Fling", "Heat Wave", "Ice Burn", "Inferno", "Lava Plume", "Sacred Fire", "Scald", "Searing Shot", "Steam Eruption", "Tri Attack", "Will-O-Wisp"],
				flashfire: ["Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create", "Will-O-Wisp"],
				flowergift: ["Sunny Day"],
				fluffy: ["Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create"],
				grasspelt: ["Grassy Terrain"],
				harvest: ["Sunny Day"],
				heatproof: ["Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create"],
				heavymetal: ["Autotomize", "Grass Knot", "Heat Crash", "Heavy Slam", "Low Kick", "Sky Drop"],
				hypercutter: ["Aurora Beam", "Baby-Doll Eyes", "Growl", "Lunge", "Noble Roar", "Parting Shot", "Play Nice", "Play Rough", "Strength Sap", "Tearful Look", "Tickle", "Trop Kick", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento"],
				icebody: ["Hail"],
				immunity: ["Cross Poison", "Fling", "Gunk Shot", "Poison Jab", "Poison Powder", "Poison Sting", "Poison Tail", "Sludge", "Sludge Bomb", "Sludge Wave", "Smog", "Toxic Thread", "Twineedle", "Poison Fang", "Toxic", "Toxic Spikes"],
				infiltrator: ["Light Screen", "Reflect", "Safeguard", "Substitute"],
				innerfocus: ["Air Slash", "Astonish", "Bite", "Bone Club", "Dark Pulse", "Dragon Rush", "Extrasensory", "Fake Out", "Fire Fang", "Fling", "Headbutt", "Heart Stamp", "Hyper Fang", "Ice Fang", "Icicle Crash", "Iron Head", "Needle Arm", "Rock Slide", "Rolling Kick", "Sky Attack", "Snore", "Steamroller", "Stomp", "Thunder Fang", "Twister", "Waterfall", "Zen Headbutt", "Zing Zap"],
				insomnia: ["Dark Void", "Grass Whistle", "Hypnosis", "Lovely Kiss", "Relic Song", "Rest", "Sing", "Sleep Powder", "Spore", "Yawn"],
				ironfist: ["Bullet Punch", "Comet Punch", "Dizzy Punch", "Drain Punch", "Dynamic Punch", "Fire Punch", "Focus Punch", "Hammer Arm", "Ice Hammer", "Ice Punch", "Mach Punch", "Mega Punch", "Meteor Mash", "Power-Up Punch", "Shadow Punch", "Sky Uppercut", "Thunder Punch"],
				justified: ["Assurance", "Beat Up", "Bite", "Brutal Swing", "Crunch", "Dark Pulse", "Darkest Lariat", "Feint Attack", "Fling", "Foul Play", "Hyperspace Fury", "Knock Off", "Night Daze", "Night Slash", "Payback", "Power Trip", "Punishment", "Pursuit", "Snarl", "Sucker Punch", "Thief", "Throat Chop"],
				keeneye: ["Flash", "Kinesis", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Sand Attack", "Smokescreen"],
				levitate: ["Bone Club", "Bone Rush", "Bonemerang", "Bulldoze", "Dig", "Drill Run", "Earth Power", "Earthquake", "High Horsepower", "Land's Wrath", "Magnitude", "Mud Slap", "Mud Bomb", "Mud Shot", "Precipice Blades", "Sand Attack", "Stomping Tantrum", "Thousand Arrows", "Thousand Waves", "Gravity", "Smack Down", "Spikes", "Toxic Spikes", "Sticky Web"],
				lightmetal: ["Autotomize", "Grass Knot", "Heat Crash", "Heavy Slam", "Low Kick", "Sky Drop"],
				lightningrod: ["Bolt Strike", "Charge Beam", "Discharge", "Eerie Impulse", "Electrify", "Electro Ball", "Electroweb", "Fusion Bolt", "Ion Deluge", "Nuzzle", "Parabolic Charge", "Shock Wave", "Spark", "Thunder", "Thunder Fang", "Thunder Punch", "Thunder Shock", "Thunder Wave", "Thunderbolt", "Volt Switch", "Volt Tackle", "Wild Charge", "Zap Cannon", "Zing Zap"],
				limber: ["Body Slam", "Bolt Strike", "Bounce", "Discharge", "Dragon Breath", "Fling", "Force Palm", "Freeze Shock", "Glare", "Lick", "Nuzzle", "Spark", "Stun Spore", "Thunder", "Thunder Fang", "Thunder Punch", "Thunder Shock", "Thunder Wave", "Thunderbolt", "Tri Attack", "Volt Tackle", "Zap Cannon"],
				liquidooze: ["Absorb", "Drain Punch", "Draining Kiss", "Dream Eater", "Giga Drain", "Horn Leech", "Leech Life", "Leech Seed", "Mega Drain", "Oblivion Wing", "Parabolic Charge"],
				liquidvoice: ["Boomburst", "Bug Buzz", "Chatter", "Clanging Scales", "Confide", "Disarming Voice", "Echoed Voice", "Grass Whistle", "Growl", "Heal Bell", "Hyper Voice", "Metal Sound", "Noble Roar", "Parting Shot", "Perish Song", "Relic Song", "Roar", "Round", "Screech", "Sing", "Snarl", "Snore", "Sparkling Aria", "Supersonic", "Uproar"],
				magmaarmor: ["Blizzard", "Freeze-Dry", "Ice Beam", "Ice Fang", "Ice Punch", "Powder Snow", "Tri Attack"],
				megalauncher: ["Aura Sphere", "Dark Pulse", "Dragon Pulse", "Heal Pulse", "Origin Pulse", "Water Pulse"],
				merciless: ["Cross Poison", "Fling", "Gunk Shot", "Poison Jab", "Poison Powder", "Poison Sting", "Poison Tail", "Sludge", "Sludge Bomb", "Sludge Wave", "Smog", "Toxic Thread", "Twineedle", "Poison Fang", "Toxic", "Toxic Spikes"],
				minus: ["Magnetic Flux", "Gear Up"],
				motordrive: ["Bolt Strike", "Charge Beam", "Discharge", "Eerie Impulse", "Electrify", "Electro Ball", "Electroweb", "Fusion Bolt", "Ion Deluge", "Nuzzle", "Parabolic Charge", "Shock Wave", "Spark", "Thunder", "Thunder Fang", "Thunder Punch", "Thunder Shock", "Thunder Wave", "Thunderbolt", "Volt Switch", "Volt Tackle", "Wild Charge", "Zap Cannon", "Zing Zap"],
				naturalcure: ["Volt Switch", "U-turn", "Parting Shot", "Baton Pass", "Roar", "Whirlwind", "Dragon Tail", "Circle Throw"],
				oblivious: ["Taunt", "Attract"],
				overcoat: ["Cotton Spore", "Poison Powder", "Powder", "Rage Powder", "Sleep Powder", "Spore", "Stun Spore"],
				overgrow: ["Absorb", "Bullet Seed", "Energy Ball", "Frenzy Plant", "Giga Drain", "Grass Knot", "Grass Pledge", "Horn Leech", "Leaf Blade", "Leaf Storm", "Leaf Tornado", "Leafage", "Magical Leaf", "Mega Drain", "Needle Arm", "Petal Blizzard", "Petal Dance", "Power Whip", "Razor Leaf", "Seed Bomb", "Seed Flare", "Solar Beam", "Solar Blade", "Trop Kick", "Vine Whip", "Wood Hammer"],
				owntempo: ["Chatter", "Confuse Ray", "Confusion", "Dizzy Punch", "Dynamic Punch", "Flatter", "Hurricane", "Psybeam", "Rock Climb", "Signal Beam", "Supersonic", "Swagger", "Sweet Kiss", "Teeter Dance", "Water Pulse"],
				plus: ["Magnetic Flux", "Gear Up"],
				poisonheal: ["Cross Poison", "Fling", "Gunk Shot", "Poison Jab", "Poison Powder", "Poison Sting", "Poison Tail", "Sludge", "Sludge Bomb", "Sludge Wave", "Smog", "Toxic Thread", "Twineedle", "Poison Fang", "Toxic", "Toxic Spikes"],
				prismarmor: [],
				raindish: ["Rain Dance"],
				rattled: ["Attack Order", "Bug Bite", "Bug Buzz", "Fell Stinger", "First Impression", "Fury Cutter", "Infestation", "Leech Life", "Lunge", "Megahorn", "Pin Missile", "Pollen Puff", "Signal Beam", "Silver Wind", "Steamroller", "Struggle Bug", "Twineedle", "U-turn", "X-Scissor", "Assurance", "Beat Up", "Bite", "Brutal Swing", "Crunch", "Dark Pulse", "Darkest Lariat", "Feint Attack", "Fling", "Foul Play", "Hyperspace Fury", "Knock Off", "Night Daze", "Night Slash", "Payback", "Power Trip", "Punishment", "Pursuit", "Snarl", "Sucker Punch", "Thief", "Throat Chop", "Astonish", "Hex", "Lick", "Moongeist Beam", "Night Shade", "Ominous Wind", "Phantom Force", "Shadow Ball", "Shadow Bone", "Shadow Claw", "Shadow Force", "Shadow Punch", "Shadow Sneak", "Spirit Shackle"],
				reckless: ["Take Down", "Double-Edge", "Submission", "Volt Tackle", "Flare Blitz", "Brave Bird", "Wood Hammer", "Head Smash", "Wild Charge", "Head Charge", "High Jump Kick"],
				regenerator: ["Volt Switch", "U-turn", "Parting Shot", "Baton Pass", "Roar", "Whirlwind", "Dragon Tail", "Circle Throw"],
				rockhead: ["Take Down", "Double-Edge", "Submission", "Volt Tackle", "Flare Blitz", "Brave Bird", "Wood Hammer", "Head Smash", "Wild Charge", "Head Charge"],
				sandforce: ["Bone Club", "Bone Rush", "Bonemerang", "Bulldoze", "Dig", "Drill Run", "Earth Power", "Earthquake", "High Horsepower", "Land's Wrath", "Magnitude", "Mud Slap", "Mud Bomb", "Mud Shot", "Precipice Blades", "Sand Attack", "Stomping Tantrum", "Thousand Arrows", "Thousand Waves", "Accelerock", "Ancient Power", "Diamond Storm", "Head Smash", "Power Gem", "Rock Blast", "Rock Slide", "Rock Throw", "Rock Tomb", "Rock Wrecker", "Rollout", "Smack Down", "Stone Edge", "Anchor Shot", "Bullet Punch", "Doom Desire", "Flash Cannon", "Gear Grind", "Gyro Ball", "Heavy Slam", "Iron Head", "Iron Tail", "Magnet Bomb", "Metal Burst", "Metal Claw", "Meteor Mash", "Mirror Shot", "Smart Strike", "Steel Wing", "Sunsteel Strike"],
				sandrush: ["Sandstorm"],
				sandveil: ["Sandstorm"],
				sapsipper: ["Absorb", "Bullet Seed", "Energy Ball", "Frenzy Plant", "Giga Drain", "Grass Knot", "Grass Pledge", "Horn Leech", "Leaf Blade", "Leaf Storm", "Leaf Tornado", "Leafage", "Magical Leaf", "Mega Drain", "Needle Arm", "Petal Blizzard", "Petal Dance", "Power Whip", "Razor Leaf", "Seed Bomb", "Seed Flare", "Solar Beam", "Solar Blade", "Trop Kick", "Vine Whip", "Wood Hammer", "Cotton Spore", "Forest's Curse", "Grass Whistle", "Leech Seed", "Sleep Powder", "Spore", "Strength Sap", "Stun Spore", "Worry Seed"],
				scrappy: ["Barrage", "Bind", "Body Slam", "Boomburst", "Chip Away", "Comet Punch", "Constrict", "Covet", "Crush Claw", "Crush Grip", "Cut", "Dizzy Punch", "Double-Edge", "Double Hit", "Double Slap", "Echoed Voice", "Egg Bomb", "Endeavor", "Explosion", "Extreme Speed", "Facade", "Fake Out", "False Swipe", "Feint", "Flail", "Frustration", "Fury Attack", "Fury Swipes", "Giga Impact", "Guillotine", "Head Charge", "Headbutt", "Hidden Power", "Hold Back", "Horn Attack", "Horn Drill", "Hyper Beam", "Hyper Fang", "Hyper Voice", "Judgement", "Last Resort", "Mega Kick", "Mega Punch", "Multi-Attack", "Natural Power", "Pay Day", "Pound", "Quick Attack", "Rage", "Rapid Spin", "Razor Wind", "Relic Song", "Retaliate", "Return", "Revelation Dance", "Rock Climb", "Round", "Scratch", "Secret Power", "Self-Destruct", "Skull Bash", "Slam", "Slash", "Smelling Salts", "Snore", "Sonic Boom", "Spike Cannon", "Spit Up", "Stomp", "Strength", "Super Fang", "Swift", "Tackle", "Tail Slap", "Take Down", "Techno Blast", "Thrash", "Tri Attack", "Trump Card", "Uproar", "Vice Grip", "Weather Ball", "Wrap", "Wring Out", "Arm Thrust", "Aura Sphere", "Brick Break", "Circle Throw", "Close Combat", "Counter", "Cross Chop", "Double Kick", "Drain Punch", "Dynamic Punch", "Final Gambit", "Flying Press", "Focus Blast", "Focus Punch", "Force Palm", "Hammer Arm", "High Jump Kick", "Jump Kick", "Karate Chop", "Low Kick", "Low Sweep", "Mach Punch", "Power-Up Punch", "Revenge", "Reversal", "Rock Smash", "Rolling Kick", "Sacred Sword", "Secret Sword", "Seismic Toss", "Sky Uppercut", "Storm Throw", "Submission", "Superpower", "Triple Kick", "Vacuum Wave", "Vital Throw", "Wake-Up Slap"],
				sheerforce: ["Aurora Beam", "Lunge", "Play Rough", "Trop Kick", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Mist Ball", "Moonblast", "Mystical Fire", "Snarl", "Struggle Bug", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Ancient Power", "Metal Claw", "Meteor Mash", "Ominous Wind", "Power-Up Punch", "Rototiller", "Silver Wind", "Fell Stinger", "Steel Wing", "Diamond Storm", "Charge Beam", "Fiery Dance", "Flame Charge"],
				shellarmor: ["Frost Breath", "Storm Throw"],
				shielddust: ["Aurora Beam", "Lunge", "Play Rough", "Trop Kick", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Mist Ball", "Moonblast", "Mystical Fire", "Snarl", "Struggle Bug", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Ancient Power", "Metal Claw", "Meteor Mash", "Ominous Wind", "Power-Up Punch", "Rototiller", "Silver Wind", "Fell Stinger", "Steel Wing", "Diamond Storm", "Charge Beam", "Fiery Dance", "Flame Charge"],
				simple: ["Aurora Beam", "Lunge", "Play Rough", "Trop Kick", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Mist Ball", "Moonblast", "Mystical Fire", "Snarl", "Struggle Bug", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Ancient Power", "Metal Claw", "Meteor Mash", "Ominous Wind", "Power-Up Punch", "Rototiller", "Silver Wind", "Fell Stinger", "Steel Wing", "Diamond Storm", "Charge Beam", "Fiery Dance", "Flame Charge", "Bulk Up", "Coil", "Curse", "Dragon Dance", "Growth", "Hone Claws", "Howl", "Meditate", "Sharpen", "Shift Gear", "Work Up", "Acupressure", "Shell Smash", "Swagger", "Swords Dance", "Belly Drum", "Baby-Doll Eyes", "Growl", "Noble Roar", "Parting Shot", "Play Nice", "Strength Sap", "Tearful Look", "Tickle", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Cosmic Power", "Defend Order", "Defense Curl", "Flower Shield", "Harden", "Magnetic Flux", "Stockpile", "Withdraw", "Acid Armor", "Barrier", "Iron Defense", "Cotton Guard", "Leer", "Tail Whip", "Screech", "Calm Mind", "Flatter", "Rototiller", "Quiver Dance", "Geomancy", "Nasty Plot", "Tail Glow", "Confide", "Captivate", "Eerie Impulse", "Charge", "Amnesia", "Fake Tears", "Metal Sound", "Double Team", "Minimize", "Defog", "Sweet Scent", "Kinesis", "Sand Attack", "Smokescreen", "Dragon Dance", "Rock Polish", "Sticky Web", "Toxic Thread", "Cotton Spore", "Scary Face", "String Shot"],
				skilllink: ["Arm Thrust", "Barrage", "Bone Rush", "Bullet Seed", "Comet Punch", "Double Slap", "Fury Attack", "Fury Swipes", "Icicle Spear", "Pin Missile", "Rock Blast", "Spike Cannon", "Tail Slap", "Water Shuriken", "Bonemerang", "Double Hit", "Double Kick", "Dual Chop", "Gear Grind", "Twineedle", "Triple Kick"],
				slushrush: ["Hail"],
				sniper: ["Frost Breath", "Storm Throw"],
				snowcloak: ["Hail"],
				solarpower: ["Sunny Day"],
				solidrock: [],
				soulheart: ["Self-Destruct", "Explosion", "Healing Wish", "Lunar Dance", "Memento"],
				soundproof: ["Boomburst", "Bug Buzz", "Chatter", "Clanging Scales", "Confide", "Disarming Voice", "Echoed Voice", "Grass Whistle", "Growl", "Heal Bell", "Hyper Voice", "Metal Sound", "Noble Roar", "Parting Shot", "Perish Song", "Relic Song", "Roar", "Round", "Screech", "Sing", "Snarl", "Snore", "Sparkling Aria", "Supersonic", "Uproar"],
				stakeout: ["Volt Switch", "U-turn", "Parting Shot", "Baton Pass", "Roar", "Whirlwind", "Dragon Tail", "Circle Throw"],
				steadfast: ["Air Slash", "Astonish", "Bite", "Bone Club", "Dark Pulse", "Dragon Rush", "Extrasensory", "Fake Out", "Fire Fang", "Fling", "Headbutt", "Heart Stamp", "Hyper Fang", "Ice Fang", "Icicle Crash", "Iron Head", "Needle Arm", "Rock Slide", "Rolling Kick", "Sky Attack", "Snore", "Steamroller", "Stomp", "Thunder Fang", "Twister", "Waterfall", "Zen Headbutt", "Zing Zap"],
				steelworker: ["Anchor Shot", "Bullet Punch", "Doom Desire", "Flash Cannon", "Gear Grind", "Gyro Ball", "Heavy Slam", "Iron Head", "Iron Tail", "Magnet Bomb", "Metal Burst", "Metal Claw", "Meteor Mash", "Mirror Shot", "Smart Strike", "Steel Wing", "Sunsteel Strike"],
				stickyhold: ["Covet", "Thief", "Bug Bite", "Pluck", "Incinerate", "Knock Off", "Trick", "Switcheroo"],
				stormdrain: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Soak", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool"],
				strongjaw: ["Bite", "Crunch", "Fire Fang", "Hyper Fang", "Ice Fang", "Poison Fang", "Psychic Fangs", "Thunder Fang"],
				suctioncups: ["Volt Switch", "U-turn", "Parting Shot", "Baton Pass", "Roar", "Whirlwind", "Dragon Tail", "Circle Throw"],
				surgesurfer: ["Electric Terrain"],
				swarm: ["Attack Order", "Bug Bite", "Bug Buzz", "Fell Stinger", "First Impression", "Fury Cutter", "Infestation", "Leech Life", "Lunge", "Megahorn", "Pin Missile", "Pollen Puff", "Signal Beam", "Silver Wind", "Steamroller", "Struggle Bug", "Twineedle", "U-turn", "X-Scissor"],
				sweetveil: ["Dark Void", "Grass Whistle", "Hypnosis", "Lovely Kiss", "Relic Song", "Rest", "Sing", "Sleep Powder", "Spore", "Yawn"],
				swiftswim: ["Rain Dance"],
				tangledfeet: ["Chatter", "Confuse Ray", "Confusion", "Dizzy Punch", "Dynamic Punch", "Flatter", "Hurricane", "Psybeam", "Rock Climb", "Signal Beam", "Supersonic", "Swagger", "Sweet Kiss", "Teeter Dance", "Water Pulse"],
				technician: [],
				thickfat: ["Aurora Beam", "Avalanche", "Blizzard", "Freeze-Dry", "Freeze Shock", "Frost Breath", "Glaciate", "Ice Ball", "Ice Beam", "Ice Burn", "Ice Fang", "Ice Hammer", "Ice Punch", "Ice Shard", "Icicle Crash", "Icicle Spear", "Icy Wind", "Powder Snow", "Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create"],
				tintedlens: [],
				torrent: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool"],
				toxicboost: ["Cross Poison", "Fling", "Gunk Shot", "Poison Jab", "Poison Powder", "Poison Sting", "Poison Tail", "Sludge", "Sludge Bomb", "Sludge Wave", "Smog", "Toxic Thread", "Twineedle", "Poison Fang", "Toxic", "Toxic Spikes"],
				triage: ["Aqua Ring", "Floral Healing", "Grassy Terrain", "Heal Pulse", "Healing Wish", "Ingrain", "Leech Seed", "Pain Split", "Present", "Purify", "Strength Sap", "Wish", "Heal Order", "Milk Drink", "Moonlight", "Morning Sun", "Recover", "Rest", "Roost", "Shore Up", "Slack Off", "Soft-Boiled", "Synthesis", "Absorb", "Drain Punch", "Draining Kiss", "Dream Eater", "Giga Drain", "Horn Leech", "Leech Life", "Leech Seed", "Mega Drain", "Oblivion Wing", "Parabolic Charge"],
				unaware: ["Aurora Beam", "Lunge", "Play Rough", "Trop Kick", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Mist Ball", "Moonblast", "Mystical Fire", "Snarl", "Struggle Bug", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Ancient Power", "Metal Claw", "Meteor Mash", "Ominous Wind", "Power-Up Punch", "Rototiller", "Silver Wind", "Fell Stinger", "Steel Wing", "Diamond Storm", "Charge Beam", "Fiery Dance", "Flame Charge", "Bulk Up", "Coil", "Curse", "Dragon Dance", "Growth", "Hone Claws", "Howl", "Meditate", "Sharpen", "Shift Gear", "Work Up", "Acupressure", "Shell Smash", "Swagger", "Swords Dance", "Belly Drum", "Baby-Doll Eyes", "Growl", "Noble Roar", "Parting Shot", "Play Nice", "Strength Sap", "Tearful Look", "Tickle", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Cosmic Power", "Defend Order", "Defense Curl", "Flower Shield", "Harden", "Magnetic Flux", "Stockpile", "Withdraw", "Acid Armor", "Barrier", "Iron Defense", "Cotton Guard", "Leer", "Tail Whip", "Screech", "Calm Mind", "Flatter", "Rototiller", "Quiver Dance", "Geomancy", "Nasty Plot", "Tail Glow", "Confide", "Captivate", "Eerie Impulse", "Charge", "Amnesia", "Fake Tears", "Metal Sound", "Double Team", "Minimize", "Defog", "Sweet Scent", "Kinesis", "Sand Attack", "Smokescreen"],
				unburden: ["Fling", "Covet", "Thief", "Bug Bite", "Pluck", "Incinerate", "Knock Off", "Trick", "Switcheroo"],
				vitalspirit: ["Dark Void", "Grass Whistle", "Hypnosis", "Lovely Kiss", "Relic Song", "Rest", "Sing", "Sleep Powder", "Spore", "Yawn"],
				voltabsorb: ["Bolt Strike", "Charge Beam", "Discharge", "Eerie Impulse", "Electrify", "Electro Ball", "Electroweb", "Fusion Bolt", "Ion Deluge", "Nuzzle", "Parabolic Charge", "Shock Wave", "Spark", "Thunder", "Thunder Fang", "Thunder Punch", "Thunder Shock", "Thunder Wave", "Thunderbolt", "Volt Switch", "Volt Tackle", "Wild Charge", "Zap Cannon", "Zing Zap"],
				waterabsorb: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Soak", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool"],
				waterbubble: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Soak", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool", "Blast Burn", "Blaze Kick", "Blue Flare", "Burn Up", "Ember", "Eruption", "Fiery Dance", "Fire Blast", "Fire Fang", "Fire Lash", "Fire Pledge", "Fire Punch", "Fire Spin", "Flame Burst", "Flame Charge", "Flame Wheel", "Flamethrower", "Flare Blitz", "Fusion Flare", "Heat Crash", "Heat Wave", "Incinerate", "Inferno", "Magma Storm", "Mystical Fire", "Overheat", "Sacred Fire", "Searing Shot", "Shell Trap", "V-Create", "Beak Blast", "Ice Burn", "Tri Attack", "Will-O-Wisp", "Fling"],
				watercompaction: ["Aqua Jet", "Aqua Tail", "Brine", "Bubble", "Bubble Beam", "Clamp", "Crabhammer", "Dive", "Hydro Cannon", "Hydro Pump", "Liquidation", "Muddy Water", "Octazooka", "Origin Pulse", "Razor Shell", "Scald", "Soak", "Sparkling Aria", "Steam Eruption", "Surf", "Water Gun", "Water Pledge", "Water Pulse", "Water Spout", "Waterfall", "Water Shuriken", "Whirlpool"],
				waterveil: ["Beak Blast", "Blaze Kick", "Blue Flare", "Ember", "Fire Blast", "Fire Fang", "Fire Punch", "Flamethrower", "Flame Wheel", "Flare Blitz", "Fling", "Heat Wave", "Ice Burn", "Inferno", "Lava Plume", "Sacred Fire", "Scald", "Searing Shot", "Steam Eruption", "Tri Attack", "Will-O-Wisp"],
				whitesmoke: ["Aurora Beam", "Baby-Doll Eyes", "Growl", "Lunge", "Noble Roar", "Parting Shot", "Play Nice", "Play Rough", "Strength Sap", "Tearful Look", "Tickle", "Trop Kick", "Venom Drench", "Charm", "Feather Dance", "King's Shield", "Memento", "Crunch", "Crush Claw", "Fire Lash", "Iron Tail", "Leer", "Liquidation", "Razor Shell", "Rock Smash", "Shadow Bone", "Tail Whip", "Tickle", "Screech", "Confide", "Mist Ball", "Moonblast", "Mystical Fire", "Noble Roar", "Parting Shot", "Snarl", "Struggle Bug", "Tearful Look", "Venom Drench", "Captivate", "Eerie Impulse", "Memento", "Acid", "Bug Buzz", "Earth Power", "Energy Ball", "Flash Cannon", "Focus Blast", "Luster Purge", "Shadow Ball", "Acid Spray", "Fake Tears", "Metal Sound", "Seed Flare", "Bubble", "Bubble Beam", "Bulldoze", "Constrict", "Electroweb", "Glaciate", "Icy Wind", "Low Sweep", "Mud Shot", "Rock Tomb", "Sticky Web", "Toxic Thread", "Venom Drench", "Cotton Spore", "Scary Face", "String Shot", "Defog", "Sweet Scent", "Flash", "Kinesis", "Leaf Tornado", "Mirror Shot", "Mud Bomb", "Mud-Slap", "Muddy Water", "Night Daze", "Octazooka", "Sand Attack", "Smokescreen"],
			};
			let allMoves = Dex.data.Movedex;
			for (let i in allMoves) {
				let move = allMoves[i];
				if (template.types.includes(move.type)) {
					movemasters.adaptability.push(move.id);
				}
				if (Dex.getImmunity(move, template) && Dex.getEffectiveness(move, template) > 0) {
					movemasters.anticipation.push(move.id);
					movemasters.solidrock.push(move.id);
					movemasters.filter.push(move.id);
					movemasters.prismarmor.push(move.id);
				}
				if (Dex.getEffectiveness(move, template) < 1) {
					movemasters.tintedlens.push(move.id);
				}
				if (move.basePower <= 60) {
					movemasters.technician.push(move.id);
				}
				if (move.accuracy < 100) {
					movemasters.compoundeyes.push(move.id);
				}
			}
			if (movemasters[ability.id]) {
				let moves = movemasters[ability.id];
				for (let j = 0; j < moves.length; j++) {
					if (template.learnset[toId(moves[j])]) continue;
					template.learnset[toId(moves[j])] = ["7T"];
				}
				return this.validateSet(set, teamHas, template);
			}
		}
	},
	
	{
  		name: "[Gen 7] Nerfmons",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/nerfmons.3609844/>Nerfmons</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		mod: 'nerfmons',
		banlist: ['Unreleased', 'Illegal'],
  	},
	{
  		name: "[Gen 7] OptiMons",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/.3609208/>OptiMons</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		banlist: ['Unreleased', 'Illegal'],
		mod: 'opti',
  	},
	{
		name: "[Gen 7] Pokemon: The New First Generation",
		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/pokemon-the-new-first-gen-submissions-for-new-pokemon-over.3578653/>Pokemon: The New First Generation</a>",
		       "&bullet; <a href=https://docs.google.com/spreadsheets/d/1RT8-Ntryi_SvlD_AwBCPWTso7bFZNpAGX4F7wuHBPQY/edit>Pokemon: The New First Gen Spreadhseet</a>",
		       "&bullet; Use /dgen (Pokemon/Item/Ability/Move) for more info",
		      ],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'thefirstnewgen',
	},
	{
		name: "[Gen 7] Sylvemons",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3612509/>SylveMons</a>",
				 "&bullet; <a href=https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit>Sylvemons Archive</a>",
		      ],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Illegal', 'Uber', 'Arena Trap', 'Time Warp', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stalwart + Calm Mind', 'Stakataka', 'Raichu-Alola', 'Regice', 'Buzzwole + Perseverance', 'Reverse Core'],
		unbanlist: ['Blaziken'],
		mod: 'sylvemons',
	},
	{
		name: "[Gen 7] Sylvemons [Test]",
		desc: ["&bullet; <a href=https://www.smogon.com/forums/threads/.3612509/>SylveMons</a>",
				 "&bullet; <a href=https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit>Sylvemons Archive</a>",
		      ],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Illegal', 'Uber', 'Arena Trap', 'Time Warp', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Stalwart + Calm Mind', 'Stakataka', 'Raichu-Alola', 'Regice', 'Buzzwole + Perseverance', 'Reverse Core'],
		unbanlist: ['Blaziken'],
		mod: 'sylvemonstest',
	},
	{
  		name: "[Gen 7] Type Optimisation",
  		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/type-optimisation-slate-11-submissions-ghost-ghost-psychic-ghost-normal.3602766/>Type Optimisation</a>",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		banlist: ['Unreleased', 'Illegal'],
		mod: 'typeopt',
  	},
	{
		name: "[Gen 7] Ultra Space Variants",
		desc: ["&bullet; With the existence of alternate dimensions and regional Variants, why hasn't anyone combined the two? Welcome to the world of Ultra Space. This world is inhabited by strange creatures called Ultra Beasts. However, oddly enough, stranger creatures called Pokémon have slipped into our dimension through wormholes. These Pokemon have gone through odd changes, but somehow make them even stronger than usual. Astonishing, isn't it?",
				 "&bullet; <a href=http://www.smogon.com/forums/threads/ultra-space-variants-submissions-tentaquil-and-lolwutcar.3594692/>Ultra Space Variants V1</a>",
				 "&bullet; <a href=http://www.smogon.com/forums/threads/ultra-space-variants-v2-slate-johto-starters.3602098/>Ultra Space Variants V2",
		      ],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'usv',
	},
	{
		name: "Universal Ubers",
		mod: 'primordialpokemon',

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: []
	},
	
	{
		name: "[Gen 7] Z-Moves Everywhere",
		desc: ["&bullet; <a href=http://www.smogon.com/forums/threads/z-moves-everywhere-slate-4-ninetales-torkoal-groudon-submissions-phase-extended.3592186/>Z-Moves Everywhere</a>"],
		ruleset: ['[Gen 7] Ubers'],
		banlist: ['Unreleased', 'Illegal'],
		mod: 'zmoveseverywhere',
	},
	
	// Old Other Metagames ///////////////////////////////////////////////////////////////////
	{
		section: "Old Other Metagames",
		column: 6,
	},
	{
		name: "Anti-Vaxxers",
		desc: ["All type-based immunities cease to apply."],
		mod: "antivaxxers",
		ruleset: ['OU'],
	},
	{
		name: "Follow The Leader",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3565685/\">Follow The Leader</a>"],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Regigigas', 'Shedinja', 'Slaking', 'Smeargle', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew',
			'Arena Trap', 'Gale Wings', 'Huge Power', 'Imposter', 'Pure Power', 'Shadow Tag', 'Chatter',
		],
		validateSet: function(set, teamHas) {
			let species = toId(set.species);
			let template = Dex.getTemplate(species);
			if (!template.exists || template.isNonstandard) return ["" + set.species + " is not a real Pok\u00E9mon."];
			if (template.battleOnly) template = Dex.getTemplate(template.baseSpecies);
			if (Dex.getBanlistTable(this.format)[template.id] || template.tier in {
					'Uber': 1,
					'Unreleased': 1
				} && template.species !== 'Aegislash') {
				return ["" + template.species + " is banned by Follow The Leader."];
			}

			if (!teamHas.donorTemplate) teamHas.donorTemplate = template;
			let name = set.name;
			if (name === set.species) delete set.name;
			set.species = teamHas.donorTemplate.species;
			let problems = this.validateSet(set, teamHas, teamHas.donorTemplate);

			set.species = template.species;
			set.name = (name === set.species ? "" : name);

			return problems;
		},
	},
	{
		name: "Haxmons",

		ruleset: ['OU', 'Freeze Clause'],
		banlist: ["King's Rock", 'Razor Fang', 'Stench'],
		onModifyMovePriority: -100,
		onModifyMove: function(move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 0;
			move.willCrit = true;
			if (move.secondaries) {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 100;
				}
			}
		}
	},
	{
		name: "STABmons",
		desc: [
			"Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547279/\">STABmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558034/\">STABmons Viability Ranking</a>",
		],

		ruleset: ['OU'],
		banlist: ['Ignore STAB Moves', 'Diggersby', 'Kyurem-Black', 'Porygon-Z', 'Thundurus', 'Aerodactylite', 'Altarianite', "King's Rock", 'Metagrossite', 'Razor Fang'],
	},

	{
		name: "Megamons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3566648/\">Megamons</a>"],

		ruleset: ['Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Mega Rayquaza Clause', 'Sleep Clause Mod', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Gengar-Mega', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Rayquaza-Mega'],
		onValidateTeam: function(team) {
			let problems = [];
			let kyurems = 0;
			for (let i = 0; i < team.length; i++) {
				if (team[i].species === 'Kyurem-White' || team[i].species === 'Kyurem-Black') {
					if (kyurems > 0) {
						problems.push('You cannot have more than one Kyurem-Black/Kyurem-White.');
						break;
					}
					kyurems++;
				}
			}
			return problems;
		},
		onChangeSet: function(set, format) {
			let item = this.getItem(set.item);
			let template = this.getTemplate(set.species);
			let problems = [];
			let totalEV = 0;

			if (set.species === set.name) delete set.name;
			if (set.moves) {
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' does not exist.');
					}
				}
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name || set.species) + ' has more than four moves.');
			}
			if (set.level && set.level > 100) {
				problems.push((set.name || set.species) + ' is higher than level 100.');
			}

			if (template.isNonstandard) {
				problems.push(set.species + ' does not exist.');
			}
			if (this.getAbility(set.ability).isNonstandard) {
				problems.push(set.ability + ' does not exist.');
			}
			if (item.isNonstandard) {
				if (item.isNonstandard === 'gen2') {
					problems.push(item.name + ' does not exist outside of gen 2.');
				} else {
					problems.push(item.name + ' does not exist.');
				}
			}
			for (let k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			if (totalEV > 510) {
				problems.push((set.name || set.species) + " has more than 510 total EVs.");
			}

			if (template.gender) {
				if (set.gender !== template.gender) {
					set.gender = template.gender;
				}
			} else {
				if (set.gender !== 'M' && set.gender !== 'F') {
					set.gender = undefined;
				}
			}

			let baseTemplate = this.getTemplate(template.baseSpecies);
			if (set.ivs && baseTemplate.gen >= 6 && (template.eggGroups[0] === 'Undiscovered' || template.species === 'Manaphy') && !template.prevo && !template.nfe && template.species !== 'Unown' && template.baseSpecies !== 'Pikachu' && (template.baseSpecies !== 'Diancie' || !set.shiny)) {
				let perfectIVs = 0;
				for (let i in set.ivs) {
					if (set.ivs[i] >= 31) perfectIVs++;
				}
				if (perfectIVs < 3) problems.push((set.name || set.species) + " must have at least three perfect IVs because it's a legendary in gen 6.");
			}

			let moves = [];
			if (set.moves) {
				let hasMove = {};
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					let moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;

			let battleForme = template.battleOnly && template.species;
			if (battleForme && !template.isMega) {
				if (template.requiredAbility && set.ability !== template.requiredAbility) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredAbility + "."); // Darmanitan-Zen
				}
				if (template.requiredItem && item.name !== template.requiredItem) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredItem + '.'); // Primal
				}
				if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredMove + "."); // Meloetta-Pirouette
				}
				if (!format.noChangeForme) set.species = template.baseSpecies; // Fix forme for Aegislash, Castform, etc.
			} else {
				if (template.requiredItem && item.name !== template.requiredItem && !template.isMega) {
					problems.push("" + (set.name || set.species) + " needs to hold " + template.requiredItem + '.'); // Plate/Drive/Griseous Orb
				}
				if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0 && !template.isMega) {
					problems.push("" + (set.name || set.species) + " needs to have the move " + template.requiredMove + "."); // Keldeo-Resolute
				}

				if (item.forcedForme && template.species === this.getTemplate(item.forcedForme).baseSpecies && !format.noChangeForme) {
					set.species = item.forcedForme;
				}
			}

			if (set.species !== template.species) {
				template = this.getTemplate(set.species);
				if (!format.noChangeAbility) {
					let legalAbility = false;
					for (let i in template.abilities) {
						if (template.abilities[i] !== set.ability) continue;
						legalAbility = true;
						break;
					}
					if (!legalAbility) {
						set.ability = template.abilities['0'];
					}
				}
			}

			if (set.shiny && template.unobtainableShiny) {
				problems.push("It's currently not possible to get a shiny " + template.species + ".");
			}

			return problems;
		},
		onSwitchIn: function(pokemon) {
			let item = pokemon.getItem();
			if (item.megaEvolves && pokemon.template.species === item.megaEvolves) {
				pokemon.canMegaEvo = item.megaStone;
			}
		},
	},
	{
		name: "Metagamiate",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3502303/\">Metagamiate</a>"],

		ruleset: ['OU'],
		banlist: ['Dragonite', 'Kyurem-Black'],
		onModifyMovePriority: -1,
		onModifyMove: function(move, pokemon) {
			if (move.type === 'Normal' && move.id !== 'hiddenpower' && !pokemon.hasAbility(['aerilate', 'pixilate', 'refrigerate'])) {
				let types = pokemon.getTypes();
				let type = types.length < 2 || !pokemon.set.shiny ? types[0] : types[1];
				move.type = type;
				move.isMetagamiate = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (!move.isMetagamiate) return;
			return this.chainModify([0x14CD, 0x1000]);
		},
	},
	{
		name: "Nature Swap",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3577739/\">Nature Swap</a>"],

		ruleset: ['OU'],
		banlist: ['Chansey', 'Cloyster'],
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let nature = pokemon.battle.getNature(pokemon.set.nature);
				if (nature.plus !== nature.minus) {
					["baseTemplate", "canMegaEvo"].forEach(key => {
						if (pokemon[key]) {
							let template = Object.assign({}, this.getTemplate(pokemon[key]));
							template.baseStats = Object.assign({}, template.baseStats);
							let plus = template.baseStats[nature.plus];
							let minus = template.baseStats[nature.minus];
							template.baseStats[nature.plus] = minus;
							template.baseStats[nature.minus] = plus;
							pokemon[key] = template;
						}
					});
					pokemon.formeChange(pokemon.baseTemplate);
				}
			}
		},
	},
	{
		name: "Meta Man",
		desc: [
			"When a Pokemon faints, the opposing Pokemon replaces its current ability with the fainted Pokemon's and gains its last-used move in a new slot (for up to 9 total moves). These changes last the entire match. If a Pokemon faints before using a move during the match, no move is gained by the opponent.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/meta-man.3565966/\">Meta Man</a>",
		],
		mod: "metaman",
		ruleset: ['OU'],
		onFaint: function(pokemon)
		{
			this.add("-message", pokemon.side.foe.pokemon[0].name + " received " + pokemon.name + "'s " + this.data.Abilities[pokemon.ability].name + "!");
			pokemon.side.foe.pokemon[0].setAbility(pokemon.ability);
			pokemon.side.foe.pokemon[0].baseAbility = pokemon.ability;
			let lastMove = pokemon.lastM;
			let has
			if (pokemon.side.foe.pokemon[0].moveset.length <= 9 && lastMove && !pokemon.side.foe.pokemon[0].hasMove(lastMove.id))
			{
				pokemon.side.foe.pokemon[0].moveset.push(lastMove);
				pokemon.side.foe.pokemon[0].baseMoveset.push(lastMove);
				this.add("-message", pokemon.side.foe.pokemon[0].name + " received " + pokemon.name + "'s " + pokemon.lastM.move + "!");
			}
		},
	},
	{
		name: "Top Percentage",
		mod: 'toppercentage',
		desc: ["&lt; <a href=\"http://www.smogon.com/forums/threads/top-percentage.3564459/\">Top Percentage</a>"],
		ruleset: ['OU'],
		onBegin: function() {
			this.add("raw|Welcome to Top Percentage! The first Player to deal 400% damage wins! HAHAHAH!");
			for (var i = 0; i < this.sides.length; i++) {
				this.sides[i].metaCount = 400;
			}
		},
		onDamage: function(damage, target) {
			//only should work if does not make target faint
			let percentage = 100 * damage / target.maxhp;
			if (damage >= target.hp) {
				percentage = 100 * target.hp / target.maxhp;
			}
			target.side.metaCount -= percentage;
			this.add('-message', target.side.name + " has " + Math.round(target.side.metaCount) + "% left!");
			if (target.side.metaCount <= 0.1) {
				//note: making this 0.1 because I got 1.10 times 10^-15 once
				//something silly with rounding
				//this works well enough
				this.add('-message', target.side.foe.name + " has dealt 400% damage!");
				this.win(target.side.foe);
			}
		}

	},
	{
		name: "Baton Pass Marathon",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/baton-pass-marathon-coded-looking-for-a-server.3517800\">Baton Pass Marathon</a>", ],
		mod: 'batonpassmarathon',

		ruleset: ['OU'],
		banlist: ['Perish Song', 'Sand Attack', 'Flash', 'Kinesis', 'Mud-Slap', 'Smokescreen', 'Acupressure'],
		onFaint: function(pokemon) {
			pokemon.clearVolatile();
		}
	},
	{

		name: "Camomons",
		desc: [
			"Pok&eacute;mon change type to match their first two moves.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3513059/\">Camomons</a>",
		],

		ruleset: ['OU'],
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let types = [this.getMove(pokemon.moves[0]).type];
				if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
				pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
				pokemon.types = pokemon.template.types = types;
			}
		},
		onAfterMega: function(pokemon) {
			let types = [this.getMove(pokemon.moves[0]).type];
			if (pokemon.moves[1] && this.getMove(pokemon.moves[1]).type !== types[0]) types.push(this.getMove(pokemon.moves[1]).type);
			pokemon.baseTemplate = pokemon.template = Object.assign({}, pokemon.template);
			pokemon.types = pokemon.template.types = types;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onSwitchIn: function(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
	},

	{
		name: "Imprisoned",
		ruleset: ['OU'],
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/imprisoned.3580920/\">Imprisoned</a>"],
		onBegin: function()
		{
			this.p1.impris = [];
			this.p2.impris = [];
			this.isImpris = function(side, move)
			{
				let b = false;
				for (let i = 0; i < this[side].impris.length; i++)
					if (this[side].impris[i] == move)
						b = true;
				return b;
			}
		},
		onDisableMove: function(pokemon)
		{
			let side = pokemon.side.id;
			for (let j = 0; j < pokemon.moves.length; j++)
			{
				let curmove = pokemon.moves[j];
				if (this.isImpris(side, curmove))
					pokemon.disableMove(curmove);
			}
		},
		onTryMove: function(source, target, move)
		{
			let side = target.side.id,
				opside = source.side.id;
			if (!this.isImpris(side, move.id))
				this[side].impris.push(move.id);
			for (let i = 0; i < this[opside].pokemon.length; i++)
			{
				for (let j = 0; j < this[opside].pokemon[i].moves.length; j++)
				{
					let curmove = this[opside].pokemon[i].moves[j];
					if (this.isImpris(opside, curmove))
						this[opside].pokemon[i].disableMove(curmove);
				}
			}
		},
	},
	{
		name: "The All-Stars Metagame",
		ruleset: ['OU'],
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/the-all-stars-metagame-v2-enter-the-pu-a-pokemon-from-each-tier.3510864//\">The All-Stars Metagame</a>"],
		banlist: [],

		onValidateTeam: function(team) {
			let ouMons = 0,
				uuMons = 0,
				ruMons = 0,
				nuMons = 0,
				puMons = 0,
				problems = [],
				check = true,
				template;
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (item.megaStone) template = this.getTemplate(team[i].item.megaStone);
				else template = this.getTemplate(team[i].species);
				let ability = this.getAbility(template.ability);
				let tier = template.tier;
				for (var j in team[i].moves) {
					var move = this.getMove(team[i].moves[j]);
					if (move.id == "chatter") tier = "NU";
				}
				//Bans Drought + Drizzle users to OU
				if (ability.id == "drizzle" || ability.id == "drought") tier = "OU";
				//Bans Chatter to NU
				if (tier == "OU" || tier == "BL") ouMons++;
				if (tier == "UU" || tier == "BL2") uuMons++;
				if (tier == "RU" || tier == "BL3") ruMons++;
				if (tier == "NU" || tier == "BL4") nuMons++;
				if (tier == "PU") puMons++;
			}
			while (check) {
				if (1 < ouMons) problems.push("You are able to only bring a maximum of 1 OU / BL Pokemon.");
				if (2 < uuMons) problems.push("You are able to only bring a maximum of 2 UU / BL2 Pokemon.");
				if (1 < ruMons) problems.push("You are able to only bring a maximum of 1 RU / BL3 Pokemon.");
				if (1 < nuMons) problems.push("You are able to only bring a maximum of 1 NU / BL4 Pokemon.");
				if (1 < puMons) problems.push("You are able to only bring a maximum of 1 PU Pokemon.");
				else check = false;
			}
			return problems;
		},
	},
	{
		name: "Mirror Move",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/mirror-move.3572990/\">Mirror Move</a>"],
		ruleset: ['OU'],
		banlist: ["Imprison"],
		mod: "mirrormove",
		onBegin: function() {
			for (let p = 0; p < this.sides.length; p++) {
				for (let i = 0; i < this.sides[p].pokemon.length; i++) {
					this.sides[p].pokemon[i].om = [{}];
					this.sides[p].pokemon[i].obm = [{}];
					for (let k in this.sides[p].pokemon[i].baseMoveset[0]) {
						this.sides[p].pokemon[i].om[0][k] = this.sides[p].pokemon[i].moveset[0][k];
						this.sides[p].pokemon[i].obm[0][k] = this.sides[p].pokemon[i].baseMoveset[0][k];
					}
					if (this.sides[p].pokemon[i].baseMoveset[1]) {
						this.sides[p].pokemon[i].om[1] = {};
						this.sides[p].pokemon[i].obm[1] = {};
						for (let k in this.sides[p].pokemon[i].baseMoveset[1]) {
							this.sides[p].pokemon[i].om[1][k] = this.sides[p].pokemon[i].moveset[1][k];
							this.sides[p].pokemon[i].obm[1][k] = this.sides[p].pokemon[i].baseMoveset[1][k];
						}
					}
				}
			}
		},
		onValidateSet(set) {
			if (set.moves.length > 2)
				return ["You are allowed to bring only 2 moves on a Pokemon.", "(" + set.species + " has more than 2 moves)"]
		}
	},
	{
		name: "Nature's Fear",
		ruleset: ['OU'],
		desc: ["All pokes have a special \"Intimidate\" on top on their ability, which means it still have their original Ability. This Intimidate lowers opposing stats by 1 stage based on negative (may be changed to positive if it's better) side of the Nature. For example, if you send out a Timid natured pokemon, your opponent's Attack is lowered.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/natures-fear.3584688/\">Nature's Fear</a>"
		],
		onSwitchIn: function(pokemon) {
			let foeactive = pokemon.side.foe.active,
				nature = {};
			if (!this.getNature(pokemon.set.nature).minus) return;
			nature[this.getNature(pokemon.set.nature).minus] = -1;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Nature\'s Fear', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost(nature, foeactive[i], pokemon);
				}
			}
		},
		onAfterMega: function(pokemon) {
			let foeactive = pokemon.side.foe.active,
				nature = {};
			if (!this.getNature(pokemon.set.nature).minus) return;
			nature[this.getNature(pokemon.set.nature).minus] = -1;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Nature\'s Fear', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost(nature, foeactive[i], pokemon);
				}
			}
		},
	},
	{
		name: "Open House",
		ruleset: ['OU'],
		banlist: [],
		onBegin: function() {
			this.randnumber = Math.floor(Math.random() * 3);
			this.randNo2 = Math.floor(Math.random() * 2);
			this.condition = "";
			if (this.randnumber === 0) {
				this.condition = "Magic Room";
			} else if (this.randnumber === 1) {
				this.condition = "Trick Room";
			} else {
				this.condition = "Wonder Room";
			}
			this.add("The battle will begin in the " + this.condition + "!");
		},
		onResidualOrder: 999,
		onResidual: function() {
			if (this.turn % 4 === 0) {
				if (this.condition === "Wonder Room") {
					if (this.randNo2 === 1) {
						this.condition = "Magic Room";
						this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
						this.addPsuedoWeather(toId(this.condition));
					}
				} else {
					this.condition = "Trick Room";
					this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
					this.addPsuedoWeather(toId(this.condition));
				}
				if (this.condition === "Magic Room") {
					if (this.randNo2 === 1) {
						this.condition = "Trick Room";
						this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
						this.addPsuedoWeather(toId(this.condition));
					} else {
						this.condition = "Wonder Room";
						this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
						this.addPsuedoWeather(toId(this.condition));
					}
				}
				if (this.condition === "Trick Room") {
					if (this.randNo2 === 1) {
						this.condition = "Wonder Room";
						this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
						this.addPsuedoWeather(toId(this.condition));
					} else {
						this.condition = "Magic Room";
						this.add("-message", "Starting next turn, the battle will begin in the " + this.condition + "!");
						this.addPsuedoWeather(toId(this.condition));
					}
				}
			}
		}

	},
	{
		name: "No Haxmons",

		ruleset: ['OU', 'Freeze Clause'],
		banlist: [],
		onModifyMovePriority: -100,
		onModifyMove: function(move) {
			if (move.accuracy !== true && move.accuracy < 100) move.accuracy = 100;
			move.willCrit = false;
			if (move.secondaries) {
				for (var i = 0; i < move.secondaries.length; i++) {
					move.secondaries[i].chance = 0;
				}
			}
		}
	},
	{
		name: "Palette Pals",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/palette-pals-formerly-tradeoff.3578405/\">Palette Pals</a>"],
		ruleset: ['OU'],
		banlist: ['Huge Power', 'Pure Power', 'Medichamite', 'Kyurem-Black', 'Slaking', 'Regigigas', 'Light Ball', 'Eviolite', 'Deep Sea Tooth', 'Deep Sea Scale', 'Thick Club'],
		onBegin: function() {
			for (let j = 0; j < this.sides.length; j++) {
				let allPokemon = this.sides[j].pokemon;
				let colorArray = [];
				for (let i = 0, len = allPokemon.length; i < len; i++) {
					let pokemon = allPokemon[i];
					let color = pokemon.template.color;
					if (colorArray.indexOf(color) > -1) {
						let copyIndex = colorArray.indexOf(color);
						let copycat = allPokemon[copyIndex];

						//Thanks to Nature Swap code for premise!!
						["baseTemplate", "canMegaEvo"].forEach(key => {
							if (pokemon[key]) {

								let template = Object.assign({}, this.getTemplate(pokemon[key]));
								template.baseStats = Object.assign({}, template.baseStats);
								let template2 = Object.assign({}, this.getTemplate(copycat.baseTemplate));
								template2.baseStats = Object.assign({}, template2.baseStats);
								template.baseStats = template2.baseStats;
								pokemon[key] = template;
							}
						});
						pokemon.formeChange(pokemon.baseTemplate);

						//adjust for hp
						if (pokemon.species !== "Shedinja") {
							let hp = pokemon.baseTemplate.baseStats['hp'];
							hp = Math.floor(Math.floor(2 * hp + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
							pokemon.maxhp = hp;
							pokemon.hp = hp;
						}
					}
					colorArray.push(color);
				}
			}
		}
	},
	{
		name: "Recyclables",
		desc: ["&bullet;<a href=\"http://www.smogon.com/forums/threads/recyclables.3581818/\">Recyclables</a>: <br />If the item on a Pokemon was not knocked off, it will be recycled at the end of every turn."],
		ruleset: ['OU'],
		onResidualOrder: 999, //This will always occur as the last possible occurence of the turn's residual phase.
		onResidual: function() {
			if ((this.p1.pokemon[0].item || !this.p1.pokemon[0].lastItem) && !(this.p2.pokemon[0].item || !this.p2.pokemon[0].lastItem))
			{
				this.p2.pokemon[0].setItem(this.p2.pokemon[0].lastItem);
				this.add('-item', this.p2.pokemon[0], this.p2.pokemon[0].getItem(), '[from] move: Recycle');
				//return false;
			}
			else if (!(this.p1.pokemon[0].item || !this.p1.pokemon[0].lastItem) && (this.p2.pokemon[0].item || !this.p2.pokemon[0].lastItem))
			{
				this.p1.pokemon[0].setItem(this.p1.pokemon[0].lastItem);
				this.add('-item', this.p1.pokemon[0], this.p1.pokemon[0].getItem(), '[from] move: Recycle');
				//return false;
			}
			else if (!(this.p1.pokemon[0].item || !this.p1.pokemon[0].lastItem) && !(this.p2.pokemon[0].item || !this.p2.pokemon[0].lastItem))
			{
				this.p1.pokemon[0].setItem(this.p1.pokemon[0].lastItem);
				this.add('-item', this.p1.pokemon[0], this.p1.pokemon[0].getItem(), '[from] move: Recycle');
				this.p2.pokemon[0].setItem(this.p2.pokemon[0].lastItem);
				this.add('-item', this.p2.pokemon[0], this.p2.pokemon[0].getItem(), '[from] move: Recycle');
			}
			else return false;
		}
	},
	{
		name: "The Negative Metagame",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/the-negative-metagame-playable-on-aqua.3529936/\">The Negative Metagame</a>"],
		mod: 'thenegativemetagame',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Swagger Clause', 'Team Preview', 'Evasion Moves Clause'],
		banlist: ['DeepSeaTooth', 'DeepSeaScale', 'Eviolite', 'Huge Power', 'Light Ball', 'Pure Power', 'Smeargle', 'Thick Club', 'Illegal', 'Unreleased']
	},
	{
		name: "Therianmons",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/therianmons.3566303/\">Therianmons</a>"],
		ruleset: ['OU'],

		onBegin: function() {
			for (let j = 0; j < this.sides.length; j++) {
				let allPokemon = this.sides[j].pokemon;
				for (let i = 0, len = allPokemon.length; i < len; i++) {
					let pokemon = allPokemon[i];
					//Thanks to Nature Swap code for premise!!
					["baseTemplate", "canMegaEvo"].forEach(key => {
						if (pokemon[key]) {

							let template = Object.assign({}, this.getTemplate(pokemon[key]));
							template.baseStats = Object.assign({}, template.baseStats);
							if (pokemon.set.ivs.spa == 30 && pokemon.set.ivs.spd == 30 && pokemon.set.ivs.atk == 30 && pokemon.set.ivs.def == 30 && pokemon.set.ivs.hp == 30)
							{
								template.baseStats.atk -= 15;
								template.baseStats.def += 10;
								template.baseStats.spa -= 15;
								template.baseStats.spd += 10;
								template.baseStats.spe += 10;
							}
							else if (pokemon.set.ivs.spa == 30 && pokemon.set.ivs.spd == 30)
							{
								template.baseStats.atk += 20;
								template.baseStats.spa -= 10;
								template.baseStats.spe -= 10;
							}
							else if (pokemon.set.ivs.spa == 30)
							{
								template.baseStats.spa += 20;
								template.baseStats.atk -= 10;
								template.baseStats.spe -= 10;
							}
							pokemon[key] = template;
						}
					});
					pokemon.formeChange(pokemon.baseTemplate);
				}
			}
		},
	},
	{
		name: "The Great Pledge",
		ruleset: ['OU'],
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/the-great-pledge.3581858/\">The Great Pledge</a>"],
		onBegin: function()
		{
			this.p1.pledge = {
				terrain: "",
				duration: 0
			}
			this.p2.pledge = {
				terrain: "",
				duration: 0
			}
		},
		onResidual: function()
		{
			if (this.p2.pledge.duration > 4 && this.p2.pledge.terrain != "")
			{
				this.add('-sideend', this.p2, this.p2.pledge.terrain);
				this.p2.pledge.duration = 0;
				this.p2.pledge.terrain = "";
			}
			else if (this.p2.pledge.terrain != "")
				this.p2.pledge.duration++;
			if (this.p1.pledge.duration > 4 && this.p1.pledge.terrain != "")
			{
				this.add('-sideend', this.p1, this.p1.pledge.terrain);
				this.p1.pledge.duration = 0;
				this.p1.pledge.terrain = "";
			}
			else if (this.p1.pledge.terrain != "")
				this.p1.pledge.duration++;
			if (this.p1.terrain == "Fire Pledge")
			{
				if (this.p1.pokemon[0] && !this.p1.pokemon[0].hasType('Fire')) {
					this.damage(this.p1.pokemon[0].maxhp / 8, this.p1.pokemon[0]);
				}
			}
			if (this.p2.terrain == "Fire Pledge")
			{
				if (this.p2.pokemon[0] && !this.p2.pokemon[0].hasType('Fire')) {
					this.damage(this.p2.pokemon[0].maxhp / 8, this.p2.pokemon[0]);
				}
			}
		},
		onModifySpe: function(spe, pokemon)
		{
			if (this[pokemon.side.id].pledge.terrain == "Grass Pledge")
				return this.chainModify(0.25);
		},
		onModifyMove: function(move, source)
		{
			if (this[source.side.id].pledge.terrain == "Water Pledge")
			{
				if (move.secondaries && move.id !== 'secretpower') {
					this.debug('doubling secondary chance');
					for (let i = 0; i < move.secondaries.length; i++) {
						move.secondaries[i].chance *= 2;
					}
				}
			}
		},
		onSwitchIn: function(pokemon)
		{
			var pledgetype = function()
			{
				if (pokemon.types[0] == 'Water') return 'water';
				if (pokemon.types[0] == 'Grass') return 'grass';
				if (pokemon.types[0] == 'Fire') return 'fire';
				if (pokemon.types[1] == 'Water') return 'water';
				if (pokemon.types[1] == 'Grass') return 'grass';
				if (pokemon.types[1] == 'Fire') return 'fire';
			}
			if (pledgetype() == 'fire')
			{
				if (pokemon.baseHpType == "Grass")
				{
					this.add('-sidestart', this[tSide], 'Fire Pledge');
					pokemon.side.foe.pledge.terrain = "Fire Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
				if (pokemon.baseHpType == "Water")
				{
					this.add('-sidestart', this[tSide], 'Water Pledge');
					pokemon.side.foe.pledge.terrain = "Water Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
			}
			if (pledgetype() == 'grass')
			{
				if (pokemon.baseHpType == "Fire")
				{
					this.add('-sidestart', this[tSide], 'Fire Pledge');
					pokemon.side.foe.pledge.terrain = "Fire Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
				if (pokemon.baseHpType == "Water")
				{
					this.add('-sidestart', this[tSide], 'Grass Pledge');
					pokemon.side.foe.pledge.terrain = "Grass Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
			}
			if (pledgetype() == 'water')
			{
				if (pokemon.baseHpType == "Grass")
				{
					this.add('-sidestart', this[tSide], 'Grass Pledge');
					pokemon.side.foe.pledge.terrain = "Grass Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
				if (pokemon.baseHpType == "Fire")
				{
					this.add('-sidestart', this[tSide], 'Water Pledge');
					pokemon.side.foe.pledge.terrain = "Water Pledge";
					pokemon.side.foe.pledge.duration = 0;
				}
			}
		},
	},
	{
		name: "Type Omelette",


		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		desc: [" &bullet; <a href=http://www.smogon.com/forums/threads/type-omelette-coded-looking-for-server.3540328/>Type Omelette</a>"],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Landorus', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite'],
		mod: 'mileseggsworth', //This is a pun, and was the most popular in name submissions.
		//Since this metagame uses custom types, let's make the types known to the players.
		onSwitchIn: function(pokemon) {
			var typeStr = pokemon.types[0];
			if (pokemon.types[1]) typeStr += '/' + pokemon.types[1]
			this.add('-start', pokemon, 'typechange', typeStr);
		}
	},
	{
		name: "VoltTurn Mayhem",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/voltturn-mayhem-lcotm.3527847/\">VoltTurn Mayhem</a>"],

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
		onModifyMove: function(move) {
			if (move.target && !move.nonGhostTarget && (move.target === "normal" || move.target === "any" || move.target === "randomNormal" || move.target === "allAdjacent" || move.target === "allAdjacentFoes")) {
				move.selfSwitch = true;
			}
		}
	},
	{
		name: "Move Equality",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/move-equality-playable-whirlpool-fire-spin-infestation-sand-tomb-are-now-banned-see-post-193.3539145/\">Move Equality</a>"],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite', 'Metagrossite', 'Landorus', 'Mud Slap', 'Keldeo'],
		onModifyMove: function(move, pokemon) {
			//Account for all moves affected by minimize, terrains/weathers, or two-turn moves (besides earthquake and dragon rush as they're already 100 BP)
			var forbid = ['stomp', 'steamroller', 'bodyslam', 'flyingpress', 'phantomforce', 'shadowforce'];
			if (!move.priority && !move.basePowerCallback && !move.onBasePower && move.basePower && move.category !== 'Status' && forbid.indexOf(move.id) === -1) move.basePower = 100;
			if (!move.priority && move.multihit) {
				if (typeof(move.multihit) === 'number') {
					move.basePower = 100 / move.multihit;
				} else {
					move.basePower = 100 / move.multihit[1];
				}
			}
			if (move.type === 'Flying' && move.category !== 'Status') move.basePower = 100;
		}
	},
	{
		name: "Move Equality 1v1",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/move-equality-playable-whirlpool-fire-spin-infestation-sand-tomb-are-now-banned-see-post-193.3539145/\">Move Equality</a>"],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite', 'Metagrossite', 'Landorus', 'Mud Slap', 'Keldeo'],
		onModifyMove: function(move, pokemon) {
			//Account for all moves affected by minimize, terrains/weathers, or two-turn moves (besides earthquake and dragon rush as they're already 100 BP)
			var forbid = ['stomp', 'steamroller', 'bodyslam', 'flyingpress', 'phantomforce', 'shadowforce'];
			if (!move.priority && !move.basePowerCallback && !move.onBasePower && move.basePower && move.category !== 'Status' && forbid.indexOf(move.id) === -1) move.basePower = 100;
			if (!move.priority && move.multihit) {
				if (typeof(move.multihit) === 'number') {
					move.basePower = 100 / move.multihit;
				} else {
					move.basePower = 100 / move.multihit[1];
				}
			}
			if (move.type === 'Flying' && move.category !== 'Status') move.basePower = 100;
		},
		validateTeam: function(team, format) {
			if (team.length > 3) return ['You may only bring up to three Pokémon.'];
		},
		onBegin: function() {
			this.p1.pokemon = this.p1.pokemon.slice(0, 1);
			this.p1.pokemonLeft = this.p1.pokemon.length;
			this.p2.pokemon = this.p2.pokemon.slice(0, 1);
			this.p2.pokemonLeft = this.p2.pokemon.length;
		}
	},
	{
		name: "Mega Mania",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/mega-mania-playable-on-aqua.3525444/\">Mega Mania</a>"],
		mod: "megamania",
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause', 'Mega Mania'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Regigigas', 'Slaking', 'Ignore Illegal Abilities']
	},
	{
		name: "Technician Tower",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/technician-tower-2-0-now-playable-on-the-aqua-server.3521635/\">Technician Tower</a>"],
		mod: 'technichiantower',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Technician', 'Skill Link'],
		validateSet: function(set) {
			for (var i in set.moves) {
				var move = this.getMove(string(set.moves[i]));
				if (move.basePower && move.basePower >= 90) return ['The move ' + move.name + ' is banned because it has >90 Base Power.'];
				if (move.id === 'frustration' && set.happiness < 105) return ['The move Frustration is banned because Pokemon ' + (set.name || set.species) + ' has less than 105 happiness'];
				if (move.id === 'return' && set.happiness > 150) return ['The move Return is banned because Pokemon ' + (set.name || set.species) + 'has more than 150 happiness'];
				if (move.basePowerCallback && !(move.id in {
						'frustration': 1,
						'return': 1
					})) return ['The move ' + move.name + ' is banned because it has a variable BP'];
				if (move.basePower && move.basePower > 63 && set.ability in {
						'Pixilate': 1,
						'Aerilate': 1,
						'Refrigerate': 1
					}) return ['The move ' + move.name + ' is banned for Pokemon with an -ate ability.']
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function(basePower, attacker, defender, move) {
			if (basePower <= 60) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
	},
	{
		name: "Hawluchange",
		ruleset: ['OU'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
		desc: [" &bullet; <a href=http://www.smogon.com/forums/threads/hawluchange-now-playable.3529847/>"],
		mod: "hawluchange",
		onModifyMove: function(move, pokemon) {
			if (move.id === 'flyingpress') {
				move.type = pokemon.types[0];
				if (pokemon.types[1]) {
					move.onEffectiveness = function(typeMod, type, move) {
						return typeMod + this.getEffectiveness(pokemon.types[1], type);
					}
				} else {
					move.onEffectiveness = function(typeMod, type, move) {
						return typeMod;
					}
				}
			}
		}
	},
	{
		name: "Type Exchange",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/type-exchange.3556479/\">Type Exchange Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/type-exchange.3556479/page-2#post-6547201/\">Gothitelle & Gothorita Quick Ban</a>"
		],
		ruleset: ['[Gen 7] OU'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', /*'Shadow Tag',*/ 'Gothitelle', 'Gothorita'],
		onBegin: function() {
			[this.p1.pokemon, this.p2.pokemon].forEach(function(pokemons) {
				let last_pokemon = {
					types: pokemons[pokemons.length - 1].types,
					typesData: pokemons[pokemons.length - 1].typesData,
				};
				for (let i = pokemons.length - 1; i > 0; i--) {
					pokemons[i].types = pokemons[i - 1].types;
					pokemons[i].typesData = pokemons[i - 1].typesData;
				}
				pokemons[0].types = last_pokemon.types;
				pokemons[0].typesData = last_pokemon.typesData;
			})
		},
	},
	{
		name: "Immunimons",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/immunimons.3516996/\">Immunimons</a>"],

		ruleset: ['OU'],
		banlist: [],
		onTryHit: function(target, source, move) {
			if (target === source || move.type === '???' || move.id === 'struggle') return;
			if (target.hasType(move.type)) {
				this.add('-debug', 'immunimons immunity [' + move.id + ']');
				return null;
			}
		},
		onDamage: function(damage, target, source, effect) {
			if ((source.hasType('Rock') && effect.id === 'stealthrock') || (source.hasType('Ground') && effect.id === 'spikes')) {
				this.add('-debug', 'immunimons immunity [' + effect.id + ']');
				return false;
			}
		},
	},
	{
		name: "Acid Rain",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/acid-rain.3518506/\">Acid Rain</a>"],

		mod: 'acidrain',
		onBegin: function() {
			this.setWeather('raindance');
			delete this.weatherData.duration;
			this.add('-message', "Eh, close enough.");
		},
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Weather Ball', 'Castform']
	},
	{
		name: "Partners in Crime",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/partners-in-crime.3559988/\">Partners in Crime</a>"],
		ruleset: ['Doubles OU'],
		mod: "pic",
		gameType: "doubles",
		banlist: ["Huge Power", "Kangaskhanite", "Mawilite", "Medichamite", "Pure Power", "Wonder Guard"],
		onBegin: function()
		{
			for (let i = 1; i <= 2; i++)
			{
				for (let j = 0; j < this["p" + i].pokemon.length; j++)
				{
					this["p" + i].pokemon[j].om = this["p" + i].pokemon[j].moveset;
					this["p" + i].pokemon[j].obm = this["p" + i].pokemon[j].baseMoveset;
				}
			}
		},
		onSwitchIn: function(pokemon)
		{
			let side = pokemon.side.id,
				partner = (pokemon.position == 0) ? 1 : 0;
			if (pokemon.isActive && this[side].pokemon[partner].isActive)
			{
				let partl = this[side].pokemon[partner].obm.length,
					pokl = pokemon.obm.length;
				this[side].pokemon[partner].moveset = this[side].pokemon[partner].om.concat(pokemon.om);
				this[side].pokemon[partner].baseMoveset = this[side].pokemon[partner].obm.concat(pokemon.obm);
				pokemon.moveset = pokemon.om.concat(this[side].pokemon[partner].om);
				pokemon.baseMoveset = pokemon.obm.concat(this[side].pokemon[partner].obm);
				for (let i = 0; i < this[side].pokemon[partner].moveset.length; i++)
				{
					if (!this[side].pokemon[partner].volatiles.choicelock)
					{
						this[side].pokemon[partner].moveset[i].disabled = false;
						this[side].pokemon[partner].moveset[i].disabledSource = '';
						this[side].pokemon[partner].baseMoveset[i].disabled = false;
						this[side].pokemon[partner].baseMoveset[i].disabledSource = '';
					}
				}
				for (let i = 0; i < pokemon.moveset.length; i++)
				{
					if (!pokemon.volatiles.choicelock)
					{
						pokemon.moveset[i].disabled = false;
						pokemon.moveset[i].disabledSource = '';
						pokemon.baseMoveset[i].disabled = false;
						pokemon.baseMoveset[i].disabledSource = '';
					}
				}
				if (Object.keys(this[side].pokemon[partner].volatiles).indexOf(toId(pokemon.ability)) < 0 && this[side].pokemon[partner].ability != pokemon.ability)
				{
					if (this[side].pokemon[partner].innate) this[side].pokemon[partner].removeVolatile(this[side].pokemon[partner].innate);
					this[side].pokemon[partner].innate = toId(pokemon.ability);
					this[side].pokemon[partner].addVolatile(this[side].pokemon[partner].innate);
				}
				if (Object.keys(pokemon.volatiles).indexOf(toId(this[side].pokemon[partner].ability)) < 0 && this[side].pokemon[partner].ability != pokemon.ability)
				{
					if (pokemon.innate) pokemon.removeVolatile(pokemon.innate);
					pokemon.innate = toId(this[side].pokemon[partner].ability);
					pokemon.addVolatile(pokemon.innate);
				}
			}
		},
		onAfterMega: function(pokemon)
		{
			let side = pokemon.side.id,
				partner = (pokemon.position == 0) ? 1 : 0;
			if (Object.keys(this[side].pokemon[partner].volatiles).indexOf(toId(pokemon.ability)) < 0 && this[side].pokemon[partner].ability != pokemon.ability)
			{
				if (this[side].pokemon[partner].innate) this[side].pokemon[partner].removeVolatile(this[side].pokemon[partner].innate);
				this[side].pokemon[partner].innate = toId(pokemon.ability);
				this[side].pokemon[partner].addVolatile(this[side].pokemon[partner].innate);
			}
		},
		onFaint: function(pokemon)
		{
			let side = pokemon.side.id,
				partner = (pokemon.position == 0) ? 1 : 0;
			if (this[side].pokemon[partner].isActive)
			{
				this[side].pokemon[partner].removeVolatile(this[side].pokemon[partner].innate)
				delete this[side].pokemon[partner].innate;
			}
			this[side].pokemon[partner].moveset = this[side].pokemon[partner].om;
			this[side].pokemon[partner].baseMoveset = this[side].pokemon[partner].obm;
		},
	},
	{
		name: "Averagemons",
		desc: [
			"Every Pok&eacute;mon has a stat spread of 100/100/100/100/100/100.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526481/\">Averagemons</a>",
		],
		mod: 'averagemons',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Smeargle', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Sableye + Prankster',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Light Ball', 'Soul Dew', 'Thick Club', 'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Chatter',
		],
	},
	
	{
		name: "Protean Palace",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/protean-palace.3496299/\">Protean Palace</a>"],
		column: 2,

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber', 'Soul Dew', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
		onPrepareHit: function(source, target, move) {
			var type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type);
			}
		}
	},
	// US/UM Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "US/UM Doubles",
		column: 6,
	},
	{
		name: "[Gen 7] Random Doubles Battle",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Doubles OU",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3618612/\">Doubles OU Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3592903/\">Doubles OU Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3590987/\">Doubles OU Sample Teams</a>",
		],

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Swagger Clause', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Jirachi', 'Kyogre', 'Kyurem-White', 'Lugia', 'Lunala',
			'Magearna', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Eevium Z', 'Kangaskhanite', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	},
	{
		name: "[Gen 7] Doubles Ubers",

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Dark Void'],
	},
	{
		name: "[Gen 7] Doubles UU",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3598014/\">Doubles UU Metagame Discussion</a>"],

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['[Gen 7] Doubles OU'],
		banlist: [
			'Aegislash', 'Amoonguss', 'Arcanine', 'Blacephalon', 'Bronzong', 'Celesteela', 'Deoxys-Attack', 'Diancie', 'Excadrill', 'Ferrothorn',
			'Garchomp', 'Gastrodon', 'Genesect', 'Heatran', 'Hoopa-Unbound', 'Jirachi', 'Kartana', 'Kingdra', 'Kyurem-Black',
			'Landorus-Therian', 'Ludicolo', 'Lycanroc-Dusk', 'Marowak-Alola', 'Marshadow', 'Milotic', 'Mimikyu', 'Naganadel', 'Ninetales-Alola', 'Oranguru',
			'Pelipper', 'Politoed', 'Porygon2', 'Scrafty', 'Snorlax', 'Stakataka', 'Suicune', 'Tapu Bulu', 'Tapu Fini', 'Tapu Koko',
			'Tapu Lele', 'Tyranitar', 'Volcanion', 'Volcarona', 'Weavile', 'Whimsicott', 'Zapdos', 'Zygarde-Base',
			'Charizardite Y', 'Diancite', 'Gardevoirite', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Swampertite',
		],
	},
	{
		name: "[Gen 7] VGC 2018",

		mod: 'gen7',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		timer: {starting: 15 * 60 - 10, perTurn: 10, maxPerTurn: 60, maxFirstTurn: 90, timeoutAutoChoose: true},
		ruleset: ['Pokemon', 'Standard GBU'],
		requirePlus: true,
	},
	{
		name: "[Gen 7] VGC 2017",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3583926/\">VGC 2017 Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3591794/\">VGC 2017 Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3590391/\">VGC 2017 Sample Teams</a>",
		],

		mod: 'vgc17',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		timer: {starting: 15 * 60 - 10, perTurn: 10, maxPerTurn: 60, maxFirstTurn: 90, timeoutAutoChoose: true},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod', 'Alola Pokedex'],
		banlist: ['Illegal', 'Unreleased', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zygarde', 'Mega'],
		requirePlus: true,
	},
	{
		name: "[Gen 7] Battle Spot Doubles",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3595001/\">Battle Spot Doubles Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3593890/\">Battle Spot Doubles Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3595859/\">Battle Spot Doubles Sample Teams</a>",
		],

		mod: 'gen7',
		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU'],
		requirePentagon: true,
	},
	{
		name: "[Gen 7] Doubles Custom Game",

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		teamLength: {
			validate: [2, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
		section: "From Submissions/Workshop",
		column: 5,
	},
	{
		name: "[Gen 7] Quantumbility",
		desc: [
			"&bullet; Quantumbility is an OU-based meta where you basically share your ability with your opponent, with a reset every switch. (your ability isn't replaced by the ability of the opponent, but you still can profit of it)",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3598275/#post-7271345\">Quantumbility</a>",
		],
		mod: 'franticfusions',
		ruleset: ['[Gen 7] OU'],
		banlist: ["Liepard", "Serperior"],
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			if (!pokemon.side.foe.active[0]) return;
			let statusability = {
				"aerilate": true,
				"aurabreak": true,
				"flashfire": true,
				"parentalbond": true,
				"pixilate": true,
				"refrigerate": true,
				"sheerforce": true,
				"slowstart": true,
				"truant": true,
				"unburden": true,
				"zenmode": true,
			};
			let sec = statusability[pokemon.ability] ? ("other" + pokemon.ability) : pokemon.ability;
			pokemon.side.foe.active[0].sec = sec;
			pokemon.side.foe.active[0].addVolatile(sec);
			sec = statusability[pokemon.side.foe.active[0].ability] ? ("other" + pokemon.side.foe.active[0].ability) : pokemon.side.foe.active[0].ability;
			pokemon.sec = sec;
			pokemon.addVolatile(sec);
		},
		onSwitchOut: function (pokemon) {
			if (!pokemon.side.foe.active[0]) return;
			pokemon.side.foe.active[0].removeVolatile(pokemon.side.foe.active[0].sec);
			delete pokemon.side.foe.active[0].sec;
		},
		onFaint: function (pokemon) {
			if (!pokemon.side.foe.active[0]) return;
			pokemon.side.foe.active[0].removeVolatile(pokemon.side.foe.active[0].sec);
			delete pokemon.side.foe.active[0].sec;
		},
	},
	{
		name: "[Gen 7] Completed",
		desc: [
			"Pok&eacute;mon no longer have their stats drop when they evolve or when they change forms during battle.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3598275/page-2#post-7271952\">Completed</a>",
		],
		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Ignore Illegal Abilities', 'Wonder Guard', 'Serene Grace ++ Shaymin', 'Shadow Tag', 'Parental Bond ++ Seismic Toss'],
		onModifyTemplate: function (template, pokemon) {
			let newStats = Object.assign({}, template.baseStats), prevo = pokemon.baseTemplate.prevo;
			while (prevo) {
				let prevoTemplate = this.getTemplate(prevo);
				for (let i in newStats.baseStats) {
					newStats[i] = Math.max(prevoTemplate.baseStats[i], newStats.baseStats[i]);
				}
				prevo = prevoTemplate.prevo;
			}
			if (!pokemon.baseTemplate.otherFormes) return Object.assign(template, newStats);
			for (let i = 0; i < pokemon.baseTemplate.otherFormes.length; i++) {
				let formeTemplate = this.getTemplate(pokemon.baseTemplate.otherFormes[i]);
				for (let j in newStats) {
					newStats[j] = Math.max(formeTemplate.baseStats[j], newStats[j]);
				}
			}
			return Object.assign(template, newStats);
		},
		onValidateSet: function (set, teamHas) {
			let template = this.getTemplate(set.species);
			let abilities = {};
			for (let i in template.abilities) {
				abilities[template.abilities[i]] = 1;
			}
			if (!template.otherFormes) return [];
			for (let i = 0; i < template.otherFormes.length; i++) {
				let formeTemplate = this.getTemplate(template.otherFormes[i]);
				for (let j in formeTemplate.abilities) {
					abilities[formeTemplate.abilities[j]] = 1;
				}
			}
			if (!(set.ability in abilities)) return [`${set.name || set.species} cannot have ${this.getAbility(set.ability).name}.`];
		},
	},
	{
		name: "[Gen 7] Consolation Prize",
		desc: [
			"Pok&eacute;mon have their lowest raw stat doubled.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3598275/#post-7270834/\">Consolation Prize</a>",
		],
		mod: 'consolationprize',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Mew', 'Celebi', 'Jirachi', 'Manaphy', 'Shaymin', 'Victini', 'Metagrossite'],
	},
	{
		name: "[Gen 7] Crippled",
		desc: [
			"Pokemon with a base HP of 80 or higher get their base stats halved.",
 		],
		mod: 'gen7',
		ruleset: ['[Gen 7] Ubers'],
		onModifyTemplate: function (template, pokemon) {
			let hp = 0;
			Object.values(template.baseStats).forEach(stat => {
				hp += stat;
			});
			if (hp >= 80) {
				for (let i in template.baseStats) {
					template.baseStats[i] *= 0.5;
				}
			}
			return template;
		},
	},
	{
		name: "[Gen 7] Freeze-Dry Mania",
		desc: [
			"All attacks in the first moveslots are super effective against the type of the attacks in the fourth moveslots but not very effective against the type of the attacks in the second moveslots",
 		],
		mod: 'gen7',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Illegal', 'Freeze-Dry'],
		onEffectiveness: function (typeMod, type, move) {
			let pokemon = this.activePokemon;
			if (move.id !== pokemon.moves[0] || pokemon.moves.length !== 4) return typeMod;
			if (type === this.getMove(pokemon.moves[3]).type) {
				return 1;
			}
			if (type === this.getMove(pokemon.moves[1]).type) {
				return 2;
			}
		},
	},
	{
		name: "[Gen 7] Multibility",
		desc: [
			"&bullet; Put your second ability in the item slot.",
		],
		mod: 'franticfusions',
		ruleset: ['[Gen 7] OU'],
		banlist: ["Illegal", 'Kyurem-Black', 'Manaphy', 'Porygon-Z', 'Shedinja', 'Togekiss', 'Chatter'],
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				if (this.getAbility(toId(pokemon.item))) {
					pokemon.abilitwo = toId(pokemon.item);
					pokemon.item = "";
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			if (pokemon.abilitwo && this.getAbility(pokemon.abilitwo)) {
				let statusability = {
					"aerilate": true,
					"aurabreak": true,
					"flashfire": true,
					"parentalbond": true,
					"pixilate": true,
					"refrigerate": true,
					"sheerforce": true,
					"slowstart": true,
					"truant": true,
					"unburden": true,
					"zenmode": true
				};
				let sec = statusability[pokemon.abilitwo] ? "other" + pokemon.abilitwo : pokemon.abilitwo;
				pokemon.addVolatile(sec, pokemon); //Second Ability! YAYAYAY
			}
		},
		validateSet: function(set, teamHas) {
			let item = set.item;
			if (Dex.getAbility(toId(item)))
			{
				set.item = '';
				let problems = this.validateSet(set, teamHas) || [];
				let abilitwo = Dex.getAbility(toId(item));
				let bans = {
					'arenatrap': true,
					'contrary': true,
					'furcoat': true,
					'hugepower': true,
					'imposter': true,
					'parentalbond': true,
					'purepower': true,
					'shadowtag': true,
					'trace': true,
					'simple': true,
					'wonderguard': true,
					'moody': true
				};
				if (bans[toId(abilitwo.id)]) problems.push(set.species + "'s ability " + abilitwo.name + " is banned by Multibility.");
				if (abilitwo.id === toId(set.ability)) problems.push("You cannot have two of " + abilitwo.name + " on the same Pokemon.");
				set.item = item;
				return problems;
			}
		},
		onValidateTeam: function(team) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let ability = this.getAbility(team[i].ability);
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + " or " + this.getAbility(toId(team[i].item)).name + " [Item])"];
				}
				let item = toId(team[i].item);
				if (!item) continue;
				ability = this.getAbility(item);
				if (!ability) continue;
				if (!abilityTable[ability]) abilityTable[ability] = 0;
				if (++abilityTable[ability] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + this.getAbility(ability).name + ")"];
				}
			}
		},
	},
	{
		name: "[Gen 7] Multibility 2.0",
		desc: [
			"&bullet; Put your second ability with your first ability in the ability slot.",
		],
		mod: 'franticfusions',
		ruleset: ['[Gen 7] OU'],
		banlist: ["Illegal", 'Kyurem-Black', 'Manaphy', 'Porygon-Z', 'Shedinja', 'Togekiss', 'Chatter'],
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let ability = pokemon.ability;
				let abilities = Dex.getFormat(this.format).getAbilities(ability);
				if (this.getAbility(ability).exists || !Array.isArray(abilities)) continue;
				pokemon.ability = pokemon.baseAbility = abilities[0];
				pokemon.abilitwo = abilities[1];
			}
		},
		getAbilities: function (slot) {
			let ab1 = "", ab2 = "";
			for (let i = 0; i < slot.length; i++) {
				ab1 = ab1 + slot.charAt(i);
				if (Dex.getAbility(ab1).exists) {
					ab2 = slot.substring(i + 1);
					if (Dex.getAbility(ab2).exists) return [ab1, ab2];
				}
			}
			return ab1;
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			if (pokemon.abilitwo && this.getAbility(pokemon.abilitwo)) {
				let statusability = {
					"aerilate": true,
					"aurabreak": true,
					"flashfire": true,
					"parentalbond": true,
					"pixilate": true,
					"refrigerate": true,
					"sheerforce": true,
					"slowstart": true,
					"truant": true,
					"unburden": true,
					"zenmode": true
				};
				let sec = statusability[pokemon.abilitwo] ? "other" + pokemon.abilitwo : pokemon.abilitwo;
				pokemon.addVolatile(sec, pokemon); //Second Ability! YAYAYAY
			}
		},
		validateSet: function(set, teamHas) {
			let abilities = this.format.getAbilities(set.ability), ability = set.ability;
			if (Array.isArray(abilities)) {
				set.ability = abilities[0];
				let problems = this.validateSet(set, teamHas) || [];
				let abilitwo = Dex.getAbility(abilities[1]);
				let bans = {
					'arenatrap': true,
					'contrary': true,
					'furcoat': true,
					'hugepower': true,
					'imposter': true,
					'parentalbond': true,
					'purepower': true,
					'shadowtag': true,
					'trace': true,
					'simple': true,
					'wonderguard': true,
					'moody': true
				};
				if (bans[toId(abilitwo.id)]) problems.push(set.species + "'s ability " + abilitwo.name + " is banned by Multibility.");
				if (abilitwo.id === toId(set.ability)) problems.push("You cannot have two of " + abilitwo.name + " on the same Pokemon.");
				set.ability = ability;
				return problems;
			}
		},
		onValidateTeam: function(team, format) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let abilities = format.getAbilities(team[i].ability), ability = this.getAbility(Array.isArray(abilities) ? abilities[0] : abilities);
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + " or " + this.getAbility(toId(team[i].item)).name + " [Item])"];
				}
				if (!Array.isArray(abilities)) continue;
				ability = this.getAbility(abilities[1]);
				if (!ability.exists) continue;
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + ")"];
				}
			}
		},
	},
	{
		name: "[Gen 7] Multibility Doubles",
		desc: [
			"&bullet; Put your second ability in the item slot.",
		],
		mod: 'franticfusions',
		gameType: 'doubles',
		ruleset: ['[Gen 7] Doubles OU'],
		banlist: ["Illegal", 'Kyurem-Black', 'Manaphy', 'Porygon-Z', 'Shedinja', 'Togekiss', 'Chatter'],
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				if (this.getAbility(toId(pokemon.item))) {
					pokemon.abilitwo = toId(pokemon.item);
					pokemon.item = "";
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			if (pokemon.abilitwo && this.getAbility(pokemon.abilitwo)) {
				let statusability = {
					"aerilate": true,
					"aurabreak": true,
					"flashfire": true,
					"parentalbond": true,
					"pixilate": true,
					"refrigerate": true,
					"sheerforce": true,
					"slowstart": true,
					"truant": true,
					"unburden": true,
					"zenmode": true
				};
				let sec = statusability[pokemon.abilitwo] ? "other" + pokemon.abilitwo : pokemon.abilitwo;
				pokemon.addVolatile(sec, pokemon); //Second Ability! YAYAYAY
			}
		},
		validateSet: function(set, teamHas) {
			let item = set.item;
			if (Dex.getAbility(toId(item)))
			{
				set.item = '';
				let problems = this.validateSet(set, teamHas) || [];
				let abilitwo = Dex.getAbility(toId(item));
				let bans = {
					'arenatrap': true,
					'contrary': true,
					'furcoat': true,
					'hugepower': true,
					'imposter': true,
					'parentalbond': true,
					'purepower': true,
					'shadowtag': true,
					'trace': true,
					'simple': true,
					'wonderguard': true,
					'moody': true
				};
				if (bans[toId(abilitwo.id)]) problems.push(set.species + "'s ability " + abilitwo.name + " is banned by Multibility.");
				if (abilitwo.id === toId(set.ability)) problems.push("You cannot have two of " + abilitwo.name + " on the same Pokemon.");
				set.item = item;
				return problems;
			}
		},
		onValidateTeam: function(team) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let ability = this.getAbility(team[i].ability);
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + " or " + this.getAbility(toId(team[i].item)).name + " [Item])"];
				}
				let item = toId(team[i].item);
				if (!item) continue;
				ability = this.getAbility(item);
				if (!ability) continue;
				if (!abilityTable[ability]) abilityTable[ability] = 0;
				if (++abilityTable[ability] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + this.getAbility(ability).name + ")"];
				}
			}
		},
	},
	{
		name: "[Gen 7] Totem Showdown",
		desc: [
			"The Pok&eacute;mon in the first slot of a team acts like a Totem Pokemon which cannot be switched out.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3598275/#post-7270627\">Totem Showdown</a>",
		],
		mod: 'totemshowdown',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Jirachi', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Lunala', 'Magearna', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom', 'Perish Song',
			'Power Construct', 'Eevium Z', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
		onSwitchIn: function (pokemon) {
			if(pokemon.side.totemSet) return;
			pokemon.side.pokemon[0].addVolatile('totem');
			pokemon.side.totemSet = true;
		},
	},
	{
		section: "Experimental Metagames",
		column: 5,
	},
	{
		name: "[Gen 7] Anything Goes (No Soul Dew Nerf)",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587441/\">Anything Goes</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3591711/\">AG Resources</a>",
			"&bullet; <a href=\"http://www.smogon.com/tiers/om/analyses/ag/\">AG Analyses</a>",
		],

		mod: 'nosouldewnerf',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] Fanmade Game",
		desc: ["&bullet; <a href=https://pastebin.com/LcyiuP01>Megas Info</a>",
		      ],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Illegal', 'Unreleased'],
		mod: 'fanmadegame',
	},
	{
		name: "[Gen 7] Prioritize",
		desc: [
			"&bullet; In this format, moves with 60 power or fewer gains +1 priority.",
		],
		ruleset: ['[Gen 7] OU'],
		banlist: ['Mud Slap', 'Hidden Power', 'Storm Throw', 'Frost Breath', 'Tapu Lele'],
		onModifyPriority: function (priority, pokemon, target, move) {
			// @ts-ignore
			if (move.category === 'Status' || move.basePower > 60 || !pokemon) return priority;
			if (!pokemon.hasAbility('technician')) return priority + 1;
		},
	},
	{
		name: "[Gen 7] Transmuters [WIP]",
		desc: [
			"&bullet; You can transmute into other Pokemon by putting its name in the item slot.",
			"&bullet; The new transmutation will gain the primary ability and stats (including HP of the itemslot pokemon."
		],
		mod: 'transmuters',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Smeargle', 'Shedinja', 'Kartana'],
		/*onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.canTransmute = this.canTransmute(pokemon);
			}
		},*/
		validateSet: function (set, teamHas) {
			let bannedPokes = ['Shedinja', 'Kartana'];
			let isTransmuter = false;
			if (set.item) isTransmuter = this.dex.getTemplate(set.item);
			let validator = new this.constructor(Dex.getFormat(this.format.id));
			let problems = validator.validateSet(Object.assign({}, set, {item: (isTransmuter.exists ? '' : set.item)}), teamHas) || [];
			if (isTransmuter.exists && (isTransmuter.num <= 0 || bannedPokes.includes(isTransmuter.species) || isTransmuter.tier === 'Uber' || isTransmuter.isMega)) problems.push(`${set.name || set.species} cannot transmute into ${isTransmuter.species}.`);
			return problems;
		},
	},
	{
		name: "[Gen 7] Aggression Passion",
		desc: ["&bullet; Status moves become 80 BP moves of the [Undecided] category."],
		mod: 'aggressionpassion',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Uber', 'Gengarite', 'Kangaskhanite', 'Lucarionite'],
		onModifyMove: function (move, pokemon) {
		if (move.category === 'Status' && move.target === 'self') {
			move.target = 'normal';
		}
		else if (move.category === 'Status' && move.target === 'all' || move.target === 'allySide') {
			move.target = 'allAdjacentFoes';
		}
		if (move.category === 'Status' && pokemon.stats.atk > pokemon.stats.spa) {
		move.category = 'Physical';
		move.basePower = 80;
		}
		else if (move.category === 'Status' && pokemon.stats.spa > pokemon.stats.atk) {
		move.category = 'Special';
		move.basePower = 80;
		}
	},
},
	{
		name: "[Gen 7] Test Format",
		desc: ["This format is for testing stuff."],
		ruleset: ["[Gen 7] OU"],
		team: 'random',
		mod: 'gen7',
		fullOrder: 6,
	},
	{
		name: "[Gen 7] Mix and Mega (Unreleased Stones)",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587740/\">Mix and Mega</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591580/\">Mix and Mega Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/mix_and_mega/\">Mix and Mega Analyses</a>",
		],

		mod: 'mixandmega2',
		ruleset: ['[Gen 7] Mix and Mega', 'Stone Clause'],
		onValidateTeam: function (team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (!(item in itemTable)) {
					itemTable[item] = 1;
				} else if (itemTable[item] < 2) {
					itemTable[item]++;
				} else {
					if (item.megaStone) return ["You are limited to two of each Mega Stone.", "(You have more than two " + this.getItem(item).name + ")"];
					if (item.id === 'blueorb' || item.id === 'redorb') return ["You are limited to two of each Primal Orb.", "(You have more than two " + this.getItem(item).name + ")"];
				}
			}
		},
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			let uberStones = ['beedrillite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || set.ability === 'Power Construct' || uberStones.includes(item.id)) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 7] Wild Card [WIP]",
		desc: `The Ability and Item slot are considered to be wild; allowing entry of moves, abilities and items.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/placeholder/">Wild Card</a>`,
		],

		mod: 'wildcard',
		ruleset: ['[Gen 7] OU', 'Sleep Clause Mod'],
		banlist: ['Kangaskhanite', 'Mawilite', 'Medichamite', 'Huge Power', 'Imposter', 'Normalize', 'Pure Power', 'Wonder Guard', 'Mimic', 'Sketch', 'Transform'],
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				//item slot
				let itemSlot =  toId(pokemon.item);
				if (this.getAbility(itemSlot).exists && this.getAbility(itemSlot).effectType === 'Ability') {
					pokemon.innate = `ability${itemSlot}`;
					pokemon.item = "";
				} else if (this.getType(itemSlot).exists && this.getType(itemSlot).effectType === 'Type') {
					pokemon.types[0] = this.getType(itemSlot).id;
					pokemon.item = "";
				} else if (this.getMove(itemSlot).exists && this.getMove(itemSlot).effectType === 'Move') {
					let move = this.getMove(itemSlot);
					pokemon.baseMoveSlots.push({
						move: move.name,
						id: move.id,
						pp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						target: move.target,
						disabled: false,
						disabledSource: '',
						used: false,
					});
					pokemon.moveSlots = pokemon.baseMoveSlots;
					pokemon.item = "";
				}

				//ability slot
				let abilitySlot = toId(pokemon.ability);
				if (this.getType(abilitySlot).exists && this.getType(abilitySlot).effectType === 'Type') {
					pokemon.types[1] = this.getType(abilitySlot).id;
					pokemon.ability = pokemon.baseAbility = "";
				} else if (this.getMove(abilitySlot).exists && this.getMove(abilitySlot).effectType === 'Move') {
					let move = this.getMove(abilitySlot);
					pokemon.baseMoveSlots.push({
						move: move.name,
						id: move.id,
						pp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						target: move.target,
						disabled: false,
						disabledSource: '',
						used: false,
					});
					pokemon.moveSlots = pokemon.baseMoveSlots;
					pokemon.ability = pokemon.baseAbility = "";
				}
			}
		},
		validateSet: function (set, teamHas) {
			let abilityExists = this.dex.getItem(set.ability) || this.dex.getType(set.ability) || this.dex.getAbility(set.ability) || this.dex.getMove(set.ability) || set.ability === '';
			if (!abilityExists) return [`You have entered gibberish in the ability slot on ${set.name || set.species}.`];
			let itemExists = this.dex.getItem(set.item) || this.dex.getType(set.item) || this.dex.getAbility(set.item) || this.dex.getMove(set.item) || set.item === '';
			if (!itemExists) return [`You have entered gibberish in the item slot on ${set.name || set.species}.`];
			let validator = new this.constructor(Dex.getFormat(this.format.id, ['Ignore Illegal Abilities']));
			let problems = /*validator.validateSet(Object.assign({}, set, {ability: '', item: ''}), teamHas) ||*/ [];
			if (set.ability === set.item) problems.push(`You cannot have two of the same thing on a Pokemon. (${set.name || set.species} has two of ${item.name})`);
			return problems;
		},
		onSwitchInPriority: 2,
		onSwitchIn: function (pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
			if (!pokemon.innate) return;
			pokemon.addVolatile(pokemon.innate);
		},
		onSwitchOut: function (pokemon) {
			if (!pokemon.innate) return;
			pokemon.removeVolatile(pokemon.innate);
		},
		onFaint: function (pokemon) {
			if (!pokemon.innate) return;
			pokemon.removeVolatile(pokemon.innate);
		},
	},
	{
		name: "[Gen 7] Mix and Mega Stones Unleashed",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3601590\">Mix and Mega Stones Unleashed</a>",
		],

		mod: 'mixandmega2',
		ruleset: ['[Gen 7] Mix and Mega', 'Stone Clause'],
		banlist: ['Electrify'],
		onValidateTeam: function (team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (!(item in itemTable)) {
					itemTable[item] = 1;
				} else if (itemTable[item] < 2) {
					itemTable[item]++;
				} else {
					if (item.megaStone) return ["You are limited to two of each Mega Stone.", "(You have more than two " + this.getItem(item).name + ")"];
					if (item.id === 'blueorb' || item.id === 'redorb') return ["You are limited to two of each Primal Orb.", "(You have more than two " + this.getItem(item).name + ")"];
				}
			}
		},
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			let uberStones = ['beedrillite', 'blazikenite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || template.species === 'Tapu Lele' || set.ability === 'Power Construct' || uberStones.includes(item.id)) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 7] Prehistoric",
		desc: [
			"&bullet; Coded by flufi.",
			"A format that takes place in prehistoric times.",
			"Over 100 Pokemon receive new Primal forms, along with",
			"every one of those Pokemon getting a new signature move.",
			"",
			"NOTE: This is a long-term project and probably won't be done until June/July.",
		],
		mod: "prehistoric",

		rulset: ['[Gen 7] Ubers'],
		banlist: ['Blue Orb', 'Shadow Tag'],
	},
	{
		name: "[Gen 7] Clovermons",
		desc: ["&bullet; <a href=http://pgenvp.wikia.com/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number>Clovermons</a>",
		       "&bullet; <a href=http://pgenvp.wikia.com/wiki/Category:Moves>Moves</a><br>Brought to you by <font color=#0715b2><b>Zapmaster2010</b></font>",
		      ],
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: [],
		mod: 'clovermons',
	},
	{
		name: "[Gen 7] Island Mons",
		desc: ["Mons from the Sevii, Seafoam, Whirl Islands, and Alola only",],
		mod: 'gen7',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod','Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Illegal','Abomasnow','Absol','Accelgor','Aegislash','Aerodactyl','Aggron','Aipom','Alomomola','Altaria','Amaura','Ambipom','Amoonguss','Ampharos','Anorith','Arbok','Arceus','Archen','Archeops','Armaldo','Aromatisse','Aron','Articuno','Audino','Aurorus','Avalugg','Axew','Azelf','Azumarill','Azurill','Baltoy','Banette','Barbaracle','Barboach','Basculin','Bastiodon','Bayleef','Beartic','Beautifly','Beheeyem','Beldum','Bergmite','Bibarel','Bidoof','Binacle','Blastoise','Blaziken','Blitzle','Boldore','Bonsly','Bouffalant','Braixen','Braviary','Breloom','Bronzong','Bronzor','Budew','Buizel','Bulbasaur','Bunnelby','Burmy','Cacnea','Cacturne','Camerupt','Carbink','Carnivine','Carracosta','Carvanha','Cascoon','Castform','Celebi','Chandelure','Charizard','Charmander','Charmeleon','Chatot','Cherrim','Cherubi','Chesnaught','Chespin','Chikorita','Chimchar','Chimecho','Chinchou','Chingling','Cinccino','Clamperl','Clauncher','Clawitzer','Claydol','Cobalion','Cofagrigus','Combee','Combusken','Conkeldurr','Corphish','Corsola','Cottonee','Cradily','Cranidos','Crawdaunt','Cresselia','Croagunk','Croconaw','Crustle','Cryogonal','Cubchoo','Cyndaquil','Darkrai','Darmanitan','Darumaka','Dedenne','Deerling','Deino','Delcatty','Delphox','Deoxys','Dewott','Dialga','Diancie','Diggersby','Diglett','Ditto','Dodrio','Doduo','Doublade','Dragalge','Drapion','Drifblim','Drifloon','Drilbur','Druddigon','Ducklett','Dugtrio','Duosion','Durant','Dusclops','Dusknoir','Duskull','Dustox','Dwebble','Eelektrik','Eelektross','Eevee','Ekans','Electabuzz','Electivire','Electrike','Electrode','Elekid','Elgyem','Emboar','Emolga','Empoleon','Entei','Escavalier','Espeon','Espurr','Excadrill','Exeggcute','Exeggutor','Exploud','Farfetchd','Feebas','Fennekin','Feraligatr','Ferroseed','Ferrothorn','Finneon','Flaaffy','Flabébé','Flareon','Fletchinder','Fletchling','Floatzel','Floette','Florges','Foongus','Forretress','Fraxure','Frillish','Froakie','Frogadier','Froslass','Furfrou','Gabite','Gallade','Galvantula','Garbodor','Garchomp','Gardevoir','Gastrodon','Genesect','Geodude','Gible','Gigalith','Girafarig','Giratina','Glaceon','Glalie','Glameow','Gligar','Gliscor','Gogoat','Goldeen','Golett','Golurk','Goodra','Goomy','Gorebyss','Gothita','Gothitelle','Gothorita','Gourgeist','Granbull','Greninja','Grimer','Grotle','Groudon','Grovyle','Growlithe','Grumpig','Gulpin','Gurdurr','Hariyama','Haxorus','Heatmor','Heatran','Heliolisk','Helioptile','Herdier','Hippopotas','Hippowdon','Hitmonchan','Hitmonlee','Hitmontop','Ho-Oh','Honedge','Hoopa','Hoothoot','Houndoom','Houndour','Huntail','Hydreigon','Igglybuff','Illumise','Infernape','Inkay','Ivysaur','Jellicent','Jigglypuff','Jirachi','Jolteon','Joltik','Jynx','Kabuto','Kabutops','Kangaskhan','Karrablast','Kecleon','Keldeo','Kirlia','Klang','Klefki','Klink','Klinklang','Koffing','Kricketot','Kricketune','Krokorok','Krookodile','Kyogre','Kyurem','Lairon','Lampent','Landorus','Lanturn','Latias','Latios','Leafeon','Leavanny','Lickilicky','Lickitung','Liepard','Lileep','Lilligant','Lillipup','Linoone','Litleo','Litwick','Lombre','Lotad','Loudred','Lucario','Ludicolo','Lugia','Lumineon','Lunatone','Luvdisc','Luxio','Luxray','Magmar','Makuhita','Malamar','Manaphy','Mandibuzz','Manectric','Mankey','Mantine','Mantyke','Maractus','Mareep','Marill','Marshtomp','Masquerain','Medicham','Meditite','Meganium','Meloetta','Meowstic','Mesprit','Metagross','Metang','Mew','Mewtwo','Mienfoo','Mienshao','Mightyena','Milotic','Miltank','MimeJr.','Minccino','Minun','Moltres','Monferno','Mothim','Mr.Mime','Mudkip','Muk','Munchlax','Munna','Musharna','Nidoking','Nidoqueen','Nidoran-F','Nidoran-M','Nidorina','Nidorino','Nincada','Ninetales','Ninjask','Noctowl','Noibat','Noivern','Nosepass','Numel','Nuzleaf','Omanyte','Omastar','Oshawott','Pachirisu','Palkia','Palpitoad','Pancham','Pangoro','Panpour','Pansage','Pansear','Paras','Parasect','Patrat','Persian','Petilil','Phantump','Phione','Pichu','Pidove','Pignite','Pikachu','Pineco','Piplup','Plusle','Politoed','Poliwag','Poliwhirl','Poliwrath','Poochyena','Primeape','Prinplup','Probopass','Pumpkaboo','Purrloin','Purugly','Pyroar','Quagsire','Quilava','Quilladin','Qwilfish','Raichu','Raikou','Ralts','Rampardos','Raticate','Rattata','Rayquaza','Regice','Regigigas','Regirock','Registeel','Relicanth','Reshiram','Reuniclus','Rhydon','Rhyhorn','Rhyperior','Riolu','Roggenrola','Roselia','Roserade','Rotom','Rufflet','Samurott','Sandile','Sandshrew','Sandslash','Sawk','Sawsbuck','Scatterbug','Sceptile','Scolipede','Scrafty','Scraggy','Seaking','Sealeo','Seedot','Seismitoad','Serperior','Servine','Seviper','Sewaddle','Sharpedo','Shaymin','Shedinja','Shellos','Shelmet','Shieldon','Shiftry','Shinx','Shroomish','Shuckle','Shuppet','Sigilyph','Silcoon','Simipour','Simisage','Simisear','Skiddo','Skitty','Skorupi','Skrelp','Skuntank','Slaking','Slakoth','Sliggoo','Slurpuff','Smeargle','Smoochum','Snivy','Snorlax','Snorunt','Snover','Snubbull','Solosis','Solrock','Spewpa','Spheal','Spinda','Spiritomb','Spoink','Spritzee','Squirtle','Stantler','Staraptor','Staravia','Starly','Stoutland','Stunfisk','Stunky','Sudowoodo','Suicune','Sunflora','Sunkern','Surskit','Swablu','Swadloon','Swalot','Swampert','Swanna','Swellow','Swirlix','Swoobat','Sylveon','Taillow','Talonflame','Tangela','Tauros','Teddiursa','Tentacool','Tentacruel','Tepig','Terrakion','Throh','Thundurus','Timburr','Tirtouga','Togekiss','Togepi','Togetic','Torchic','Torkoal','Tornadus','Torterra','Totodile','Toxicroak','Tranquill','Trapinch','Treecko','Trevenant','Tropius','Trubbish','Turtwig','Tympole','Tynamo','Typhlosion','Tyrantrum','Tyrogue','Tyrunt','Umbreon','Unfezant','Ursaring','Uxie','Vanillish','Vanillite','Vanilluxe','Vaporeon','Venipede','Venusaur','Vespiquen','Vibrava','Victini','Vigoroth','Virizion','Vivillon','Volbeat','Volcanion','Voltorb','Vullaby','Vulpix','Wailmer','Wailord','Walrein','Wartortle','Watchog',' Weezing','Whimsicott','Whirlipede','Whiscash','Whismur','Wigglytuff','Woobat','Wooper','Wormadam','Wurmple','Xerneas','Yamask','Yveltal','Zangoose','Zapdos','Zebstrika','Zekrom','Zigzagoon','Zoroark','Zorua','Zweilous'],
	},
	{
  		name: "[Gen 7] Mememons",
  		desc: ["&bullet; <a href=https://pastebin.com/3MpyAJ4x>Mememons</a><br>Brought to you by smellslikememe",
		      ],
  		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
  		mod: 'mememons',
  	},
	{
		name: "Enchanted Items Plus",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/enchanted-items-enchanted-items-plus-announced.3570431/page-20#post-6939744\">Enchanted Items Plus</a>"],

		mod: 'enchanteditems',
		ruleset: ['Ubers'],
		banlist: ['Ignore Illegal Abilities', 'Shedinja', 'Imposter',
			'Bug Gem', 'Electric Gem', 'Fire Gem',
			'Ice Gem', 'Poison Gem', 'Poke Ball', 'Steel Gem', 'Dark Gem', 'Psychic Gem',
		],
		onValidateSet: function(set) {

			let bannedAbilities = {
				'Arena Trap': 1,
				'Huge Power': 1,
				'Parental Bond': 1,
				'Pure Power': 1,
				'Shadow Tag': 1,
				'Wonder Guard': 1,
				'Contrary': 1,
				'Simple': 1,
				'Imposter': 1,
				'Simple': 1
			};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
			let ability = this.getAbility(set.ability);
			let item = this.getItem(set.item);
			if (ability.item && ability.item === item.id) {
				return ["You are not allowed to have " + ability.name + " and " + item.name + " on the same Pokémon."];
			}
		},
		onValidateTeam: function(team) {
			let abilityTable = {};
			for (let i = 0; i < team.length; i++) {
				let ability = this.getAbility(team[i].ability);
				if (!abilityTable[ability.id]) abilityTable[ability.id] = 0;
				if (++abilityTable[ability.id] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + ability.name + " or " + this.getItem(ability.item).name + ")"];
				}
				let item = toId(team[i].item);
				if (!item) continue;
				item = this.getItem(item);
				ability = item.ability;
				if (!ability) continue;
				if (!abilityTable[ability]) abilityTable[ability] = 0;
				if (++abilityTable[ability] > 2) {
					return ["You are limited to two of each ability by Ability Clause.", "(You have more than two of " + this.getAbility(ability).name + " or " + item.name + ")"];
				}
			}
		},
		onFaint: function(pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
		onSwitchOut: function(pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
	},
	{
		name: "Enchanted Items Hackmons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3570431/\">Enchanted Items</a>"],

		mod: 'enchanteditems',
		ruleset: ['HP Percentage Mod'],
		banlist: ['Ignore Illegal Abilities', 'Ignore Illegal Moves'],
		onFaint: function(pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
		onSwitchOut: function(pokemon) {
			this.singleEvent('End', this.getItem(pokemon.item), pokemon.itemData, pokemon);
		},
	},
	

	{
		name: "Mix and Mega Balanced Hackmons",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3540979/\">Mix and Mega</a>",
		],
		column: 4,

		mod: 'mnmbh',
		ruleset: ['Balanced Hackmons'],
		onValidateSet: function(set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			/*let uberStones = ['beedrillite', 'blazikenite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || uberStones.indexOf(item.id) >= 0) return ["" + template.species + " is not allowed to hold " + item.name + "."];*/
		},
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function(pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function(pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	// RoA Spotlight
	///////////////////////////////////////////////////////////////////

	/*{
		section: "RoA Spotlight",
		column: 4,
	},
	{
		name: "[Gen 5] OU (blind)",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3604732/\">Blind BW</a>"],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	},

	// ORAS Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "ORAS Singles",
	},
	{
		name: "[Gen 6] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3573990/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3571990/\">OU Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "[Gen 6] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3522911/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535106/\">Ubers Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
	},
	{
		name: "[Gen 6] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3582473/\">np: UU Stage 7.3</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/uu/\">UU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555277/\">UU Viability Ranking</a>",
		],

		ruleset: ['[Gen 6] OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought', 'Baton Pass'],
	},
	{
		name: "[Gen 6] RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3583022/\">np: RU Stage 19</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558546/\">RU Viability Ranking</a>",
		],

		ruleset: ['[Gen 6] UU'],
		banlist: ['UU', 'BL2'],
	},
	{
		name: "[Gen 6] NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3576747/\">np: NU Stage 15</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555650/\">NU Viability Ranking</a>",
		],

		ruleset: ['[Gen 6] RU'],
		banlist: ['RU', 'BL3'],
	},
	{
		name: "[Gen 6] PU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3586575/\">np: PU Stage 10</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528743/\">PU Viability Ranking</a>",
		],

		ruleset: ['[Gen 6] NU'],
		banlist: ['NU', 'BL4', 'Chatter'],
		unbanlist: ['Baton Pass'],
	},
	{
		name: "[Gen 6] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/formats/lc/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547566/\">LC Viability Ranking</a>",
		],

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger'],
	},
	{
		name: "[Gen 6] Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">Anything Goes Resources</a>",
		],

		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 6] CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3537407/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545628/\">CAP Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/5594694/\">CAP Sample Teams</a>",
		],

		searchShow: false,
		ruleset: ['[Gen 6] OU', 'Allow CAP'],
	},
	{
		name: "[Gen 6] Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3527960/\">Battle Spot Singles Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554616/\">Battle Spot Singles Viability Ranking</a>",
		],

		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "[Gen 6] Inverse Battle",
		desc: ["The effectiveness of attacks is inverted."],

		searchShow: false,
		ruleset: ['Pokemon', 'Inverse Mod', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
        name: "RU Theorymon",
        desc: [
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3568052/\">np: RU Stage 15</a>",
            "&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
            "&bullet; <a href=\"https://www.smogon.com/forums/threads/3558546/\">RU Viability Ranking</a>",
        ],

        mod: 'rutheorymon',

        ruleset: ['UU'],
        banlist: ['UU', 'BL2'],
  },
	{
		name: "[Gen 6] Random Battle",

		team: 'random',
		searchShow: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 6] Custom Game",


		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// ORAS Doubles/Triples
	///////////////////////////////////////////////////////////////////

	{
		section: "ORAS Doubles/Triples",
	},
	{
		name: "[Gen 6] Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3580680/\">np: Doubles OU Stage 5</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3498688/\">Doubles OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535930/\">Doubles OU Viability Ranking</a>",
		],

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Swagger Clause', 'Team Preview'],
		banlist: [
			'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Salamencite', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom', 'Soul Dew',
			'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	},
	{
		name: "[Gen 6] Doubles Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542746/\">Doubles Ubers</a>"],

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Dark Void'],
	},
	{
		name: "[Gen 6] Doubles UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542755/\">Doubles UU</a>"],

		gameType: 'doubles',
		ruleset: ['[Gen 6] Doubles OU'],
		banlist: [
			'Aegislash', 'Amoonguss', 'Arcanine', 'Azumarill', 'Bisharp', 'Breloom', 'Charizard-Mega-Y', 'Charizardite Y',
			'Conkeldurr', 'Cresselia', 'Diancie-Mega', 'Diancite', 'Ferrothorn', 'Garchomp', 'Gardevoir-Mega', 'Gardevoirite',
			'Gastrodon', 'Gengar', 'Greninja', 'Heatran', 'Hitmontop', 'Hoopa-Unbound', 'Hydreigon', 'Jirachi',
			'Kangaskhan-Mega', 'Kangaskhanite', 'Keldeo', 'Kyurem-Black', 'Landorus-Therian', 'Latios', 'Ludicolo', 'Milotic',
			'Politoed', 'Raichu', 'Rotom-Wash', 'Scizor', 'Scrafty', 'Shaymin-Sky', 'Suicune', 'Sylveon', 'Talonflame',
			'Terrakion', 'Thundurus', 'Togekiss', 'Tyranitar', 'Venusaur', 'Volcanion', 'Weavile', 'Whimsicott', 'Zapdos',
		],
	},
	{
		name: "[Gen 6] VGC 2016",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558332/\">VGC 2016 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3580592/\">VGC 2016 Viability Ranking</a>",
		],

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: [
			'Illegal', 'Unreleased', 'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Phione', 'Manaphy', 'Darkrai',
			'Shaymin', 'Shaymin-Sky', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Hoopa-Unbound', 'Volcanion', 'Soul Dew',
		],
		requirePentagon: true,
		onValidateTeam: function (team) {
			const legends = {'Mewtwo':1, 'Lugia':1, 'Ho-Oh':1, 'Kyogre':1, 'Groudon':1, 'Rayquaza':1, 'Dialga':1, 'Palkia':1, 'Giratina':1, 'Reshiram':1, 'Zekrom':1, 'Kyurem':1, 'Xerneas':1, 'Yveltal':1, 'Zygarde':1};
			let n = 0;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species).baseSpecies;
				if (template in legends) n++;
				if (n > 2) return ["You can only use up to two legendary Pok\u00E9mon."];
			}
		},
	},
	{
		name: "[Gen 6] Battle Spot Doubles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560820/\">Battle Spot Doubles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560824/\">Battle Spot Doubles Viability Ranking</a>",
		],

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "[Gen 6] Random Doubles Battle",

		gameType: 'doubles',
		team: 'random',
		searchShow: false,
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 6] Doubles Custom Game",

		gameType: 'doubles',

		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
		name: "[Gen 6] Battle Spot Triples",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533914/\">Battle Spot Triples Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3549201/\">Battle Spot Triples Viability Ranking</a>",
		],

		gameType: 'triples',
		maxForcedLevel: 50,
		teamLength: {
			validate: [6, 6],
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "[Gen 6] Triples Custom Game",

		gameType: 'triples',

		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "BW2 Singles",
		column: 4,
	},
	{
		name: "[Gen 5] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	},
	{
		name: "[Gen 5] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550881/\">BW2 Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446463/\">BW2 Ubers Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
	},
	{
		name: "[Gen 5] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3474024/\">BW2 UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning'],
	},
	{
		name: "[Gen 5] RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3473124/\">BW2 RU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning'],
	},
	{
		name: "[Gen 5] NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3484121/\">BW2 NU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist'],
	},
	{
		name: "[Gen 5] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3485860/\">BW2 LC Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela'],
	},
	{
		name: "[Gen 5] GBU Singles",

		mod: 'gen5',

		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	},
	{
		name: "[Gen 5] Random Battle",

		mod: 'gen5',

		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 5] Custom Game",

		mod: 'gen5',

		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// BW2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: 'BW2 Doubles',
		column: 4,
	},
	{
		name: "[Gen 5] Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533424/\">BW2 Doubles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533421/\">BW2 Doubles Viability Ranking</a>",
		],

		mod: 'gen5',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: [
			'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Jirachi',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Zekrom', 'Soul Dew', 'Dark Void', 'Sky Drop',
		],
	},
	{
		name: "[Gen 5] GBU Doubles",

		mod: 'gen5',
		gameType: 'doubles',

		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	},
	{
		name: "[Gen 5] Doubles Custom Game",

		mod: 'gen5',
		gameType: 'doubles',

		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// DPP Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "DPP Singles",
		column: 4,
	},
	{
		name: "[Gen 4] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 4] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505128/\">DPP Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446464/\">DPP Ubers Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus'],
	},
	{
		name: "[Gen 4] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503638/\">DPP UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL'],
	},
	{
		name: "[Gen 4] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/dp/articles/little_cup_guide\">DPP LC Guide</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['LC Uber', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma', 'Berry Juice', 'Deep Sea Tooth', 'Dragon Rage', 'Sonic Boom'],
	},
	{
		name: "[Gen 4] Random Battle",

		mod: 'gen4',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 4] Custom Game",

		mod: 'gen4',

		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	},

	// DPP Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "DPP Doubles",
		column: 4,
	},
	{
		name: "[Gen 4] Doubles Custom Game",

		mod: 'gen4',
		gameType: 'doubles',

		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Generations",
		column: 4,
	},
	{
		name: "[Gen 3] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain'],
	},
	{
		name: "[Gen 3] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536426/\">ADV Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446466/\">ADV Ubers Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	},
	{
		name: "[Gen 3] Custom Game",

		mod: 'gen3',

		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 2] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 2] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3507552/\">GSC Ubers Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',

		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Random Battle",

		mod: 'gen2',

		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Custom Game",

		mod: 'gen2',

		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 2] Traps",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'traps',
		ruleset: ['[Gen 2] OU'],
		onBegin: function () {
			this.arenaTrap = ['diglett', 'dugtrio'];
			this.magnetPull = ['magnemite', 'magneton'];
		},
		onSwitchIn: function(pokemon) {
			if(this.arenaTrap.includes(toId(pokemon.species))) {
				pokemon.addVolatile('arenatrap');
				return;
			}
			if(this.shadowTag.includes(toId(pokemon.species))) {
				pokemon.addVolatile('arenatrap');
				return;
			}
			if(pokemon.species === 'Wobbuffet') {
				pokemon.addVolatile('shadowtag');
				return;
			}
		}
	},
	{
		name: "[Gen 1] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541329/\">RBY Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',

		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 1] OU (tradeback)",

		mod: 'gen1',

		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Allow Tradeback', 'Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Random Battle",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Challenge Cup",

		mod: 'gen1',
		team: 'randomCC',

		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Stadium",

		mod: 'stadium',

		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Custom Game",

		mod: 'gen1',

		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},*/
	{
		section: "Mashups",
		column: 4,
	},
	{
    name: "[Gen 7] 1v1 AAA",
    desc: [
        "Almost Any Ability 1v1",
        "&bullet; Pokémon can have almost any ability they don't normally get, with a few exceptions"
    ],
    mod: 'gen7',
    teamLength: {
        validate: [1, 3],
        battle: 1,
    },
    ruleset: ['Ignore Illegal Abilities', 'gen71v1'],
    banlist: ['Sturdy', 'Huge Power', 'Pure Power', 'Fur Coat', 'Illusion', 'Moody', 'Parental Bond', 'Protean', 'Simple', 'Speed Boost', 'Water Bubble', 'Wonder Guard', 'No Guard', 'Imposter', 'Normalize', 'Psychic Surge', 'Multiscale', 'Shadow Shield', 'Hustle', 'Regigigas', 'Slaking', 'Kartana', 'Pheromosa', 'Archeops'],
},
	{
		name: "[Gen 7] 1v1 Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">AG Resources</a>",
		],
		mod: 'gen7',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] 1v1 Balanced Hackmons",
		desc: [
			"Anything that can be hacked in-game and is usable in local battles is allowed.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587475/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3588586/\">BH Suspects and Bans Discussion</a>",
		],

		mod: 'gen7',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Chatter', 'Extreme Evoboost'],
		validateSet: function(set, teamHas) {
			let problems = this.validateSet(set, teamHas) || [];
			set.moves.forEach(move => {
				if (Dex.data.Movedex[toId(move)].isZ) {
					problems.push((set.name || set.species) + " has a Crystal Free Z-Move, which is banned by Balanced Hackmons.");
				}
			});
			return problems;
		},
	},
	{
		name: "[Gen 7] 1v1 Classic Hackmons",
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		maxLevel: 100,
		defaultLevel: 100,
		onValidateSet: function(set) {
			let template = this.getTemplate(set.species);
			let item = this.getItem(set.item);
			let problems = [];
			if (template.isNonstandard) {
				problems.push(set.species + ' is not a real Pokemon.');
			}
			if (item.isNonstandard) {
				problems.push(item.name + ' is not a real item.');
			}
			let ability = {};
			if (set.ability) ability = this.getAbility(set.ability);
			if (ability.isNonstandard) {
				problems.push(ability.name + ' is not a real ability.');
			}
			if (set.moves) {
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' is not a real move.');
					}
				}
				if (set.moves.length > 4) {
					problems.push((set.name || set.species) + ' has more than four moves.');
				}
			}
			return problems;
		}
	},
	 {
        name: "[Gen 6] 1v1",
        desc: [
            "Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
            "&bullet; <a href=\"http://www.smogon.com/forums/threads/oras-1v1-3v3-team-preview.3496773/\">ORAS 1v1</a>",
            "&bullet; <a href=\"http://www.smogon.com/forums/threads/1v1-resources-thread.3536109/\">ORAS 1v1 Resources</a>",
			  "&bullet; <a href=http://1v1.boards.net/thread/131/oras-1v1>New 1v1 ORAS Thread</a>",
        ],
 
        mod: 'gen6',
        teamLength: {
            validate: [1, 3],
            battle: 1,
        },
        ruleset: ['Pokemon', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
        banlist: [
            'Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
            'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
            'Perish Song', 'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Chansey + Charm + Seismic Toss', 'Soul Dew',
            'Flash', 'Kinesis', 'Leaf Tornado', 'Mirror Shot', 'Mud Bomb', 'Mud-Slap', 'Muddy Water', 'Night Daze', 'Octazooka', 'Sand Attack', 'Smokescreen'
        ],
    },
    {
        name: "[Gen 5] 1v1",
        desc: [
            "Bring one Pok&eacute;mon and battle with it.",
            "&bullet; <a href=\"http://www.smogon.com/forums/threads/gen-v-1-vs-1-metagame.3483807/\">BW 1v1</a>"
        ],
 
        mod: 'gen5',
        teamLength: {
            validate: [1, 1],
            battle: 1,
        },
        ruleset: ['Pokemon', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
        banlist: [
            'Illegal', 'Unreleased',
            'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-A', 'Deoxys-Base', 'Dialga', 'Giratina', 'Giratina-O', 'Groudon', 'Ho-Oh', 'Kyurem-W', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-S', 'Zekrom',
            'Perish Song',
            'Chansey + Charm + Seismic Toss',
            'Focus Sash', 'Soul Dew'
        ],
    },
	{
		name: "[Gen 7] 1v1 Linked",
		desc: `The first two moves in a Pok&eacute;mon's moveset are used simultaneously.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3627804/">Linked</a>`,
		],
		mod: 'linked',
		ruleset: ['[Gen 7] OU'],
		banlist: ['Chlorophyll', 'Sand Rush', 'Slush Rush', 'Surge Surfer', 'Swift Swim', 'Unburden', 'King\'s Rock', 'Razor Fang', 'Swampertite', 'Liepard', 'Meowstic', 'Kyurem-Black', 'Jirachi', 'Meowstic-F'],
		unbanlist: ['Lucario-Mega', 'Lucarionite', 'Blaziken', 'Landorus', 'Power Construct', 'Deoxys-Speed'],
		restrictedMoves: ['Baneful Bunker', 'Bounce', 'Detect', 'Dig', 'Dive', 'Fly', 'Nature\'s Madness', 'Night Shade', 'Phantom Force', 'Protect', 'Seismic Toss', 'Shadow Force', 'Sky Drop', 'Spiky Shield', 'Super Fang'],
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		onValidateSet: function (set, format) {
			const restrictedMoves = format.restrictedMoves || [];
			let problems = [];
			for (const [i, moveid] of set.moves.entries()) {
				let move = this.getMove(moveid);
				if ((i === 0 || i === 1) && restrictedMoves.includes(move.name)) {
					problems.push(`${set.name || set.species}'s move ${move.name} cannot be linked.`);
				}
			}
			return problems;
		},
	},
	{
		name: "[Gen 7] 1v1 Megamons",
		mod: 'gen7',
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3566648/\">Megamons</a>"],

		ruleset: ['Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Mega Rayquaza Clause', 'Sleep Clause Mod', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Gengar-Mega', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Rayquaza-Mega'],
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		onValidateTeam: function(team) {
			let problems = [];
			let kyurems = 0;
			for (let i = 0; i < team.length; i++) {
				if (team[i].species === 'Kyurem-White' || team[i].species === 'Kyurem-Black') {
					if (kyurems > 0) {
						problems.push('You cannot have more than one Kyurem-Black/Kyurem-White.');
						break;
					}
					kyurems++;
				}
			}
			return problems;
		},
		onChangeSet: function(set, format) {
			let item = this.getItem(set.item);
			let template = this.getTemplate(set.species);
			let problems = [];
			let totalEV = 0;

			if (set.species === set.name) delete set.name;
			if (set.moves) {
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' does not exist.');
					}
				}
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name || set.species) + ' has more than four moves.');
			}
			if (set.level && set.level > 100) {
				problems.push((set.name || set.species) + ' is higher than level 100.');
			}

			if (template.isNonstandard) {
				problems.push(set.species + ' does not exist.');
			}
			if (this.getAbility(set.ability).isNonstandard) {
				problems.push(set.ability + ' does not exist.');
			}
			if (item.isNonstandard) {
				if (item.isNonstandard === 'gen2') {
					problems.push(item.name + ' does not exist outside of gen 2.');
				} else {
					problems.push(item.name + ' does not exist.');
				}
			}
			for (let k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			if (totalEV > 510) {
				problems.push((set.name || set.species) + " has more than 510 total EVs.");
			}

			if (template.gender) {
				if (set.gender !== template.gender) {
					set.gender = template.gender;
				}
			} else {
				if (set.gender !== 'M' && set.gender !== 'F') {
					set.gender = undefined;
				}
			}

			let baseTemplate = this.getTemplate(template.baseSpecies);
			if (set.ivs && baseTemplate.gen >= 6 && (template.eggGroups[0] === 'Undiscovered' || template.species === 'Manaphy') && !template.prevo && !template.nfe && template.species !== 'Unown' && template.baseSpecies !== 'Pikachu' && (template.baseSpecies !== 'Diancie' || !set.shiny)) {
				let perfectIVs = 0;
				for (let i in set.ivs) {
					if (set.ivs[i] >= 31) perfectIVs++;
				}
				if (perfectIVs < 3) problems.push((set.name || set.species) + " must have at least three perfect IVs because it's a legendary in gen 6.");
			}

			let moves = [];
			if (set.moves) {
				let hasMove = {};
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					let moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;

			let battleForme = template.battleOnly && template.species;
			if (battleForme && !template.isMega) {
				if (template.requiredAbility && set.ability !== template.requiredAbility) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredAbility + "."); // Darmanitan-Zen
				}
				if (template.requiredItem && item.name !== template.requiredItem) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredItem + '.'); // Primal
				}
				if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredMove + "."); // Meloetta-Pirouette
				}
				if (!format.noChangeForme) set.species = template.baseSpecies; // Fix forme for Aegislash, Castform, etc.
			} else {
				if (template.requiredItem && item.name !== template.requiredItem && !template.isMega) {
					problems.push("" + (set.name || set.species) + " needs to hold " + template.requiredItem + '.'); // Plate/Drive/Griseous Orb
				}
				if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0 && !template.isMega) {
					problems.push("" + (set.name || set.species) + " needs to have the move " + template.requiredMove + "."); // Keldeo-Resolute
				}

				if (item.forcedForme && template.species === this.getTemplate(item.forcedForme).baseSpecies && !format.noChangeForme) {
					set.species = item.forcedForme;
				}
			}

			if (set.species !== template.species) {
				template = this.getTemplate(set.species);
				if (!format.noChangeAbility) {
					let legalAbility = false;
					for (let i in template.abilities) {
						if (template.abilities[i] !== set.ability) continue;
						legalAbility = true;
						break;
					}
					if (!legalAbility) {
						set.ability = template.abilities['0'];
					}
				}
			}

			if (set.shiny && template.unobtainableShiny) {
				problems.push("It's currently not possible to get a shiny " + template.species + ".");
			}

			return problems;
		},
		onSwitchIn: function(pokemon) {
			let item = pokemon.getItem();
			if (item.megaEvolves && pokemon.template.species === item.megaEvolves) {
				pokemon.canMegaEvo = item.megaStone;
			}
		},
	},
	{
		name: "[Gen 7] 1v1 Mix and Mega",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587740/\">Mix and Mega</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3591580/\">Mix and Mega Resources</a>",
		],

		mod: 'mixandmega',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Mega Rayquaza Clause', 'Team Preview'],
		banlist: ['Baton Pass'],
		onValidateTeam: function(team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (!(item in itemTable)) {
					itemTable[item] = 1;
				} else if (itemTable[item] < 2) {
					itemTable[item]++;
				} else {
					if (item.megaStone) return ["You are limited to two of each Mega Stone.", "(You have more than two " + this.getItem(item).name + ")"];
					if (item.id === 'blueorb' || item.id === 'redorb') return ["You are limited to two of each Primal Orb.", "(You have more than two " + this.getItem(item).name + ")"];
				}
			}
		},
		onValidateSet: function(set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			let uberStones = ['beedrillite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || set.ability === 'Power Construct' || uberStones.includes(item.id)) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function() {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function(pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function(pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 7] 1v1  Monotype",
		desc: [
			"All the Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587204/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3589809/\">Monotype Viability Ranking</a>",
		],

		mod: 'gen7',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Illegal', 'Unreleased', 'Arceus', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Defense', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Perish Song', 'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Chansey + Charm + Seismic Toss', 'Chansey + Charm + Psywave',
			'Flash', 'Kinesis', 'Leaf Tornado', 'Mirror Shot', 'Mud Bomb', 'Mud-Slap', 'Muddy Water', 'Night Daze', 'Octazooka', 'Sand Attack', 'Smokescreen',
		],
	},
	{
		name: "[Gen 7] 1v1 Sketchmons",
		desc: [
			"Pok&eacute;mon gain access to one Sketched move.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587743/\">Sketchmons</a>",
		],

		mod: 'gen7',
		teamLength: {
 			validate: [1, 3],
 			battle: 1,
 		},
		ruleset: ['[Gen 7] OU', 'Allow One Sketch', 'Sketch Clause'],
		banlist: [
 			'Illegal', 'Unreleased', 'Arceus', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Defense', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Perish Song', 'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Chansey + Charm + Seismic Toss', 'Chansey + Charm + Psywave',
			'Flash', 'Kinesis', 'Leaf Tornado', 'Mirror Shot', 'Mud Bomb', 'Mud-Slap', 'Muddy Water', 'Night Daze', 'Octazooka', 'Sand Attack', 'Smokescreen',
 		],
		noSketch: ['Belly Drum', 'Celebrate', 'Conversion', "Forest's Curse", 'Geomancy', 'Happy Hour', 'Hold Hands', 'Lovely Kiss', 'Purify', 'Shell Smash', 'Shift Gear', 'Sketch', 'Spore', 'Sticky Web', 'Trick-or-Treat'],
	},
	{
 		name: "[Gen 7] 1v1 UU",
 		desc: [
 			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
 			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587523/\">1v1</a>",
 		],
 		mod: 'gen7',
 		teamLength: {
 			validate: [1, 3],
 			battle: 1,
 		},
 		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
 		banlist: [
			'Illegal', 'Unreleased', 'Arceus', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Defense', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Perish Song', 'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Chansey + Charm + Seismic Toss', 'Chansey + Charm + Psywave',
			'Flash', 'Kinesis', 'Leaf Tornado', 'Mirror Shot', 'Mud Bomb', 'Mud-Slap', 'Muddy Water', 'Night Daze', 'Octazooka', 'Sand Attack', 'Smokescreen',
			'Gyarados-Mega','Porygon-Z','Charizard-Mega-X','Tapu Koko','Mimikyu','Mawile-Mega','Lopunny-Mega','Greninja','Charizard-Mega-Y','Metagross-Mega','Sableye-Mega','Magnezone','Dragonite','Landorus-Therian','Victini','Donphan','Venusaur-Mega','Zygarde','Garchomp','Tapu Lele','Magearna',
			'Snorlax',
 		],
 	},
	{
		name: "[Gen 7] AG Balanced Hackmons",
		desc: [
			"Anything that can be hacked in-game and is usable in local battles is allowed.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587475/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3588586/\">BH Suspects and Bans Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3593766/\">BH Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/bh/\">BH Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] AG Mix and Mega",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587865/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3597893/\">CAP Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/posts/7203358/\">CAP Sample Teams</a>",
		],

		mod: 'mixandmega',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
onValidateTeam: function (team) {
			/**@type {{[k: string]: true}} */
			let itemTable = {};
			for (const set of team) {
				let item = this.getItem(set.item);
				if (!item) continue;
				if (itemTable[item.id] && item.megaStone) return ["You are limited to one of each Mega Stone.", "(You have more than one " + this.getItem(item).name + ")"];
				if (itemTable[item.id] && ['blueorb', 'redorb'].includes(item.id)) return ["You are limited to one of each Primal Orb.", "(You have more than one " + this.getItem(item).name + ")"];
				itemTable[item.id] = true;
			}
		},
		onValidateSet: function (set, format) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && !['blueorb', 'redorb', 'ultranecroziumz'].includes(item.id)) return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb') || (template.species.substr(0, 9) === 'Necrozma-' && item.id === 'ultranecroziumz')) return;
			let uberStones = format.restrictedStones || [];
			let uberPokemon = format.cannotMega || [];
			if (uberPokemon.includes(template.name) || set.ability === 'Power Construct' || uberStones.includes(item.name)) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function () {
			for (const pokemon of this.p1.pokemon.concat(this.p2.pokemon)) {
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "[Gen 7] AG STABmons",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587865/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3597893/\">CAP Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/posts/7203358/\">CAP Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] AG Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587901/\">Almost Any Ability</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3595753/\">AAA Resources</a>",
			"&bullet; <a href=\"https://www.smogon.com/tiers/om/analyses/aaa/\">AAA Analyses</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7] AG Linked",
		desc: `The first two moves in a Pok&eacute;mon's moveset are used simultaneously.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3627804/">Linked</a>`,
		],
		mod: 'linked',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
		onValidateSet: function (set, format) {
			const restrictedMoves = format.restrictedMoves || [];
			let problems = [];
			for (const [i, moveid] of set.moves.entries()) {
				let move = this.getMove(moveid);
				if ((i === 0 || i === 1) && restrictedMoves.includes(move.name)) {
					problems.push(`${set.name || set.species}'s move ${move.name} cannot be linked.`);
				}
			}
			return problems;
		},
	},
	{
		name: "[Gen 7] CAP Mix and Mega",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587865/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3597893/\">CAP Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/posts/7203358/\">CAP Sample Teams</a>",
		],

		mod: 'mixandmega',
		ruleset: ['Pokemon', 'Standard', 'Mega Rayquaza Clause', 'Team Preview', 'Allow CAP'],
		banlist: ['Tomohawk + Earth Power', 'Tomohawk + Reflect', 'Shadow Tag', 'Gengarite', 'Baton Pass', 'Electrify'],
		cannotMega: [
			'Arceus', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Dragonite', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Regigigas', 'Reshiram', 'Slaking', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
		],
		restrictedStones: ['Beedrillite', 'Blazikenite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Pidgeotite', 'Ultranecrozium Z'],
onValidateTeam: function (team) {
			/**@type {{[k: string]: true}} */
			let itemTable = {};
			for (const set of team) {
				let item = this.getItem(set.item);
				if (!item) continue;
				if (itemTable[item.id] && item.megaStone) return ["You are limited to one of each Mega Stone.", "(You have more than one " + this.getItem(item).name + ")"];
				if (itemTable[item.id] && ['blueorb', 'redorb'].includes(item.id)) return ["You are limited to one of each Primal Orb.", "(You have more than one " + this.getItem(item).name + ")"];
				itemTable[item.id] = true;
			}
		},
		onValidateSet: function (set, format) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && !['blueorb', 'redorb', 'ultranecroziumz'].includes(item.id)) return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb') || (template.species.substr(0, 9) === 'Necrozma-' && item.id === 'ultranecroziumz')) return;
			let uberStones = format.restrictedStones || [];
			let uberPokemon = format.cannotMega || [];
			if (uberPokemon.includes(template.name) || set.ability === 'Power Construct' || uberStones.includes(item.name)) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function () {
			for (const pokemon of this.p1.pokemon.concat(this.p2.pokemon)) {
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
{
		name: "[Gen 7] CAP STABmons",
		desc: [
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3587865/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/threads/3597893/\">CAP Viability Rankings</a>",
			"&bullet; <a href=\"http://www.smogon.com/forums/posts/7203358/\">CAP Sample Teams</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] OU', 'Allow CAP', 'STABmons Move Legality'],
		banlist: ['Tomohawk + Earth Power', 'Tomohawk + Reflect', 'Pajantom', 'Aerodactyl-Mega', 'Blacephalon', 'Kartana', 'Komala', 'Kyurem-Black', 'Porygon-Z', 'Silvally', 'Tapu Koko', 'Tapu Lele', 'King\'s Rock', 'Razor Fang'],
      restrictedMoves: ['Acupressure', 'Belly Drum', 'Chatter', 'Extreme Speed', 'Geomancy', 'Lovely Kiss', 'Shell Smash', 'Shift Gear', 'Spore', 'Thousand Arrows'],
	},

	{
		name: "[Gen 7] CAP LC",
		desc: ["&bullet; <a href=\"http://www.smogon.com/forums/threads/3599594/\">CAP LC</a>"],

		mod: 'gen7',
		maxLevel: 5,
		ruleset: ['[Gen 7] LC', 'Allow CAP'],
	},
	{
		section: "Frantic Fusions",
		column: 4,
	},
	{ //Thanks urkerab for the Cross Evolution code :)
		name: "[Gen 7] Frantic Fusions",
		desc: [
			"&bullet; <a href=https://github.com/XpRienzo/DragonHeaven/blob/master/mods/franticfusions/README.md>Frantic Fusions</a> <br> &bullet; A metagame where you are able to fuse two Pokemon. <BR /> &bullet; The resultant Pokemon has the primary type of the base mon. If the base mon is shiny, it will get the secondary type of the second mon, else the primary type of the second mon. It will get the averaged stats.<br />&bullet;You can choose any ability from the original Pokemon, and you also get the primary ability of the second Pokemon (The one you put in the nickname). <br />&bullet; Use !fuse for theorymonning purposes",
		],
		mod: 'franticfusions',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Uber', 'Unreleased', 'Shadow Tag', "Assist", "Shedinja", "Huge Power", "Pure Power", 'Medichamite', 'Swoobat'],
		suspect: "Nothing Yet (Test)",
		onModifyTemplate: function (template, pokemon) {
			let fusionTemplate = this.getTemplate(pokemon.name), mixedTemplate = Object.assign({}, template);
			if (!fusionTemplate.exists) return template;
			try {
				mixedTemplate.baseSpecies = mixedTemplate.species = template.species;
				mixedTemplate.weightkg = Math.max(0.1, (template.weightkg + fusionTemplate.weightkg) / 2)

				mixedTemplate.baseStats = {};
				for (let statid in template.baseStats) {
					mixedTemplate.baseStats[statid] = (template.baseStats[statid] + fusionTemplate.baseStats[statid]) / 2;
				}
				pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

				mixedTemplate.types = template.types.slice();
				let shiny = (pokemon.set.shiny && fusionTemplate.types[1]) ? 1 : 0;
				if (mixedTemplate.types[0] !== fusionTemplate.types[shiny]) mixedTemplate.types[1] = fusionTemplate.types[shiny];
				else mixedTemplate.types.length = 1;
				pokemon.fusion = fusionTemplate.baseSpecies;
				pokemon.abilitwo = toId(fusionTemplate.abilities[0]);
			} catch (e) {
				this.add('-hint', 'Failed to fuse ' + template.species + ' and ' + fusionTemplate.species + '. Please report this error so that it can be fixed.');
			}
			return mixedTemplate;
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let types = pokemon.types;
			if (!pokemon.fusetype) pokemon.fusetype = types;
			else
				pokemon.types = pokemon.fusetype;
			let statusability = {
				"aerilate": true,
				"aurabreak": true,
				"flashfire": true,
				"parentalbond": true,
				"pixilate": true,
				"refrigerate": true,
				"sheerforce": true,
				"slowstart": true,
				"truant": true,
				"unburden": true,
				"zenmode": true
			};
			let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
			if (pokemon.abilitwo !== pokemon.ability) pokemon.addVolatile(sec); //Second Ability! YAYAYAY
			if (pokemon.fusion && !pokemon.hasAbility("illusion")) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
			}
		},
		onAfterMega: function(pokemon)
		{
			if (pokemon.abilitwo !== pokemon.ability) {
				let statusability = {
					"aerilate": true,
					"aurabreak": true,
					"flashfire": true,
					"parentalbond": true,
					"pixilate": true,
					"refrigerate": true,
					"sheerforce": true,
					"slowstart": true,
					"truant": true,
					"unburden": true,
					"zenmode": true
				};
				let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
				pokemon.removeVolatile(sec);
			}
			pokemon.types = pokemon.fusetype;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateSet: function(set, teamHas) {
			let problems = [];
			if (!set.name || set.name === set.species) return;
			let template = this.getTemplate(set.species);
			let fusionTemplate = this.getTemplate(set.name);
			let banlist = {
				"shedinja": true,
				"hugepower": true,
				"purepower": true
			};
			if (!fusionTemplate.exists) return;
			let unobtainable = {
				'Darmanitan-Zen': true,
				'Greninja-Ash': true,
				'Zygarde-Complete': true,
				'Meloetta-Pirouette': true,
				'Castform-Snowy': true,
				'Castform-Sunny': true,
				'Castform-Rainy': true,
				'Aegislash-Blade': true,
			};
			let types = Object.keys(this.data.TypeChart);
			for (let i = 0; i < types.length; i++) {
				unobtainable["Silvally-" + types[i]] = true;
			}
			if (unobtainable[fusionTemplate.species]) problems.push("You cannot fuse with " + fusionTemplate.species + " since it needs to have a specific ability or an item, or transforms inbattle.")
			let canHaveAbility = false;
			if (fusionTemplate.isUnreleased) problems.push("You cannot fuse with a Unreleased Pokemon. (" + set.species + " has nickname " + set.name + ", which is unreleased)");
			if (fusionTemplate.isMega) problems.push("You cannot fuse with a Mega Pokemon. (" + set.species + " has nickname " + set.name + ")");
			if (toId(fusionTemplate.tier).includes("uber")) problems.push("You cannot fuse with an Uber. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			if (toId(fusionTemplate.tier) === "cap" || toId(template.tier) === "cap") problems.push("You cannot fuse with an fake Pokemon. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			if (banlist[toId(fusionTemplate.species)]) problems.push("Fusing with " + fusionTemplate.species + " is banned. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			for (let a in template.abilities) {
				if ((template.abilities[a] === set.ability) && !banlist[toId(template.abilities[a])]) {
					canHaveAbility = true;
				}
			}
			if (!canHaveAbility) return ["" + set.species + " cannot have " + set.ability + "."];
			let added = {};
			let movepool = [];
			let prevo = template.isMega ? this.getTemplate(template.species.substring(0, template.species.length - 5)).prevo : template.prevo;

			if (!this.data.Learnsets[toId(fusionTemplate.species)])
			{
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species.split("-")[0])].learnset;
			}
			else
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species)].learnset;
			if (!template.learnset)
			{
				template.learnset = this.data.Learnsets[toId(template.species.split("-")[0])].learnset;
			}
			else
				template.learnset = this.data.Learnsets[toId(template.species)].learnset;
			do {
				added[template.species] = true;
				movepool = movepool.concat(Object.keys(template.learnset));
				movepool = movepool.concat(Object.keys(fusionTemplate.learnset))
			} while (template && template.species && !added[template.species]);
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			prevo = fusionTemplate.isMega ? this.getTemplate(fusionTemplate.species.substring(0, fusionTemplate.species.length - 5)).prevo : fusionTemplate.prevo;
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			let moves = {};
			for (let kek = 0; kek < movepool.length; kek++) moves[movepool[kek]] = true;
			for (let i in set.moves) {
				let move = toId(set.moves[i]);
				if (move.substr(0, 11) === 'hiddenpower') move = 'hiddenpower'; // Really big hack :(
				if (!moves[move]) {
					problems.push(set.species + " cannot learn " + set.moves[i] + ".");
				}
			}
			if (problems) return problems;
		},
		onValidateTeam: function(team) {
			let nameTable = {};
			for (let i = 0; i < team.length; i++) {
				let name = team[i].name;
				if (name) {
					if (name === team[i].species) continue;
					if (nameTable[name]) {
						return ["Your Pok&eacute;mon must have different nicknames.", "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
		},
	},
	{
		name: "[Gen 7] Frantic Fusions Ubers",
		desc: [
			"&bullet; A metagame where you are able to fuse two Pokemon. <BR /> &bullet; The resultant Pokemon has the primary type of the base mon. If the base mon is shiny, it will get the secondary type of the second mon, else the primary type of the second mon. It will get the averaged stats.<br />&bullet;You can choose any ability from the original Pokemon, and you also get the primary ability of the second Pokemon (The one you put in the nickname). <br />&bullet; Use !fuse for theorymonning purposes",
		],
		mod: 'franticfusions',
		ruleset: ['Sleep Clause Mod', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased'],
		onModifyTemplate: function (template, pokemon) {
			let fusionTemplate = this.getTemplate(pokemon.name), mixedTemplate = Object.assign({}, template);
			if (!fusionTemplate.exists) return template;
			try {
				mixedTemplate.baseSpecies = mixedTemplate.species = template.species;
				mixedTemplate.weightkg = Math.max(0.1, (template.weightkg + fusionTemplate.weightkg) / 2)

				mixedTemplate.baseStats = {};
				for (let statid in template.baseStats) {
					mixedTemplate.baseStats[statid] = (template.baseStats[statid] + fusionTemplate.baseStats[statid]) / 2;
				}
				pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

				mixedTemplate.types = template.types.slice();
				let shiny = (pokemon.set.shiny && fusionTemplate.types[1]) ? 1 : 0;
				if (mixedTemplate.types[0] !== fusionTemplate.types[shiny]) mixedTemplate.types[1] = fusionTemplate.types[shiny];
				else mixedTemplate.types.length = 1;
				pokemon.fusion = fusionTemplate.baseSpecies;
				pokemon.abilitwo = toId(fusionTemplate.abilities[0]);
			} catch (e) {
				this.add('-hint', 'Failed to fuse ' + template.species + ' and ' + fusionTemplate.species + '. Please report this error so that it can be fixed.');
			}
			return mixedTemplate;
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let types = pokemon.types;
			if (!pokemon.fusetype) pokemon.fusetype = types;
			else
				pokemon.types = pokemon.fusetype;
			let statusability = {
				"aerilate": true,
				"aurabreak": true,
				"flashfire": true,
				"parentalbond": true,
				"pixilate": true,
				"refrigerate": true,
				"sheerforce": true,
				"slowstart": true,
				"truant": true,
				"unburden": true,
				"zenmode": true
			};
			let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
			if (pokemon.abilitwo !== pokemon.ability) pokemon.addVolatile(sec); //Second Ability! YAYAYAY
			if (pokemon.fusion && !pokemon.hasAbility("illusion")) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
			}
		},
		onAfterMega: function(pokemon)
		{
			if (pokemon.abilitwo !== pokemon.ability) {
				let statusability = {
					"aerilate": true,
					"aurabreak": true,
					"flashfire": true,
					"parentalbond": true,
					"pixilate": true,
					"refrigerate": true,
					"sheerforce": true,
					"slowstart": true,
					"truant": true,
					"unburden": true,
					"zenmode": true
				};
				let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
				pokemon.removeVolatile(sec);
			}
			pokemon.types = pokemon.fusetype;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateSet: function(set, teamHas) {
			let problems = [];
			if (!set.name || set.name === set.species) return;
			let template = this.getTemplate(set.species);
			let fusionTemplate = this.getTemplate(set.name);
			//let banlist= {"shedinja":true,"hugepower":true,"purepower":true};
			if (!fusionTemplate.exists) return;
			let unobtainable = {
				'Darmanitan-Zen': true,
				'Greninja-Ash': true,
				'Zygarde-Complete': true,
				'Meloetta-Pirouette': true,
				'Castform-Snowy': true,
				'Castform-Sunny': true,
				'Castform-Rainy': true,
				'Aegislash-Blade': true
			};
			let types = Object.keys(this.data.TypeChart);
			for (let i = 0; i < types.length; i++) {
				unobtainable["Silvally-" + types[i]] = true;
			}
			if (unobtainable[fusionTemplate.species]) problems.push("You cannot fuse with " + fusionTemplate.species + " since it needs to have a specific ability or an item, or transforms inbattle.")
			let canHaveAbility = false;
			if (fusionTemplate.isUnreleased) problems.push("You cannot fuse with a Unreleased Pokemon. (" + set.species + " has nickname " + set.name + ", which is unreleased)");
			if (fusionTemplate.isMega) problems.push("You cannot fuse with a Mega Pokemon. (" + set.species + " has nickname " + set.name + ")");
			//if(toId(fusionTemplate.tier).includes("uber")) problems.push("You cannot fuse with an Uber. ("+template.species+" has nickname "+fusionTemplate.species+")");
			if (toId(fusionTemplate.tier) === "cap") problems.push("You cannot fuse with an fake Pokemon. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			//if(banlist[toId(fusionTemplate.species)]) problems.push("Fusing with " + fusionTemplate.species + " is banned. ("+template.species+" has nickname "+ fusionTemplate.species + ")");
			for (let a in template.abilities) {
				if ((template.abilities[a] === set.ability) /*&& !banlist[toId(template.abilities[a])]*/ ) {
					canHaveAbility = true;
				}
			}
			if (!canHaveAbility) return ["" + set.species + " cannot have " + set.ability + "."];
			let added = {};
			let movepool = [];
			let prevo = template.isMega ? this.getTemplate(template.species.substring(0, template.species.length - 5)).prevo : template.prevo;

			if (!this.data.Learnsets[toId(fusionTemplate.species)])
			{
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species.split("-")[0])].learnset;
			}
			else
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species)].learnset;
			if (!template.learnset)
			{
				template.learnset = this.data.Learnsets[toId(template.species.split("-")[0])].learnset;
			}
			else
				template.learnset = this.data.Learnsets[toId(template.species)].learnset;
			do {
				added[template.species] = true;
				movepool = movepool.concat(Object.keys(template.learnset));
				movepool = movepool.concat(Object.keys(fusionTemplate.learnset))
			} while (template && template.species && !added[template.species]);
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			prevo = fusionTemplate.isMega ? this.getTemplate(fusionTemplate.species.substring(0, fusionTemplate.species.length - 5)).prevo : fusionTemplate.prevo;
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			let moves = {};
			for (let kek = 0; kek < movepool.length; kek++) moves[movepool[kek]] = true;
			for (let i in set.moves) {
				let move = toId(set.moves[i]);
				if (move.substr(0, 11) === 'hiddenpower') move = 'hiddenpower'; // Really big hack :(
				if (!moves[move]) {
					problems.push(set.species + " cannot learn " + set.moves[i] + ".");
				}
			}
			if (problems) return problems;
		},
		onValidateTeam: function(team) {
			let nameTable = {};
			for (let i = 0; i < team.length; i++) {
				let name = team[i].name;
				if (name) {
					if (name === team[i].species) continue;
					if (nameTable[name]) {
						return ["Your Pok&eacute;mon must have different nicknames.", "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
		},
	},
	{ //Thanks urkerab for the Cross Evolution code :)
		name: "[Gen 7] Frantic Fusions LC",
		desc: [
			"&bullet; <a href=https://github.com/XpRienzo/DragonHeaven/blob/master/mods/franticfusions/README.md>Frantic Fusions</a> <br> &bullet; A metagame where you are able to fuse two Pokemon. <BR /> &bullet; The resultant Pokemon has the primary type of the base mon. If the base mon is shiny, it will get the secondary type of the second mon, else the primary type of the second mon. It will get the averaged stats.<br />&bullet;You can choose any ability from the original Pokemon, and you also get the primary ability of the second Pokemon (The one you put in the nickname). <br />&bullet; Use !fuse for theorymonning purposes",
		],
		mod: 'franticfusions',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: ['Cutiefly', 'Drifloon', 'Gligar', 'Gothita', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Yanma', 'Eevium Z', 'Dragon Rage', 'Sonic Boom'],
		onModifyTemplate: function (template, pokemon) {
			let fusionTemplate = this.getTemplate(pokemon.name), mixedTemplate = Object.assign({}, template);
			if (!fusionTemplate.exists) return template;
			try {
				mixedTemplate.baseSpecies = mixedTemplate.species = template.species;
				mixedTemplate.weightkg = Math.max(0.1, (template.weightkg + fusionTemplate.weightkg) / 2)

				mixedTemplate.baseStats = {};
				for (let statid in template.baseStats) {
					mixedTemplate.baseStats[statid] = (template.baseStats[statid] + fusionTemplate.baseStats[statid]) / 2;
				}
				pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

				mixedTemplate.types = template.types.slice();
				let shiny = (pokemon.set.shiny && fusionTemplate.types[1]) ? 1 : 0;
				if (mixedTemplate.types[0] !== fusionTemplate.types[shiny]) mixedTemplate.types[1] = fusionTemplate.types[shiny];
				else mixedTemplate.types.length = 1;
				pokemon.fusion = fusionTemplate.baseSpecies;
				pokemon.abilitwo = toId(fusionTemplate.abilities[0]);
			} catch (e) {
				this.add('-hint', 'Failed to fuse ' + template.species + ' and ' + fusionTemplate.species + '. Please report this error so that it can be fixed.');
			}
			return mixedTemplate;
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let types = pokemon.types;
			if (!pokemon.fusetype) pokemon.fusetype = types;
			else
				pokemon.types = pokemon.fusetype;
			let statusability = {
				"aerilate": true,
				"aurabreak": true,
				"flashfire": true,
				"parentalbond": true,
				"pixilate": true,
				"refrigerate": true,
				"sheerforce": true,
				"slowstart": true,
				"truant": true,
				"unburden": true,
				"zenmode": true
			};
			let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
			if (pokemon.abilitwo !== pokemon.ability) pokemon.addVolatile(sec); //Second Ability! YAYAYAY
			if (pokemon.fusion && !pokemon.hasAbility("illusion")) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
			}
		},
		onAfterMega: function(pokemon)
		{
			if (pokemon.abilitwo !== pokemon.ability) {
				let statusability = {
					"aerilate": true,
					"aurabreak": true,
					"flashfire": true,
					"parentalbond": true,
					"pixilate": true,
					"refrigerate": true,
					"sheerforce": true,
					"slowstart": true,
					"truant": true,
					"unburden": true,
					"zenmode": true
				};
				let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
				pokemon.removeVolatile(sec);
			}
			pokemon.types = pokemon.fusetype;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateSet: function(set, teamHas) {
			let problems = [];
			if (!set.name || set.name === set.species) return;
			let template = this.getTemplate(set.species);
			let fusionTemplate = this.getTemplate(set.name);
			let banlist = {
				"shedinja": true,
				"hugepower": true,
				"purepower": true
			};
			if (!fusionTemplate.exists) return;
			let unobtainable = {
				'Darmanitan-Zen': true,
				'Greninja-Ash': true,
				'Zygarde-Complete': true,
				'Meloetta-Pirouette': true,
				'Castform-Snowy': true,
				'Castform-Sunny': true,
				'Castform-Rainy': true,
				'Aegislash-Blade': true,
			};
			let types = Object.keys(this.data.TypeChart);
			for (let i = 0; i < types.length; i++) {
				unobtainable["Silvally-" + types[i]] = true;
			}
			if (unobtainable[fusionTemplate.species]) problems.push("You cannot fuse with " + fusionTemplate.species + " since it needs to have a specific ability or an item, or transforms inbattle.")
			let canHaveAbility = false;
			if (fusionTemplate.isUnreleased) problems.push("You cannot fuse with a Unreleased Pokemon. (" + set.species + " has nickname " + set.name + ", which is unreleased)");
			if (fusionTemplate.isMega) problems.push("You cannot fuse with a Mega Pokemon. (" + set.species + " has nickname " + set.name + ")");
			if (toId(fusionTemplate.tier).includes("uber")) problems.push("You cannot fuse with an Uber. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			if (toId(fusionTemplate.tier) === "cap" || toId(template.tier) === "cap") problems.push("You cannot fuse with an fake Pokemon. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			if (banlist[toId(fusionTemplate.species)]) problems.push("Fusing with " + fusionTemplate.species + " is banned. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			for (let a in template.abilities) {
				if ((template.abilities[a] === set.ability) && !banlist[toId(template.abilities[a])]) {
					canHaveAbility = true;
				}
			}
			if (!canHaveAbility) return ["" + set.species + " cannot have " + set.ability + "."];
			let added = {};
			let movepool = [];
			let prevo = template.isMega ? this.getTemplate(template.species.substring(0, template.species.length - 5)).prevo : template.prevo;

			if (!this.data.Learnsets[toId(fusionTemplate.species)])
			{
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species.split("-")[0])].learnset;
			}
			else
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species)].learnset;
			if (!template.learnset)
			{
				template.learnset = this.data.Learnsets[toId(template.species.split("-")[0])].learnset;
			}
			else
				template.learnset = this.data.Learnsets[toId(template.species)].learnset;
			do {
				added[template.species] = true;
				movepool = movepool.concat(Object.keys(template.learnset));
				movepool = movepool.concat(Object.keys(fusionTemplate.learnset))
			} while (template && template.species && !added[template.species]);
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			prevo = fusionTemplate.isMega ? this.getTemplate(fusionTemplate.species.substring(0, fusionTemplate.species.length - 5)).prevo : fusionTemplate.prevo;
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			let moves = {};
			for (let kek = 0; kek < movepool.length; kek++) moves[movepool[kek]] = true;
			for (let i in set.moves) {
				let move = toId(set.moves[i]);
				if (move.substr(0, 11) === 'hiddenpower') move = 'hiddenpower'; // Really big hack :(
				if (!moves[move]) {
					problems.push(set.species + " cannot learn " + set.moves[i] + ".");
				}
			}
			if (problems) return problems;
		},
		onValidateTeam: function(team) {
			let nameTable = {};
			for (let i = 0; i < team.length; i++) {
				let name = team[i].name;
				if (name) {
					if (name === team[i].species) continue;
					if (nameTable[name]) {
						return ["Your Pok&eacute;mon must have different nicknames.", "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
		},
	},
		{ //Thanks urkerab for the Cross Evolution code :)
		name: "[Gen 7] Frantic Fusions Doubles",
		desc: [
			"&bullet; <a href=https://github.com/XpRienzo/DragonHeaven/blob/master/mods/franticfusions/README.md>Frantic Fusions</a> <br> &bullet; A metagame where you are able to fuse two Pokemon. <BR /> &bullet; The resultant Pokemon has the primary type of the base mon. If the base mon is shiny, it will get the secondary type of the second mon, else the primary type of the second mon. It will get the averaged stats.<br />&bullet;You can choose any ability from the original Pokemon, and you also get the primary ability of the second Pokemon (The one you put in the nickname). <br />&bullet; Use !fuse for theorymonning purposes",
		],
		mod: 'franticfusions',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
		onModifyTemplate: function (template, pokemon) {
			let fusionTemplate = this.getTemplate(pokemon.name), mixedTemplate = Object.assign({}, template);
			if (!fusionTemplate.exists) return template;
			try {
				mixedTemplate.baseSpecies = mixedTemplate.species = template.species;
				mixedTemplate.weightkg = Math.max(0.1, (template.weightkg + fusionTemplate.weightkg) / 2)

				mixedTemplate.baseStats = {};
				for (let statid in template.baseStats) {
					mixedTemplate.baseStats[statid] = (template.baseStats[statid] + fusionTemplate.baseStats[statid]) / 2;
				}
				pokemon.hp = pokemon.maxhp = Math.floor(Math.floor(2 * mixedTemplate.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] >> 2) + 100) * pokemon.level / 100 + 10);

				mixedTemplate.types = template.types.slice();
				let shiny = (pokemon.set.shiny && fusionTemplate.types[1]) ? 1 : 0;
				if (mixedTemplate.types[0] !== fusionTemplate.types[shiny]) mixedTemplate.types[1] = fusionTemplate.types[shiny];
				else mixedTemplate.types.length = 1;
				pokemon.fusion = fusionTemplate.baseSpecies;
				pokemon.abilitwo = toId(fusionTemplate.abilities[0]);
			} catch (e) {
				this.add('-hint', 'Failed to fuse ' + template.species + ' and ' + fusionTemplate.species + '. Please report this error so that it can be fixed.');
			}
			return mixedTemplate;
		},
		onSwitchInPriority: 1,
		onSwitchIn: function(pokemon) {
			let types = pokemon.types;
			if (!pokemon.fusetype) pokemon.fusetype = types;
			else
				pokemon.types = pokemon.fusetype;
			let statusability = {
				"aerilate": true,
				"aurabreak": true,
				"flashfire": true,
				"parentalbond": true,
				"pixilate": true,
				"refrigerate": true,
				"sheerforce": true,
				"slowstart": true,
				"truant": true,
				"unburden": true,
				"zenmode": true
			};
			let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
			if (pokemon.abilitwo !== pokemon.ability) pokemon.addVolatile(sec); //Second Ability! YAYAYAY
			if (pokemon.fusion && !pokemon.hasAbility("illusion")) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[silent]');
			}
		},
		onAfterMega: function(pokemon)
		{
			if (pokemon.abilitwo !== pokemon.ability) {
				let statusability = {
					"aerilate": true,
					"aurabreak": true,
					"flashfire": true,
					"parentalbond": true,
					"pixilate": true,
					"refrigerate": true,
					"sheerforce": true,
					"slowstart": true,
					"truant": true,
					"unburden": true,
					"zenmode": true
				};
				let sec = (statusability[pokemon.abilitwo]) ? ("other" + pokemon.abilitwo) : (pokemon.abilitwo);
				pokemon.removeVolatile(sec);
			}
			pokemon.types = pokemon.fusetype;
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateSet: function(set, teamHas) {
			let problems = [];
			if (!set.name || set.name === set.species) return;
			let template = this.getTemplate(set.species);
			let fusionTemplate = this.getTemplate(set.name);
			let banlist = {
				"shedinja": true,
				"hugepower": true,
				"purepower": true
			};
			if (!fusionTemplate.exists) return;
			let unobtainable = {
				'Darmanitan-Zen': true,
				'Greninja-Ash': true,
				'Zygarde-Complete': true,
				'Meloetta-Pirouette': true,
				'Castform-Snowy': true,
				'Castform-Sunny': true,
				'Castform-Rainy': true,
				'Aegislash-Blade': true,
			};
			let types = Object.keys(this.data.TypeChart);
			for (let i = 0; i < types.length; i++) {
				unobtainable["Silvally-" + types[i]] = true;
			}
			if (unobtainable[fusionTemplate.species]) problems.push("You cannot fuse with " + fusionTemplate.species + " since it needs to have a specific ability or an item, or transforms inbattle.")
			let canHaveAbility = false;
			if (fusionTemplate.isUnreleased) problems.push("You cannot fuse with a Unreleased Pokemon. (" + set.species + " has nickname " + set.name + ", which is unreleased)");
			if (fusionTemplate.isMega) problems.push("You cannot fuse with a Mega Pokemon. (" + set.species + " has nickname " + set.name + ")");
			if (toId(fusionTemplate.tier).includes("uber")) problems.push("You cannot fuse with an Uber. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			if (toId(fusionTemplate.tier) === "cap" || toId(template.tier) === "cap") problems.push("You cannot fuse with an fake Pokemon. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			if (banlist[toId(fusionTemplate.species)]) problems.push("Fusing with " + fusionTemplate.species + " is banned. (" + template.species + " has nickname " + fusionTemplate.species + ")");
			for (let a in template.abilities) {
				if ((template.abilities[a] === set.ability) && !banlist[toId(template.abilities[a])]) {
					canHaveAbility = true;
				}
			}
			if (!canHaveAbility) return ["" + set.species + " cannot have " + set.ability + "."];
			let added = {};
			let movepool = [];
			let prevo = template.isMega ? this.getTemplate(template.species.substring(0, template.species.length - 5)).prevo : template.prevo;

			if (!this.data.Learnsets[toId(fusionTemplate.species)])
			{
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species.split("-")[0])].learnset;
			}
			else
				fusionTemplate.learnset = this.data.Learnsets[toId(fusionTemplate.species)].learnset;
			if (!template.learnset)
			{
				template.learnset = this.data.Learnsets[toId(template.species.split("-")[0])].learnset;
			}
			else
				template.learnset = this.data.Learnsets[toId(template.species)].learnset;
			do {
				added[template.species] = true;
				movepool = movepool.concat(Object.keys(template.learnset));
				movepool = movepool.concat(Object.keys(fusionTemplate.learnset))
			} while (template && template.species && !added[template.species]);
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			prevo = fusionTemplate.isMega ? this.getTemplate(fusionTemplate.species.substring(0, fusionTemplate.species.length - 5)).prevo : fusionTemplate.prevo;
			while (prevo)
			{
				movepool = movepool.concat(Object.keys(this.data.Learnsets[prevo].learnset));
				prevo = this.getTemplate(prevo).prevo;
			}
			let moves = {};
			for (let kek = 0; kek < movepool.length; kek++) moves[movepool[kek]] = true;
			for (let i in set.moves) {
				let move = toId(set.moves[i]);
				if (move.substr(0, 11) === 'hiddenpower') move = 'hiddenpower'; // Really big hack :(
				if (!moves[move]) {
					problems.push(set.species + " cannot learn " + set.moves[i] + ".");
				}
			}
			if (problems) return problems;
		},
		onValidateTeam: function(team) {
			let nameTable = {};
			for (let i = 0; i < team.length; i++) {
				let name = team[i].name;
				if (name) {
					if (name === team[i].species) continue;
					if (nameTable[name]) {
						return ["Your Pok&eacute;mon must have different nicknames.", "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
		},
	},
{
		section: "Istor",
		column: 4,
	},
	{
		name: "[Istor] OU",
		mod: 'istor',
		desc: [
			"&bullet; A new region with new Pokemon, Moves, Abilities and a lot more",
			"&bullet; <a href=\"https://github.com/XpRienzo/DragonHeaven/blob/master/mods/istor/README.md\">Istor</a>",
			"&bullet; Use /distor (Pokemon/Item/Ability/Move) and /learnistor (Pokemon), (Move) for more info",
		],
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause', 'Freeze Clause Mod'],
		banlist: ['Uber', 'Uber', 'Power Construct', 'Shadow Tag'],
	},
	{
		name: "[Istor] Doubles OU",

		mod: 'istor',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview', 'Freeze Clause Mod'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	},
	{
		name: "[Istor] Random Battle",

		mod: 'istor',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Freeze Clause Mod'],
	},
	{
		name: "[Istor] Random Doubles Battle",

		mod: 'istor',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Istor] Balanced Hackmons",

		mod: 'istor',
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Chatter', 'Extreme Evoboost'],
	},
	{
		section: "Fakemon",
		column: 4,
	},
	{
		name: "[Fakemon] Random Battle",
		mod: 'fakemon',
		team: 'randomFotW',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Freeze Clause Mod'],
		fotw: "Mechroarmancer",
	},
	// Let's Go!
	///////////////////////////////////////////////////////////////////

	{
		section: "Let's Go!",
		column: 4,
	},
	{
		name: "[Gen 7 Let's Go] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3644015/">LGPE OverUsed</a>`,
		],

		mod: 'letsgo',
		forcedLevel: 50,
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Evasion Moves Clause', 'OHKO Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Uber'],
	},
	{
		name: "[Gen 7 Let's Go] Singles No Restrictions",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3643931/">Let's Go! Discussion</a>`,
		],

		mod: 'letsgo',
		ruleset: ['Pokemon', 'Allow AVs', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},
	{
		name: "[Gen 7 Let's Go] Doubles No Restrictions",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3643931/">Let's Go! Discussion</a>`,
		],

		mod: 'letsgo',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Allow AVs', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},

];
