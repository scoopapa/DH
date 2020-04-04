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
		"terraform": {
		shortDesc: " This Pokemon is immune to Ground-type attacks, and raises its highest non-HP stat when hit by one or when it gets a KO.",
		id: "terraform",
		name: "Terraform",
		onTryHit(target, source, move, effect) {
			if (target !== source && move.type === 'Ground') {
				if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				/** @type {StatNameExceptHP} */
				let s;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, source);
			}
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[msg]', '[from] ability: Terraform');
				}
				return null;
			}
		},
		rating: 3.5,
		num: 26,
	},
		"thunderclap": {
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage and restores 1/4 of its maximum HP, rounded down. This Pokemon is immune to Electric-type moves.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else if (target.hasAbility(['Inner Focus', 'Oblivious', 'Own Tempo', 'Scrappy'])) {
					this.add('-immune', target, `[from] ability: ${target.getAbility().name}`);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
					pokemon.heal(pokemon.baseMaxhp / 4);
				}
			}
		},
		id: "thunderclap",
		name: "Thunderclap",
		rating: 3.5,
		num: 22,
	},
		"passionstar": {
		shortDesc: "This Pokemon and its allies' moves have their Attack and accuracy multiplied by 1.1.",
		onAllyModifyMove(move) {
			if (typeof move.accuracy === 'number') {
				move.accuracy *= 1.1;
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1.1);
		},
		onAllyModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1.1);
		},
		id: "passionstar",
		name: "Passion Star",
		rating: 2.5,
		num: 162,
	},
};

exports.BattleAbilities = BattleAbilities;
