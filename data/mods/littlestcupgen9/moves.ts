export const Moves: {[k: string]: ModdedMoveData} = {
	terablast: {
		num: -1024,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Tera Blast",
		desc: "If the user is Terastallized, this move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes, and it becomes the same its the user's Tera Type.",
		shortDesc: "If Terastallized: Phys. if Atk > SpA & Type = Tera Type.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (pokemon.species.teraType) move.type = pokemon.species.teraType;
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fairy Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
};
