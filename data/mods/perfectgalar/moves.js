'use strict';

exports.BattleMovedex = {
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
					source.setStatus( 'tox', source, move )
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
};
