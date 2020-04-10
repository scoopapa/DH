'use strict';

/**@type {{[k: string]: ModdedFormatsData}} */
let BattleFormats = {
	standardnatdex: {
		effectType: 'ValidatorRule',
		name: 'Standard NatDex',
		desc: "The standard ruleset for all National Dex tiers",
		ruleset: ['Obtainable', 'Team Preview', 'Nickname Clause', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre', 'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Magearna-Original', 'Eternatus-Eternamax',
			];
			if (unobtainables.includes(set.species)) {
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			let item = this.dex.getItem(set.item);
			if ((item.isNonstandard === 'Unobtainable' || item.isNonstandard === 'Past') && !item.zMove && !item.itemUser && !item.forcedForme) {
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
	},
};

exports.BattleFormats = BattleFormats;
