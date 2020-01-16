'use strict';

exports.BattleStatuses = {
	dynamax: {
		name: 'Dynamax',
		id: 'dynamax',
		num: 0,
		noCopy: true,
		duration: 3,
		onStart(pokemon) {
			pokemon.hasDynamaxed = true;
			pokemon.volatileTag = 'maxstatboost';
			pokemon.removeVolatile('substitute');
			if (pokemon.illusion) this.singleEvent('End', this.dex.getAbility('Illusion'), pokemon.abilityData, pokemon);
			this.add('-start', pokemon, 'Dynamax');
			this.doMaxBoostFormeChange( pokemon, false );
			if (pokemon.canGigantamax){
				this.add('-formechange', pokemon, pokemon.canGigantamax);
				pokemon.volatileTag = 'gmaxstatboost';
			}
			if (pokemon.species === 'Shedinja') return;

			// Changes based on dynamax level, 2 is max (at LVL 10)
			const ratio = 2;

			pokemon.maxhp = Math.floor(pokemon.maxhp * ratio);
			pokemon.hp = Math.floor(pokemon.hp * ratio);
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			pokemon.addVolatile( pokemon.volatileTag );
		},
		onTryMove(attacker, defender, move) {
			if ( move.gmaxPower ){
				console.log( move.id + ' ' + move.gmaxPower );
			}
		},
		onBeforeSwitchOut(pokemon) {
			pokemon.removeVolatile('dynamax');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.id === 'behemothbash' || move.id === 'behemothblade' || move.id === 'dynamaxcannon') {
				return this.chainModify(2);
			}
		},
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
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
			this.add('-formechange', pokemon, pokemon.template.baseSpecies);
			if ( pokemon.species !== 'Shedinja' ) {
				pokemon.hp = pokemon.getUndynamaxedHP();
				pokemon.maxhp = pokemon.baseMaxhp;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
			this.doMaxBoostFormeChange( pokemon, true );
			if ( pokemon.usedMindstorm ) {
				pokemon.addVolatile( 'mustrecharge' );
			}
			pokemon.trapped = false;
		},
	},
	maxstatboost: {
		name: 'Max Stat Boost',
		id: 'maxstatboost',
		num: 0,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Max Stat Boost');
		},
		onSwitchOut(pokemon){
			pokemon.lastFormeBoosted = null;
		}
	},
	gmaxstatboost: {
		name: 'G-Max Stat Boost',
		id: 'gmaxstatboost',
		num: 0,
		onStart(pokemon) {
			this.add('-start', pokemon, 'G-Max Stat Boost');
		},
		onSwitchOut(pokemon){
			pokemon.lastFormeBoosted = null;
		}
	},
};
