export const Rulesets: {[k: string]: ModdedFormatData} = {
	onelinkbracelimit: {
		effectType: 'ValidatorRule',
		name: 'One Link Brace Limit',
		desc: "Prevents teams from having more than one Pok&eacute;mon from wearing a Link Brace.",
		banlist: ["Link Brace > 1"],
		onBegin() {
			this.add('rule', 'One Link Brace Limit: Limit to one Link Brace');
		},
	},
};
