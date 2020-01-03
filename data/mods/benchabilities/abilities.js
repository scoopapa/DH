'use strict';

/**@type {{[k: string]: AbilityData}} */

let precociousPupae = { 'kakuna', 'metapod', 'silcoon', 'cascoon', 'spewpa' };
let BattleAbilities = {

	"confidenceboost": { // Machamp line, Victini, Plusle, Florges
		desc: "If an active teammate has a stat lowered, raise it's highest stat by one stage.",
		shortDesc: "If an active teammate has a stat lowered, raise it's highest stat by one stage.",
		onAfterEachBoost(boost, target, source) {
			if (!source || target.side === source.side) {
				return;
			}
			let statsLowered = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				let statName = 'atk';
				let bestStat = 0;
				/** @type {StatNameExceptHP} */
				let s;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, target);
			}
		},
		id: "confidenceboost",
		name: "Confidence Boost",
	},

	"protectivepowder": { // Vivillon, Cutiefly line
		shortDesc: "Allied Bug types use Powder on switch in.",
		onSwitchIn(source) { 
            if (source.hasType('Bug')) {
				this.useMove("Powder", source);
             }
		},
		id: "protectivepowder",
		name: "Protective Powder",
	},
	"arcticarmor": { // Walrein line, Lapras, Rotom-Frost, Kyurem
		shortDesc: "Allied Ice types summon Mist upon switching in. Aurora Veil now lasts 8 turns.", // Edit in Aurora Veil's moves.js code
		onSwitchIn(source) { 
			if (source.hasType('Ice')) {
				this.useMove("Mist", source);
			}
		},
		id: "arcticarmor",
		name: "Arctic Armor",
	},
	"heavyexpert": {
		shortDesc: "Allies' Rock and Steel-type moves have 100% base accuracy.",
		onAllyModifyMove(move) {
			if (move.type ==='Rock' || move.type === 'Steel') {
				move.accuracy = 100;
			}
		},
		id: "heavyexpert",
		name: "Heavy Expert",
	},
	"oceansblessing": { // Lumineon, Alomomola, Mantine, Manaphy, Phione
		shortDesc: "This Pokemon’s allies have the Aqua Ring effect added to them.",
		onSwitchIn(pokemon) { 
			pokemon.addVolatile("aquaring");
		},
		id: "oceansblessing",
		name: "Ocean's Blessing",
	},
	
	"spookyencounter": {
		shortDesc: "Allied Dark-types force the opponent to always be tormented.",
		onSwitchIn(pokemon) { 
			if (pokemon.hasType('Dark')) {
				for (const target of pokemon.side.foe.active) {
					target.addVolatile("torment");
				}
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hasType('Dark')) {
				for (const target of pokemon.side.foe.active) {
					target.addVolatile('torment');
				}
			}
		},
	},
	"handoff": { // Aipom, Ambipom
		shortDesc: "When an ally consumes their held item, this pokemon gives its item to them.",
		onAfterUseItem(item, pokemon) {
			// if (pokemon !== this.effectData.target) return;
			let battle = pokemon.battle;
			let sideID = pokemon.side.id;
			let allyBench = battle.benchPokemon[ sideID ];
			for (let i = 0; i < 6; i++ ) {
				let pkmnInfo = allyBench[ i ]
				if ( pkmnInfo && pkmnInfo.ability === 'handoff' && pkmnInfo.item !== '' ) {
					pokemon.setItem( pkmnInfo.item )
					pkmnInfo.item = ''
					this.add('-ability', pokemon, 'Hand Off');
					this.add( '-message', pkmnInfo.name + ' gave its item to ' + pokemon.name + '!' )
					break
				}
			}
		},
		id: "handoff",
		name: "Hand Off",
	},
	"torrentialwill": { // Blastoise, Feraligatr, Swampert, Empoleon, Samurott, Simipour, Greninja, Primarina
		shortDesc: "Grass Pledge and Fire Pledge deal 30% more damage and summon the swamp or rainbow combo effects, respectively.",
		onBasePower(move) {
			if ( move.id === 'firepledge' || move.id === 'grasspledge' ){
				return this.chainModify( 1.3 )
			}
		},
		onSourceHit(target, source, move) {
			if ( move.id === 'firepledge' ){
				source.side.addSideCondition('waterpledge');
			}
			if ( move.id === 'grasspledge' ){
				target.side.addSideCondition('grasspledge');
			}
		},
		id: "torrentialwill",
		name: "Torrential Will",
	},
	"overgrowingwill": { // All Grass starters
		shortDesc: "Water Pledge and Fire Pledge deal 30% more damage and summon the swamp or inferno combo effects, respectively.",
		onBasePower(move) {
			if ( move.id === 'firepledge' || move.id === 'grasspledge' ){
				return this.chainModify( 1.3 )
			}
		},
		onSourceHit(target, source, move) {
			if ( move.id === 'firepledge' ){
				target.side.addSideCondition('firepledge');
			}
			if ( move.id === 'waterpledge' ){
				target.side.addSideCondition('grasspledge');
			}
		},
		id: "overgrowingwill",
		name: "Overgrowing Will",
	},
	"blazingwill": { // All Fire starters
		shortDesc: "Grass Pledge and Water Pledge deal 30% more damage and summon the inferno or rainbow combo effects, respectively.",
		onBasePower(move) {
			if ( move.id === 'firepledge' || move.id === 'grasspledge' ){
				return this.chainModify( 1.3 )
			}
		},
		onSourceHit(target, source, move) {
			if ( move.id === 'waterpledge' ){
				source.side.addSideCondition('waterpledge');
			}
			if ( move.id === 'grasspledge' ){
				target.side.addSideCondition('firepledge');
			}
		},
		id: "blazingwill",
		name: "Blazing Will",
	},
	"guardianangel": { // Ralts, Kirlia, Gardevoir, Togepi, Togetic, Togekiss
		shortDesc: "This pokemon's allies take 50% damage from direct attacks when switching in.",
		onDamage(damage, target, source, move) { 
			if (move.effectType === 'Move' && !target.activeTurns ) {
				return damage * 0.75;
			}
		},
		id: "guardianangel",
		name: "Guardian Angel",
	},
	"retroracer": {
		shortDesc: "This Pokemon's allies with 110 base speed or higher get +1 crit ratio if they are faster than their opponent.",
		onModifyCritRatio( critRatio, pokemon, target ) {
			if ( pokemon.template.baseStats.spe >= 110 && pokemon.storedStats.spe > target.storedStats.spe ){
				return critRatio + 1;
			}
		},
		id: "retroracer",
		name: "Retro Racer",
		rating: 1.5,
		num: 105,
	},
	"omnimorph": {
		desc: "Allies who share a type with this ability's user have their Normal moves changed to this Pokemon’s type.",
		shortDesc: "Allies who share a type with this ability's user have their Normal moves changed to this Pokemon’s type.",
		onModifyMovePriority: -1,
		onModifyMove(move, pokemon) {
			let battle = pokemon.battle;
			let pkmnInfo = battle.benchPokemon.getPKMNInfo( 'omnimorph', pokemon.side );
			let newType = ''
			for ( let i = 0; i < 2; i++ ) {
				if ( pkmnInfo.types[i] && pokemon.types.includes( pkmnInfo.types[i] ) ){
					newType = pkmnInfo.types[i]
				}
			}
			
			if ( pkmnInfo 
				&& newType !== ''
				&& move.type === 'Normal' 
				&& !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) 
				&& !(move.isZ && move.category !== 'Status'))
			{
				move.type = newType;
			}
			console.log( battle.benchPokemon )
		},
		id: "omnimorph",
		name: "Omnimorph",
		rating: 4,
		num: 185,
	},
	"bombshelter": { // Natu, Xatu, Sigilyph, Chespin, Quilladin, Jangmo-o, Hakamo-o, Kommo-o, Octillery
		shortDesc: "This Pokemon’s allies are at worst neutral to Stealth Rock.",
		onDamage(damage, target, source, move) { 
			let maxDamage = ( target.maxhp / 8 )
			if ( move.id === 'stealthrock' && damage > maxDamage ) {
				return maxDamage;
			}
		},
		id: "bombshelter",
		name: "Bomb Shelter",
	},
	"crystalize": {
		desc: "This pokemon's Rock-type allies take 40% less damage from Water-, Grass-, and Fighting-type moves.",
		shortDesc: "This pokemon's Rock-type allies take 40% less damage from Water-, Grass-, and Fighting-type moves.",
		onDamage(damage, target, source, move) { 
			if ( move.effectType === 'Move'
				&& target.types.includes( "Rock" )
				&& ( move.type === 'Grass' || move.type === 'Water' || move.type === 'Fighting' ))
			{
				return damage * .6;
			}
		},
		id: "crystalize",
		name: "Crystalize",
		rating: 3.5,
		num: 47,
	},
	"ancientawakening": {
		desc: "This pokemon's Rock-type allies take 40% less damage from Water-, Grass-, and Fighting-type moves.",
		shortDesc: "This pokemon's Rock-type allies take 40% less damage from Water-, Grass-, and Fighting-type moves.",
		onUpdate( pokemon ){
			let fossilPokemon = [ 'kabuto', 'kabutops', 'omanyte', 'omastar', 'aerodactyl', 'anorith', 'armaldo', 'lileep', 'cradily', 'cranidos', 'rampardos', 'shieldon', 'bastiodon', 'tirtouga', 'carracosta', 'archen', 'archeops', 'tyrunt', 'tyrantrum', 'amaura', 'aurorus', 'aerodactylmega' ];
			if ( !pokemon.highestStats && fossilPokemon.includes( pokemon.speciesid )) {
				let statnames = [ 'atk', 'def', 'spa', 'spd', 'spe' ];
				pokemon.highestStats = [];
				pokemon.highestStats[0] = '';
				let bestStat = 0;
				for ( let i = 0; i < 2; i++) {
					for ( let j = 0; j < 5; j++) {
						let statName = statnames[j];
						if ( pokemon.storedStats[ statName ] > bestStat && pokemon.highestStats[0] !== statName) {
							bestStat = pokemon.storedStats[ statName ];
							pokemon.highestStats[i] = statName;
						}
					}
					bestStat = 0;
				}
				pokemon.AABoost = function( statName, stat, pkmn ) {
					if ( pkmn.highestStats[0] === statName || pkmn.highestStats[1] === statName ) {
						return stat * 1.3
					}
				}	
			}
		},
		onModifyAtk(stat, pokemon) {
			if ( pokemon.highestStats ) { 
				return pokemon.AABoost( 'atk', stat, pokemon );
			}
		},
		onModifyDef(stat, pokemon) {
			if ( pokemon.highestStats ) { 
				return pokemon.AABoost( 'def', stat, pokemon );
			}
		},
		onModifySpA(stat, pokemon) {
			if ( pokemon.highestStats ) { 
				return pokemon.AABoost( 'spa', stat, pokemon );
			}
		},
		onModifySpD(stat, pokemon) {
			if ( pokemon.highestStats ) { 
				return pokemon.AABoost( 'spd', stat, pokemon );
			}
		},
		onModifySpe(stat, pokemon) {
			if ( pokemon.highestStats ) { 
				return pokemon.AABoost( 'spe', stat, pokemon );
			}
		},
		id: "ancientawakening",
		name: "Ancient Awakening",
		rating: 3.5,
		num: 47,
	},
	"miraclefluff": {
		desc: "This Pokemon receives 80% damage from attacks with secondary effects.",
		shortDesc: "This Pokemon takes 1/2 damage from contact moves, 2x damage from Fire moves.",
		onDamage(damage, target, source, move) { 
			let mod = 1;
			if (move.secondaries && ( target.template.baseStats.def >= 100 || target.template.baseStats.spd >= 100 )) mod = 0.8;
			return this.chainModify(mod);
		},
		id: "miraclefluff",
		name: "Miracle Fluff",
		rating: 2.5,
		num: 218,
	},
	"knighthood": {
		desc: "This Pokemon receives 80% damage from attacks with secondary effects.",
		shortDesc: "This Pokemon takes 1/2 damage from contact moves, 2x damage from Fire moves.",
		onDamage(damage, target, source, move) { 
			if ( target.knighthood && target.types.includes( "Fighting" )) { 
				this.boost({["def"]: 1, ["spd"]: 1}, target);
				target.knighthood = false
			}
		},
		onSwitchIn( pokemon ) {
			pokemon.knighthood = true;
		},
		id: "knighthood",
		name: "Knighthood",
		rating: 2.5,
		num: 218,
	},
	"hibernation": {
		desc: "This Pokemon cannot be statused, and is considered to be asleep. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "This Pokemon cannot be statused, and is considered to be asleep.",
		onBasePowerPriority: 7,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (this.effectData.target !== defender) return;
			if (move.type === 'Ice') {
				return this.chainModify(2);
			}
		},
		isUnbreakable: true,
		id: "hibernation",
		name: "Hibernation",
		rating: 3,
		num: 213,
	},
	"sinisterescort": {
		desc: "This Pokemon blocks certain status moves and instead uses the move against the original user.",
		shortDesc: "This Pokemon blocks certain status moves and bounces them back to the user.",
		id: "sinisterescort",
		name: "Sinister Escort",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			let battle = source.battle
			if ( target === source || move.hasBounced || move.type !== 'Dark' || battle.benchPokemon.sEscortUsed ) {
				return;
			}
			battle.benchPokemon.sEscortUsed = true;
			this.add('-ability', target, 'Sinister Escort');
			let pkmnInfo = battle.benchPokemon.getPKMNInfo( 'sinisterescort', target.side );
			this.add( '-message', pkmnInfo.name + ' reflected the attack!' )
			let newMove = this.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, source, source);
			return null;
		},
		effect: {
			duration: 1,
		},
		rating: 4.5,
		num: 156,
	},
	"dragonfocus": {
		shortDesc: "Draco Meteor and Outrage are drawback free, but 10% less powerful.",
		onAllyModifyMove(move) {
			if ( move.name ==='Draco Meteor' || move.name === 'Outrage' ) {
				move.basePower = move.basePower * 0.9;
				move.self = null;
				move.onAfterMove = null;
			}
		},
		id: "dragonfocus",
		name: "Dragon Focus",
	},
	"windtunnel": { 
		shortDesc: "Allied Flying types set Delta Stream on switch in.",
		onSwitchIn(source) { 
            
		},desc: "On switch-in, the weather becomes strong winds that remove the weaknesses of the Flying type from Flying-type Pokemon. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by Desolate Land or Primordial Sea.",
		shortDesc: "On switch-in, strong winds begin until this Ability is not active in battle.",
		onStart(source) {
			if (source.hasType('Flying')) {
				this.field.setWeather('deltastream');
			}
		},
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'deltastream' && !['desolateland', 'primordialsea', 'deltastream'].includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherData.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('deltastream')) {
					this.field.weatherData.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		onAllyModifyMove(move) {
			if ( move.name ==='Sky Attack' ) {
				move.onTryMove = null;
				move.flags.charge = null;
			}
		},
		id: "windtunnel",
		name: "Wind Tunnel",
	},
	"precociouspupae": {
		desc: "This Pokemon's Speed is raised by 1 stage at the end of each full turn it has been on the field.",
		shortDesc: "This Pokemon's Speed is raised 1 stage at the end of each full turn on the field.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns && precociousPupae.includes(pokemon.speciesid) {
				this.boost({
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				});
			}
		},
		id: "precociouspupae",
		name: "Precocious Pupae",
		rating: 4.5,
		num: 3,
	},
};

exports.BattleAbilities = BattleAbilities;
