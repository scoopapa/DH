'use strict';

exports.BattleMovedex = {
	"fishiousrend": {
		num: 755,
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.willMove(target)) {
				this.debug('Fishious Rend damage boost');
				return move.basePower * 2;
			}
			this.debug('Fishious Rend NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		desc: "If the user moves before the target, this move's power is doubled.",
		shortDesc: "Double power if the user moves first.",
		id: "fishiousrend",
		isViable: true,
		name: "Fishious Rend",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	"fly": {
		num: 19,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Gust, Hurricane, Sky Uppercut, Smack Down, Thousand Arrows, Thunder, and Twister, and Gust and Twister have doubled power when used against it. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Flies up on first turn, then strikes the next turn.",
		id: "fly",
		name: "Fly",
		pp: 15,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id) || attacker.types.includes('Flying')) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		effect: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['gust', 'twister', 'skyuppercut', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Clever",
	},
//------------------------------------------------------ Dynamax Moves ------------------------------------------------------------------
	"maxairstream": {
		num: 766,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Boosts the user and its allies' Speed by 1 stage, but lowers Atk and SpA one stage. BP scales with the base move's BP.",
		shortDesc: "User/allies: +1 Spe. BP scales w/ base move.",
		id: "maxairstream",
		name: "Max Airstream",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					this.boost( {spe: 1,
								spa: -1,
								atk: -1},
								pokemon );
				}
			},
		},
		target: "adjacentFoe",
		type: "Flying",
		contestType: "Cool",
	},
	"maxdarkness": {
		num: 766,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Lowers all the opposing Pokemon's Special Defense by 1 stage, but subjects user's team to Torment. BP scales with the base move's BP.",
		shortDesc: "Foes: -1 Sp.Def. BP scales with base move's BP.",
		id: "maxdarkness",
		name: "Max Darkness",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.foe.active) {
					this.boost({spd: -1}, pokemon);
				}
				for (let pokemon of source.side.active) {
					pokemon.addVolatile('torment');
				}
			},
		},
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	"maxflare": {
		num: 757,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		desc: "Summons Sunny Day, but Incinerates the user's item. BP scales with the base move's BP.",
		shortDesc: "Sets Sun. BP scales with base move's BP.",
		id: "maxflare",
		isViable: true,
		name: "Max Flare",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setWeather('sunnyday');
			},
		},
		onAfterHit(target, source) {
			if (source.hp) {
				let item = source.takeItem();
				if (item) {
					this.add('-enditem', source, item.name, '[from] move: Max Flare', '[of] ' + source);
				}
			}
		},
		target: "adjacentFoe",
		type: "Fire",
		contestType: "Cool",
	},
	"maxflutterby": {
		num: 758,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Lowers all the opposing Pokemon's Special Attack by 1 stage, but lowers Special Defense. BP scales with the base move's BP.",
		shortDesc: "Foes: -1 Sp.Atk. BP scales with base move's BP.",
		id: "maxflutterby",
		name: "Max Flutterby",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.foe.active) {
					this.boost({spa: -1}, pokemon);
				}
				for (let pokemon of source.side.active) {
					this.boost( {spd: -1}, pokemon );
				}
			},
		},
		target: "adjacentFoe",
		type: "Bug",
		contestType: "Cool",
	},
	"maxgeyser": {
		num: 757,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Summons Rain Dance, but lowers Defense. BP scales with the base move's BP.",
		shortDesc: "Sets Rain. BP scales with base move's BP.",
		id: "maxgeyser",
		name: "Max Geyser",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setWeather('raindance');
				for (let pokemon of source.side.active) {
					this.boost( {def: -1}, pokemon );
				}
			},
		},
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},
	"maxguard": {
		num: 743,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from all attacks made by other Pokemon during this turn. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Prevents all moves from affecting the user this turn.",
		id: "maxguard",
		isViable: true,
		name: "Max Guard",
		pp: 5,
		priority: 4,
		flags: {},
		isMax: true,
		stallingMove: true,
		volatileStatus: 'maxguard',
		onPrepareHit(pokemon) {
			return !!this.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Max Guard');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				this.add('-activate', target, 'move: Max Guard');
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cool",
	},
	"maxhailstorm": {
		num: 763,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Summons Hail, but clears away user's stat boosts. BP scales with the base move's BP.",
		shortDesc: "Sets Hail. BP scales with base move's BP.",
		id: "maxhailstorm",
		name: "Max Hailstorm",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setWeather('hail');
				this.add('-clearboost', source);
			},
		},
		target: "adjacentFoe",
		type: "Ice",
		contestType: "Cool",
	},
	"maxknuckle": {
		num: 761,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Boosts the user and its allies' Attack by 1 stage, by user takes 50% recoil damage. BP scales with the base move's BP.",
		shortDesc: "User/allies: +1 Atk. BP scales w/ base move.",
		id: "maxknuckle",
		name: "Max Knuckle",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					this.boost({atk: 1}, pokemon);
				}
			},
		},
		recoil: [50, 100],
		target: "adjacentFoe",
		type: "Fighting",
		contestType: "Cool",
	},
	"maxlightning": {
		num: 759,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Summons Electric Terrain, but user takes 33% recoil damage. BP scales with the base move's BP.",
		shortDesc: "Sets Electric Terrain. BP scales with base move's BP.",
		id: "maxlightning",
		name: "Max Lightning",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setTerrain('electricterrain');
			},
		},
		recoil: [33, 100],
		target: "adjacentFoe",
		type: "Electric",
		contestType: "Cool",
	},
	"maxmindstorm": {
		num: 769,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Summons Psychic Terrain. User must recharge after Dynamax ends. BP scales with the base move's BP.",
		shortDesc: "Sets Psychic Terrain. BP scales with base move's BP.",
		id: "maxmindstorm",
		name: "Max Mindstorm",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setTerrain('psychicterrain');
				source.usedMindstorm = true;
			},
		},
		target: "adjacentFoe",
		type: "Psychic",
		contestType: "Cool",
	},
	"maxooze": {
		num: 764,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Boosts the user and its allies' Special Attack by 1 stage. User is badly poisoned regardless of typing. BP scales with the base move's BP.",
		shortDesc: "User/allies: +1 SpA. BP scales w/ base move.",
		id: "maxooze",
		name: "Max Ooze",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(target, source, move) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					this.boost({spa: 1}, pokemon);
				}
				if ( !source.status ){
					source.setStatus( 'tox', source, move, true );
				}
			},
		},
		target: "adjacentFoe",
		type: "Poison",
		contestType: "Cool",
	},
	"maxovergrowth": {
		num: 773,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Summons Grassy Terrain. BP scales with the base move's BP.",
		shortDesc: "Sets Grassy Terrain. BP scales with base move's BP.",
		id: "maxovergrowth",
		name: "Max Overgrowth",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setTerrain('grassyterrain');
				source.addVolatile( 'leechseed' );
			},
		},
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	"maxphantasm": {
		num: 762,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Lowers all the opposing Pokemon's Defense by 1 stage. BP scales with the base move's BP.",
		shortDesc: "Foes: -1 Defense. BP scales with base move's BP.",
		id: "maxphantasm",
		name: "Max Phantasm",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.foe.active) {
					this.boost({def: -1}, pokemon);
				}
				source.addVolatile('curse');
			},
		},
		target: "adjacentFoe",
		type: "Ghost",
		contestType: "Cool",
	},
	"maxquake": {
		num: 771,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Boosts the user and its allies' Special Defense by 1 stage. BP scales with the base move's BP.",
		shortDesc: "User/allies: +1 SpD. BP scales w/ base move.",
		id: "maxquake",
		name: "Max Quake",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					this.boost({spd: 1, accuracy: -1}, pokemon);
				}
			},
		},
		target: "adjacentFoe",
		type: "Ground",
		contestType: "Cool",
	},
	"maxrockfall": {
		num: 770,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Summons Sandstorm. BP scales with the base move's BP.",
		shortDesc: "Sets Sandstorm. BP scales with base move's BP.",
		id: "maxrockfall",
		name: "Max Rockfall",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setWeather('sandstorm');
				for (let pokemon of source.side.active) {
					this.boost({atk: -1}, pokemon);
				}
			},
		},
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Cool",
	},
	"maxstarfall": {
		num: 767,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Summons Misty Terrain. BP scales with the base move's BP.",
		shortDesc: "Sets Misty Terrain. BP scales with base move's BP.",
		id: "maxstarfall",
		name: "Max Starfall",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setTerrain('mistyterrain');
				for (let pokemon of source.side.active) {
					this.boost({spa: -1}, pokemon);
				}
			},
		},
		target: "adjacentFoe",
		type: "Fairy",
		contestType: "Cool",
	},
	"maxsteelspike": {
		num: 774,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Boosts the user and its allies' Defense by 1 stage. BP scales with the base move's BP.",
		shortDesc: "User/allies: +1 Def. BP scales w/ base move.",
		id: "maxsteelspike",
		name: "Max Steelspike",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					this.boost({def: 1, spe: -1}, pokemon);
				}
			},
		},
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	"maxstrike": {
		num: 760,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Lowers all the opposing Pokemon's Speed by 1 stage. BP scales with the base move's BP.",
		shortDesc: "Foes: -1 Speed. BP scales with base move's BP.",
		id: "maxstrike",
		name: "Max Strike",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.foe.active) {
					this.boost({spe: -1}, pokemon);
				}
			},
			volatileStatus: 'maxstrike',
			effect: {
				noCopy: true,
				onStart(pokemon) {
					this.add('-start', pokemon, 'Max Strike');
				},
				onNegateImmunity(pokemon, type) {
					if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
					if (pokemon.hasType('Normal') && ['Ghost'].includes(type)) return false;
				},
			},
		},
		target: "adjacentFoe",
		type: "Normal",
		contestType: "Cool",
	},
	"maxwyrmwind": {
		num: 760,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Lowers all the opposing Pokemon's Attack by 1 stage. BP scales with the base move's BP.",
		shortDesc: "Foes: -1 Attack. BP scales with base move's BP.",
		id: "maxwyrmwind",
		name: "Max Wyrmwind",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.foe.active) {
					this.boost({atk: -1}, pokemon);
				}
				source.addVolatile('confusion');
			},
		},
		target: "adjacentFoe",
		type: "Dragon",
		contestType: "Cool",
	},
//------------------------------------------------------ Gigantamax Moves ------------------------------------------------------------------
	"gmaxbefuddle": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Sleeps, poisons, or paralyzes opponent(s). Base Power scales with the base move's Base Power.",
		shortDesc: "Foes: SLP/PSN/PAR. BP scales with base move.",
		id: "gmaxbefuddle",
		isNonstandard: "Unobtainable",
		name: "G-Max Befuddle",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Butterfree",
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					let result = this.random(3);
					if (result === 0) {
						pokemon.trySetStatus('slp', source);
					} else if (result === 1) {
						pokemon.trySetStatus('par', source);
					} else {
						pokemon.trySetStatus('psn', source);
					}
				}
				for (let pokemon of source.side.active) {
					this.boost( {spd: -1}, pokemon );
				}
			},
		},
		target: "adjacentFoe",
		type: "Bug",
		contestType: "Cool",
	},
	"gmaxcentiferno": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move. Base Power scales with the base move's Base Power.",
		shortDesc: "Traps/damages foes. BP scales w/ base move.",
		id: "gmaxcentiferno",
		isNonstandard: "Unobtainable",
		name: "G-Max Centiferno",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Centiskorch",
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('partiallytrapped', source, this.dex.getActiveMove('G-Max Centiferno'), 'trapper');
				}
			},
		},
		onAfterHit(target, source) {
			if (source.hp) {
				let item = source.takeItem();
				if (item) {
					this.add('-enditem', source, item.name, '[from] move: G-Max Centiferno', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fire",
		contestType: "Cool",
	},
	"gmaxchistrike": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Applies Focus Energy to the user and its allies. Base Power scales with the base move's Base Power.",
		shortDesc: "User side: Focus Energy. BP scales w/ base move.",
		id: "gmaxchistrike",
		isNonstandard: "Unobtainable",
		name: "G-Max Chi Strike",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Machamp",
		self: {
			onHit(source) {
				for (let pokemon of source.side.active) {
					pokemon.addVolatile('focusenergy');
				}
			},
		},
		recoil: [50, 100],
		secondary: null,
		target: "adjacentFoe",
		type: "Fighting",
		contestType: "Cool",
	},
	"gmaxcuddle": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Infatuates opponents. Base Power scales with the base move's Base Power.",
		shortDesc: "Infatuates opponents. BP scales with base move.",
		id: "gmaxcuddle",
		isNonstandard: "Unobtainable",
		name: "G-Max Cuddle",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Eevee",
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('attract');
				}
			},
			volatileStatus: 'maxstrike',
			effect: {
				noCopy: true,
				onStart(pokemon) {
					this.add('-start', pokemon, 'G-Max Cuddle');
				},
				onNegateImmunity(pokemon, type) {
					if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
					if (pokemon.hasType('Normal') && ['Ghost'].includes(type)) return false;
				},
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Normal",
		contestType: "Cool",
	},
	"gmaxdepletion": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Lowers the PP of the opponent(s) last used move. Base Power scales with the base move's Base Power.",
		shortDesc: "Foe: Lowers PP of last move. BP scales w/ base move.",
		id: "gmaxdepletion",
		isNonstandard: "Unobtainable",
		name: "G-Max Depletion",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Duraludon",
		self: {
			onHit(source) {
				source.addVolatile('confusion');
			},
			onAfterHit(source) {
				for (let pokemon of source.side.foe.active) {
					const move = pokemon.lastMove;
					if (move && !move.isZ && !move.isMax) {
						let ppDeducted = pokemon.deductPP(move.id, 4);
						if (ppDeducted) {
							this.add("-activate", pokemon, 'move: Max Depletion', move.name, ppDeducted);
							return;
						}
					}
					return false;
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Dragon",
		contestType: "Cool",
	},
	"gmaxfinale": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Heals user and allies for 1/6 of their post-Gigantamax max HP. Base Power scales with the base move's Base Power.",
		shortDesc: "Heals user and allies. BP scales with base move.",
		id: "gmaxfinale",
		isNonstandard: "Unobtainable",
		name: "G-Max Finale",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Alcremie",
		self: {
			onAfterHit(source) {
				for (let pokemon of source.side.active) {
					this.heal(pokemon.maxhp / 6, pokemon, source);
				}
			},
			onHit(source) {
				for (let pokemon of source.side.active) {
					this.boost({spa: -1}, pokemon);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fairy",
		contestType: "Cool",
	},
	"gmaxfoamburst": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Lowers the Speed of opponents by 2 stages. Base Power scales with the base move's Base Power.",
		shortDesc: "Foes: -2 Speed. BP scales with base move's BP.",
		id: "gmaxfoamburst",
		isNonstandard: "Unobtainable",
		name: "G-Max Foam Burst",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Kingler",
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					this.boost({spe: -2}, pokemon);
				}
				for (let pokemon of source.side.active) {
					this.boost( {def: -1}, pokemon );
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},
	"gmaxgoldrush": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Confuses opponents. Base Power scales with the base move's Base Power.",
		shortDesc: "Confuses foes. BP scales with base move's BP.",
		id: "gmaxgoldrush",
		isNonstandard: "Unobtainable",
		name: "G-Max Gold Rush",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Meowth",
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('confusion');
				}
			},
			volatileStatus: 'maxstrike',
			effect: {
				noCopy: true,
				onStart(pokemon) {
					this.add('-start', pokemon, 'G-Max Cuddle');
				},
				onNegateImmunity(pokemon, type) {
					if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
					if (pokemon.hasType('Normal') && ['Ghost'].includes(type)) return false;
				},
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Normal",
		contestType: "Cool",
	},
	"gmaxgravitas": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Summons Gravity. Base Power scales with the base move's Base Power.",
		shortDesc: "Summons Gravity. BP scales with base move.",
		id: "gmaxgravitas",
		isNonstandard: "Unobtainable",
		name: "G-Max Gravitas",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Orbeetle",
		self: {
			pseudoWeather: 'gravity',
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				source.usedMindstorm = true;
			},
		},
		target: "adjacentFoe",
		type: "Psychic",
		contestType: "Cool",
	},
	"gmaxmalodor": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Poisons opponents. Base Power scales with the base move's Base Power.",
		shortDesc: "Poisons opponents. BP scales with base move.",
		id: "gmaxmalodor",
		isNonstandard: "Unobtainable",
		name: "G-Max Malodor",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Garbodor",
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.trySetStatus('psn', source);
				}
				if ( !source.status ){
					source.setStatus( 'tox', source, move, true );
				}
			},
		},
		target: "adjacentFoe",
		type: "Poison",
		contestType: "Cool",
	},
	"gmaxmeltdown": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Applies Torment to opponents. Base Power scales with the base move's Base Power.",
		shortDesc: "Applies Torment to foes. BP scales with base move.",
		id: "gmaxmeltdown",
		isNonstandard: "Unobtainable",
		name: "G-Max Meltdown",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Melmetal",
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('torment');
				}
				for (let pokemon of source.side.active) {
					this.boost({def: 1, spe: -1}, pokemon);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	"gmaxreplenish": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Has a 50% chance of restoring all Berries on the user's side. Base Power scales with the base move's Base Power.",
		shortDesc: "50% restore berries. BP scales w/ base move.",
		id: "gmaxreplenish",
		isNonstandard: "Unobtainable",
		name: "G-Max Replenish",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Snorlax",
		self: {
			onHit(source) {
				if (this.random(2) === 0) return;
				for (let pokemon of source.side.active) {
					if (!pokemon.item && pokemon.lastItem && this.dex.getItem(pokemon.lastItem).isBerry) {
						let item = pokemon.lastItem;
						pokemon.lastItem = '';
						this.add('-item', pokemon, this.dex.getItem(item), '[from] move: G-Max Replenish');
						pokemon.setItem(item);
					}
				}
			},
			volatileStatus: 'maxstrike',
			effect: {
				noCopy: true,
				onStart(pokemon) {
					this.add('-start', pokemon, 'Max Strike');
				},
				onNegateImmunity(pokemon, type) {
					if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
					if (pokemon.hasType('Normal') && ['Ghost'].includes(type)) return false;
				},
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Normal",
		contestType: "Cool",
	},
	"gmaxresonance": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Summons Aurora Veil. Base Power scales with the base move's Base Power.",
		shortDesc: "Summons Aurora Veil. BP scales w/ base move.",
		id: "gmaxresonance",
		isNonstandard: "Unobtainable",
		name: "G-Max Resonance",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Lapras",
		self: {
			sideCondition: 'auroraveil',
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.add('-clearboost', source);
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ice",
		contestType: "Cool",
	},
	"gmaxsandblast": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move. Base Power scales with the base move's Base Power.",
		shortDesc: "Traps/damages foes. BP scales w/ base move.",
		id: "gmaxsandblast",
		isNonstandard: "Unobtainable",
		name: "G-Max Sandblast",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Sandaconda",
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('partiallytrapped', source, this.dex.getActiveMove('G-Max Sandblast'), 'trapper');
				}
				for (let pokemon of source.side.active) {
					this.boost({accuracy: -1}, pokemon);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ground",
		contestType: "Cool",
	},
	"gmaxsmite": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Confuses opponents. Base Power scales with the base move's Base Power.",
		shortDesc: "Confuses opponents. BP scales with base move.",
		id: "gmaxsmite",
		isNonstandard: "Unobtainable",
		name: "G-Max Smite",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Hatterene",
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('confusion', source);
				}
				for (let pokemon of source.side.active) {
					this.boost({spa: -1}, pokemon);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fairy",
		contestType: "Cool",
	},
	"gmaxsnooze": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Has a 50% chance of applying Yawn to the target. Base Power scales with the base move's Base Power.",
		shortDesc: "50% Yawn chance. BP scales w/ base move.",
		id: "gmaxsnooze",
		isNonstandard: "Unobtainable",
		name: "G-Max Snooze",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Grimmsnarl",
		onHit(target) {
			if (target.status || !target.runStatusImmunity('slp')) return;
			if (this.random(2) === 0) return;
			target.addVolatile('yawn');
		},
		onAfterSubDamage(damage, target) {
			if (target.status || !target.runStatusImmunity('slp')) return;
			if (this.random(2) === 0) return;
			target.addVolatile('yawn');
		},
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					pokemon.addVolatile('torment');
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	"gmaxsteelsurge": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Sets a Steel-type entry hazard. Base Power scales with the base move's Base Power.",
		shortDesc: "Sets Steel entry hazard. BP scales w/ base move.",
		id: "gmaxsteelsurge",
		isNonstandard: "Unobtainable",
		name: "G-Max Steelsurge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Copperajah",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxsteelsurge');
				for (let pokemon of source.side.active) {
					this.boost({spe: -1}, pokemon);
				}
			},
		},
		effect: {
			onStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				let typeMod = this.dex.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('G-Max Steelsurge')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	"gmaxstonesurge": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Sets Stealth Rock. Base Power scales with the base move's Base Power.",
		shortDesc: "Sets Stealth Rock. BP scales w/ base move's BP.",
		id: "gmaxstonesurge",
		isNonstandard: "Unobtainable",
		name: "G-Max Stonesurge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Drednaw",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('stealthrock');
				for (let pokemon of source.side.active) {
					this.boost( {def: -1}, source );
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},
	"gmaxstunshock": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Opponents are each randomly paralyzed or poisoned. Base Power scales with the base move's Base Power.",
		shortDesc: "Foe(s): Par/Psn. BP scales with base move's BP.",
		id: "gmaxstunshock",
		isNonstandard: "Unobtainable",
		name: "G-Max Stun Shock",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Toxtricity",
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					let result = this.random(2);
					if (result === 0) {
						pokemon.trySetStatus('par', source);
					} else {
						pokemon.trySetStatus('psn', source);
					}
				}
			},
		},
		recoil: [33, 100],
		secondary: null,
		target: "adjacentFoe",
		type: "Electric",
		contestType: "Cool",
	},
	"gmaxsweetness": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Cures status on user's team. Base Power scales with the base move's Base Power.",
		shortDesc: "Cures team's statuses. BP scales with base move's BP.",
		id: "gmaxsweetness",
		isNonstandard: "Unobtainable",
		name: "G-Max Sweetness",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Appletun",
		self: {
			onHit(source) {
				this.add('-activate', source, 'move: G-Max Sweetness');
				for (const ally of source.side.pokemon) {
					ally.cureStatus();
				}
				source.addVolatile( 'leechseed' );
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	"gmaxtartness": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Lowers opponents' evasion by 1 stage. Base Power scales with the base move's Base Power.",
		shortDesc: "Foe(s): -1 evasion. BP scales with base move's BP.",
		id: "gmaxtartness",
		isNonstandard: "Unobtainable",
		name: "G-Max Tartness",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Flapple",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					this.boost({evasion: -1}, pokemon);
				}
			},
			source.addVolatile( 'leechseed' );
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	"gmaxterror": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Traps opponents. Base Power scales with the base move's Base Power.",
		shortDesc: "Traps foe(s). BP scales with base move's BP.",
		id: "gmaxterror",
		isNonstandard: "Unobtainable",
		name: "G-Max Terror",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Gengar",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.addVolatile('trapped', source, null, 'trapper');
				}
				source.addVolatile('curse');
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ghost",
		contestType: "Cool",
	},
	"gmaxvolcalith": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Damages opponent(s) by 1/8 of their maximum HP for four turns. Base Power scales with the base move's Base Power.",
		shortDesc: "Damages foes for 4 turns. BP scales w/ base move.",
		id: "gmaxvolcalith",
		isNonstandard: "Unobtainable",
		name: "G-Max Volcalith",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Coalossal",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxvolcalith');
				for (let pokemon of source.side.active) {
					this.boost({atk: -1}, pokemon);
				}
			},
		},
		effect: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Volcalith');
			},
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					this.damage(pokemon.baseMaxhp / 8, pokemon);
				}
			},
			onEnd(targetSide) {
				this.add('-sideend', targetSide, 'G-Max Volcalith');
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Cool",
	},
	"gmaxvoltcrash": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Paralyzes opponents. Base Power scales with the base move's Base Power.",
		shortDesc: "Paralyzes foe(s). BP scales with base move's BP.",
		id: "gmaxvoltcrash",
		isNonstandard: "Unobtainable",
		name: "G-Max Volt Crash",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Pikachu",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('par', source);
				}
			},
		},
		recoil: [33, 100],
		secondary: null,
		target: "adjacentFoe",
		type: "Electric",
		contestType: "Cool",
	},
	"gmaxwildfire": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		desc: "Damages non-Fire-type opponent(s) by 1/6 of their maximum HP for four turns. Base Power scales with the base move's Base Power.",
		shortDesc: "Damages foes for 4 turns. BP scales w/ base move.",
		id: "gmaxwildfire",
		isNonstandard: "Unobtainable",
		name: "G-Max Wildfire",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Charizard",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxwildfire');
			},
		},
		effect: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Wildfire');
			},
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Fire')) this.damage(pokemon.baseMaxhp / 6, pokemon);
				}
			},
			onEnd(targetSide) {
				this.add('-sideend', targetSide, 'G-Max Wildfire');
			},
		},
		onAfterHit(target, source) {
			if (source.hp) {
				let item = source.takeItem();
				if (item) {
					this.add('-enditem', source, item.name, '[from] move: Max Flare', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fire",
		contestType: "Cool",
	},
	"gmaxwindrage": {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		// TODO: Test what G-Max Wind Rage actually removes from the field and from which sides
		desc: "Removes Reflect, Light Screen, Aurora Veil, Spikes, Toxic Spikes, Stealth Rock, Sticky Web, Mist, Safeguard, G-Max Steelsurge, and Terrains from the field. This move's Base Power scales with the base move's Base Power.",
		shortDesc: "Clears field. BP scales with base move's BP.",
		id: "gmaxwindrage",
		isNonstandard: "Unobtainable",
		name: "G-Max Wind Rage",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Corviknight",
		self: {
			onHit(source) {
				let success = false;
				let removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', source.side.foe, this.dex.getEffect(targetCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				this.field.clearTerrain();
				for (let pokemon of source.side.active) {
					this.boost( { spa: -1, atk: -1}, pokemon );
				}
				return success;
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Flying",
		contestType: "Cool",
	},
};
