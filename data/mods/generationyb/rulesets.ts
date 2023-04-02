export const Formats: {[k: string]: ModdedFormatsData} = {
	onelinkbracelimit: {
		effectType: 'ValidatorRule',
		name: 'One Link Brace Limit',
		desc: "Prevents teams from having more than one Pok&eacute;mon from wearing a Link Brace.",
		banlist: ["Link Brace > 1"],
		onBegin() {
			this.add('rule', 'One Link Brace Limit: Limit to one Link Brace');
		},
	},
	oneabilityprismlimit: {
		effectType: 'ValidatorRule',
		name: 'One Ability Prism Limit',
		desc: "Prevents teams from having more than one Pok&eacute;mon from holding an Ability Prism.",
		banlist: ["Ability Prism > 1"],
		onBegin() {
			this.add('rule', 'One Ability Prism Limit: Limit to one Ability Prism');
		},
	},
};
