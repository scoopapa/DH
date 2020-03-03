'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	"powerspot": {
		shortDesc: "This Pokemon and it's allies have the base power of their moves multiplied by 1.3.",
		onAllyBasePowerPriority: 8,
		onAllyBasePower(basePower, attacker, defender, move) {
			this.debug('Power Spot boost');
			return this.chainModify([0x14CD, 0x1000]);
		},
		id: "powerspot",
		name: "Power Spot",
		rating: 0,
		num: 249,
	},
	"zephyr": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Inner Focus, Oblivious, Own Tempo, Scrappy, and Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon applies the Fairy Lock status to the target.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Zephyr', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.target.addPseudoWeather('fairylock');
				}
			}
		},
		id: "zephyr",
		name: "Zephyr",
		rating: 3.5,
		num: 22,
	},
};

exports.BattleAbilities = BattleAbilities;
