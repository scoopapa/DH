"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Formats = {
	"abilityclause": {
		effectType: 'ValidatorRule',
		name: 'Ability Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon with the same ability",
		onBegin() {
			this.add('rule', 'Ability Clause: Limit one of each ability');
		},
		onValidateTeam(team) {
			const abilityTable = {};
			for (const set of team) {
				let ability = this.toID(set.ability);
				if (!ability) continue;
				if (ability in abilityTable) {
					return [
						`You are limited to one of each ability by Ability Clause.`,
						`(You have more than one ${this.dex.getAbility(ability).name} variants)`,
					];
					abilityTable[ability] = 1;
				}
			}
		},
	},
}; exports.Formats = Formats;
