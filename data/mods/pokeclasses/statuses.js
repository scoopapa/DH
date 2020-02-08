'use strict';

exports.BattleStatuses = {
	// pokeskills
	blade: {
		name: 'blade',
		id: 'blade',
		num: 0,
		onDisableMove( pokemon ){
			pokemon.disableMove(pokemon.pokeSkill, false, this.effectData.sourceEffect);
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['blade']) {
				return this.chainModify(1.3);
			}
		},
		onFoeBasePowerPriority: 8,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (move.flags['blade']) {
				return this.chainModify(0.5);
			}
		},
	},
	destruction: {
		name: 'destruction',
		id: 'Destruction',
		num: 0,
		onHit(target, source, move) {
			if ( move.type === "Fire" ) source.side.foe.addSideCondition('firestorm');
			if ( move.type === "Ice" ) source.side.foe.addSideCondition('icestorm');
			if ( move.type === "Electric" ) source.side.foe.addSideCondition('thunderstorm');
		},
	},
	//destruction effects
	firestorm: {
		name: 'firestorm',
		id: 'Fire Storm',
		duration: 3,
		onStart(targetSide) {
			this.add('-sidestart', targetSide, 'Destruction');
			if ( targetSide.removeSideCondition( 'thunderstorm' )) this.add('-sideend', targetSide, 'Thunder Storm');
			if ( targetSide.removeSideCondition( 'icestorm' )) this.add('-sideend', targetSide, 'Ice Storm');
		},
		onRestart(targetSide) {
			return false;
		},
		onResidual(targetSide) {
			for (const pokemon of targetSide.active) {
				if (!pokemon.runImmunity('Fire')) this.damage(pokemon.baseMaxhp / 8, pokemon);
			}
		},
		onEnd(targetSide) {
			this.add('-sideend', targetSide, 'G-Max Wildfire');
		},
	},
	icestorm: {
		name: 'icestorm',
		id: 'Ice Storm',
		duration: 3,
		onStart(targetSide) {
			this.add('-sidestart', targetSide, 'Destruction');
			if ( targetSide.removeSideCondition( 'thunderstorm' )) this.add('-sideend', targetSide, 'Thunder Storm');
			if ( targetSide.removeSideCondition( 'firestorm' )) this.add('-sideend', targetSide, 'Fire Storm');
		},
		onRestart(targetSide) {
			return false;
		},
		onResidual(targetSide) {
			for (const pokemon of targetSide.active) {
				if (!pokemon.runImmunity('Ice')) this.damage(pokemon.baseMaxhp / 8, pokemon);
			}
		},
		onEnd(targetSide) {
			this.add('-sideend', targetSide, 'G-Max Wildfire');
		},
	},
	thunderstorm: {
		name: 'thunderstorm',
		id: 'Thunder Storm',
		duration: 3,
		onStart(targetSide) {
			this.add('-sidestart', targetSide, 'Destruction');
			if ( targetSide.removeSideCondition( 'firestorm' )) this.add('-sideend', targetSide, 'Fire Storm');
			if ( targetSide.removeSideCondition( 'icestorm' )) this.add('-sideend', targetSide, 'Ice Storm');
		},
		onRestart(targetSide) {
			return false;
		},
		onResidual(targetSide) {
			for (const pokemon of targetSide.active) {
				if (!pokemon.runImmunity('Electric')) this.damage(pokemon.baseMaxhp / 8, pokemon);
			}
		},
		onEnd(targetSide) {
			this.add('-sideend', targetSide, 'G-Max Wildfire');
		},
	},
};
