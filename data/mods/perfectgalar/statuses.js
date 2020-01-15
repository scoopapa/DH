'use strict';



exports.BattleStatuses = {
	dynamax: {
		name: 'Dynamax',
		id: 'dynamax',
		num: 0,
		noCopy: true,
		duration: 3,
		onStart(pokemon) {
			pokemon.removeVolatile('substitute');
			if (pokemon.illusion) this.singleEvent('End', this.dex.getAbility('Illusion'), pokemon.abilityData, pokemon);
			this.add('-start', pokemon, 'Dynamax');
			if (pokemon.canGigantamax){
				this.add('-formechange', pokemon, pokemon.canGigantamax);
			}
			console.log( 'dynamax debug' );
			if (pokemon.species === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 2;

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			pokemon.addVolatile('maxstatboost');
		},
		// onBeforeSwitchOut(pokemon) {
			// pokemon.removeVolatile('dynamax');
		// },
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onTrapPokemon(pokemon) {
			pokemon.tryTrap();
		},
		onDragOutPriority: 2,
		onDragOut(pokemon) {
			if( !pokemon.redCardWhileDynamax ){
				this.add('-block', pokemon, 'Dynamax');
				return null;
			}
			pokemon.removeVolatile('dynamax');
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax');
			if (pokemon.canGigantamax) this.add('-formechange', pokemon, pokemon.template.species);
			if (pokemon.species === 'Shedinja') return;
			pokemon.hp = pokemon.getUndynamaxedHP();
			pokemon.maxhp = pokemon.baseMaxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},
	maxstatboost: {
		name: 'Max Stat Boost',
		id: 'maxstatboost',
		num: 0,
		noCopy: true,
		duration: 0,
		onModifyAtk( stat, pokemon ){
			let boost = this.getMaxBoost( stat, 'atk', pokemon ); //implemented in perfectgalar/scripts.js
			return stat + boost;
		},
		onModifyDef( stat, pokemon ){
			let boost = this.getMaxBoost( stat, 'def', pokemon );
			return stat + boost;
		},
		onModifySpA( stat, pokemon ){
			let boost = this.getMaxBoost( stat, 'spa', pokemon );
			return stat + boost;
		},
		onModifySpD( stat, pokemon ){
			let boost = this.getMaxBoost( stat, 'spd', pokemon );
			return stat + boost;
		},
		onModifySpe( stat, pokemon ){
			console.log( this );
			let boost = this.getMaxBoost( stat, 'spe', pokemon );
			return stat + boost;
		},
	},
};
