export const Items: {[itemid: string]: ItemData} = {

laxincense: {
		name: "Lax Incense",
		spritenum: 240,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Lax Incense boost');
				return this.chainModify(1.2);
			}
		},
		num: 255,
		gen: 3,
		shortDesc: "This Pokemon's attacks have 1.2x power if it moves before its target.",
	},
	brightpowder: {
		name: "Bright Powder",
		spritenum: 51,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (!this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Bright Powder boost');
				return this.chainModify(1.2);
			}
		},
		num: 213,
		gen: 2,
		shortDesc: "This Pokemon's attacks have 1.2x power if it moves before its target.",
	},
};
