export const BattleStatuses: {[k: string]: ModdedPureEffectData} = {
    twisted: {
        onStart(pokemon) {
            const TwistedType: { [k: string]: { [k: string]: string; }; } = {
                Grass: { L: 'Rock', R: 'Electric', prefix: 'Sprouting' },
                Fire: { L: 'Grass', R: 'Fighting', prefix: 'Blazing' },
                Water: { L: 'Fire', R: 'Poison', prefix: 'Soaking' },
                Electric: { L: 'Flying', R: 'Ice', prefix: 'Sparkling' },
                Psychic: { L: 'Dark', R: 'Bug', prefix: 'Mesmerizing' },
                Ice: { L: 'Psychic', R: 'Electric', prefix: 'Freezing' },
                Dragon: { L: 'Fairy', R: 'Fire', prefix: 'Roaring' },
                Dark: { L: 'Ghost', R: 'Fairy', prefix: 'Obscuring' },
                Fairy: { L: 'Water', R: 'Ground', prefix: 'Twinkling' },
                Normal: { L: 'Poison', R: 'Ghost', prefix: 'Stomping' },
                Fighting: { L: 'Steel', R: 'Dark', prefix: 'Blasting' },
                Flying: { L: 'Rock', R: 'Ground', prefix: 'Swirling' },
                Poison: { L: 'Bug', R: 'Grass', prefix: 'Polluting' },
                Ground: { L: 'Fighting', R: 'Ice', prefix: 'Desolating' },
                Rock: { L: 'Dragon', R: 'Steel', prefix: 'Crumbling' },
                Bug: { L: 'Water', R: 'Psychic', prefix: 'Infesting' },
                Ghost: { L: 'Normal', R: 'Flying', prefix: 'Terrifying' },
                Steel: { L: 'Dragon', R: 'Normal', prefix: 'Piercing' }
            };
            const side = pokemon.side;
            const twistedSpecies = this.dex.deepClone(pokemon.species); 
            const twistlr = pokemon.canMegaEvo; 
            var twistTyping;

            pokemon.moveSlots.pop();
            pokemon.canMegaEvo = null;
            for(const ally of side.pokemon) ally.canMegaEvo = null;
            if (pokemon.types.length === 1 && pokemon.types[0] !== '???')
                twistedSpecies.types = [ TwistedType[pokemon.types[0] ][ twistlr as string ] ];
            else if (pokemon.types.length > 1){
                twistTyping = [ TwistedType[ pokemon.types[0] ][ twistlr as string ], TwistedType[ pokemon.types[1] ][ twistlr as string ] ];
                if(twistTyping[0] === twistTyping[1]) twistedSpecies.types = [ twistTyping[0] ];
                else twistedSpecies.types = twistTyping;
            }
            pokemon.formeChange(twistedSpecies, this.effect, false, pokemon.name + 'twisted ' + twistlr);
			this.add('-start', pokemon, twistlr + '-Twist', '[silent]');
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        },
        onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
            let t = pokemon.baseSpecies.types.indexOf(move.type);
			if (t >= 0 && move.category !== 'Status' && pokemon.volatiles['twisted']) {
                move.type = pokemon.types[t];
            }
		},
        onSwitchOut(pokemon) {
            pokemon.removeVolatile('twisted');
        },
        onEnd(pokemon) {
            var twistName;
			const move = this.dex.getMove('twist');
			const twistMove = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
			};

            pokemon.moveSlots.push(twistMove);
            pokemon.baseMoveSlots.push(twistMove);
            pokemon.canMegaEvo = null;
            this.add('-end', pokemon, twistName);
            this.add('-start', pokemon, 'typechange', pokemon.baseSpecies.types.join('/'), '[silent]');
            pokemon.formeChange(pokemon.baseSpecies);
        },
    },
};