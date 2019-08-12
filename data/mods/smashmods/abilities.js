'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	"unbreakable": {
		desc: "This Pokemon is immune to punch moves.",
		shortDesc: "Makes user immune to punch moves",
		onTryHit: function (pokemon, target, move) {
			if (move.flags['punch']) {
				this.add('-immune', pokemon, '[from] ability: Unbreakable');
				return null;
			}
		},
		id: "unbreakable",
		name: "Unbreakable",
		rating: 3.5,
		num: 171,
	},
	"dewdrink": {
		desc: "This Pokemon is immune to Water-type moves and raises its Attack by 1 stage when hit by a Water-type move.",
		shortDesc: "This Pokemon's Attack is raised 1 stage if hit by a Water move; Water immunity.",
		onTryHitPriority: 1,
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Dew Drink');
				}
				return null;
			}
		},
		onAllyTryHitSide: function (target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Water') {
				this.boost({atk: 1}, this.effectData.target);
			}
		},
		id: "dewdrink",
		name: "Dew Drink",
		rating: 3.5,
		num: 157,
	},
	"dragonslayer": {
		desc: "If a Pokemon uses a Dragon-type attack against this Pokemon, that Pokemon's attacking stat is halved when calculating the damage to this Pokemon.",
		shortDesc: "The user deals double damage to Dragon-type Pokemon and takes half damage from Dragon-type attacks.",
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon Slayer weaken');
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon Slayer weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, attacker, defender) {
			if (target.hasType('Dragon')) {
				this.debug('Dragon Slayer boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA: function (atk, attacker, defender) {
			if (target.hasType('Dragon')) {
				this.debug('Dragon Slayer boost');
				return this.chainModify(2);
			}
		},
		id: "dragonslayer",
		name: "Dragon Slayer",
		rating: 3.5,
		num: 47,
	},
	"schooling": {
		desc: "On switch-in, if this Pokemon is a Wishiwashi that is level 20 or above and has more than 1/4 of its maximum HP left, it changes to School Form. If it is in School Form and its HP drops to 1/4 of its maximum HP or less, it changes to Solo Form at the end of the turn. If it is in Solo Form and its HP is greater than 1/4 its maximum HP at the end of the turn, it changes to School Form.",
		shortDesc: "If user is Wishiwashi, changes to School Form if it has > 1/4 max HP, else Solo Form.",
		onStart: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed) return;
			if ((pokemon.hp > pokemon.maxhp / 4) || (pokemon.hasItem('graduationscale'))) {
				if (pokemon.template.speciesid === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
					if (pokemon.hasItem('graduationscale')) {
						let oldAbility = pokemon.setAbility('intimidate', pokemon, 'intimidate', true);
						if (oldAbility) {
							this.add('-activate', pokemon, 'ability: Intimidate', oldAbility, '[of] ' + pokemon);
						}
					}
				}
			} else {
				if (pokemon.template.speciesid === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		onResidualOrder: 27,
		onResidual: function (pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed || !pokemon.hp) return;
			if ((pokemon.hp > pokemon.maxhp / 4) || (pokemon.hasItem('graduationscale'))) {
				if (pokemon.template.speciesid === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
					if (pokemon.hasItem('graduationscale')) {
						let oldAbility = pokemon.setAbility('intimidate', pokemon, 'intimidate', true);
						if (oldAbility) {
							this.add('-activate', pokemon, 'ability: Intimidate', oldAbility, '[of] ' + pokemon);
						}
					}
				}
			} else {
				if (pokemon.template.speciesid === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		id: "schooling",
		name: "Schooling",
		rating: 3,
		num: 208,
	},
	"ultimatescout": {
		shortDesc: "On switch-in, this Pokemon identifies the held items of all opposing Pokemon.",
		onStart: function (pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Ultimate Scout', '[of] ' + pokemon, '[identify]');
				}
			}
			if (this.activeMove && this.activeMove.id === 'skillswap') return;
			let target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				pokemon.transformInto(target, pokemon, this.getAbility('ultimatescout'));
			}
		},
		id: "ultimatescout",
		name: "Ultimate Scout",
		rating: 1.5,
		num: 119,
	},
};

exports.BattleAbilities = BattleAbilities;
