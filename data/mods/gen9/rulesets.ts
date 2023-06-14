export const Formats: {[k: string]: ModdedFormatsData} = {
	teampreview: {
		effectType: 'Rule',
		name: 'Team Preview',
		desc: "Allows each player to see the Pok&eacute;mon on their opponent's team before they choose their lead Pok&eacute;mon",
		onBegin() {
			if (this.ruleTable.has(`teratypepreview`)) {
				this.add('rule', 'Tera Type Preview: Tera Types are shown at Team Preview');
			}
		},
		onTeamPreview() {
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details.replace(', shiny', '')
					.replace(/(Arceus|Gourgeist|Pumpkaboo|Xerneas|Silvally|Urshifu|Dudunsparce)(-[a-zA-Z?-]+)?/g, '$1-*')
					.replace(/(Zacian|Zamazenta)(?!-Crowned)/g, '$1-*'); // Hacked-in Crowned formes will be revealed
				this.add('poke', pokemon.side.id, details, '');
			}
			this.makeRequest('teampreview');
			if (this.ruleTable.has(`teratypepreview`)) {
				for (const side of this.sides) {
					let buf = ``;
					for (const pokemon of side.pokemon) {
						buf += buf ? ` / ` : `raw|${side.name}'s Tera Types:<br />`;
						buf += `<psicon pokemon="${pokemon.species.id}" /><psicon type="${pokemon.hpType}" />`;
					}
					this.add(`${buf}`);
				}
			}
		},
	},
	sametypeclause: {
		effectType: 'ValidatorRule',
		name: 'Same Type Clause',
		desc: "Forces all Pok&eacute;mon on a team to share a type with each other",
		onBegin() {
			this.add('rule', 'Same Type Clause: Pokémon in a team must share a type');
		},
		onValidateTeam(team) {
			let typeTable: string[] = [];
			for (const [i, set] of team.entries()) {
				let species = this.dex.species.get(set.species);
				if (!species.types) return [`Invalid pokemon ${set.name || set.species}`];
				if (i === 0) {
					typeTable = species.types;
				} else {
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				const item = this.dex.items.get(set.item);
				if (item.megaStone && species.baseSpecies === item.megaEvolves) {
					species = this.dex.species.get(item.megaStone);
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				if (item.id === "ultranecroziumz" && species.baseSpecies === "Necrozma") {
					species = this.dex.species.get("Necrozma-Ultra");
					typeTable = typeTable.filter(type => species.types.includes(type));
				}
				if (!typeTable.length) return [`Your team must share a type.`];
			}
			for (const set of team) {
				if (set.hpType &&
						!typeTable.includes(set.hpType) && this.ruleTable.has(`enforcesameteratype`)) {
					return [`${set.species}'s Tera Type must match the team's type.`];
				}
			}
		},
	},
	enforcesameteratype: {
		effectType: 'ValidatorRule',
		name: 'Enforce Same Tera Type',
		desc: "Forces Pok&eacute;mon to have a Tera Type matching one of their original types.",
		// implemented in sametypeclause
	},
	teratypepreview: {
		effectType: 'Rule',
		name: 'Tera Type Preview',
		desc: "Allows each player to see the Tera Type of the Pok&eacute;mon on their opponent's team before they choose their lead Pok&eacute;mon",
		onValidateRule() {
			if (!this.ruleTable.has('teampreview')) {
				throw new Error(`The "Tera Type Preview" rule${this.ruleTable.blame('teratypepreview')} requires Team Preview.`);
			}
		},
		// implemented in team preview
	},
	terastalclause: {
		effectType: 'Rule',
		name: 'Terastal Clause',
		desc: "Prevents Pok&eacute;mon from Terastallizing",
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.canMegaEvo = null;
			}
			this.add('rule', 'Terastal Clause: You cannot Terastallize');
		},
	},
};
