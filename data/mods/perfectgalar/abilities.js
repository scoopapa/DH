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
//-----------------------------forme changes---------------------------------------------------------------------------------
	"stancechange": {
		desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield.",
		shortDesc: "If Aegislash, changes Forme to Blade before attacks and Shield before King's Shield.",
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			let targetSpecies = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.template.species !== targetSpecies){
				attacker.formeChange(targetSpecies);
				this.doMaxBoostFormeChange( attacker, false );
			}
		},
		id: "stancechange",
		name: "Stance Change",
		rating: 4.5,
		num: 176,
	},
};
