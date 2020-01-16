'use strict';

/**@type {ModdedBattleScriptsData} */
exports.BattleScripts = {
	init() {
		// Butterfree
		this.modData('Learnsets', 'butterfree').learnset.dazzlinggleam = ['7M'];
		this.modData('Learnsets', 'butterfree').learnset.defog = ['7M'];
		this.modData('Learnsets', 'butterfree').learnset.moonblast = ['7M'];
		
		// Kingler
		this.modData('Learnsets', 'kingler').learnset.closecombat = ['7M'];
		this.modData('Learnsets', 'kingler').learnset.earthquake = ['7M'];
		this.modData('Learnsets', 'kingler').learnset.stoneedge = ['7M'];
		
		// Seaking
		this.modData('Learnsets', 'seaking').learnset.aquajet = ['7M'];
		this.modData('Learnsets', 'seaking').learnset.drillpeck = ['7M'];
		
		// Garbodor
		this.modData('Learnsets', 'garbodor').learnset.earthquake = ['7M'];
		this.modData('Learnsets', 'garbodor').learnset.irontail = ['7M'];
		this.modData('Learnsets', 'garbodor').learnset.knockoff = ['7M'];
		this.modData('Learnsets', 'garbodor').learnset.stealthrock = ['7M'];
		
		// Pikachu
		delete this.modData('Learnsets', 'pikachu').learnset.extremespeed;
		delete this.modData('Learnsets', 'pikachu').learnset.nastyplot;
		
		// Flapple
		this.modData('Learnsets', 'flapple').learnset.crunch = ['7M'];
		this.modData('Learnsets', 'flapple').learnset.refresh = ['7M'];
		
		// Appletun
		this.modData('Learnsets', 'appletun').learnset.calmmind = ['7M'];
		
		// Qwilfish
		this.modData('Learnsets', 'qwilfish').learnset.recover = ['7M'];
		
		// Pincurchin
		this.modData('Learnsets', 'pincurchin').learnset.spikyshield = ['7M'];
		this.modData('Learnsets', 'pincurchin').learnset.taunt = ['7M'];
		this.modData('Learnsets', 'pincurchin').learnset.voltswitch = ['7M'];
		
		// Rotom
		this.modData('Learnsets', 'rotom').learnset.aurasphere = ['7M'];
		this.modData('Learnsets', 'rotom').learnset.rapidspin = ['7M'];
		this.modData('Learnsets', 'rotom').learnset.sludgebomb = ['7M'];
		
		// Charizard
		this.modData('Learnsets', 'charizard').learnset.closecombat = ['7M'];
		
		// Silvally
		this.modData('Learnsets', 'silvally').learnset.recover = ['7M'];
	},
	
	getActiveMaxMove(move, pokemon) {
		if (typeof move === 'string') move = this.dex.getActiveMove(move);
		let maxMove = this.dex.getActiveMove(this.maxMoveTable[move.category === 'Status' ? move.category : move.type]);
		if (move.category !== 'Status') {
			if (pokemon.canGigantamax) {
				let gMaxTemplate = this.dex.getTemplate(pokemon.canGigantamax);
				let gMaxMove = this.dex.getActiveMove(gMaxTemplate.isGigantamax ? gMaxTemplate.isGigantamax : '');
				if (gMaxMove.exists && gMaxMove.type === move.type) maxMove = gMaxMove;
			}
			if (!move.gmaxPower) throw new Error(`${move.name} doesn't have a gmaxPower`);
			let gmaxPower = this.newGMaxPower( move ); // new max power
			maxMove.basePower = gmaxPower; // bypass old max power
			maxMove.category = move.category;
		}
		maxMove.maxPowered = true;
		return maxMove;
	},
};