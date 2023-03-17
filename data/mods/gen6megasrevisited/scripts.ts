export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen6',
	pokemon: {
		// for neutralizing gas
		ignoringAbility() {
			if (this.battle.gen >= 5 && !this.isActive) return true;
			if (this.getAbility().isPermanent) return false;
			if (this.volatiles['gastroacid']) return true;
			if (this.ability === ('neutralizinggas' as ID)) return false;
			if (this.volatiles['neutralizinggas']) return true;

			return false;
		},
	},
	init: function () {
		this.modData("Learnsets", "lucario").learnset.meteormash = ["6L1"];
		this.modData("Learnsets", "lucario").learnset.machpunch = ["6L1"];
		this.modData("Learnsets", "houndoom").learnset.toxicspikes = ["6L1"];
		this.modData("Learnsets", "houndoom").learnset.venoshock = ["6L1"];
		this.modData("Learnsets", "houndoom").learnset.hex = ["6L1"];
		this.modData("Learnsets", "audino").learnset.discharge = ["6L1"];
		this.modData("Learnsets", "audino").learnset.voltswitch = ["6L1"];
		this.modData("Learnsets", "audino").learnset.chargebeam = ["6L1"];
		this.modData("Learnsets", "audino").learnset.charge = ["6L1"];
		this.modData("Learnsets", "audino").learnset.zapcannon = ["6L1"];
		this.modData("Learnsets", "glalie").learnset.thunderfang = ["6L1"];
		this.modData("Learnsets", "glalie").learnset.partingshot = ["6L1"];
		this.modData("Learnsets", "banette").learnset.ironhead = ["6L1"];
		this.modData("Learnsets", "banette").learnset.metalsound = ["6L1"];
		this.modData("Learnsets", "banette").learnset.powder = ["6L1"];
		this.modData("Learnsets", "venusaur").learnset.psychic = ["6L1"];
		this.modData("Learnsets", "venusaur").learnset.calmmind = ["6L1"];
		this.modData("Learnsets", "venusaur").learnset.earthpower = ["6L1"];
		this.modData("Learnsets", "blastoise").learnset.moonblast = ["6L1"];
		this.modData("Learnsets", "blastoise").learnset.mistyterrain = ["6L1"];
		this.modData("Learnsets", "blastoise").learnset.taunt = ["6L1"];
		this.modData("Learnsets", "blastoise").learnset.drainingkiss = ["6L1"];
		this.modData("Learnsets", "blastoise").learnset.dazzlinggleam = ["6L1"];
		this.modData("Learnsets", "gengar").learnset.reflecttype = ["6L1"];
		this.modData("Learnsets", "gengar").learnset.calmmind = ["6L1"];
		this.modData("Learnsets", "alakazam").learnset.blizzard = ["6L1"];
		this.modData("Learnsets", "alakazam").learnset.flashcannon = ["6L1"];
		this.modData("Learnsets", "alakazam").learnset.icebeam = ["6L1"];
		this.modData("Learnsets", "alakazam").learnset.hail = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.hail = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.megahorn = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.uturn = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.iceshard = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.iciclecrash = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.icebeam = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.blizzard = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.roost = ["6L1"];
		this.modData("Learnsets", "pinsir").learnset.iciclespear = ["6L1"];
		this.modData("Learnsets", "aerodactyl").learnset.powergem = ["6L1"];
		this.modData("Learnsets", "aerodactyl").learnset.shadowball = ["6L1"];
		this.modData("Learnsets", "aerodactyl").learnset.hurricane = ["6L1"];
		this.modData("Learnsets", "steelix").learnset.heatcrash = ["6L1"];
		this.modData("Learnsets", "steelix").learnset.rapidspin = ["6L1"];
		this.modData("Learnsets", "steelix").learnset.smackdown = ["6L1"];
		this.modData("Learnsets", "altaria").learnset.scald = ["6L1"];
		this.modData("Learnsets", "altaria").learnset.hydropump = ["6L1"];
		this.modData("Learnsets", "altaria").learnset.thunder = ["6L1"];
		this.modData("Learnsets", "sceptile").learnset.calmmind = ["6L1"];
		this.modData("Learnsets", "sceptile").learnset.sludgewave = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.sludgebomb = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.bulkup = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.toxicspikes = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.aquajet = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.gunkshot = ["6L1"];
		this.modData("Learnsets", "swampert").learnset.poisonjab = ["6L1"];
		this.modData("Learnsets", "pidgeot").learnset.focusblast = ["6L1"];
		this.modData("Learnsets", "absol").learnset.closecombat = ["6L1"];
		this.modData("Learnsets", "absol").learnset.moonblast = ["6L1"];
		this.modData("Learnsets", "absol").learnset.moonlight = ["6L1"];
		this.modData("Learnsets", "medicham").learnset.aurasphere = ["6L1"];
		this.modData("Learnsets", "medicham").learnset.thunderbolt = ["6L1"];
		this.modData("Learnsets", "medicham").learnset.closecombat = ["6L1"];
		this.modData("Learnsets", "medicham").learnset.gunkshot = ["6L1"];
		this.modData("Learnsets", "medicham").learnset.healingwish = ["6L1"];
	},
};
