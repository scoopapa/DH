'use strict';

/**@type {ModdedBattleScriptsData} */
let BattleScripts = {
	inherit: 'gen7',
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
};