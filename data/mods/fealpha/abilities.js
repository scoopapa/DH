'use strict';


let BattleAbilities = {
	"pressurebounce": {
		shortDesc: "This Pokemon blocks certain status moves and bounces them back twice to the user.",
		id: "pressurebounce",
		name: "Pressure Bounce",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			let newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		effect: {
			duration: 1,
		},
	},
	"aurevoir": {
		shortDesc: "This Pokemon switches out when it reaches 1/2 or less of its maximum HP and restores 1/3 of its maximum HP, rounded down.",
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			target.heal(target.baseMaxhp / 3);
			this.add('-activate', target, 'ability: Au Revoir');
		},
		id: "aurevoir",
		name: "Au Revoir,
	},
  	"clearcleaner": {
		shortDesc: "Screen Cleaner	+ Clear Body",
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Clear Cleaner');
						activated = true;
					}
					pokemon.side.removeSideCondition(sideCondition);
				}
				if (pokemon.side.foe.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Clear Cleaner');
						activated = true;
					}
					pokemon.side.foe.removeSideCondition(sideCondition);
				}
			}
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(/** @type {ActiveMove} */(effect)).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Clear Cleaner", "[of] " + target);
			}
		},
		id: "clearcleaner",
		name: "Clear Cleaner",
		rating: 2,
		num: 251,
	},
	
};

exports.BattleAbilities = BattleAbilities;
