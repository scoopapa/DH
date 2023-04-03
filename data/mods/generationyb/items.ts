export const Items: {[itemid: string]: ModdedItemData} = {
/*
	// Link Brace	
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
*/
	
	abilityprism: {
		name: "Ability Prism",
		spritenum: 297,
		onTakeItem: false,
		onSwitchIn(pokemon) {
			this.add('-item', pokemon, 'Ability Prism');
			if (pokemon.baseSpecies.baseSpecies === 'Kaledzi') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('kaledityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Neuroforce!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Mintarin' || pokemon.baseSpecies.baseSpecies === 'Sagicuta' || pokemon.baseSpecies.baseSpecies === 'Menthapilli') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('menthapillityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Heart of Courage!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Hydrattler' || pokemon.baseSpecies.baseSpecies === 'Zingshot' || pokemon.baseSpecies.baseSpecies === 'Trebutalus') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('trebutalityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Heart of Courage!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Fyermine' || pokemon.baseSpecies.baseSpecies === 'Exploat' || pokemon.baseSpecies.baseSpecies === 'Ancillarine') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('ancillityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Heart of Courage!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Tuatoxa' || pokemon.baseSpecies.baseSpecies === 'Tuakahu' || pokemon.baseSpecies.baseSpecies === 'Tuamana') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('tuamanityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Poison Touch!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Eevee' || pokemon.baseSpecies.baseSpecies === 'Vaporeon' || 
				 pokemon.baseSpecies.baseSpecies === 'Jolteon' || pokemon.baseSpecies.baseSpecies === 'Flareon' || pokemon.baseSpecies.baseSpecies === 'Umbreon' || 
				 pokemon.baseSpecies.baseSpecies === 'Espeon' || pokemon.baseSpecies.baseSpecies === 'Leafeon' || pokemon.baseSpecies.baseSpecies === 'Glaceon' || 
				 pokemon.baseSpecies.baseSpecies === 'Sylveon' || pokemon.baseSpecies.baseSpecies === 'Mytheon' || pokemon.baseSpecies.baseSpecies === 'Geareon') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('eevityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Adaptability!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Shelmet' || pokemon.baseSpecies.baseSpecies === 'Accelgor') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('accelityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Protean!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Spiritomb') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('spirityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Supreme Overlord!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Druddigon') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('druddityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Insult to Injury!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Tynamo' || pokemon.baseSpecies.baseSpecies === 'Eelektrik' || pokemon.baseSpecies.baseSpecies === 'Eelektross') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('eelektrityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Regenerator!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Tinkatink' || pokemon.baseSpecies.baseSpecies === 'Tinkatuff' || pokemon.baseSpecies.baseSpecies === 'Tinkaton') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('tinkityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Prankster!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Tyrogue' || pokemon.baseSpecies.baseSpecies === 'Hitmonchan' || pokemon.baseSpecies.baseSpecies === 'Hitmonlee'|| pokemon.baseSpecies.baseSpecies === 'Hitmontop') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('hitmonityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Scrappy!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Litwick' || pokemon.baseSpecies.baseSpecies === 'Lampent' || pokemon.baseSpecies.baseSpecies === 'Chandelure') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('chandelurityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Analytic!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Zubat' || pokemon.baseSpecies.baseSpecies === 'Golbat' || pokemon.baseSpecies.baseSpecies === 'Crobat') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('crobityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Magic Guard!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Dhelmise') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('dhelmisityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Dauntless Shield!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Skiddo' || pokemon.baseSpecies.baseSpecies === 'Gogoat') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('gogoatinityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Seed Sower!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Trapinch' || pokemon.baseSpecies.baseSpecies === 'Vibrava' || pokemon.baseSpecies.baseSpecies === 'Flygon') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('flygonityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Tinted Lens!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Crabrawler' || pokemon.baseSpecies.baseSpecies === 'Crabominable') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('crabominityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Fluffy!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('meloettinityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Mold Breaker!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Skorupi' || pokemon.baseSpecies.baseSpecies === 'Drapion') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('drapionityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Merciless!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Wishiwashi') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('wishinityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Filter Feed!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Munna' || pokemon.baseSpecies.baseSpecies === 'Musharna') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('musharnityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Comatose!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Nosepass' || pokemon.baseSpecies.baseSpecies === 'Probopass') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('probosityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Earth Eater!`);
			}
			if (pokemon.baseSpecies.baseSpecies === 'Karrablast' || pokemon.baseSpecies.baseSpecies === 'Escavalier') {
				this.add('-activate', pokemon, 'item: Ability Prism'); 
				this.add('-anim', pokemon, "Conversion", pokemon);
				pokemon.setItem('escavityprism');
				this.add('-item', pokemon, pokemon.getItem(), '[from] item: Ability Prism');
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Sharpness!`);
			}
		},
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
				this.add('-fail', target, 'unboost', '[from] item: Ability Prism', '[of] ' + target);
			}
		},
		gen: 8,
		desc: "Turns into the holder's signature Ability Prism on switch-in.",
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
	
// Ability Prisms


	
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

// Ability Prisms
	kaledityprism: {
		name: "Kaledity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Sky-Piercing Slash",
		zMoveType: "Fighting",
		itemUser: ["Kaledzi"],
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives Kaledzi the effects of Neuroforce.",
	},
	menthapillityprism: {
		name: "Menthapillity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Blade of Courage",
		zMoveType: "Grass",
		itemUser: ["Mintarin", "Sagicuta", "Menthapilli"],
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.hasType(move.type) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Heart of Courage boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.hasType(move.type) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Heart of Courage boost');
				return this.chainModify(1.5);
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Mintarin line the effects of Heart of Courage.",
	},	
	ancillityprism: {
		name: "Ancillity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Cannon of Courage",
		zMoveType: "Fire",
		itemUser: ["Fyermine", "Exploat", "Ancillarine"],
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.hasType(move.type) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Heart of Courage boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.hasType(move.type) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Heart of Courage boost');
				return this.chainModify(1.5);
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Fyermine line the effects of Heart of Courage.",
	},	
	trebutalityprism: {
		name: "Trebutality Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Blast of Courage",
		zMoveType: "Water",
		itemUser: ["Hydrattler", "Zingshot", "Trebutalus"],
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.hasType(move.type) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Heart of Courage boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.hasType(move.type) && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Heart of Courage boost');
				return this.chainModify(1.5);
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Hydrattler line the effects of Heart of Courage.",
	},	
	tuamanityprism: {
		name: "Tuamanity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Lost Guardian's Wrath",
		zMoveType: "Fairy",
		itemUser: ["Tuatoxa", "Tuakahu", "Tuamana"],
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.getAbility('poisontouch'),
			});
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Tuatoxa line the effects of Poison Touch.",
	},
	eevityprism: {
		name: "Eevity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Evoblast",
		zMoveType: "Normal",
		itemUser: ["Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Glaceon", "Leafeon", "Sylveon", "Mytheon", "Geareon"],
		onModifyMove(move) {
			move.stab = 2;
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Eevee line the effects of Adaptability.",
	},
	accelityprism: {
		name: "Accelity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Hidden Leaf Strike",
		zMoveType: "Bug",
		itemUser: ["Shelmet", "Accelgor"],
		onPrepareHit(source, target, move) {
			if (this.effectData.protean) return;
			if (move.hasBounced || move.isFutureMove || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectData.protean = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onStart(pokemon) {
			delete this.effectData.protean;
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Shelmet line the effects of Protean.",
	},
	spirityprism: {
		name: "Spirity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Fury of the 108",
		zMoveType: "Dark",
		itemUser: ["Spiritomb"],
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Supreme Overlord');
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectData.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectData.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectData.fallen) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Supreme Overlord boost: ${powMod[this.effectData.fallen]}/4096`);
				return this.chainModify([powMod[this.effectData.fallen], 4096]);
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives Spiritomb the effects of Supreme Overlord.",
	},
	druddityprism: {
		name: "Druddity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Crimson Crash",
		zMoveType: "Dragon",
		itemUser: ["Druddigon"],
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (defender.hurtThisTurn) {
				this.debug('BP multiplied on damaged target');
				return this.chainModify(1.5);
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives Druddigon the effects of Insult to Injury.",
	},
	eelektrityprism: {
		name: "Eelektrity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Corrosive Circuit",
		zMoveType: "Electric",
		itemUser: ["Tynamo", "Eelektrik", "Eelektross"],
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Tynamo line the effects of Regenerator.",
	},
	tinkityprism: {
		name: "Tinkity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Pixie Rust",
		zMoveType: "Fairy",
		itemUser: ["Tinkatink", "Tinkatuff", "Tinkaton"],
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Tinkatink line the effects of Prankster.",
	},
	hitmonityprism: {
		name: "Hitmonity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Corkscrew Cross",
		zMoveType: "Fighting",
		itemUser: ["Tyrogue", "Hitmonchan", "Hitmonlee", "Hitmontop"],
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Scrappy');
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Tyrogue line the effects of Scrappy.",
	},
	chandelurityprism: {
		name: "Chandelurity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Final Flicker",
		zMoveType: "Fire",
		itemUser: ["Litwick", "Lampent", "Chandelure"],
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Analytic boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Litwick line the effects of Analytic.",
	},
	crobityprism: {
		name: "Crobity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Wings of the Night",
		zMoveType: "Flying",
		itemUser: ["Zubat", "Golbat", "Crobat"],
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Zubat line the effects of Magic Guard.",
	},
	dhelmisityprism: {
		name: "Dhelmisity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Sunken Spirits",
		zMoveType: "Ghost",
		itemUser: ["Dhelmise"],
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Dauntless Shield');
			this.boost({def: 1}, pokemon);
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives Dhelmise the effects of Gen 8's Dauntless Shield.",
	},
	gogoatinityprism: {
		name: "Gogoatinity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Go-Go Charge",
		zMoveType: "Grass",
		itemUser: ["Skiddo", "Gogoat"],
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('grassyterrain');
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Skiddo line the effects of Seed Sower.",
	},
	flygonityprism: {
		name: "Flygonity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Granular Vortex",
		zMoveType: "Ground",
		itemUser: ["Trapinch", "Vibrava", "Flygon"],
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Trapinch line the effects of Tinted Lens.",
	},
	crabominityprism: {
		name: "Crabominity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Summit's Pressure",
		zMoveType: "Ice",
		itemUser: ["Crabrawler", "Crabominable"],
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Crabrawler line the effects of Fluffy.",
	},
	meloettinityprism: {
		name: "Meloettinity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Song for the World",
		zMoveType: "Normal",
		itemUser: ["Meloetta"],
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives Meloetta the effects of Mold Breaker.",
	},
	drapionityprism: {
		name: "Drapionity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Venomous Vice",
		zMoveType: "Poison",
		itemUser: ["Skorupi", "Drapion"],
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) return 5;
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Skorupi line the effects of Merciless.",
	},
	musharnityprism: {
		name: "Musharnity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Warped Dreams",
		zMoveType: "Psychic",
		itemUser: ["Munna", "Musharna"],
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Comatose');
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Comatose');
			}
			return false;
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.id === 'facade') {
				return this.chainModify(2);
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Munna line the effects of Comatose.",
	},
	probosityprism: {
		name: "Probosity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Disturbed Ions",
		zMoveType: "Rock",
		itemUser: ["Nosepass", "Probopass"],
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Earth Eater');
				}
				return null;
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Nosepass line the effects of Earth Eater.",
	},
	escavityprism: {
		name: "Escavity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Joust of Justice",
		zMoveType: "Steel",
		itemUser: ["Karrablast", "Escavalier"],
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Shapness boost');
				return this.chainModify(1.5);
			}
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives the Karrablast line the effects of Sharpness.",
	},
	wishinityprism: {
		name: "Wishinity Prism",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Emergency Assembly",
		zMoveType: "Water",
		itemUser: ["Wishiwashi"],
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			this.add('-ability', pokemon, 'Filter Feed');
			this.heal(pokemon.baseMaxhp / 16);
		},
		gen: 8,
		desc: "(Select Ability Prism to use) Gives Wishiwash the effects of Filter Feed.",
	},	
};
