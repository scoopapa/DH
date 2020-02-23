  
/*
List of flags and their descriptions:
authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Ability Strong Jaw.
bullet: Has no effect on Pokemon with the Ability Bulletproof.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Ability Dancer can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: NOW USED FOR SLASH MOVES! Seriously. There's so many of them and each individual flag is hardcoded in. 
    I legit don't know how to override stuff defined in sim/dex-data.ts, so...
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Ability Overcoat, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Ability Mega Launcher.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Ability Iron Fist.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Ability Magic Bounce.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Ability Soundproof.
*/

'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
	"thunder": {
		num: 87,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		desc: "Has a 30% chance to paralyze the target. This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If the weather is Primordial Sea or Rain Dance, this move does not check accuracy. If the weather is Desolate Land or Sunny Day, this move's accuracy is 50%.",
		shortDesc: "30% chance to paralyze. Can't miss in rain.",
		id: "thunder",
		isViable: true,
		name: "Thunder",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source) {
			for (const target of this.getAllActive()) {
				if (!target.hasAbility('scarlettemperament')) continue;
        //Ignore rain/temperature manipulation accuracy buff if it's an enemy. Otherwise, ignore sun accuracy drop
				if ((target.side === source.side && !source.hasAbility('temperaturemanipulation') && this.field.isWeather(['sunnyday', 'desolateland']))
           || (target.side !== source.side && (this.field.isWeather(['raindance', 'primordialsea']) || 
            (this.field.isWeather(['sunnyday', 'desolateland']) && source.hasAbility('temperaturemanipulation'))))){
          return;
        }
			}
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = true;
			} else if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = 50;
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 185,
		contestType: "Cool",
	},
	"hurricane": {
		num: 542,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		desc: "Has a 30% chance to confuse the target. This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If the weather is Primordial Sea or Rain Dance, this move does not check accuracy. If the weather is Desolate Land or Sunny Day, this move's accuracy is 50%.",
		shortDesc: "30% chance to confuse target. Can't miss in rain.",
		id: "hurricane",
		isViable: true,
		name: "Hurricane",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onModifyMove(move, source) {
			for (const target of this.getAllActive()) {
				if (!target.hasAbility('scarlettemperament')) continue;
        //Ignore rain/temperature manipulation accuracy buff if it's an enemy. Otherwise, ignore sun accuracy drop
				if ((target.side === source.side && !source.hasAbility('temperaturemanipulation') && this.field.isWeather(['sunnyday', 'desolateland']))
           || (target.side !== source.side && (this.field.isWeather(['raindance', 'primordialsea']) || 
            (this.field.isWeather(['sunnyday', 'desolateland']) && source.hasAbility('temperaturemanipulation'))))){
          return;
        }
			}
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				move.accuracy = true;
			} else if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				move.accuracy = 50;
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Flying",
		zMovePower: 185,
		contestType: "Tough",
	},
  //AND NOW, HOO BOY... We're repurposing the "mystery" flag.
	"nightslash": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"sacredsword": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"crosspoison": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"xscissor": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"furycutter": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"leafblade": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"falseswipe": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"solarblade": {
		inherit: true,
		flags: {charge: 1, contact: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"cut": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"slash": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"razorwind": {
		inherit: true,
		flags: {charge: 1, protect: 1, mirror: 1, mystery: 1},
	},
	"secretsword": {
		inherit: true,
		flags: {protect: 1, mirror: 1, mystery: 1},
	},
	"airslash": {
		inherit: true,
		flags: {protect: 1, mirror: 1, distance: 1, mystery: 1},
	},
	"psychocut": {
		inherit: true,
		flags: {protect: 1, mirror: 1, mystery: 1},
	},
	"afteryou": {
		inherit: true,
		flags: {authentic: 1},
	},
	"babydolleyes": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1,},
	},
	"beatup": {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	"bestow": {
		inherit: true,
		flags: {authentic: 1, mirror: 1},
	},
	"charm": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"electrify": {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	"entrainment": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"faketears": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"featherdance": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, dance: 1},
	},
	"flatter": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"fling": {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	"floralhealing": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, heal: 1},
	},
	"forestscurse": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"gastroacid": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"guardsplit": {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	"guardswap": {
		inherit: true,
		flags: {protect: 1, mirror: 1, authentic: 1},
	},
	"healpulse": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, heal: 1, distance: 1, pulse: 1},
	},
	"heartswap": {
		inherit: true,
		flags: {protect: 1, mirror: 1, authentic: 1},
	},
	"instruct": {
		inherit: true,
		flags: {protect: 1, authentic: 1},
	},
	"metalsound": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1, sound: 1},
	},
	"mimic": {
		inherit: true,
		flags: {protect: 1, authentic: 1},
	},
	"odorsleuth": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
	},
	"painsplit": {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	"powersplit": {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	"powerswap": {
		inherit: true,
		flags: {protect: 1, mirror: 1, authentic: 1},
	},
	"psychup": {
		inherit: true,
		flags: {authentic: 1},
	},
	"reflecttype": {
		inherit: true,
		flags: {protect: 1, authentic: 1},
	},
	"roar": {
		inherit: true,
		flags: {reflectable: 1, mirror: 1, authentic: 1, sound: 1},
	},
	"roleplay": {
		inherit: true,
		flags: {authentic: 1},
	},
	"scaryface": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"screech": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1, sound: 1},
	},
	"simplebeam": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"sketch": {
		inherit: true,
		flags: {authentic: 1},
	},
	"skillswap": {
		inherit: true,
		flags: {protect: 1, mirror: 1, authentic: 1},
	},
	"speedswap": {
		inherit: true,
		flags: {protect: 1, mirror: 1, authentic: 1},
	},
	"soak": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"spotlight": {
		inherit: true,
		flags: {protect: 1, reflectable: 1},
	},
	"swagger": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"switcheroo": {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	"telekinesis": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, gravity: 1},
	},
	"tickle": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"topsyturvy": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"transform": {
		inherit: true,
		flags: {},
	},
	"trick": {
		inherit: true,
		flags: {protect: 1, mirror: 1},
	},
	"trickortreat": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	"whirlwind": {
		inherit: true,
		flags: {reflectable: 1, mirror: 1, authentic: 1},
	},
	"worryseed": {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1},
	},
	
    "fireball": {
        num: 40001,
        accuracy: 100,
        basePower: 85,
        category: "Physical",
        desc: "Has a 10% chance to burn the target. The target thaws out if it is frozen.",
        shortDesc: "10% chance to burn the target. Thaws target.",
        id: "fireball",
        isViable: true,
        name: "Fireball",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1, defrost: 1},
        thawsTarget: true,
        secondary: {
            chance: 10,
            status: 'brn',
        },
        target: "normal",
        type: "Fire",
        zMovePower: 160,
    },
    "chargeshot": {
        num: 40002,
        accuracy: 100,
        basePower: 95,
        category: "Special",
        desc: "No secondary effect.",
        shortDesc: "No secondary effect.",
        id: "chargeshot",
        isViable: true,
        name: "Charge Shot",
        pp: 10,
        priority: 0,
        flags: {protect: 1, pulse: 1, mirror: 1, distance: 1},
        secondary: false,
        target: "any",
        type: "Electric",
        zMovePower: 175,
     },
		"monadopurge": {
			num: 40003,
			accuracy: 100,
			basePower: 80,
			category: "Special",
			desc: "The target's Ability is rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. If the target's Ability is Battle Bond, Comatose, Disguise, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, or Zen Mode, this effect does not happen, and receiving the effect through Baton Pass ends the effect immediately.",
			shortDesc: "Nullifies the target's Ability. Damages user for 25% of HP if not Shulk or Chibiterasu.",
			id: "monadopurge",
			name: "Monado Purge",
			pp: 15,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			mindBlownRecoil: true,
			onAfterMove(pokemon, target, move) {
				if (['Shulk', 'Chibiterasu'].includes(pokemon.template.species)){
					 move.mindBlownRecoil = false;
				} else if (move.mindBlownRecoil && !move.multihit) {
					this.damage(Math.round(pokemon.maxhp / 4), pokemon, pokemon, this.getEffect('Monado Purge'), true);
				}
			},
			volatileStatus: 'gastroacid',
			secondary: null,
			target: "normal",
			type: "Psychic",
			zMovePower: 160,
		},
		"monadoeater": {
			num: 40004,
			accuracy: 100,
			basePower: 20,
			basePowerCallback(pokemon, target) {
				let power = 20 + 20 * target.positiveBoosts();
				if (power > 200) power = 200;
				return power;
			},
			category: "Physical",
			desc: "Power is equal to 20+(X*20), where X is the target's total stat stage changes that are greater than 0, but not more than 200 power. Resets all of the target's stat stages to 0.",
			shortDesc: "20 power +20 for each of the target's stat boosts. Resets all of the target's stat stages to 0. Damages user for 25% of HP if not Shulk or Chibiterasu.",
			id: "monadoeater",
			name: "Monado Eater",
			pp: 5,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			mindBlownRecoil: true,
			onHit(target) {
        let nullified = false;
			  for (const statName in target.boosts) {
				  // @ts-ignore
				  const stage = target.boosts[statName];
				  if (stage > 0) {
				  	target.boosts[statName] = 0;
            nullified = true;
				  }
			  }
				if (nullified) this.add('-clearpositiveboost', target);
			},
			onAfterMove(pokemon, target, move) {
				if (['Shulk', 'Chibiterasu'].includes(pokemon.template.species)){
					 move.mindBlownRecoil = false;
				} else if (move.mindBlownRecoil && !move.multihit) {
					this.damage(Math.round(pokemon.maxhp / 4), pokemon, pokemon, this.getEffect('Monado Eater'), true);
				}
			},
			secondary: null,
			target: "normal",
			type: "Fighting",
			zMovePower: 120,
		},
		"monadobuster": {
			num: 40005,
			accuracy: true,
			basePower: 200,
			category: "Physical",
			desc: "This move becomes a special attack if the target's Defense is greater than its Special Defense, including stat stage changes.",
			shortDesc: "Special if target's Def > Sp. Def.",
			id: "monadobuster",
			name: "Monado Buster",
			pp: 1,
			priority: 0,
			flags: {contact: 1, mystery: 1},
			onModifyMove(move, pokemon, target) {
				if (target.getStat('def', false, true) > target.getStat('spd', false, true)) move.category = 'Special';	
			},
			isZ: "shulkiumz",
			secondary: null,
			target: "normal",
			type: "Fighting",
			contestType: "Cool",
		},
		"deploymissiles": {
			num: 40006,
			accuracy: 90,
			basePower: 25,
			category: "Physical",
			desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
			shortDesc: "Hits 2-5 times in one turn.",
			id: "deploymissiles",
			isViable: true,
			name: "Deploy Missiles",
			pp: 10,
			priority: 0,
			flags: {bullet: 1, protect: 1, mirror: 1},
			multihit: [2, 5],
			secondary: null,
			target: "normal",
			type: "Steel",
			zMovePower: 140,
			contestType: "Tough",
		},
		"starspit": {
			num: 40007,
			accuracy: 100,
			basePower: 80,
			basePowerCallback(pokemon, target, move) {
				if (target.newlySwitched || this.willMove(target)) {
					this.debug('Payback NOT boosted');
					return move.basePower;
				}
				this.debug('Payback damage boost');
				return move.basePower * 1.5;
			},
			category: "Physical",
			desc: "Power multiplies by 1.5 if the user moves after the target this turn, including actions taken through Instruct or the Dancer Ability. Switching in does not count as an action. This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes.",
			shortDesc: "Power multiplies by 1.5 if the user moves after the target. Physical if user's Atk > Sp. Atk.",
			id: "starspit",
			name: "Star Spit",
			pp: 15,
			priority: 0,
			flags: {protect: 1, mirror: 1},
			onModifyMove(move, pokemon) {
				if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
			},
			secondary: null,
			target: "normal",
			type: "Flying",
			zMovePower: 160,
			contestType: "Cute",
		},
	"jambaspear": {
		num: 40008,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
		id: "jambaspear",
		isViable: true,
		name: "Jamba Spear",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 175,
		contestType: "Cool",
	},
	"devilsknife": {
		num: 40009,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		id: "devilsknife",
		isViable: true,
		name: "Devilsknife",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "Dark",
		zMovePower: 190,
		contestType: "Cool",
	},
	"dashslash": {
		num: 40010,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		id: "dashslash",
		isViable: true,
		name: "Dash Slash",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 140,
		contestType: "Cool",
	},
	"assassinate": {
		num: 40011,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Ignores the target's stat stage changes, including evasiveness.",
		shortDesc: "Ignores the target's stat stage changes.",
		id: "assassinate",
		isViable: true,
		name: "Assassinate",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreEvasion: true,
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 175,
		contestType: "Tough",
	},
	"etherealroller": {
		num: 40012,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "30% chance to flinch the target.",
		id: "etherealroller",
		isViable: true,
		name: "Ethereal Roller",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ghost",
		zMovePower: 160,
		contestType: "Cool",
	},
	"minimize": {
		num: 107,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's evasiveness by 2 stages. Whether or not the user's evasiveness was changed, Body Slam, Dragon Rush, Ethereal Roller, Flying Press, Heat Crash, Heavy Slam, Malicious Moonsault, Steamroller, and Stomp will not check accuracy and have their damage doubled if used against the user while it is active.",
		shortDesc: "Raises the user's evasiveness by 2.",
		id: "minimize",
		name: "Minimize",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'minimize',
		effect: {
			noCopy: true,
			onSourceModifyDamage(damage, source, target, move) {
				if (['stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'etherealroller'].includes(move.id)) {
					return this.chainModify(2);
				}
			},
			onAccuracy(accuracy, target, source, move) {
				if (['stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'etherealroller'].includes(move.id)) {
					return true;
				}
				return accuracy;
			},
		},
		boosts: {
			evasion: 2,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"purry": {
		num: 40013,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			if (!pokemon.volatiles['purry']) return 0;
			return pokemon.volatiles['purry'].damage || 1;
		},
		category: "Physical",
		desc: "Deals damage to the last opposing Pokemon to hit the user with an attack this turn equal to 1.5 times the HP lost by the user from that attack, rounded down. If the user did not lose HP from the attack, this move deals 1 HP of damage instead. If that opposing Pokemon's position is no longer in use and there is another opposing Pokemon on the field, the damage is done to it instead. Only the last hit of a multi-hit attack is counted. Fails if the user was not hit by an opposing Pokemon's attack this turn.",
		shortDesc: "If hit by an attack, returns 1.5x damage.",
		id: "purry",
		name: "Purry",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('purry');
		},
		onTryHit(target, source, move) {
			if (!source.volatiles['purry']) return false;
			if (source.volatiles['purry'].position === null) return false;
		},
		effect: {
			duration: 1,
			noCopy: true,
			onStart(target, source, move) {
				this.effectData.position = null;
				this.effectData.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectData.target) return;
				return source.side.foe.active[this.effectData.position];
			},
			onAfterDamage(damage, target, source, effect) {
				if (effect && effect.effectType === 'Move' && source.side !== target.side) {
					this.effectData.position = source.position;
					this.effectData.damage = 1.5 * damage;
				}
			},
		},
		secondary: null,
		target: "scripted",
		type: "Normal",
		ignoreImmunity: true,
		zMovePower: 100,
		contestType: "Cute",
	},
	"crystalspin": {
		num: 40014,
		accuracy: true,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 10 * (move.hit + 1);
		},
		category: "Physical",
		desc: "Hits three times. Power increases to 30 for the second hit and 40 for the third. This move does not check accuracy. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		shortDesc: "Hits 3 times. Power rises for each hit. This move does not check accuracy.",
		id: "crystalspin",
		name: "Crystal Spin",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Ice",
		zMovePower: 120,
		contestType: "Cool",
	},
	"angelicflare": {
		num: 40015,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "angelicflare",
		isViable: true,
		name: "Angelic Flare",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"reanimate": {
		num: 40016,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up. The user cures its burn, poison, or paralysis. Fails if the user is not burned, poisoned, or paralyzed.",
		shortDesc: "Heals the user by 50% of its max HP. User cures its burn, poison, or paralysis.",
		id: "reanimate",
		isViable: true,
		name: "Reanimate",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			if (pokemon.hp >= pokemon.maxhp && ['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Ghost",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"greatslash": {
		num: 40017,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Lowers the user's Defense and Speed by 1 stage.",
		shortDesc: "Lowers the user's Defense and Speed by 1.",
		id: "greatslash",
		isViable: true,
		name: "Great Slash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
		selfBoost: {
			boosts: {
				def: -1,
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 190,
		contestType: "Tough",
	},
	"fujiwaravolcano": {
		num: 40018,
		accuracy: 80,
		basePower: 150,
		category: "Physical",
		desc: "Has a 30% chance to burn the target. If the target lost HP, the user takes recoil damage equal to 1/2 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/2 recoil. 30% chance to burn.",
		id: "fujiwaravolcano",
		isViable: true,
		name: "Fujiwara Volcano",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		recoil: [1, 2],
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		zMovePower: 200,
		contestType: "Tough",
	},
	"iceklone": {
		num: 40019,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon making contact with the user lose 1/16 of their maximum HP, rounded down, and have their Speed lowered by 1 stage. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from moves. Contact: loses 1/16 max HP, lowers Spe by 1.",
		id: "iceklone",
		isViable: true,
		name: "Ice Klone",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'iceklone',
		onTryHit(target, source, move) {
			return !!this.willAct() && this.runEvent('StallMove', target);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					this.damage(source.maxhp / 16, source, target);
					this.boost({spe: -1}, source, target, this.getActiveMove("Ice Klone"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZPowered && move.flags['contact']) {
					this.damage(source.maxhp / 16, source, target);
					this.boost({spe: -1}, source, target, this.getActiveMove("Ice Klone"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMoveBoost: {def: 1},
		contestType: "Cool",
	},
	"heartache": {
		num: 40020,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		desc: "Accuracy is equal to (target's current HP * 100% / target's maximum HP), rounded half down.",
		shortDesc: "Less accuracy as target's HP decreases.",
		id: "heartache",
		isViable: true,
		name: "Heartache",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			move.accuracy = Math.floor(Math.floor((move.accuracy * (100 * Math.floor(target.hp * 4096 / target.maxhp)) + 2048 - 1) / 4096) / 100);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 200,
		contestType: "Beautiful",
	},
    "liarshot": {
        num: 40021,
        accuracy: 100,
        basePower: 80,
        category: "Physical",
        desc: "Has a 30% chance to flinch the target.",
        shortDesc: "30% chance to flinch the target.",
        id: "liarshot",
        isViable: true,
        name: "Liar Shot",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        secondary: {
            chance: 30,
            volatileStatus: 'flinch',
        },
        target: "normal",
        type: "Dark",
        zMovePower: 160,
    },
    "thorntrap": {
        num: 40022,
        accuracy: 95,
        basePower: 35,
        category: "Physical",
        desc: "Prevents the target from switching for four or five turns; seven turns if the user is holding Grip Claw. Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute. This effect is not stackable or reset by using this or another partial-trapping move.",
        shortDesc: "Traps and damages the target for 4-5 turns.",
        id: "thorntrap",
        name: "Thorn Trap",
        pp: 20,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        volatileStatus: 'partiallytrapped',
        secondary: false,
        target: "normal",
        type: "Grass",
        zMovePower: 100,
    },
	"blackholebomb": {
      num: 40023,
		accuracy: 95,
		basePower: 90,
		category: "Special",
		desc: "The user recovers 1/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 25% of the damage dealt.",
		id: "blackholebomb",
		isViable: true,
		name: "Black Hole Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 4],
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 175,
		contestType: "Clever",
	},
	"electrohammer": {
		num: 40024, 
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Lowers the user's Speed by 1 stage.",
		shortDesc: "Lowers the user's Speed by 1.",
		id: "electrohammer",
		isViable: true,
		name: "Electro Hammer",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMovePower: 180,
		contestType: "Tough",
	},
	"dededehammerthrow": {
		num: 40025, 
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "10% chance to burn the target.",
		id: "dededehammerthrow",
		isViable: true,
		name: "Dedede Hammer Throw",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Flying",
		zMovePower: 180,
		contestType: "Tough",
	},
	"battlerifle": {
		num: 40026, 
		accuracy: 100,
		basePower: 35,
		category: "Special",
		defensiveCategory: "Physical",
		desc: "Hits three times. Deals damage to the target based on its Defense instead of Special Defense.",
		shortDesc: "Hits 3 times. Damages target based on Defense, not Sp. Def.",
		id: "battlerifle",
		isViable: true,
		name: "Battle Rifle",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 100,
},
	"cycloneslash": {
		num: 40026,
		accuracy: 90,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. User becomes immune to Ground for 1 turn.",
		shortDesc: "Hits 2-5 times in one turn. User becomes immune to Ground for 1 turn.",
		id: "cycloneslash",
		isViable: true,
		name: "Cyclone Slash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
		multihit: [2, 5],
		volatileStatus: 'cycloneslash',
		effect: {
			duration: 1,
			onStart(target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Cyclone Slash');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onResidual(pokemon) {
				if (!pokemon.hp) return;
				pokemon.removeVolatile('cycloneslash');
			},
			onEnd(target) {
				this.add('-end', target, 'Cyclone Slash');
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 140,
		contestType: "Cool",
	},
	"spearoflight": {
		num: 40027,
		accuracy: true,
		basePower: 150,
		category: "Special",
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
		shortDesc: "Always results in a critical hit.",
		id: "spearoflight",
		name: "Spear of Light",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "galeemiumz",
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	"demonicrend": {
		num: 40028,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		desc: "Has a 40% chance to lower each target's Speed by 1 stage.",
		shortDesc: "40% chance to lower each target's Speed by 1.",
		id: "demonicrend",
		isViable: true,
		name: "Demonic Rend",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, mystery: 1},
		secondary: {
			chance: 40,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Dark",
		zMovePower: 185,
		contestType: "Tough",
	},
	"hammerofdarkness": {
		num: 40029,
		accuracy: true,
		basePower: 195,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		id: "hammerofdarkness",
		name: "Hammer of Darkness",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "dharkoniumz",
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	"finaldeathbloom": {
		num: 40030,
		accuracy: 90,
		basePower: 140,
		category: "Special",
		desc: "If the target lost HP, the user takes recoil damage equal to 1/2 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/2 recoil.",
		id: "finaldeathbloom",
		isViable: true,
		name: "Final Death Bloom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		isUnreleased: true,
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 200,
		contestType: "Beautiful",
	},
	"katamaridash": {
		num: 40031,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "Nearly always goes first.",
		id: "katamaridash",
		isViable: true,
		name: "Katamari Dash",
		pp: 5,
		priority: 2,
		flags: {bullet: 1, contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 160,
		contestType: "Clever",
	},
	"creeperblast": {
		num: 40032,
		accuracy: 100,
		basePower: 500,
		category: "Physical",
		desc: "The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		shortDesc: "Hits adjacent Pokemon. The user faints.",
		id: "creeperblast",
		isViable: true,
		name: "Creeper Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Grass",
		zMovePower: 200,
		contestType: "Clever",
	},
	"flarecannon": {
		num: 40033,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "Has a 20% chance to burn the target.",
		shortDesc: "20% chance to burn adjacent Pokemon.",
		id: "flarecannon",
		isViable: true,
		name: "Flare Cannon",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Fire",
		zMovePower: 180,
		contestType: "Tough",
	},
	"shocktherapist": {
		num: 40034,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "Has a 20% chance to paralyze the target.",
		shortDesc: "20% chance to paralyze adjacent Pokemon.",
		id: "shocktherapist",
		isViable: true,
		name: "Shock Therapist",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "allAdjacentFoes",
		type: "Electric",
		zMovePower: 180,
		contestType: "Cool",
	},
	"monsterpump": {
		num: 40035,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "Has a 20% chance to lower the target's Attack by 1 stage.",
		shortDesc: "20% chance to lower the foe(s) Attack by 1.",
		id: "monsterpump",
		isViable: true,
		name: "Monster Pump",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Water",
		zMovePower: 180,
		contestType: "Beautiful",
	},
	"comedybomb": {
		num: 40036,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		desc: "Has a 20% chance to poison the target.",
		shortDesc: "20% chance to poison adjacent Pokemon.",
		id: "comedybomb",
		isViable: true,
		name: "Comedy Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Poison",
		zMovePower: 180,
		contestType: "Clever",
	},
	"bigbang": {
		num: 40037,
		accuracy: true,
		basePower: 175,
		category: "Special",
		desc: "Has a 50% chance to poison the target.",
		shortDesc: "50% chance to poison the target.",
		id: "bigbang",
		name: "Big Bang",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "zeromiumz",
		secondary: {
			chance: 50,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Electric",
		contestType: "Cool",
	},
	"tideshift": {
		num: 40038,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		id: "tideshift",
		isViable: true,
		name: "Tide Shift",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 140,
		contestType: "Cute",
	},
	"risingphoenix": {
		num: 40039,
		accuracy: 90,
		basePower: 110,
		category: "Physical",
		desc: "Has a 30% chance to burn the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to burn.",
		id: "risingphoenix",
		name: "Rising Phoenix",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		critRatio: 2,
		target: "normal",
		type: "Fire",
		zMovePower: 185,
		contestType: "Cool",
	},
	"blackhole": {
		num: 40040,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "blackhole",
		isViable: true,
		name: "Black Hole",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 180,
		contestType: "Clever",
	},
	"darkmatter": {
		num: 40041,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "darkmatter",
		isViable: true,
		name: "Dark Matter",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "foeSide",
		type: "Dark",
		zMovePower: 195,
		contestType: "Cool",
	},
	"zombieclub": {
		num: 40042,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "zombieclub",
		isViable: true,
		name: "Zombie Club",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 180,
		contestType: "Tough",
	},
	"wildlifecrossingsign": {
		num: 40043,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "wildlifecrossingsign",
		isViable: true,
		name: "Wildlife Crossing Sign",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		contestType: "Tough",
	},
	"salmonidpan": {
		num: 40044,
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		desc: "Has a 30% chance to poison the target. If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target used Ingrain previously, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "30% chance to poison the target. Forces the target to switch to a random ally.",
		id: "salmonidpan",
		isViable: true,
		name: "Salmonid Pan",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		forceSwitch: true,
		target: "normal",
		type: "Steel",
		zMovePower: 120,
		contestType: "Tough",
	},
	"naturepower": {
		num: 267,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "This move calls another move for use based on the battle terrain. Tri Attack on the regular Wi-Fi terrain, Thunderbolt during Electric Terrain, Moonblast during Misty Terrain, Energy Ball during Grassy Terrain, Psychic during Psychic Terrain, and Sludge Wave during Inky Terrain.",
		shortDesc: "Attack depends on terrain (default Tri Attack).",
		id: "naturepower",
		isViable: true,
		name: "Nature Power",
		pp: 20,
		priority: 0,
		flags: {},
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			} else if (this.field.isTerrain('inkyterrain')){
        			move = 'sludgewave';
     			}
			this.useMove(move, pokemon, target);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	"secretpower": {
		num: 290,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a 30% chance to cause a secondary effect on the target based on the battle terrain. Causes paralysis on the regular Wi-Fi terrain, causes paralysis during Electric Terrain, lowers Special Attack by 1 stage during Misty Terrain, causes sleep during Grassy Terrain, lowers Speed by 1 stage during Psychic Terrain, and causes poisoning during Inky Terrain.",
		shortDesc: "Effect varies with terrain. (30% paralysis chance)",
		id: "secretpower",
		name: "Secret Power",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('')) return;
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} else if (this.field.isTerrain('inkyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'psn',
				});
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Normal",
		zMovePower: 140,
		contestType: "Clever",
	},
	"camouflage": {
		num: 293,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user's type changes based on the battle terrain. Normal type on the regular Wi-Fi terrain, Electric type during Electric Terrain, Fairy type during Misty Terrain, Grass type during Grassy Terrain, Psychic type during Psychic Terrain, and Poison type during Inky Terrain. Fails if the user's type cannot be changed or if the user is already purely that type.",
		shortDesc: "Changes user's type by terrain (default Normal).",
		id: "camouflage",
		name: "Camouflage",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onHit(target) {
			let newType = 'Normal';
			if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			} else if (this.field.isTerrain('inkyterrain')) {
				newType = 'Poison';
			}

			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveBoost: {evasion: 1},
		contestType: "Clever",
	},
	"inkyterrain": {
		num: 40045,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Inky Terrain. During the effect, the power of attacks made by grounded Poison-type Pokemon is multiplied by 1.5 and other grounded Pokemon have their speed decreased by 33%. Camouflage transforms the user into an Poison type, Nature Power becomes Sludge Wave, and Secret Power has a 30% chance to cause poisoning. Fails if the current terrain is Inky Terrain.",
		shortDesc: "5 turns. Grounded: x1.5 BP on moves if Poison, else x0.667 Speed.",
		id: "inkyterrain",
		name: "Inky Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'inkyterrain',
		effect: {
			duration: 5,
			durationCallback(source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower(basePower, attacker, defender, move) {
				if (attacker.hasType('Poison') && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('inky terrain boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpe(spe, pokemon) {
				if (!pokemon.hasType('Poison') && pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					return this.chainModify([0x0AAC, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Inky Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Inky Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Inky Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Poison",
		zMoveBoost: {spe: 1},
		contestType: "Clever",
	},
	"puyopop": {
		num: 40046,
		accuracy: 90,
		basePower: 10,
		basePowerCallback(pokemon, target, move) {
			return 10 * move.hit;
		},
		category: "Special",
		desc: "Hits four times. Power increases to 20 for the second hit, 30 for the third, and 40 for the fourth. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If this move hits four times, the effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the user's side. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit four times.",
		shortDesc: "Hits 4 times. Each hit can miss, but power rises. Fourth hit clears user side's hazards.",
		id: "puyopop",
		name: "Puyo Pop",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move) {
      if (move.hit !== 4) return;
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Puyo Pop', '[of] ' + source);
				}
			}
		},
		multihit: 4,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 180,
		contestType: "Cute",
	},
	"swordrainbeta": {
		num: 40047,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		desc: "Hits five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		shortDesc: "Hits 5 times in one turn.",
		id: "swordrainbeta",
		name: "Sword Rain Beta",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		multihit: 5,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMovePower: 100,
		contestType: "Tough",
	},
	"thrustbarrage": {
		num: 40048,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits four times. This move's type depends on the user's secondary type. If the user lacks a secondary type, this move's type is the user's primary type unless it's typeless, in which case it becomes the added type from Forest's Curse or Trick-or-Treat. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. This move is typeless if the user's type is typeless alone.",
		shortDesc: "Type varies based on user's secondary type. Hits 4 times in one turn.",
		id: "thrustbarrage",
		name: "Thrust Barrage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onModifyMove(move, pokemon) {
			let type = pokemon.types[0];
      if (pokemon.types.length >= pokemon.addedType ? 3 : 2) type = pokemon.types[1];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		multihit: 4,
		secondary: null,
		target: "normal",
		type: "Bug",
		zMovePower: 100,
		contestType: "Beautiful",
	},
	"roulette": {
		num: 40049,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			return this.sample(20, 40, 60, 90, 120);
		},
		category: "Physical",
		desc: "The power of this move varies, with equal chances of 20 power, 40 power, 60 power, 90 power, 120 power, or the move failing.",
		shortDesc: "Power varies. 1-in-6 chance to fail.",
		id: "roulette",
		name: "Roulette",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onTry(source, target) {
			if (this.randomChance(1, 6)) {
				this.add('-fail', source);
				this.attrLastMove('[still]');
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 175,
		contestType: "Tough",
	},
	"fryingpan": {
		num: 40050,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		desc: "Power doubles if the target is burned.",
		shortDesc: "Power doubles if the target is burned.",
		id: "fryingpan",
		name: "Frying Pan",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'brn') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 120,
		contestType: "Tough",
	},
	"crash": {
		num: 40051,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Future Sight is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
		id: "crash",
		name: "Crash",
		pp: 5,
		priority: 0,
		flags: {bullet: 1},
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'crash',
				source: source,
				moveData: {
					id: 'crash',
					name: "Crash",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: {bullet: 1},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Fire',
				},
			});
			this.add('-start', source, 'Crash');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 200,
		contestType: "Tough",
	},
	"lifesteal": {
		num: 40052,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "lifesteal",
		isViable: true,
		name: "Lifesteal",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 160,
		contestType: "Clever",
	},
	"permutation": {
		num: 40053,
		accuracy: true,
		basePower: 200,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "permutation",
		name: "Permutation",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "puyoniumz",
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	"breegullblaster": {
		num: 40054,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "This move's type becomes either Fire or Ice, depending on the user's individual value (IV) for Special Attack.",
		shortDesc: "Varies in type based on the user's Sp. Atk IV. (Ice if odd, Fire if even)",
		id: "breegullblaster",
		name: "Breegull Blaster",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (!(pokemon.set.ivs['spa'] % 2)){
        move.type = 'Fire';
      } else {
        move.type = 'Ice';
      }
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 120,
		contestType: "Clever",
	},
	"wyverntackle": {
		num: 40055,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Has a 30% chance to badly poison the target. If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil. 30% chance to badly poison.",
		id: "wyverntackle",
		isViable: true,
		name: "Wyvern Tackle",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: {
			chance: 30,
			status: 'tox',
		},
		target: "normal",
		type: "Dragon",
		zMovePower: 190,
		contestType: "Cool",
	},
	"strike9shot": {
		num: 40056,
		accuracy: true,
		basePower: 175,
		category: "Physical",
		desc: "Has a 100% chance to badly poison the target, regardless of immunities.",
		shortDesc: "100% chance to badly poison the target, regardless of immunities.",
		id: "strike9shot",
		name: "Strike-9 Shot",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "makiniumz",
		secondary: {
			chance: 100,
			status: 'tox', //Inflicting this regardless of status immunities is under scripts.js/pokemon.
		},
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	"crystalspikes": {
		num: 40057,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "This move combines Fire in its type effectiveness against the target. Has a 20% chance to burn the target.",
		shortDesc: "Combines Fire in its type effectiveness. 20% chance to burn the target.",
		id: "crystalspikes",
		name: "Crystal Spikes",
		pp: 10,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.getEffectiveness('Fire', type);
		},
		priority: 0,
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 170,
		contestType: "Beautiful",
	},
	"starbarrage": {
		num: 40058,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "starbarrage",
		isViable: true,
		name: "Star Barrage",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 140,
		contestType: "Cool",
	},
	"aerosol": {
		num: 40059,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Has a 30% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "Damages target based on Sp. Def, not Defense. 30% chance to lower the target's Sp. Def by 1.",
		id: "aerosol",
		isViable: true,
		name: "Aerosol",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Poison",
		zMovePower: 175,
		contestType: "Clever",
	},
	"leafshield": {
		num: 40060,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. Move loses 25% of its power for each 18.75% of the user's Max HP lost to attacks inbetween, and another if hit by a contact move. Attackers lose 16.7% of their Max HP when using contact moves while the move charges.",
		shortDesc: "Charges turn 1. Hits turn 2. Damage sustained by moves is halved, but weakens this move.",
		id: "leafshield",
		name: "Leaf Shield",
		pp: 15,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
      //Move fails if there are leaves no more.
      if (attacker.volatiles[move.id]){
        let b = !!attacker.volatiles[move.id].leaves;
			  if (attacker.removeVolatile(move.id)) {
          if (b) return;
			  	return false;
			  }
      }
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onBasePower(basePower, pokemon, target) {
				return this.chainModify(pokemon.volatiles['leafshield'].leaves*1.0 / 4.0)
		},
		//effect for user.
		effect: {
			duration: 2,
			onStart() {
				this.effectData.leaves = 4;
			},
			onDamage(damage, source, target, effect) {
				if (this.effectData.leaves && effect && effect.effectType === 'Move') {
					if (effect.flags['contact']) {
						this.damage(source.maxhp / 6, source, target);
            this.effectData.leaves--;
					}
					this.effectData.leaves -= Math.min(this.effectData.leaves, Math.floor(damage / 0.1875));
					return Math.floor(damage / 2);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 190,
		contestType: "Cool",
	},
	"axestrike": {
		num: 40061,
		accuracy: 70,
		basePower: 110,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch.",
		id: "axestrike",
		isViable: true,
		name: "Axe Strike",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Physical",
		zMovePower: 185,
		contestType: "Tough",
	},
	"invisibleair": {
		num: 40062,
		accuracy: true,
		basePower: 90,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk. This move does not check accuracy.",
		id: "invisibleair",
		isViable: true,
		name: "Invisible Air",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"magnavoluissemagnum": {
		num: 40063,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first. First turn out only.",
		id: "magnavoluissemagnum",
		isViable: true,
		name: "Magna Voluisse Magnum",
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.activeTurns > 1) {
				this.add('-fail', pokemon);
				this.attrLastMove('[still]');
				this.hint("Magna Voluisse Magnum only works on your first turn out.");
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMovePower: 175,
		contestType: "Tough",
	},
	"potionthrow": {
		num: 40064,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 10% chance to poison the target. This move's type effectiveness against Rock is changed to be super effective no matter what this move's type is.",
		shortDesc: "10% chance to poison. Super effective on Rock.",
		id: "potionthrow",
		isViable: true,
		name: "Potion Throw",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Rock') return 1;
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMovePower: 160,
		contestType: "Clever",
	},
	"rapidsplat": {
		num: 40065,
		accuracy: 100,
		basepower: 15
		category: "Special",
		desc: "Hits 2-5 times. If Inkling-Squid knocks out an opponent with this move, change to Inkling-Kid. If Inkling-Kid knocks out an opponent with this move, raise speed by 1 stage."
		shortDesc: "2-5 hits. If Inkling-Squid gets KO, turn to Kid form. If Inkling-Kid gets KO, +1 Spe."
		id: "rapidsplat",
		isViable: true,
		name: "Rapid Splat",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1}
		multihit: [2, 5]
		onAfterMoveSecondarySelf(pokemon, target, move) {
//			I have NO idea what I'm doing here so if this works I just got lucky
			if (!target || target.fainted || target.hp <= 0 && pokemon.template.species === 'Inkling') {
				pokemon.formeChange(pokemon.template.speciesid === 'inklingkid', this.effect, false, '[msg]');
			}
			if (!target || target.fainted || target.hp <= 0 && pokemon.template.species === 'Inkling-Kid') this.boost({spe: 1}, pokemon, pokemon, move);
			if
		target: "normal", 
		type: "Poison",
		zMovePower: 100,
	},
	"alterego": {
		num: 40066,
		accuracy: 90,
		basePower: 90,
		category: "Special",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field.",
		shortDesc: "Free user from hazards/bind/Leech Seed.",
		id: "alterego",
		isViable: true,
		name: "Alter Ego",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			onHit(pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Smart",
	},
	"machtornado": {
		num: 40067,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Has a 30% chance to lower the target's Defense by 1 stage.",
		shortDesc: "30% chance to lower the target's Defense by 1.",
		id: "machtornado",
		name: "Mach Tornado",
		pp: 15,
		priority: 0,
		flags: {mystery: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	"squallhammer": {
		num: 40068,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "squallhammer",
		isViable: true,
		name: "Squall Hammer",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	"glaciergrind": {
		num: 40069,
		accuracy: true,
		basePower: 175,
		category: "Physical",
		desc: "Has a 100% chance to freeze the target.",
		shortDesc: "100% chance to freeze the target.",
		id: "glaciergrind",
		isViable: true,
		name: "Glacier Grind",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "climbiumz",
		secondary: {
			chance: 100,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	"waddlespearbarrage": {
		num: 40070,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "waddlespearbarrage",
		isViable: true,
		name: "Waddle Spear Barrage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 140,
		gmaxPower: 130,
		contestType: "Cute",
	},
	"scytheslash": {
		num: 40071,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 20% chance to inflict Perish Song on the target.",
		shortDesc: "20% chance to Perish Song the target.",
		id: "scytheslash",
		name: "Scythe Slash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'perishsong',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	"winterdragonblitz": {
		num: 40072,
		accuracy: true,
		basePower: 190,
		category: "Physical",
		desc: "Has a 30% chance to freeze the target.",
		shortDesc: "30% chance to freeze the target.",
		id: "winterdragonblitz",
		isViable: true,
		name: "Winter Dragon Blitz",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "fredrikiumz",
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	"foilflourish": {
		num: 40072,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		desc: "Has a 50% chance to raise the user's Attack by 1 stage. Has a 50% chance to raise the user's Speed by 1 stage.",
		shortDesc: "Individual 50% chances to +1 Attack or Speed.",
		id: "foilflourish",
		isViable: true,
		name: "Foil Flourish",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, mystery: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
				},
			},
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	"particlegrenade": {
		num: 40073,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		defensiveCategory: "Special",
		desc: "Deals damage to the target based on its Special Defense instead of Defense. Boosted by Mega Launcher, blocked by Bulletproof.",
		shortDesc: "Damages target based on Defense, not Sp. Def. Pulse + bomb.",
		id: "particlegrenade",
		isViable: true,
		name: "Particle Grenade",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1, bullet: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
	},
	"shootercutter": {
		num: 40074,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "Hits four times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits.",
		shortDesc: "Hits 2-5 times in one turn.",
		id: "shootercutter",
		isViable: true,
		name: "Shooter Cutter",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		multihit: 4,
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 190,
		gmaxPower: 130,
		contestType: "Cool",
	},
	"shovelbash": {
		num: 40075,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "Hits targets using Dig and stops them from using it.",
		shortDesc: "Hits targets using Dig and stops them from using it.",
		id: "shovelbash",
		isViable: true,
		name: "Shovel Bash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact},
		secondary: null, /* dig is handled in dig */
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	"dig": {
		num: 91,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Earthquake and Magnitude but takes double damage from them, and is also unaffected by weather. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Digs underground turn 1, strikes turn 2.",
		id: "dig",
		name: "Dig",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, nonsky: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('focuspunch');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['focuspunch'] && pokemon.volatiles['focuspunch'].lostFocus) {
				this.add('cant', pokemon, 'Focus Punch', 'Focus Punch');
				return true;
			}
		},
		effect: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['earthquake', 'magnitude', 'shovelbash'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude') {
					return this.chainModify(2);
				}
			onHit(pokemon, source, move) {
				if (move.id === 'shovelbash') {
					pokemon.volatiles['focuspunch'].lostFocus = true;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	"suicideride": {
		num: 50001,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		id: "suicideride",
		isViable: true,
		name: "Suicide Ride",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMovePower: 190,
		contestType: "Tough",
	},
	"shockingfinale": {
		num: 50002,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move. Hits all active Pokémon, including the user.",
		shortDesc: "User cannot move next turn. Hits field, including user.",
		id: "shockingfinale",
		name: "Shocking Finale",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "all",
		type: "Electric",
		zMovePower: 200,
		contestType: "Cool",
	},
	"snowhalation": {
		num: 50003,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		desc: "Has a 10% chance to freeze the target.",
		shortDesc: "10% chance to freeze foe(s).",
		id: "snowhalation",
		isViable: true,
		name: "Snow Halation",
		pp: 5,
		priority: 0,
		flags: {sound: 1, protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 190,
		contestType: "Beautiful",
	},
	"meettheflintstones": {
		num: 50004,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Has a 20% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "20% chance to raise the user's Special Attack by 1.",
		id: "meettheflintstones",
		isViable: true,
		name: "Meet The Flintstones",
		pp: 10,
		priority: 0,
		flags: {sound: 1, protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 20,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
		zMovePower: 175,
		contestType: "Clever",
	},
	"stonehalation": {
		num: 50005,
		accuracy: true,
		basePower: 200,
		category: "Special",
		desc: "Has a 100% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "100% chance to raise the user's Special Attack by 1.",
		id: "stokedsparksurfer",
		name: "Stoked Sparksurfer",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "siivagunniumz",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	"dreamscape": {
		num: 50006,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		desc: "Has a 10% chance to cause the target to fall asleep.",
		shortDesc: "10% chance to sleep foe(s).",
		id: "dreamscape",
		isViable: true,
		name: "Dreamscape",
		pp: 5,
		priority: 0,
		flags: {sound: 1, protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "normal",
		type: "Psychic",
		zMovePower: 190,
		contestType: "Beautiful",
	},
// "digslash": {
//         num: 40000,
//         accuracy: 100,
//         basePower: 95,
//         category: "Physical",
//         desc: "Has a higher chance for a critical hit.",
//         shortDesc: "High critical hit ratio",
//         id: "digslash",
//         name: "Dig Slash",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1, authentic: 1, contact: 1, distance: 1},
//         critRatio: 2,
//         secondary: false,
//         target: "normal",
//         type: "Ground",
//         zMovePower: 175,
//     },
//     "chargehandle": {
//         num: 40001,
//         accuracy: 90,
//         basePower: 150,
//         category: "Physical",
//         desc: "This attack charges on the first turn and executes on the second. Lowers speed by 1 stage after use. Breaks the foes protection.",
//         shortDesc: "Charges, then hits turn 2. Breaks protection. Lowers speed after use.",
//         id: "chargehandle",
//         name: "Charge Handle",
//         pp: 5,
//         priority: 0,
//         flags: {contact: 1, charge: 1, mirror: 1},
//         breaksProtect: true,
//         secondary: false,
//         target: "normal",
//         type: "Steel",
//         zMovePower: 200,
//     },
//     "hairwhip": {
//         num: 40002,
//         accuracy: 90,
//         basePower: 120,
//         category: "Physical",
//         desc: "Has a higher chance for a critical hit.",
//         shortDesc: "High critical hit ratio.",
//         id: "hairwhip",
//         name: "Hair Whip",
//         pp: 10,
//         priority: 0,
//         flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
//         critRatio: 2,
//         secondary: false,
//         target: "normal",
//         type: "Psychic",
//         zMovePower: 190,
//         contestType: "Tough",
//     },
//     "phasingram": {
//         num: 40004,
//         accuracy: 100,
//         basePower: 90,
//         category: "Physical",
//         desc: "Ignores the target's stat stage changes, including evasiveness.",
//         shortDesc: "Ignores the target's stat stage changes.",
//         id: "phasingram",
//         isViable: true,
//         name: "Phasing Ram",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         ignoreEvasion: true,
//         ignoreDefensive: true,
//         secondary: false,
//         target: "normal",
//         type: "Ghost",
//         zMovePower: 175,
//     },
//         "knifetoss": {
//         num: 40005,
//         accuracy: 95,
//         basePower: 55,
//         category: "Special",
//         desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. Each hit has 30% chance to badly poison the target.",
//         shortDesc: "Hits 2 times in one turn. 30% chance to badly poison target per hit.",
//         id: "knifetoss",
//         isViable: true,
//         name: "Knife Toss",
//         pp: 5,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         multihit: 2,
//         secondary: {
//             chance: 30,
//             status: 'tox',
//         },
//         target: "normal",
//         type: "Flying",
//         zMovePower: 180,
//     },
//     "liarshot": {
//         num: 40006,
//         accuracy: 100,
//         basePower: 80,
//         category: "Physical",
//         desc: "Has a 30% chance to flinch the target.",
//         shortDesc: "30% chance to flinch the target.",
//         id: "liarshot",
//         isViable: true,
//         name: "Liar Shot",
//         pp: 15,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         secondary: {
//             chance: 30,
//             volatileStatus: 'flinch',
//         },
//         target: "normal",
//         type: "Dark",
//         zMovePower: 160,
//     },
//     "thorntrap": {
//         num: 40007,
//         accuracy: 95,
//         basePower: 35,
//         category: "Physical",
//         desc: "Prevents the target from switching for four or five turns; seven turns if the user is holding Grip Claw. Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute. This effect is not stackable or reset by using this or another partial-trapping move.",
//         shortDesc: "Traps and damages the target for 4-5 turns.",
//         id: "thorntrap",
//         name: "Thorn Trap",
//         pp: 20,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         volatileStatus: 'partiallytrapped',
//         secondary: false,
//         target: "normal",
//         type: "Grass",
//         zMovePower: 100,
//     },
//     "sunrise": {
//         num: 40007,
//         accuracy: true,
//         basePower: 0,
//         category: "Status",
//         desc: "The user restores 66.7% of its maximum HP, rounded half up.",
//         shortDesc: "Heals the user by 66.7% of its max HP.",
//         id: "sunrise",
//         isViable: true,
//         name: "Sunrise",
//         pp: 5,
//         priority: 0,
//         flags: {snatch: 1, heal: 1},
//         heal: [2, 3],
//         secondary: false,
//         target: "self",
//         type: "Fire",
//         zMoveEffect: 'clearnegativeboost',
//     },
//     "rockout": {
//         num: 40008,
//         accuracy: 100,
//         basePower: 100,
//         category: "Special",
//         desc: "If it hits a target, wakes them up. Hits all adjacent foes.",
//         shortDesc: "The target wakes up.",
//         id: "rockout",
//         name: "Rock Out",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
//         secondary: {
//             dustproof: true,
//             chance: 100,
//             onHit: function (target) {
//                 if (target.status === 'slp') target.cureStatus();
//             },
//         },
//         target: "allAdjacent",
//         type: "Rock",
//         zMovePower: 180,
//     },
//     "minigun": {
//         num: 40009,
//         accuracy: 100,
//         basePower: 0,
//         basePowerCallback: function (pokemon, target) {
//             let power = (Math.floor(25 * target.getStat('spe') / pokemon.getStat('spe')) || 1);
//             if (power > 150) power = 150;
//             this.debug('' + power + ' bp');
//             return power;
//         },
//         category: "Special",
//         desc: "Power is equal to (25 * target's current Speed / user's current Speed), rounded down, + 1, but not more than 150.",
//         shortDesc: "More power the slower the user than the target.",
//         id: "minigun",
//         isViable: true,
//         name: "Minigun",
//         pp: 5,
//         priority: 0,
//         flags: {bullet: 1, protect: 1, mirror: 1},
//         secondary: false,
//         target: "normal",
//         type: "Normal",
//         zMovePower: 160,
//     },
//     "fantasyseal": {
//         num: 40010,
//         accuracy: true,
//         basePower: 90,
//         category: "Special",
//         desc: "This move's type effectiveness against Dark and Ghost is changed to be super effective no matter what this move's type is.",
//         shortDesc: "Super effective on Dark and Ghost.",
//         id: "fantasyseal",
//         isViable: true,
//         name: "Fantasy Seal",
//         pp: 20,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         onEffectiveness: function (typeMod, type) {
//             if (type === 'Dark' || type === 'Ghost') return 1;
//         },
//         secondary: false,
//         target: "normal",
//         type: "Flying",
//         zMovePower: 140,
//     },
//     "genkigirl": {
//         num: 40011,
//         accuracy: true,
//         basePower: 0,
//         category: "Status",
//         desc: "The user restores 1/2 of its maximum HP, rounded half up. The user is healed of major status conditions.",
//         shortDesc: "Heals the user by 50% of its max HP. Major status conditions healed.",
//         id: "genkigirl",
//         isViable: true,
//         name: "Genki Girl",
//         pp: 10,
//         priority: 0,
//         flags: {snatch: 1, heal: 1},
//         heal: [1, 2],
//         onHit: function (pokemon) {
//             if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
//             pokemon.cureStatus();
//         },
//         secondary: false,
//         target: "self",
//         type: "Fairy",
//         zMoveEffect: 'clearnegativeboost',
//     },
//         "masterspark": {
//         num: 40012,
//         accuracy: 100,
//         basePower: 100,
//         category: "Special",
//         desc: "Has a 30% chance to lower the target's Special Defense by 1 stage.",
//         shortDesc: "30% chance to lower the target's Sp. Def by 1.",
//         id: "masterspark",
//         isViable: true,
//         name: "Master Spark",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         secondary: {
//             chance: 30,
//             boosts: {
//                 spd: -1,
//             },
//         },
//         target: "normal",
//         type: "Electric",
//         zMovePower: 180,
//     },
//     "pipewarp": {
//         num: 40013,
//         accuracy: 100,
//         basePower: 130,
//         category: "Special",
//         desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes.",
//         shortDesc: "Physical if user's Atk > Sp. Atk.",
//         id: "pipewarp",
//         isViable: true,
//         name: "Pipe Warp",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         onModifyMove: function (move, pokemon) {
//             if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
//         },
//         secondary: false,
//         target: "normal",
//         type: "Steel",
//         zMovePower: 195,
//     },
//     "chaosenergy": {
//         num: 40014,
//         accuracy: true,
//         basePower: 130,
//         category: "Special",
//         desc: "This move cannot be used successfully unless the user's current form, while considering Transform, is Sonic. If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
//         shortDesc: "Sonic: Breaks protection.",
//         id: "chaosenergy",
//         isViable: true,
//         name: "Chaos Energy",
//         pp: 5,
//         priority: 0,
//         flags: {mirror: 1, authentic: 1},
//         breaksProtect: true,
//         onTry: function (pokemon) {
//             if (pokemon.template.species === 'Sonic') {
//                 return;
//             }
//             this.add('-hint', "Only a Pokemon whose form is Sonic can use this move.");
//             if (pokemon.template.species === 'Hoopa') {
//                 this.add('-fail', pokemon, 'move: Chaos Energy', '[forme]');
//                 return null;
//             }
//             this.add('-fail', pokemon, 'move: Chaos Energy');
//             return null;
//         },
//         secondary: false,
//         target: "normal",
//         type: "Normal",
//         zMovePower: 195,
//     },
//     "leafviolin": {
//         num: 40015,
//         accuracy: 100,
//         basePower: 110,
//         category: "Special",
//         desc: "20% chance to raise Sp. Def by 1 stage.",
//         shortDesc: "20% chance to raise Sp. Def by 1. Hits adjacent foes.",
//         id: "leafviolin",
//         isViable: true,
//         name: "Leaf Violin",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
//         secondary: {
//             chance: 20,
//             self: {
//                 boosts: {
//                     spd: 1,
//                 },
//             },
//         },
//         target: "allAdjacentFoes",
//         type: "Grass",
//         zMovePower: 175,
//         contestType: "Cool",
//     },
//         "hammerthrow": {
//         num: 40016,
//         accuracy: 100,
//         basePower: 90,
//         category: "Physical",
//         desc: "Has a 30% chance to burn the target.",
//         shortDesc: "30% chance to burn the target.",
//         id: "hammerthrow",
//         isViable: true,
//         name: "Hammer Throw",
//         pp: 15,
//         priority: 0,
//         flags: {protect: 1, mirror: 1,},
//         thawsTarget: true,
//         secondary: {
//             chance: 30,
//             status: 'brn',
//         },
//         target: "normal",
//         type: "Flying",
//         zMovePower: 175,
//     },
//         "hammerbarrage": {
//         num: 40017,
//         accuracy: 100,
//         basePower: 20,
//         category: "Physical",
//         desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit five times.",
//         shortDesc: "Hits 2-5 times in one turn.",
//         id: "hammerbarrage",
//         isViable: true,
//         name: "Hammer Barrage",
//         pp: 30,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         multihit: [2, 5],
//         secondary: false,
//         target: "normal",
//         type: "Rock",
//         zMovePower: 140,
//     },
//     "pinktyphoon": {
//         num: 40018,
//         accuracy: 85,
//         basePower: 100,
//         category: "Physical",
//         desc: "Has a 30% chance to confuse the target.",
//         shortDesc: "30% chance to confuse the target.",
//         id: "pinktyphoon",
//         name: "Pink Typhoon",
//         pp: 15,
//         priority: 0,
//         flags: {contact: 1, protect: 1, mirror: 1},
//         secondary: {
//             chance: 30,
//             volatileStatus: 'confusion',
//         },
//         target: "normal",
//         type: "Fairy",
//         zMovePower: 180,
//     },
//         "vanish": {
//         num: 40019,
//         accuracy: true,
//         basePower: 100,
//         category: "Physical",
//         desc: "If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. Only Zelda-Sheik or pokemon in the form of Zelda-Shiek may use this move.",
//         shortDesc: "Breaks the target's protection for this turn. Only usable on Zelda-Shiek.",
//         id: "vanish",
//         name: "Vanish",
//         pp: 5,
//         priority: 0,
//         flags: {mirror: 1, authentic: 1},
//         onTry: function (pokemon) {
//             if (pokemon.template.species === 'Zelda-Shiek') {
//                 return;
//             }
//             this.add('-hint', "Only a Pokemon whose form is Zelda-Shiek can use this move.");
//             if (pokemon.template.species === 'Zelda') {
//                 this.add('-fail', pokemon, 'move: Vanish', '[forme]');
//                 return null;
//             }
//             this.add('-fail', pokemon, 'move: Vanish');
//             return null;
//         },
//         breaksProtect: true,
//         secondary: false,
//         target: "normal",
//         type: "Psychic",
//         zMovePower: 180,
//     },
//     "warlockpunch": {
//         num: 40020,
//         accuracy: 100,
//         basePower: 110,
//         category: "Physical",
//         desc: "Has a 32% chance to flinch the target.",
//         shortDesc: "20% chance to flinch the target.",
//         id: "warlockpunch",
//         isViable: true,
//         name: "Warlock Punch",
//         pp: 10,
//         priority: 0,
//         flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
//         secondary: {
//             chance: 20,
//             volatileStatus: 'flinch',
//         },
//         target: "normal",
//         type: "Dark",
//         zMovePower: 185,
//     },
//     "crossslash": {
//         num: 40021,
//         accuracy: 90,
//         basePower: 30,
//         category: "Physical",
//         desc: "Hits two to four times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Ability Skill Link, this move will always hit four times.",
//         shortDesc: "Hits 2-4 times in one turn.",
//         id: "crossslash",
//         name: "Cross Slash",
//         pp: 20,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         multihit: [2, 4],
//         secondary: false,
//         target: "normal",
//         type: "Steel",
//         zMovePower: 140,
//     },
//     "thundaga": {
//         num: 40022,
//         accuracy: 100,
//         basePower: 80,
//         category: "Special",
//         desc: "No additional effect.",
//         shortDesc: "No additional effect.",
//         id: "thundaga",
//         isViable: true,
//         name: "Thundaga",
//         pp: 15,
//         priority: 0,
//         flags: {protect: 1,mirror: 1},
//         secondary: false,
//         target: "any",
//         type: "Electric",
//         zMovePower: 160,
//     },
//     "firaga": {
//         num: 40023,
//         accuracy: 100,
//         basePower: 80,
//         category: "Special",
//         desc: "No additional effect.",
//         shortDesc: "No additional effect.",
//         id: "firaga",
//         isViable: true,
//         name: "Firaga",
//         pp: 15,
//         priority: 0,
//         flags: {protect: 1,mirror: 1},
//         secondary: false,
//         target: "any",
//         type: "Fire",
//         zMovePower: 160,
//     },
//     "blizzaga": {
//         num: 40024,
//         accuracy: 100,
//         basePower: 80,
//         category: "Special",
//         desc: "No additional effect.",
//         shortDesc: "No additional effect.",
//         id: "blizzaga",
//         isViable: true,
//         name: "Blizzaga",
//         pp: 15,
//         priority: 0,
//         flags: {protect: 1,mirror: 1},
//         secondary: false,
//         target: "any",
//         type: "Ice",
//         zMovePower: 160,
//     },
//     "cannonballblast": {
//         num: 40026,
//         accuracy: 100,
//         basePower: 140,
//         category: "Physical",
//         desc: "Has a 10% chance to flinch the target.",
//         shortDesc: "10% chance to flinch the target.",
//         id: "cannonballblast",
//         isViable: true,
//         name: "Cannonball Blast",
//         pp: 10,
//         priority: 0,
//         flags: {protect: 1, mirror: 1},
//         secondary: {
//             chance: 10,
//             volatileStatus: 'flinch',
//         },
//         target: "normal",
//         type: "Steel",
//         zMovePower: 200,
//     },
};

exports.BattleMovedex = BattleMovedex;
