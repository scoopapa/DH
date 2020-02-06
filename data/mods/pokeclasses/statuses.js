'use strict';

exports.BattleStatuses = {
	blade: {
		name: 'blade',
		id: 'blade',
		num: 0,
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['blade']) {
				return this.chainModify(1.3);
			}
		},
		onFoeBasePowerPriority: 8,
		onFoeBasePower(basePower, attacker, defender, move) {
			if (move.flags['blade']) {
				return this.chainModify(0.5);
			}
		},
	},
};
