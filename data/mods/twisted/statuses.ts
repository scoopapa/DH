export const BattleStatuses: {[k: string]: ModdedPureEffectData} = {
    twisted: {
        noCopy: true,
        onStart(pokemon) {
            const side = pokemon.side;
            var twistName, twistTyping = '', twisted = pokemon.canMegaEvo;
            const moveSlots = pokemon.moveSlots;
            var twistMove = moveSlots[moveSlots.length - 1];
            switch (twisted) {
                case 'L': twistName = 'Left Twist'; break;
                case 'R': twistName = 'Right Twist'; break;
                default: pokemon.removeVolatile('twisted'); return;
            }
            if (side.sideConditions['twist']) {
                pokemon.canMegaEvo = null;
                for(const ally of side.pokemon) ally.canMegaEvo = null;
                twistMove.disabled = true;
                twistMove.disabledSource = 'Twist';
                twistTyping += getTwistedType(pokemon.types[0], twisted);
                if (pokemon.types.length > 1) 
                    twistTyping += '/' + getTwistedType(pokemon.types[1], twisted);
                this.add('-start', pokemon, 'typechange', twistTyping, twistName);
                pokemon.setType(twistTyping);
                pokemon.addedType = twistTyping;
                pokemon.knownType = true;
                side.removeSideCondition('twist');
            } 
            
        },
        onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (pokemon.getTypes().includes(move.type) && move.category !== 'Status' && pokemon.volatiles['twist']) {
                let t = pokemon.species.types.indexOf(move.type);
                move.type = pokemon.types[t];
            }
		},
        onSwitchOut(pokemon) {
            pokemon.removeVolatile('twisted');
        },
        onEnd(pokemon) {
			var twistName;
            this.add('-end', pokemon, twistName);
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'));
            pokemon.setType(pokemon.species.types.join('/'));
			pokemon.addedType = pokemon.species.types.join('/');
			pokemon.knownType = true
            var twistMove = pokemon.moveSlots[pokemon.moveSlots.length - 1];
            twistMove.disabled = false;
            twistMove.disabledSource = 'none';
        },
    },
};

function getTwistedType(gameType: string, lr: string): string {
    let TwistedTypes: {[k: string]: {[k:string]: string}} = {
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
    }; return TwistedTypes[gameType][lr];
}