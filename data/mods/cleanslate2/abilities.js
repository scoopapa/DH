'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	"powerspot": {
		shortDesc: "This Pokemon and it's allies have the base power of their moves multiplied by 1.3.",
		onAllyBasePowerPriority: 8,
		onAllyBasePower(basePower, attacker, defender, move) {
			this.debug('Power Spot boost');
			return this.chainModify([0x14CD, 0x1000]);
		},
		id: "powerspot",
		name: "Power Spot",
		rating: 0,
		num: 249,
	},
	"zephyr": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Inner Focus, Oblivious, Own Tempo, Scrappy, and Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon applies the Fairy Lock status to the target.",
		onStart( pokemon ){
			pokemon.zephyr = true;
		},
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && this.isAdjacent(pokemon, this.effectData.target) && pokemon.zephyr ) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source) || !pokemon.zephyr) return;
			if (!pokemon.hasAbility('shadowtag')) {
				pokemon.maybeTrapped = true;
			}
		},
		onBeforeMove(pokemon){
			pokemon.zephyr = false;
		},
		id: "zephyr",
		name: "Zephyr",
		rating: 3.5,
		num: 22,
	},
	"grounding": {
		desc: "This Pokemon is immune to Grounding-type moves and raises its Special Attack by 1 stage when hit by an Grounding-type move. If this Pokemon is not the target of a single-target Electric-type move used by another Pokemon, this Pokemon redirects that move to itself if it is within the range of that move.",
		shortDesc: "This Pokemon draws Ground moves to itself to raise Sp. Atk by 1; Grounding immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Grounding');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Ground' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			if (this.validTarget(this.effectData.target, source, move.target)) {
				if (this.effectData.target !== target) {
					this.add('-activate', this.effectData.target, 'ability: Grounding');
				}
				return this.effectData.target;
			}
		},
		id: "grounding",
		name: "Grounding",
		rating: 3,
		num: 32,
	},
	"humidifier": {
		desc: "If Rain Dance is active, this Pokemon's Fire-type attacks have their power multiplied by 1.3.",
		shortDesc: "This Pokemon's Fire attacks do 1.5x in Rain.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('raindance')) {
				if (move.type === 'Fire') {
					this.debug('Humidifier boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		id: "humidifier",
		name: "Humidifier",
		rating: 2,
		num: 159,
	},
};

exports.BattleAbilities = BattleAbilities;
