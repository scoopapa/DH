export const Abilities: {[k: string]: ModdedAbilityData} = {
	unfiltered: {
	  shortDesc: "Filter + Contrary",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Unfiltered neutralize');
				return this.chainModify(0.75);
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostName;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
	  name: "Unfiltered",
    },
	quickstart: {
	  shortDesc: "On switch-in, this Pokemon's Attack and Speed are doubled for 5 turns.",
		onStart(pokemon) {
			pokemon.addVolatile('quickstart');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quickstart'];
			this.add('-end', pokemon, 'Quickstart', '[silent]');
		},
		condition: {
			duration: 5,
			onStart(target) {
				this.add('-start', target, 'ability: Quickstart');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(target) {
				this.add('-end', target, 'Quickstart');
			},
		},
	  name: "Quickstart",
    },
	holygrail: {
	  shortDesc: "Good As Gold + Levitate",
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Holy Grail');
				return null;
			}
		},
		isBreakable: true,
	  name: "Holy Grail",
    },
	alldevouring: {
	  shortDesc: "Beast Boost + Serene Grace",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
	  name: "All-Devouring",
    },
	galvanicrelay: {
	  shortDesc: "Mycelium Might and Transistor. User's Electric-type attacks ignore abilities and have -1 priority.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Galvanic Relay boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Galvanic Relay boost');
				return this.chainModify(1.5);
			}
		},
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === 'Status' || move.type === 'Electric') {
				return -0.1;
			}
		},
		onModifyMove(move) {
			if (move.category === 'Status' || move.type === 'Electric') {
				move.ignoreAbility = true;
			}
		},
	  name: "Galvanic Relay",
    },
	forestfury: {
	  shortDesc: "Effects of Intimidate and Hyper Cutter",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Forest Fury', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Forest Fury", "[of] " + target);
				}
			}
		},
	  name: "Forest Fury",
    },
	growthspurt: {
	  shortDesc: "Effects of Harvest; Berry is restored at 1/3 or less of its max HP.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.getItem(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Growth Spurt');
				}
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 3 && target.hp + damage > target.maxhp / 3 && !target.item && this.dex.getItem(target.lastItem).isBerry) {
					target.setItem(target.lastItem);
					target.lastItem = '';
					this.add('-item', target, target.getItem(), '[from] ability: Growth Spurt');
			}
		},
	  name: "Growth Spurt",
    },
};
