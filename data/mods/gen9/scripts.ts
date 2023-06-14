export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
        excludeStandardTiers: true,
	},
	init: function(){
		this.modData('Moves', 'aerialace').flags.slicing = 1;
		this.modData('Moves', 'aircutter').flags.slicing = 1;
		this.modData('Moves', 'airslash').flags.slicing = 1;
		this.modData('Moves', 'aquacutter').flags.slicing = 1;
		this.modData('Moves', 'behemothblade').flags.slicing = 1;
		this.modData('Moves', 'bitterblade').flags.slicing = 1;
		this.modData('Moves', 'ceaselessedge').flags.slicing = 1;
		this.modData('Moves', 'crosspoison').flags.slicing = 1;
		this.modData('Moves', 'cut').flags.slicing = 1;
		this.modData('Moves', 'furycutter').flags.slicing = 1;
		this.modData('Moves', 'kowtowcleave').flags.slicing = 1;
		this.modData('Moves', 'nightslash').flags.slicing = 1;
		this.modData('Moves', 'populationbomb').flags.slicing = 1;
		this.modData('Moves', 'psychocut').flags.slicing = 1;
		this.modData('Moves', 'razorleaf').flags.slicing = 1;
		this.modData('Moves', 'razorshell').flags.slicing = 1;
		this.modData('Moves', 'sacredsword').flags.slicing = 1;
		this.modData('Moves', 'slash').flags.slicing = 1;
		this.modData('Moves', 'solarblade').flags.slicing = 1;
		this.modData('Moves', 'stoneaxe').flags.slicing = 1;
		this.modData('Moves', 'xscissor').flags.slicing = 1;
		
		this.modData('Moves', 'aircutter').flags.wind = 1;
		this.modData('Moves', 'bleakwindstorm').flags.wind = 1;
		this.modData('Moves', 'blizzard').flags.wind = 1;
		this.modData('Moves', 'fairywind').flags.wind = 1;
		this.modData('Moves', 'gust').flags.wind = 1;
		this.modData('Moves', 'heatwave').flags.wind = 1;
		this.modData('Moves', 'hurricane').flags.wind = 1;
		this.modData('Moves', 'icywind').flags.wind = 1;
		this.modData('Moves', 'petalblizzard').flags.wind = 1;
		this.modData('Moves', 'sandsearstorm').flags.wind = 1;
		this.modData('Moves', 'sandstorm').flags.wind = 1;
		this.modData('Moves', 'springtidestorm').flags.wind = 1;
		this.modData('Moves', 'tailwind').flags.wind = 1;
		this.modData('Moves', 'twister').flags.wind = 1;
		this.modData('Moves', 'whirlwind').flags.wind = 1;
		this.modData('Moves', 'wildboltstorm').flags.wind = 1;
	},
	// For Loaded Dice and Rage Fist
	hitStepMoveHitLoop(targets, pokemon, move) { // Temporary name
		const damage: (number | boolean | undefined)[] = [];
		for (const i of targets.keys()) {
			damage[i] = 0;
		}
		move.totalDamage = 0;
		pokemon.lastDamage = 0;
		let targetHits = move.multihit || 1;
		if (Array.isArray(targetHits)) {
			// yes, it's hardcoded... meh
			if (targetHits[0] === 2 && targetHits[1] === 5) {
				if (this.gen >= 5) {
					// 35-35-15-15 out of 100 for 2-3-4-5 hits
					targetHits = this.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
					if (targetHits < 4 && pokemon.hasItem('loadeddice')) {
						targetHits = 5 - this.random(2);
					}
				} else {
					targetHits = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
				}
			} else {
				targetHits = this.random(targetHits[0], targetHits[1] + 1);
			}
		}
		targetHits = Math.floor(targetHits);
		let nullDamage = true;
		let moveDamage: (number | boolean | undefined)[];
		// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
		const isSleepUsable = move.sleepUsable || this.dex.getMove(move.sourceEffect).sleepUsable;

		let targetsCopy: (Pokemon | false | null)[] = targets.slice(0);
		let hit: number;
		for (hit = 1; hit <= targetHits; hit++) {
			if (damage.includes(false)) break;
			if (hit > 1 && pokemon.status === 'slp' && !isSleepUsable) break;
			if (targets.every(target => !target || !target.hp)) break;
			move.hit = hit;
			if (move.smartTarget && targets.length > 1) {
				targetsCopy = [targets[hit - 1]];
			} else {
				targetsCopy = targets.slice(0);
			}
			const target = targetsCopy[0]; // some relevant-to-single-target-moves-only things are hardcoded
			if (target && typeof move.smartTarget === 'boolean') {
				if (hit > 1) {
					this.addMove('-anim', pokemon, move.name, target);
				} else {
					this.retargetLastMove(target);
				}
			}

			// like this (Triple Kick)
			if (target && move.multiaccuracy && hit > 1) {
				let accuracy = move.accuracy;
				const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
				if (accuracy !== true) {
					if (!move.ignoreAccuracy) {
						const boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
						const boost = this.clampIntRange(boosts['accuracy'], -6, 6);
						if (boost > 0) {
							accuracy *= boostTable[boost];
						} else {
							accuracy /= boostTable[-boost];
						}
					}
					if (!move.ignoreEvasion) {
						const boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
						const boost = this.clampIntRange(boosts['evasion'], -6, 6);
						if (boost > 0) {
							accuracy /= boostTable[boost];
						} else if (boost < 0) {
							accuracy *= boostTable[-boost];
						}
					}
				}
				accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
				if (!move.alwaysHit) {
					accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
					if (accuracy !== true && !this.randomChance(accuracy, 100)) break;
				}
			}

			const moveData = move;
			if (!moveData.flags) moveData.flags = {};

			// Modifies targetsCopy (which is why it's a copy)
			[moveDamage, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);

			if (!moveDamage.some(val => val !== false)) break;
			nullDamage = false;

			for (const [i, md] of moveDamage.entries()) {
				// Damage from each hit is individually counted for the
				// purposes of Counter, Metal Burst, and Mirror Coat.
				damage[i] = md === true || !md ? 0 : md;
				// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
				move.totalDamage += damage[i] as number;
			}
			if (move.mindBlownRecoil) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Mind Blown'), true);
				move.mindBlownRecoil = false;
			}
			this.eachEvent('Update');
			if (!pokemon.hp && targets.length === 1) {
				hit++; // report the correct number of hits for multihit moves
				break;
			}
		}
		// hit is 1 higher than the actual hit count
		if (hit === 1) return damage.fill(false);
		if (nullDamage) damage.fill(false);
		if (move.multihit && typeof move.smartTarget !== 'boolean') {
			this.add('-hitcount', targets[0], hit - 1);
		}

		if (move.recoil && move.totalDamage) {
			this.damage(this.calcRecoilDamage(move.totalDamage, move), pokemon, pokemon, 'recoil');
		}

		if (move.struggleRecoil) {
			let recoilDamage;
			if (this.dex.gen >= 5) {
				recoilDamage = this.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
			} else {
				recoilDamage = this.trunc(pokemon.maxhp / 4);
			}
			this.directDamage(recoilDamage, pokemon, pokemon, {id: 'strugglerecoil'} as Condition);
		}

		// smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
		if (move.smartTarget) targetsCopy = targets.slice(0);
		for (const [i, target] of targetsCopy.entries()) {
			if (target && pokemon !== target) {
				target.gotAttacked(move, damage[i] as number | false | undefined, pokemon);
				if (typeof damage[i] === 'number') {
					if (!target.m.timesAttacked) target.m.timesAttacked = 0;
					target.m.timesAttacked += hit - 1;
				}
			}
		}
		
		if (move.ohko && !targets[0].hp) this.add('-ohko');

		if (!damage.some(val => !!val || val === 0)) return damage;

		this.eachEvent('Update');

		this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val) as Pokemon[], pokemon, move);

		if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
			for (const [i, d] of damage.entries()) {
				// There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
				// The previous check was for `move.multihit`, but that fails for Dragon Darts
				const curDamage = targets.length === 1 ? move.totalDamage : d;
				if (typeof curDamage === 'number' && targets[i].hp) {
					const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
					if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
						this.runEvent('EmergencyExit', targets[i], pokemon);
					}
				}
			}
		}
		return damage;
	},
	// For Shed Tail
	switchIn(pokemon: Pokemon, pos: number, sourceEffect: Effect | null = null, isDrag?: boolean) {
		if (!pokemon || pokemon.isActive) {
			this.hint("A switch failed because the Pokémon trying to switch in is already in.");
			return false;
		}

		const side = pokemon.side;
		if (pos >= side.active.length) {
			console.log(this.getDebugLog());
			throw new Error(`Invalid switch position ${pos} / ${side.active.length}`);
		}
		const oldActive = side.active[pos];
		const unfaintedActive = oldActive?.hp ? oldActive : null;
		if (unfaintedActive) {
			oldActive.beingCalledBack = true;
			let switchCopyFlag: 'copyvolatile' | 'shedtail' | boolean = false;
			if (sourceEffect && typeof (sourceEffect as Move).selfSwitch === 'string') {
				switchCopyFlag = (sourceEffect as Move).selfSwitch!;
			}
			if (!oldActive.skipBeforeSwitchOutEventFlag && !isDrag) {
				this.runEvent('BeforeSwitchOut', oldActive);
				if (this.gen >= 5) {
					this.eachEvent('Update');
				}
			}
			oldActive.skipBeforeSwitchOutEventFlag = false;
			if (!this.runEvent('SwitchOut', oldActive)) {
				// Warning: DO NOT interrupt a switch-out if you just want to trap a pokemon.
				// To trap a pokemon and prevent it from switching out, (e.g. Mean Look, Magnet Pull)
				// use the 'trapped' flag instead.

				// Note: Nothing in the real games can interrupt a switch-out (except Pursuit KOing,
				// which is handled elsewhere); this is just for custom formats.
				return false;
			}
			if (!oldActive.hp) {
				// a pokemon fainted from Pursuit before it could switch
				return 'pursuitfaint';
			}

			// will definitely switch out at this point

			oldActive.illusion = null;
			this.singleEvent('End', oldActive.getAbility(), oldActive.abilityData, oldActive);

			// if a pokemon is forced out by Whirlwind/etc or Eject Button/Pack, it can't use its chosen move
			this.queue.cancelAction(oldActive);

			let newMove = null;
			if (this.gen === 4 && sourceEffect) {
				newMove = oldActive.lastMove;
			}
			if (switchCopyFlag) {
				switchCopyFlag = false;
				pokemon.copyVolatileFrom(oldActive);
			}
			if (newMove) pokemon.lastMove = newMove;
			oldActive.clearVolatile();
		}
		if (oldActive) {
			oldActive.isActive = false;
			oldActive.isStarted = false;
			oldActive.usedItemThisTurn = false;
			oldActive.position = pokemon.position;
			pokemon.position = pos;
			side.pokemon[pokemon.position] = pokemon;
			side.pokemon[oldActive.position] = oldActive;
		}
		pokemon.isActive = true;
		side.active[pos] = pokemon;
		pokemon.activeTurns = 0;
		pokemon.activeMoveActions = 0;
		for (const moveSlot of pokemon.moveSlots) {
			moveSlot.used = false;
		}
		this.runEvent('BeforeSwitchIn', pokemon);
		this.add(isDrag ? 'drag' : 'switch', pokemon, pokemon.getDetails);
		if (isDrag && this.gen === 2) pokemon.draggedIn = this.turn;
		if (sourceEffect) this.log[this.log.length - 1] += `|[from]${sourceEffect.fullname}`;
		pokemon.previouslySwitchedIn++;

		this.queue.insertChoice({choice: 'runUnnerve', pokemon});
		if (isDrag && this.gen >= 5) {
			// runSwitch happens immediately so that Mold Breaker can make hazards bypass Clear Body and Levitate
			this.runSwitch(pokemon);
		} else {
			this.queue.insertChoice({choice: 'runSwitch', pokemon});
		}

		return true;
	},
	
	side: {
		// For Revival Blessing Part 1
		getChoice() {
			if (this.choice.actions.length > 1 && this.choice.actions.every(action => action.choice === 'team')) {
				return `team ` + this.choice.actions.map(action => action.pokemon!.position + 1).join(', ');
			}
			return this.choice.actions.map(action => {
				switch (action.choice) {
				case 'move':
					let details = ``;
					if (action.targetLoc && this.active.length > 1) details += ` ${action.targetLoc > 0 ? '+' : ''}${action.targetLoc}`;
					if (action.mega) details += (action.pokemon!.item === 'ultranecroziumz' ? ` ultra` : ` mega`);
					if (action.zmove) details += ` zmove`;
					if (action.maxMove) details += ` dynamax`;
					return `move ${action.moveid}${details}`;
				case 'switch':
				case 'instaswitch':
					return `switch ${action.target!.position + 1}`;
				case 'revivalblessing':
					return `switch ${action.target!.position + 1}`;
				case 'team':
					return `team ${action.pokemon!.position + 1}`;
				default:
					return action.choice;
				}
			}).join(', ');
		},
		// For Revival Blessing Part 2
		chooseSwitch(slotText?: string) {
			if (this.requestState !== 'move' && this.requestState !== 'switch') {
				return this.emitChoiceError(`Can't switch: You need a ${this.requestState} response`);
			}
			const index = this.getChoiceIndex();
			if (index >= this.active.length) {
				if (this.requestState === 'switch') {
					return this.emitChoiceError(`Can't switch: You sent more switches than Pokémon that need to switch`);
				}
				return this.emitChoiceError(`Can't switch: You sent more choices than unfainted Pokémon`);
			}
			const pokemon = this.active[index];
			let slot;
			if (!slotText) {
				if (this.requestState !== 'switch') {
					return this.emitChoiceError(`Can't switch: You need to select a Pokémon to switch in`);
				}
				if (this.slotConditions[pokemon.position]['revivalblessing']) {
					slot = 0;
					while (!this.pokemon[slot].fainted) slot++;
				} else {
					if (!this.choice.forcedSwitchesLeft) return this.choosePass();
					slot = this.active.length;
					while (this.choice.switchIns.has(slot) || this.pokemon[slot].fainted) slot++;
				}
			} else {
				slot = parseInt(slotText!) - 1;
			}
			if (isNaN(slot) || slot < 0) {
				// maybe it's a name/species id!
				slot = -1;
				for (const [i, mon] of this.pokemon.entries()) {
					if (slotText!.toLowerCase() === mon.name.toLowerCase() || Dex.toID(slotText) === mon.species.id) {
						slot = i;
						break;
					}
				}
				if (slot < 0) {
					return this.emitChoiceError(`Can't switch: You do not have a Pokémon named "${slotText}" to switch to`);
				}
			}
			if (slot >= this.pokemon.length) {
				return this.emitChoiceError(`Can't switch: You do not have a Pokémon in slot ${slot + 1} to switch to`);
			} else if (slot < this.active.length && !this.slotConditions[pokemon.position]['revivalblessing']) {
				return this.emitChoiceError(`Can't switch: You can't switch to an active Pokémon`);
			} else if (this.choice.switchIns.has(slot)) {
				return this.emitChoiceError(`Can't switch: The Pokémon in slot ${slot + 1} can only switch in once`);
			}
			const targetPokemon = this.pokemon[slot];

			if (this.slotConditions[pokemon.position]['revivalblessing']) {
				if (!targetPokemon.fainted) {
						return this.emitChoiceError(`Can't switch: You have to pass to a fainted Pokémon`);
				}
				// Should always subtract, but stop at 0 to prevent errors.
				this.choice.forcedSwitchesLeft = this.battle.clampIntRange(this.choice.forcedSwitchesLeft - 1, 0);
				pokemon.switchFlag = false;
				this.choice.actions.push({
					choice: 'revivalblessing',
					pokemon,
					target: targetPokemon,
				} as ChosenAction);
				return true;
			}

			if (targetPokemon.fainted) {
				return this.emitChoiceError(`Can't switch: You can't switch to a fainted Pokémon`);
			}

			if (this.requestState === 'move') {
				if (pokemon.trapped) {
					const includeRequest = this.updateRequestForPokemon(pokemon, req => {
						let updated = false;
						if (req.maybeTrapped) {
							delete req.maybeTrapped;
							updated = true;
						}
						if (!req.trapped) {
							req.trapped = true;
							updated = true;
						}
						return updated;
					});
					const status = this.emitChoiceError(`Can't switch: The active Pokémon is trapped`, includeRequest);
					if (includeRequest) this.emitRequest(this.activeRequest!);
					return status;
				} else if (pokemon.maybeTrapped) {
					this.choice.cantUndo = this.choice.cantUndo || pokemon.isLastActive();
				}
			} else if (this.requestState === 'switch') {
				if (!this.choice.forcedSwitchesLeft) {
					throw new Error(`Player somehow switched too many Pokemon`);
				}
				this.choice.forcedSwitchesLeft--;
			}

			this.choice.switchIns.add(slot);

			this.choice.actions.push({
				choice: (this.requestState === 'switch' ? 'instaswitch' : 'switch'),
				pokemon,
				target: targetPokemon,
			} as ChosenAction);

			return true;
		}
	},
	queue: {
		// For Revival Blessing Part 2
		resolveAction(action: ActionChoice, midTurn = false): Action[] {
			if (!action) throw new Error(`Action not passed to resolveAction`);
			if (action.choice === 'pass') return [];
			const actions = [action];

			if (!action.side && action.pokemon) action.side = action.pokemon.side;
			if (!action.move && action.moveid) action.move = this.battle.dex.getActiveMove(action.moveid);
			if (!action.order) {
				const orders: {[choice: string]: number} = {
					team: 1,
					start: 2,
					instaswitch: 3,
					beforeTurn: 4,
					beforeTurnMove: 5,
					revivalblessing: 6,

					runUnnerve: 100,
					runSwitch: 101,
					runPrimal: 102,
					switch: 103,
					megaEvo: 104,
					runDynamax: 105,

					shift: 200,
					// default is 200 (for moves)

					residual: 300,
				};
				if (action.choice in orders) {
					action.order = orders[action.choice];
				} else {
					action.order = 200;
					if (!['move', 'event'].includes(action.choice)) {
						throw new Error(`Unexpected orderless action ${action.choice}`);
					}
				}
			}
			if (!midTurn) {
				if (action.choice === 'move') {
					if (!action.maxMove && !action.zmove && action.move.beforeTurnCallback) {
						actions.unshift(...this.resolveAction({
							choice: 'beforeTurnMove', pokemon: action.pokemon, move: action.move, targetLoc: action.targetLoc,
						}));
					}
					if (action.mega) {
						// TODO: Check that the Pokémon is not affected by Sky Drop.
						// (This is currently being done in `runMegaEvo`).
						actions.unshift(...this.resolveAction({
							choice: 'megaEvo',
							pokemon: action.pokemon,
						}));
					}
					if (action.maxMove && !action.pokemon.volatiles['dynamax']) {
						actions.unshift(...this.resolveAction({
							choice: 'runDynamax',
							pokemon: action.pokemon,
						}));
					}
					action.fractionalPriority = this.battle.runEvent('FractionalPriority', action.pokemon, null, action.move, 0);
				} else if (['switch', 'instaswitch'].includes(action.choice)) {
					if (typeof action.pokemon.switchFlag === 'string') {
						action.sourceEffect = this.battle.dex.getMove(action.pokemon.switchFlag as ID) as any;
					}
					action.pokemon.switchFlag = false;
				}
			}

			const deferPriority = this.battle.gen === 7 && action.mega && action.mega !== 'done';
			if (action.move) {
				let target = null;
				action.move = this.battle.dex.getActiveMove(action.move);

				if (!action.targetLoc) {
					target = this.battle.getRandomTarget(action.pokemon, action.move);
					// TODO: what actually happens here?
					if (target) action.targetLoc = this.battle.getTargetLoc(target, action.pokemon);
				}
				action.originalTarget = this.battle.getAtLoc(action.pokemon, action.targetLoc);
			}
			if (!deferPriority) this.battle.getActionSpeed(action);
			return actions as any;
		},
	},
	pokemon: {
		getSwitchRequestData() {
			const entry: AnyObject = {
				ident: this.fullname,
				details: this.details,
				condition: this.getHealth().secret,
				active: (this.position < this.side.active.length),
				stats: {
					atk: this.baseStoredStats['atk'],
					def: this.baseStoredStats['def'],
					spa: this.baseStoredStats['spa'],
					spd: this.baseStoredStats['spd'],
					spe: this.baseStoredStats['spe'],
				},
				moves: this.moves.map(move => {
					if (move === 'hiddenpower') {
						return move + Dex.toID(this.hpType) + (this.battle.gen < 6 ? '' : this.hpPower);
					}
					if (move === 'frustration' || move === 'return') {
						const basePowerCallback = this.battle.dex.getMove(move).basePowerCallback as (pokemon: Pokemon) => number;
						return move + basePowerCallback(this);
					}
					return move;
				}),
				baseAbility: this.baseAbility,
				item: this.item,
				pokeball: this.pokeball,
			};
			if (this.battle.gen > 6) entry.ability = this.ability;
			if (this.battle.gen >= 9) {
				entry.commanding = !!this.volatiles['commanding'] && !this.fainted;
				entry.reviving = this.isActive && !!this.side.slotConditions[this.position]['revivalblessing'];
			}
			return entry;
		}
	},
	
	//added for Tera
	getDamage(
		source: Pokemon, target: Pokemon, move: string | number | ActiveMove,
		suppressMessages = false
	): number | undefined | null | false {
		if (typeof move === 'string') move = this.dex.getActiveMove(move);

		if (typeof move === 'number') {
			const basePower = move;
			move = new Dex.Move({
				basePower,
				type: '???',
				category: 'Physical',
				willCrit: false,
			}) as ActiveMove;
			move.hit = 0;
		}

		if (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) {
			if (!target.runImmunity(move.type, !suppressMessages)) {
				return false;
			}
		}

		if (move.ohko) return target.maxhp;
		if (move.damageCallback) return move.damageCallback.call(this.battle, source, target);
		if (move.damage === 'level') {
			return source.level;
		} else if (move.damage) {
			return move.damage;
		}

		const category = this.battle.getCategory(move);

		let basePower: number | false | null = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this.battle, source, target, move);
		}
		if (!basePower) return basePower === 0 ? undefined : basePower;
		basePower = this.battle.clampIntRange(basePower, 1);

		let critMult;
		let critRatio = this.battle.runEvent('ModifyCritRatio', source, target, move, move.critRatio || 0);
		if (this.battle.gen <= 5) {
			critRatio = this.battle.clampIntRange(critRatio, 0, 5);
			critMult = [0, 16, 8, 4, 3, 2];
		} else {
			critRatio = this.battle.clampIntRange(critRatio, 0, 4);
			if (this.battle.gen === 6) {
				critMult = [0, 16, 8, 2, 1];
			} else {
				critMult = [0, 24, 8, 2, 1];
			}
		}

		const moveHit = target.getMoveHitData(move);
		moveHit.crit = move.willCrit || false;
		if (move.willCrit === undefined) {
			if (critRatio) {
				moveHit.crit = this.battle.randomChance(1, critMult[critRatio]);
			}
		}

		if (moveHit.crit) {
			moveHit.crit = this.battle.runEvent('CriticalHit', target, null, move);
		}

		// happens after crit calculation
		basePower = this.battle.runEvent('BasePower', source, target, move, basePower, true);

		if (!basePower) return 0;
		basePower = this.battle.clampIntRange(basePower, 1);
		// Hacked Max Moves have 0 base power, even if you Dynamax
		if ((!source.volatiles['dynamax'] && move.isMax) || (move.isMax && this.dex.moves.get(move.baseMove).isMax)) {
			basePower = 0;
		}

		if (
			basePower < 60 && source.getTypes(true).includes(move.type) && source.terastallized && move.priority <= 0 &&
			// Hard move.basePower check for moves like Dragon Energy that have variable BP
			!move.multihit && !((move.basePower === 0 || move.basePower === 150) && move.basePowerCallback)
		) {
			basePower = 60;
		}
	},
	modifyDamage(
		baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
	) {
		const tr = this.battle.trunc;
		if (!move.type) move.type = '???';
		const type = move.type;

		baseDamage += 2;

		if (move.spreadHit) {
			// multi-target modifier (doubles only)
			const spreadModifier = move.spreadModifier || (this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
			this.battle.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.battle.modify(baseDamage, spreadModifier);
		} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
			// Parental Bond modifier
			const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
			this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
			baseDamage = this.battle.modify(baseDamage, bondModifier);
		}

		// weather modifier
		baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

		// crit - not a modifier
		const isCrit = target.getMoveHitData(move).crit;
		if (isCrit) {
			baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
		}

		// random factor - also not a modifier
		baseDamage = this.battle.randomizer(baseDamage);

		// STAB
		if (move.forceSTAB || (type !== '???' &&
			(pokemon.hasType(type) || (pokemon.terastallized && pokemon.getTypes(false, true).includes(type))))) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)

			let stab = move.stab || 1.5;
			if (type === pokemon.terastallized && pokemon.getTypes(false, true).includes(type)) {
				// In my defense, the game hardcodes the Adaptability check like this, too.
				stab = stab === 2 ? 2.25 : 2;
			} else if (pokemon.terastallized && type !== pokemon.terastallized) {
				stab = 1.5;
			}
			baseDamage = this.battle.modify(baseDamage, stab);
		}
	},
	canTerastallize(pokemon: Pokemon) {
		if (
			pokemon.species.isMega || pokemon.species.isPrimal || pokemon.species.forme === "Ultra" ||
			pokemon.getItem().zMove || pokemon.canMegaEvo || pokemon.side.canDynamaxNow() || this.dex.gen !== 9
		) {
			return null;
		}
		return pokemon.teraType;
	},
	terastallize(pokemon: Pokemon) {
		const type = pokemon.teraType;

		this.battle.add('-terastallize', pokemon, type);
		pokemon.terastallized = type;
		for (const ally of pokemon.side.pokemon) {
			ally.canTerastallize = null;
		}
		pokemon.addedType = '';
		pokemon.knownType = true;
		pokemon.apparentType = type;
		this.battle.runEvent('AfterTerastallization', pokemon);
	},
};