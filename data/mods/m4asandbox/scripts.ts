export const Scripts: ModdedBattleScriptsData = {
	inherit: 'm4av6',
	init() {
		// MnM4A
		for (const i in this.data.Items) {
			if (!this.data.Items[i].megaStone) continue;
			this.modData('Items', i).onTakeItem = false;
			const id = this.toID(this.data.Items[i].megaStone);
			if (this.modData('FormatsData', id)) this.modData('FormatsData', id).isNonstandard = null;
		}
		// some slight changes around here to account for Legends: Arceus, which I am meant to be adding to the sandbox as convenient presets of sorts (:
		// first adding new moves to old Pokémon
		const newMoves = (mon: string, moves: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8M"];
			}
		};
		// these are from Legends: Arceus
		newMoves("pichu", ["babydolleyes", "quickattack", "spark"]);
		newMoves("cleffa", ["tackle", "swift", "fairywind", "babydolleyes", "calmmind", "moonblast"]);
		newMoves("vulpix", ["flamewheel", "nastyplot"]);
		newMoves("vulpixalola", ["quickattack", "energyball", "icefang", "nastyplot"]);
		newMoves("zubat", ["crosspoison"]);
		newMoves("tentacool", ["acidarmor"]);
		newMoves("psyduck", ["bubble", "triattack"]);
		newMoves("kadabra", ["hypnosis"]);
		newMoves("machop", ["tackle", "machpunch", "doublehit"]);
		newMoves("machamp", ["drainpunch"]);
		newMoves("ponyta", ["doublehit"]);
		newMoves("gengar", ["powershift"]);
		newMoves("onix", ["powershift"]);
		newMoves("steelix", ["iceball"]);
		newMoves("rhyhorn", ["gigaimpact"]);
		newMoves("happiny", ["tackle", "drainingkiss", "fairywind"]);
		newMoves("chansey", ["babydolleyes"]);
		newMoves("blissey", ["powershift"]);
		newMoves("tangela", ["acidspray", "doublehit"]);
		newMoves("mrmime", ["powershift"]);
		newMoves("scyther", ["calmmind", "closecombat"]);
		newMoves("elekid", ["spark"]);
		newMoves("magby", ["tackle", "poisongas"]);
		newMoves("eevee", ["calmmind", "mimic"]);
		newMoves("vaporeon", ["bubble"]);
		newMoves("flareon", ["powershift"]);
		newMoves("umbreon", ["powershift"]);
		newMoves("leafeon", ["leafage"]);
		newMoves("porygon", ["spark"]);
		newMoves("porygonz", ["powershift"]);
		newMoves("munchlax", ["gigaimpact", "highhorsepower"]);
		newMoves("snorlax", ["iceball"]);
		newMoves("togepi", ["tackle", "calmmind", "moonblast", "babydolleyes"]);
		newMoves("togetic", ["airslash"]);
		newMoves("bonsly", ["irondefense", "headsmash"]);
		newMoves("sudowoodo", ["tackle"]);
		newMoves("aipom", ["quickattack", "mudbomb"]);
		newMoves("ambipom", ["doubleedge"]);
		newMoves("yanma", ["gust"]);
		newMoves("gligar", ["mudbomb"]);
		newMoves("gliscor", ["pinmissile", "spikes", "powershift"]);
		newMoves("heracross", ["slash", "outrage", "calmmind"]);
		newMoves("teddiursa", ["tackle", "highhorsepower"]);
		newMoves("swinub", ["babydolleyes"]);
		newMoves("piloswine", ["highhorsepower"]);
		newMoves("remoraid", ["bubble"]);
		newMoves("mantyke", ["doubleedge", "roost"]);
		newMoves("mantine", ["powershift"]);
		newMoves("stantler", ["confusion", "psyshieldbash"]);
		newMoves("beautifly", ["airslash"]);
		newMoves("dustox", ["extrasensory"]);
		newMoves("ralts", ["icebeam"]);
		newMoves("gardevoir", ["aurasphere", "recover"]);
		newMoves("gallade", ["focusenergy"]);
		newMoves("nosepass", ["powershift", "flashcannon"]);
		newMoves("budew", ["poisonsting", "poisonpowder", "poisonjab", "petaldance"]);
		newMoves("barboach", ["zenheadbutt"]);
		newMoves("whiscash", ["aerialace"]);
		newMoves("duskull", ["absorb", "leechlife"]);
		newMoves("dusclops", ["powershift"]);
		newMoves("chingling", ["doubleedge", "extrasensory", "energyball"]);
		newMoves("chimecho", ["tackle", "ominouswind"]);
		newMoves("spheal", ["babydolleyes", "liquidation"]);
		newMoves("turtwig", ["sleeppowder", "leafblade", "bulldoze"]);
		newMoves("torterra", ["headlongrush"]);
		newMoves("chimchar", ["tackle", "doubleedge"]);
		newMoves("infernape", ["drainpunch", "ragingfury"]);
		newMoves("piplup", ["doubleedge", "roost", "babydolleyes", "liquidation"]);
		newMoves("empoleon", ["steelbeam", "wavecrash"]);
		newMoves("starly", ["gust", "airslash", "gigaimpact"]);
		newMoves("staraptor", ["focusenergy"]);
		newMoves("bidoof", ["bite"]);
		newMoves("kricketot", ["tackle", "absorb"]);
		newMoves("cranidos", ["tackle", "doubleedge", "bite"]);
		newMoves("rampardos", ["powershift"]);
		newMoves("shieldon", ["tackle", "steelbeam"]);
		newMoves("bastiodon", ["powershift"]);
		newMoves("burmy", ["strugglebug"]);
		newMoves("wormadam", ["gust", "silverwind", "magicalleaf"]);
		newMoves("wormadamsandy", ["gust", "silverwind"]);
		newMoves("wormadamtrash", ["gust", "silverwind", "steelbeam"]);
		newMoves("vespiquen", ["recover", "powershift"]);
		newMoves("pachirisu", ["thundershock", "crunch", "playrough"]);
		newMoves("cherubi", ["doubleedge", "absorb", "petaldance", "sleeppowder", "stunspore"]);
		newMoves("shellos", ["tackle"]);
		newMoves("drifloon", ["confusion", "extrasensory", "mysticalfire"]);
		newMoves("drifblim", ["powershift"]);
		newMoves("buneary", ["doubleedge", "drainingkiss"]);
		newMoves("lopunny", ["machpunch"]);
		newMoves("glameow", ["tackle", "doubleedge", "nightslash", "nastyplot"]);
		newMoves("stunky", ["tackle", "doubleedge", "poisonjab"]);
		newMoves("chatot", ["gust", "airslash", "hurricane", "snarl", "playrough", "powershift"]);
		newMoves("spiritomb", ["extrasensory"]);
		newMoves("riolu", ["focusenergy", "closecombat"]);
		newMoves("lucario", ["machpunch"]);
		newMoves("hippopotas", ["mudbomb"]);
		newMoves("croagunk", ["earthpower", "closecombat"]);
		newMoves("carnivine", ["absorb", "leechlife"]);
		newMoves("finneon", ["bubble", "roost", "airslash", "babydolleyes"]);
		newMoves("lumineon", ["aerialace"]);
		newMoves("snover", ["iciclecrash"]);
		newMoves("yanmega", ["crunch"]);
		newMoves("probopass", ["steelbeam"]);
		newMoves("uxie", ["doublehit", "hypnosis", "mysticalpower", "powershift"]);
		newMoves("mesprit", ["doublehit", "recover", "mysticalpower"]);
		newMoves("azelf", ["doublehit", "mysticalpower", "powershift"]);
		newMoves("heatran", ["ember"]);
		newMoves("regigigas", ["tackle", "powershift"]);
		newMoves("cresselia", ["tackle", "lunarblessing", "powershift", "recover"]);
		newMoves("phione", ["calmmind", "moonblast", "takeheart", "zenheadbutt"]);
		newMoves("manaphy", ["moonblast", "takeheart", "zenheadbutt"]);
		newMoves("darkrai", ["shadowsneak", "hex"]);
		newMoves("shaymin", ["leafage", "recover", "sleeppowder", "aerialace", "playrough", "babydolleyes"]);
		newMoves("arceus", ["confusion", "quickattack", "extrasensory", "mysticalfire", "dazzlinggleam"]);
		newMoves("oshawott", ["slash"]);
		newMoves("petilil", ["babydolleyes", "poisonpowder", "recover", "leafage"]);
		newMoves("rufflet", ["doubleedge", "ominouswind", "twister"]);
		newMoves("tornadus", ["tackle", "bleakwindstorm", "twister"]);
		newMoves("thundurus", ["tackle", "spark", "twister", "powershift", "wildboltstorm"]);
		newMoves("landorus", ["tackle", "bite", "crunch", "sandsearstorm", "twister"]);
		newMoves("sylveon", ["magicalleaf"]);
		newMoves("goomy", ["acidspray", "shelter"]);
		newMoves("bergmite", ["iceshard"]);
		newMoves("rowlet", ["gust", "aerialace", "magicalleaf", "airslash", "psychocut", "leafstorm"]);

		// then adding the new Pokémon in the most efficient way possible
		for (const id in this.dataCache.Pokedex) {
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon || !newMon.copyData) continue; // weeding out Pokémon that aren't new
			let copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];

			if (!newMon.types && copyData.types) newMon.types = copyData.types;
			if (!newMon.baseStats && copyData.baseStats) newMon.baseStats = copyData.baseStats;
			if (!newMon.abilities && copyData.abilities) newMon.abilities = copyData.abilities;
			if (!newMon.num && copyData.num) newMon.num = copyData.num;
			if (!newMon.genderRatio && copyData.genderRatio) newMon.genderRatio = copyData.genderRatio;
			if (!newMon.heightm && copyData.heightm) newMon.heightm = copyData.heightm;
			if (!newMon.weightkg && copyData.weightkg) newMon.weightkg = copyData.weightkg;
			if (!newMon.color && copyData.color) newMon.color = copyData.color;
			if (!newMon.eggGroups && copyData.eggGroups) newMon.eggGroups = copyData.eggGroups;
		}
	},
	
	// MnM4A scripts
	
	canMegaEvo(pokemon) {
		if (pokemon.species.isMega) return null;

		const item = pokemon.getItem();
		if (item.megaStone) {
			if (item.megaStone === pokemon.baseSpecies.name) return null;
			return item.megaStone;
		} else {
			return null;
		}
	},
	runMegaEvo(pokemon) {
		if (pokemon.species.isMega) return false;

		// @ts-ignore
		let species: Species = this.getMixedSpecies(pokemon.species, pokemon.canMegaEvo);
		if (pokemon.getItem().name === 'RKS Megamemory') {
			let silvallyType = pokemon.hpType || 'Dark';
			if (species.types[1] === silvallyType) {
				species.types = [silvallyType];
			} else if (!species.types[1] && species.types[0] !== silvallyType) {
				// single-typed Pokémon can still have a primary type as their secondary type
				species.types = [species.types[0], silvallyType];
			} else {
				species.types = [silvallyType, species.types[1]];
			}
		}
		const side = pokemon.side;

		// Pokémon affected by Sky Drop cannot Mega Evolve. Enforce it here for now.
		for (const foeActive of side.foe.active) {
			if (foeActive.volatiles['skydrop'] && foeActive.volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		// Do we have a proper sprite for it?
		if (this.dex.getSpecies(pokemon.canMegaEvo!).baseSpecies === pokemon.m.originalSpecies) {
			pokemon.formeChange(species, pokemon.getItem(), true);
			this.add('-start', pokemon, pokemon.getItem(), '[silent]');
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		} else {
			const oSpecies = this.dex.getSpecies(pokemon.m.originalSpecies);
			// @ts-ignore
			const oMegaSpecies = this.dex.getSpecies(species.originalMega);
			pokemon.formeChange(species, pokemon.getItem(), true);
			this.add('-start', pokemon, oMegaSpecies.requiredItem, '[silent]');
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
		}
		pokemon.canMegaEvo = null;
		return true;
	},
	getMixedSpecies(originalForme, megaForme) {
		const originalSpecies = this.dex.getSpecies(originalForme);
		const megaSpecies = this.dex.getSpecies(megaForme);
		if (originalSpecies.baseSpecies === megaSpecies.baseSpecies) return megaSpecies;
		// @ts-ignore
		const deltas = this.getMegaDeltas(megaSpecies);
		// @ts-ignore
		const species = this.doGetMixedSpecies(originalSpecies, deltas);
		return species;
	},
	getMegaDeltas(megaSpecies) {
		const baseSpecies = this.dex.getSpecies(megaSpecies.baseSpecies);
		const deltas: {
			ability: string,
			baseStats: SparseStatsTable,
			weighthg: number,
			originalMega: string,
			requiredItem: string | undefined,
			type?: string,
			isMega?: boolean,
		} = {
			ability: megaSpecies.abilities['0'],
			baseStats: {},
			weighthg: megaSpecies.weighthg - baseSpecies.weighthg,
			originalMega: megaSpecies.name,
			requiredItem: megaSpecies.requiredItem,
		};
		let statId: StatName;
		for (statId in megaSpecies.baseStats) {
			deltas.baseStats[statId] = megaSpecies.baseStats[statId] - baseSpecies.baseStats[statId];
		}
		if (megaSpecies.types.length > baseSpecies.types.length) {
			deltas.type = 'type1';
			deltas.type1 = megaSpecies.types[1];
		} else if (megaSpecies.types.length < baseSpecies.types.length) {
			deltas.type = 'mono';
		} else if (megaSpecies.types[0] !== baseSpecies.types[0]) {
			deltas.type = 'type0';
			deltas.type0 = megaSpecies.types[0];
		} else if (megaSpecies.types[1] !== baseSpecies.types[1]) {
			deltas.type = 'type1';
			deltas.type1 = megaSpecies.types[1];
		}
		deltas.isMega = true;
		return deltas;
	},
	doGetMixedSpecies(speciesOrForme, deltas) {
		if (!deltas) throw new TypeError("Must specify deltas!");
		const species = this.dex.deepClone(this.dex.getSpecies(speciesOrForme));
		species.abilities = {'0': deltas.ability};
		if (deltas.type === 'mono') {
			species.types = [species.types[0]];
		} else if (deltas.type === 'type1') {
			if (species.types[0] === deltas.type1) {
				species.types = [deltas.type1];
			} else {
				species.types = [species.types[0], deltas.type1];
			}
		} else if (deltas.type === 'type0') {
			if (species.types[1] === deltas.type0) {
				species.types = [deltas.type0];
			} else if (!species.types[1] && species.types[0] !== deltas.type0) {
				// single-typed Pokémon can still have a primary type as their secondary type
				species.types = [species.types[0], deltas.type0];
			} else {
				species.types = [deltas.type0, species.types[1]];
			}
		}
		const baseStats = species.baseStats;
		for (const statName in baseStats) {
			baseStats[statName] = this.clampIntRange(baseStats[statName] + deltas.baseStats[statName], 1, 255);
		}
		species.weighthg = Math.max(1, species.weighthg + deltas.weighthg);
		species.originalMega = deltas.originalMega;
		species.requiredItem = deltas.requiredItem;
		if (deltas.isMega) species.isMega = true;
		species.deltas = deltas; // preserving deltas for potential form change compatibility
		return species;
	},

	// modifyDamage added for frostbite for Hisuian Zoroark specifically
	// I do not know restraint when I see this Pokémon I'm sorry
	// it's not even mod-related what am I doing

	modifyDamage(
		baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
	) {
		const tr = this.trunc;
		if (!move.type) move.type = '???';
		const type = move.type;

		baseDamage += 2;

		// multi-target modifier (doubles only)
		if (move.spreadHit) {
			const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
			this.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.modify(baseDamage, spreadModifier);
		}

		// weather modifier
		baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

		// crit - not a modifier
		const isCrit = target.getMoveHitData(move).crit;
		if (isCrit) {
			baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
		}

		// random factor - also not a modifier
		baseDamage = this.randomizer(baseDamage);

		// STAB
		if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			baseDamage = this.modify(baseDamage, move.stab || 1.5);
		}
		// types
		let typeMod = target.runEffectiveness(move);
		typeMod = this.clampIntRange(typeMod, -6, 6);
		target.getMoveHitData(move).typeMod = typeMod;
		if (typeMod > 0) {
			if (!suppressMessages) this.add('-supereffective', target);

			for (let i = 0; i < typeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (typeMod < 0) {
			if (!suppressMessages) this.add('-resisted', target);

			for (let i = 0; i > typeMod; i--) {
				baseDamage = tr(baseDamage / 2);
			}
		}

		if (isCrit && !suppressMessages) this.add('-crit', target);

		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
			if (this.gen < 6 || move.id !== 'facade') {
				baseDamage = this.modify(baseDamage, 0.5);
			}
		}

		if (pokemon.status === 'frz' && pokemon.statusData.frostbite && move.category === 'Special') { // the only changed section
			baseDamage = this.modify(baseDamage, 0.5);
		}

		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
		if (this.gen === 5 && !baseDamage) baseDamage = 1;

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
			baseDamage = this.modify(baseDamage, 0.25);
			this.add('-zbroken', target);
		}

		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
		if (this.gen !== 5 && !baseDamage) return 1;

		// ...but 16-bit truncation happens even later, and can truncate to 0
		return tr(baseDamage, 16);
	},

};
