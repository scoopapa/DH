export const Items: {[itemid: string]: ModdedItemData} = {
	dededesmask: {
		name: "Dedede's Mask",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 2) || pokemon.baseSpecies.num === 2) {
				return false;
			}
			return true;
		},
		forcedForme: "Masked Dedede",
		itemUser: ["Masked Dedede"],
		num: -1,
		gen: 9,
		desc: "If held by King Dedede, this item changes its forme to Masked Dedede.", 
	},
};
