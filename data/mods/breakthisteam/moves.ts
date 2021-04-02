export const Moves: {[k: string]: ModdedMoveData} = {
	ghostlystrike: {
		accuracy: 85,
		basePower: 55,
		category: "Physical",
		name: "Ghostly Strike",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dual Chop", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		maxMove: {basePower: 140},
		contestType: "Tough",
		shortDesc: "Hits two times in one turn.",
	},
	ripaway: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Rip Away",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic", target);
		},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
					this.battle.lostItemQueue.push(item);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
	},
	retrieval: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Retrieval",
		pp: 20,
		priority: 0, 
		flags: {snatch: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hold Hands", target);
		},
		onHit(pokemon) {
			if (pokemon.item) return false;
			
			if (!this.battle.lostItemQueue.length) return false;
			
			//console.log("Before Retrieval: " + this.battle.lostItemQueue);
			let item = this.battle.lostItemQueue.pop();
			//console.log("After Retrieval: " + this.battle.lostItemQueue);
			
			this.add('-item', pokemon, this.dex.getItem(item), '[from] move: Retrieval');
			pokemon.setItem(item);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cute",
		shortDesc: "The user picks up the last item removed earlier in the battle.",
	},
	
	//For Retrieval:
	knockoff: {
		inherit: true,
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.battle.lostItemQueue.push(item);
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
	},
	fling: {
		inherit: true,
		condition: {
			onUpdate(pokemon) {
				const item = pokemon.getItem();
				pokemon.setItem('');
				pokemon.lastItem = item.id;
				pokemon.usedItemThisTurn = true;
				this.battle.lostItemQueue.push(item);
				this.add('-enditem', pokemon, item.name, '[from] move: Fling');
				this.runEvent('AfterUseItem', pokemon, null, null, item);
				pokemon.removeVolatile('fling');
			},
		},
	},
};