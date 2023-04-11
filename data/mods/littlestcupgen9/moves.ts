export const Moves: {[k: string]: ModdedMoveData} = {
  terablast: {
		num: 851,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "In Terastal, type matches Tera Type; Physical if Atk > SpA and Terastalized.",
		name: "Tera Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fairy Wind", target);
		},
		onModifyType(move, pokemon, target) {
			if (pokemon.volatiles['terastal']) {
				move.type = pokemon.teraType;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.volatiles['terastal'] && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
};
