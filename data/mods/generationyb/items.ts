export const Items: {[itemid: string]: ModdedItemData} = {
// Gen 9 Items
	abilityshield: {
		name: "Ability Shield",
		spritenum: 0, // TODO
		ignoreKlutz: true,
		// Neutralizing Gas protection implemented in Pokemon.ignoringAbility() within sim/pokemon.ts
		// and in Neutralizing Gas itself within data/abilities.ts
		onSetAbility(ability, target, source, effect) {
			if (effect && effect.effectType === 'Ability' && effect.name !== 'Trace') {
				this.add('-ability', source, effect);
			}
			this.add('-block', target, 'item: Ability Shield');
			return null;
		},
		// Mold Breaker protection implemented in Battle.suppressingAbility() within sim/battle.ts
		num: 1881,
		gen: 8,
	},
	clearamulet: {
		name: "Clear Amulet",
		spritenum: 0, // TODO
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add('-fail', target, 'unboost', '[from] item: Clear Amulet', '[of] ' + target);
			}
		},
		num: 1882,
		gen: 8,
	},
	mirrorherb: {
		name: "Mirror Herb",
		fling: {
			basePower: 10,
		},
		spritenum: 0, // TODO
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Mirror Herb') return;
			const boostPlus: SparseBoostsTable = {};
			let statsRaised = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					boostPlus[i] = boost[i];
					statsRaised = true;
				}
			}
			if (!statsRaised) return;
			const pokemon: Pokemon = this.effectData.target;
			pokemon.useItem();
			this.boost(boostPlus, pokemon);
		},
		num: 1883,
		gen: 8,
	},
	punchingglove: {
		name: "Punching Glove",
		spritenum: 0, // TODO
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Punching Glove boost');
				return this.chainModify([4506, 4096]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['punch']) delete move.flags['contact'];
		},
		num: 1884,
		gen: 8,
	},
	covertcloak: {
		name: "Covert Cloak",
		fling: {
			basePower: 10,
		},
		spritenum: 0, // TODO
		onModifySecondaries(secondaries) {
			this.debug('Covert Cloak prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		num: 1885,
		gen: 8,
	},
	loadeddice: {
		name: "Loaded Dice",
		spritenum: 0, // TODO
		// partially implemented in sim/battle-actions.ts:BattleActions#hitStepMoveHitLoop
		onModifyMove(move) {
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
		num: 1886,
		gen: 8,
	},
	boosterenergy: {
		name: "Booster Energy",
		spritenum: 0, // TODO
		onUpdate(pokemon) {
			if (pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;

			if (pokemon.hasAbility('protosynthesis') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('quarkdrive') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.addVolatile('quarkdrive');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
		num: 1880,
		gen: 9,
	},

// Regular Items
	blunderpolicy: {
		name: "Blunder Policy",
		spritenum: 716,
		fling: {
			basePower: 80,
		},
		onUpdate(pokemon) {
			if (pokemon.moveThisTurnResult === false) {
				this.boost({spe: 2});
				pokemon.useItem();
			}
		},
		// Item activation located in scripts.js
		num: 1121,
		gen: 8,
		desc: "+2 Speed if the holder's move fails. Single use.",
	},
	weatherballoon: {
		name: "Weather Balloon",
		spritenum: 249,
		fling: {
			basePower: 30,
		},
		onModifyDamage(damage, source, target, move) {
			if (this.field.isWeather('snow') || this.field.isWeather('raindance') || this.field.isWeather('sunnyday') || this.field.isWeather('sandstorm')) {
				return this.chainModify(1.2);
			}
		},
		gen: 8,
		desc: "This Pokemon's moves deal 1.2x damage in any weather.",
	},
	firstaidkit: {
		name: "First-Aid Kit",
		spritenum: 249,
		fling: {
			basePower: 80,
		},
		onDamage(damage, target, source, effect) {
			if (effect && (effect.id === 'brn' || effect.id === 'tox' || effect.id === 'psn' || effect.id === 'frz')) {
				return damage / 2;
			}
		},
		gen: 8,
		desc: "Halves damage taken from burn and poison.",
	},
	ruthlessribbon: {
		name: "Ruthless Ribbon",
		spritenum: 249,
		fling: {
			basePower: 10,
		},
		onModifyDamage(damage, source, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				return this.chainModify([5324, 4096]);
			}
		},
		gen: 8,
		desc: "This Pokemon's moves deal 1.3x damage to targets afflicted with a status condition.",
	},
	sandysupplement: {
		name: "Sandy Supplement",
		spritenum: 385,
		fling: {
			basePower: 70,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hasType('Rock')) {
				this.heal(pokemon.baseMaxhp / 16);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0 && target.hasType('Rock')) {
				this.debug('Sandy Supplement neutralize');
				return this.chainModify(0.75);
			}
		},
		gen: 8,
		desc: "Rock-types: Heal 1/16 of their max HP every turn and take 0.75x damage from super effective moves.",
	},
	headphones: {
		name: "Headphones",
		spritenum: 0, // TODO
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Headphones boost');
				return this.chainModify([4506, 4096]);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['sound']) {
				this.add('-immune', target, '[from] item: Headphones');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectData.target, '[from] item: Headphones');
			}
		},
		desc: "Holder's sound-based attacks have 1.1x power and the user is immune to sound moves.",
		gen: 8,
	},
	windshieldwipers: {
		name: "Windshield Wipers",
		spritenum: 385,
		fling: {
			basePower: 90,
		},
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				for (const side of [pokemon.side, ...pokemon.side.foeSidesWithConditions()]) {
					if (side.getSideCondition(sideCondition)) {
						if (!activated) {
							this.add('-activate', pokemon, 'item: Windshield Wipers');
							activated = true;
						}
						side.removeSideCondition(sideCondition);
						pokemon.useItem();
					}
				}
			}
		},
		gen: 8,
		desc: "On switch-in, this Pokemon removes screens from both sides of the field and the item is consumed.",
	},


// Link Braces
/*
	linkbrace: {
		name: "Link Brace",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			this.add('-item', pokemon, 'Link Brace');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			this.add('-message', `${pokemon.name}'s Link Brace turned it into a ${species.types[0]}-type!`);
		},
		onModifySpeciesPriority: 2,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			const types = [...new Set(target.baseMoveSlots.slice(0, 1).map(move => this.dex.moves.get(move.id).type))];
			return {...species, types: types};
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] ability: Oblivious');
				return null;
			}
		},
		num: -1000,
		gen: 9,
		desc: "Changes the user's type to that of its first move. 1.2x power on STAB moves.",
	},	
*/
	linkbrace: {
		name: "Link Brace",
		spritenum: 658,
		onTakeItem: false,
		onSwitchIn(pokemon) {
			this.add('-item', pokemon, 'Link Brace');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			this.useMove("Conversion", pokemon);
			this.add('-message', `${pokemon.name}'s Link Brace changed its type!`);
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.hasType(move.type) && !move.priority > 0.1) {
				return this.chainModify(1.2);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Link Brace');
				return null;
			}
		},
		num: -1000,
		gen: 8,
		desc: "Changes the user's type to that of its first move. 1.2x power on STAB moves.",
	},	
// Will add Signature Link Braces after testing
	
	
};
