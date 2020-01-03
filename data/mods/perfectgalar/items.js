'use strict';

exports.BattleItems = {
  	"leftovers": {
		inherit: true,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			let healFraction = 16;
			if (pokemon.ability === 'ripen'){
				healFraction = healFraction / 2;
			}
			this.heal(pokemon.baseMaxhp / healFraction);
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			let healFraction = 16;
			if (pokemon.ability === 'ripen'){
				healFraction = healFraction / 2;
			}
			this.heal(pokemon.baseMaxhp / healFraction);
		},
	},
	"choiceband": {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['dynamax'] || pokemon.ability === 'gorillatactics') return;
			return this.chainModify(1.5);
		},
	},
	"choicescarf": {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (pokemon.volatiles['dynamax'] || pokemon.ability === 'gorillatactics') return;
			return this.chainModify(1.5);
		},
	},
	"choicespecs": {
		inherit: true,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles['dynamax'] || pokemon.ability === 'gorillatactics') return;
			return this.chainModify(1.5);
		},
	},
};