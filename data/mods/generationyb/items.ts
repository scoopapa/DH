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
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Intimidate!`);
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
				this.add('-message', `${pokemon.name}'s Ability Prism gives it the effects of Levitate!`);
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
};
