"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Scripts = {
	inherit: 'm4av6',
	init() {
		const newMoves = (mon, moves) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8M"];
			}
		};
		newMoves("porygonz", ["partingshot", "revelationdance"]);
	},
}; exports.Scripts = Scripts;
