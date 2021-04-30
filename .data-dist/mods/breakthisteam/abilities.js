"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Abilities = {
	ignorant: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (move.category !== 'Status' && !move.ignoreImmunity) {
				move.ignoreImmunity = true;
			}
		},
		name: "Ignorant",
		shortDesc: "This Pokemon's attacking moves ignore type immunities.",
	},
}; exports.Abilities = Abilities;