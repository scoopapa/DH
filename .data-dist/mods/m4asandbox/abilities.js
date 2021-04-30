"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Abilities = {
	conversionz: {
		shortDesc: "If the Pokémon changes its type, the result is permanent. Deletes STAB.",
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'porygonzmega') return;
			const type = this.dex.getSpecies(pokemon.species).types[0];
			if (pokemon.hasType(type) || !pokemon.setType(type)) return;
			this.add('-start', pokemon, 'typechange', type);
		},
		onSourceHit(target, source, move) {
			if (source.species.id !== 'porygonzmega') return;
			if (move.id === 'conversion' || move.id === 'conversion2') {
				this.add('-ability', source, 'Conversion-Z');
				const pokemon = this.dex.getSpecies(source.species);
				pokemon.types[0] = source.types[0];
			}
		},
		onModifyMove(move) {
			delete move.stab;
		},
		isPermanent: true,
		name: "Conversion-Z",
		rating: 5,
		num: -5000,
	},
}; exports.Abilities = Abilities;
