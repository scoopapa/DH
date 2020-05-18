export const BattleMovedex: {[k: string]: ModdedMoveData} = {
	'twist': {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is replaced with another Pokemon in its party. The selected Pokemon will become twisted",
        shortDesc: "User switches, Twisting the incoming Pokémon.",
		name: "Twist",		
		isNonstandard: "Custom",
		pp: 5,
		priority: 6,
		flags: {},
		onHit(pokemon){
			const side = pokemon.side;
			let i = 0;
			for(const ally of side.pokemon)
			{ ally.canMegaEvo = (i++ % 2 == 0) ? 'R' : 'L'; }
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Normal",
    }
}