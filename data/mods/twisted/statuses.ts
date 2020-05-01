export const BattleStatuses: { [k: string]: ModdedPureEffectData } = {
    inherit: true,
    twist: {
        name: 'Twist',
        id: 'twist',
        num: 0,
        duration: 0,
        onStart(pokemon) {
            this.twisted = pokemon.isTwist;
            var twistName, twistTyping = '';
            switch (this.twisted) {
                case 'L':
                    twistName = 'Left Twist';
                    break;
                case 'R':
                    twistName = 'Right Twist';
                    break;
                case '0':
                default:
                    pokemon.removeVolatile('twist'); return;

            }
            if (pokemon.types.length > 1) twistTyping += '/' + this.getTwistedType(pokemon.types[1]);
            if (pokemon.isTwist !== '0'){
                this.add('-formechange', pokemon, true);
					 twistTyping += this.getTwistedType(pokemon.types[0]);
					 this.add('-start', pokemon, 'typechange', twistTyping, twistName);
					 pokemon.setType(twistTyping);
					 pokemon.addedType = twistTyping;
					 pokemon.knownType = twistTyping;
					 const side = pokemon.side;
					 side.twist = false;
					 for (const ally of side.pokemon) {
					 	 if (ally.isTwist !== '0') ally.isTwist = '0';
					 }
					 pokemon.canMegaEvo = false;
            } 
            
        },
        onBeforeMove(move, pokemon) {
            if (pokemon.volatiles['twist'] && pokemon.type === move.type) {
                move.name = this.TwistedTypes[move.type].prefix + ' ' + move.name;
            }

        },
        onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = ['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'];
			if (pokemon.getTypes().includes(move.type) && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status') && pokemon.volatiles['twist']) {
                move.type = this.getTwistedType(this.twisted, move.type);
            }
		},
        onSwitchOut(pokemon) {
            pokemon.removeVolatile('twist');
        },
        onEnd(pokemon) {
			  var twistName;
            switch (this.twisted) {
                case 'L':
                    twistName = 'Left Twist';
                    break;
                case 'R':
                    twistName = 'Right Twist';
                    break;
                case '0':
                default: break;

            }
            this.add('-end', pokemon, twistName);
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), twistName);
            pokemon.setType(twistTyping);
				pokemon.addedType = twistTyping;
				pokemon.knownType = twistTyping;
            pokemon.isTwist = '0';
            pokemon.canMegaEvo = true;
            for (const ally of pokemon.side.pokemon) {
                if (!ally.canMegaEvo) ally.canMegaEvo = true;
            }
        },
        twisted: '0',
        getTwistedType(type, lr) {
            const TwistedTypes = {
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
            }; return TwistedTypes[type][lr];
        }
    },
};
