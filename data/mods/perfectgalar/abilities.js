'use strict';
exports.BattleAbilities = {
	"screencleaner": {
		desc: "On switch-in, this Pokémon ends the effects of screens, hazards, and terrain for both the user's and the opposing side.",
		shortDesc: "Removes screens, hazards, and terrain on switch-in.",
		onStart(pokemon) {
			let activated = false;
			this.field.clearTerrain();
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil', 'steelsurge', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb']) {
				if (pokemon.side.removeSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					this.add('-sideend', pokemon.side, this.dex.getEffect(sideCondition).name);
				}
				if (pokemon.side.foe.removeSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					this.add('-sideend', pokemon.side.foe, this.dex.getEffect(sideCondition).name);
				}
			}
		},
		id: "screencleaner",
		name: "Screen Cleaner",
		rating: 2,
		num: 251,
	},
};
