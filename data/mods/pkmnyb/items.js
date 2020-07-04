'use strict';
exports.BattleItems = {
    "waterstone": {
        id: "waterstone",
        name: "Water Stone",
        spritenum: 529,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Water' || move.type === 'Ice') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 84,
        gen: 1,
        desc: "Holder's Water-type and Ice-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "firestone": {
        id: "firestone",
        name: "Fire Stone",
        spritenum: 142,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Fire' || move.type === 'Grass') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 82,
        gen: 1,
        desc: "Holder's Fire-type and Grass-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "thunderstone": {
        id: "thunderstone",
        name: "Thunder Stone",
        spritenum: 492,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Electric' || move.type === 'Fighting') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 83,
        gen: 1,
        desc: "Holder's Electric-type and Fighting-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "leafstone": {
        id: "leafstone",
        name: "Leaf Stone",
        spritenum: 241,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Grass' || move.type === 'Poison') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 85,
        gen: 1,
        desc: "Holder's Grass-type and Poison-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "moonstone": {
        id: "moonstone",
        name: "Moon Stone",
        spritenum: 295,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Fairy' || move.type === 'Dark') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 81,
        gen: 1,
        desc: "Holder's Fairy-type and Dark-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "sunstone": {
        id: "sunstone",
        name: "Sun Stone",
        spritenum: 480,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Psychic' || move.type === 'Grass') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 80,
        gen: 2,
        desc: "Holder's Psychic-type and Grass-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "shinystone": {
        id: "shinystone",
        name: "Shiny Stone",
        spritenum: 439,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Normal' || move.type === 'Fairy') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 107,
        gen: 4,
        desc: "Holder's Normal-type and Fairy-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "duskstone": {
        id: "duskstone",
        name: "Dusk Stone",
        spritenum: 116,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Ghost' || move.type === 'Dark') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 108,
        gen: 4,
        desc: "Holder's Ghost-type and Dark-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "dawnstone": {
        id: "dawnstone",
        name: "Dawn Stone",
        spritenum: 92,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Fighting' || move.type === 'Ice') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 109,
        gen: 4,
        desc: "Holder's Fighting-type and Ice-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "bugmemory": {
        id: "bugmemory",
        name: "Bug Memory",
        spritenum: 673,
        onMemory: 'Bug',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Bug') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Bug",
        num: 909,
        gen: 7,
        desc: "Holder's Multi-Attack is Bug type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "darkmemory": {
        id: "darkmemory",
        name: "Dark Memory",
        spritenum: 683,
        onMemory: 'Dark',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Dark') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Dark",
        num: 919,
        gen: 7,
        desc: "Holder's Multi-Attack is Dark type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "dragonmemory": {
        id: "dragonmemory",
        name: "Dragon Memory",
        spritenum: 682,
        onMemory: 'Dragon',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Dragon') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Dragon",
        num: 918,
        gen: 7,
        desc: "Holder's Multi-Attack is Dragon type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "electricmemory": {
        id: "electricmemory",
        name: "Electric Memory",
        spritenum: 679,
        onMemory: 'Electric',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Electric') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Electric",
        num: 915,
        gen: 7,
        desc: "Holder's Multi-Attack is Electric type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "fairymemory": {
        id: "fairymemory",
        name: "Fairy Memory",
        spritenum: 684,
        onMemory: 'Fairy',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Fairy') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Fairy",
        num: 920,
        gen: 7,
        desc: "Holder's Multi-Attack is Fairy type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "fightingmemory": {
        id: "fightingmemory",
        name: "Fighting Memory",
        spritenum: 668,
        onMemory: 'Fighting',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Fighting') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Fighting",
        num: 904,
        gen: 7,
        desc: "Holder's Multi-Attack is Fighting type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "firememory": {
        id: "firememory",
        name: "Fire Memory",
        spritenum: 676,
        onMemory: 'Fire',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Fire') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Fire",
        num: 912,
        gen: 7,
        desc: "Holder's Multi-Attack is Fire type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "flyingmemory": {
        id: "flyingmemory",
        name: "Flying Memory",
        spritenum: 669,
        onMemory: 'Flying',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Flying') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Flying",
        num: 905,
        gen: 7,
        desc: "Holder's Multi-Attack is Flying type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "ghostmemory": {
        id: "ghostmemory",
        name: "Ghost Memory",
        spritenum: 674,
        onMemory: 'Ghost',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Ghost') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Ghost",
        num: 910,
        gen: 7,
        desc: "Holder's Multi-Attack is Ghost type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "grassmemory": {
        id: "grassmemory",
        name: "Grass Memory",
        spritenum: 678,
        onMemory: 'Grass',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Grass') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Grass",
        num: 914,
        gen: 7,
        desc: "Holder's Multi-Attack is Grass type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "groundmemory": {
        id: "groundmemory",
        name: "Ground Memory",
        spritenum: 671,
        onMemory: 'Ground',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Ground') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Ground",
        num: 907,
        gen: 7,
        desc: "Holder's Multi-Attack is Ground type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "icememory": {
        id: "icememory",
        name: "Ice Memory",
        spritenum: 681,
        onMemory: 'Ice',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Ice') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Ice",
        num: 917,
        gen: 7,
        desc: "Holder's Multi-Attack is Ice type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "poisonmemory": {
        id: "poisonmemory",
        name: "Poison Memory",
        spritenum: 670,
        onMemory: 'Poison',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Poison') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Poison",
        num: 906,
        gen: 7,
        desc: "Holder's Multi-Attack is Poison type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "psychicmemory": {
        id: "psychicmemory",
        name: "Psychic Memory",
        spritenum: 680,
        onMemory: 'Psychic',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Psychic') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Psychic",
        num: 916,
        gen: 7,
        desc: "Holder's Multi-Attack is Psychic type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "rockmemory": {
        id: "rockmemory",
        name: "Rock Memory",
        spritenum: 672,
        onMemory: 'Rock',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Rock') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Rock",
        num: 908,
        gen: 7,
        desc: "Holder's Multi-Attack is Rock type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "steelmemory": {
        id: "steelmemory",
        name: "Steel Memory",
        spritenum: 675,
        onMemory: 'Steel',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Steel') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Steel",
        num: 911,
        gen: 7,
        desc: "Holder's Multi-Attack is Steel type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "watermemory": {
        id: "watermemory",
        name: "Water Memory",
        spritenum: 677,
        onMemory: 'Water',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Water') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Water",
        num: 913,
        gen: 7,
        desc: "Holder's Multi-Attack is Water type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "leek": {
        id: "leek",
        name: "Leek",
        fling: {
            basePower: 60,
        },
        spritenum: 475,
        onModifyCritRatio(critRatio, user) {
            if (["Farfetch'd", "Sirfetch'd"].includes(user.baseTemplate.baseSpecies)) {
                return critRatio + 2;
            }
        },
        onTakeItem: function(item, source) {
            if (source.baseTemplate.baseSpecies === 'Farfetch'd' || source.baseTemplate.baseSpecies === 'Sirfetch'd') return false;
            return true;
        },
        itemUser: ["Farfetch'd", "Sirfetch'd"],
        num: 259,
        gen: 8,
        desc: "If held by a Farfetch'd or Sirfetch'd, its critical hit ratio is raised by 2 stages.",
    },
    "lightball": {
        id: "lightball",
        name: "Light Ball",
        spritenum: 251,
        fling: {
            basePower: 30,
            status: 'par',
        },
        onModifyAtkPriority: 1,
        onModifyAtk(atk, pokemon) {
            if (pokemon.baseTemplate.baseSpecies === 'Pikachu') {
                return this.chainModify(2);
            }
        },
        onModifySpAPriority: 1,
        onModifySpA(spa, pokemon) {
            if (pokemon.baseTemplate.baseSpecies === 'Pikachu') {
                return this.chainModify(2);
            }
        },
        onTakeItem: function(item, source) {
            if (source.baseTemplate.baseSpecies === 'Pikachu') return false;
            return true;
        },
        onResidualOrder: 26,
        onResidualSubOrder: 2,
        onResidual(pokemon) {
            pokemon.trySetStatus('par', pokemon);
        },
        itemUser: ["Pikachu"],
        num: 236,
        gen: 2,
        desc: "If held by a Pikachu, its Attack and Sp. Atk are doubled.",
    },
    "ragecandybar": {
        id: "ragecandybar",
        name: "RageCandyBar",
        onStart: function(pokemon) {
            this.add('-item', pokemon, 'Rage Candy Bar');
            if (pokemon.baseTemplate.baseSpecies === 'Darmanitan') {
                pokemon.addVolatile('zenmode');
            }
        },
        fling: {
            basePower: 20,
        },
        onBasePowerPriority: 6,
        onBasePower: function(basePower, user, target, move) {
            if (move && (user.baseTemplate.num === 555) && (move.type === 'Psychic')) {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function(item, pokemon, source) {
            if ((source && source.baseTemplate.num === 555) || pokemon.baseTemplate.num === 555) {
                return false;
            }
            return true;
        },
        gen: 7,
        desc: "If this Pokémon is a Darmanitan, it becomes Zen Mode Darmanitan, and it's Psychic-Type moves have 1.2x more power",
    },
    "mintyragecandybar": {
        id: "mintyragecandybar",
        name: "RageCandyBar",
        onStart: function(pokemon) {
            this.add('-item', pokemon, 'MintyRageCandyBar');
            if (pokemon.baseTemplate.baseSpecies === 'Darmanitan') {
                pokemon.addVolatile('zenmode');
            }
        },
        fling: {
            basePower: 20,
        },
        onBasePowerPriority: 6,
        onBasePower: function(basePower, user, target, move) {
            if (move && (user.baseTemplate.num === 555) && (move.type === 'Fire')) {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function(item, pokemon, source) {
            if ((source && source.baseTemplate.num === 555) || pokemon.baseTemplate.num === 555) {
                return false;
            }
            return true;
        },
        gen: 8,
        desc: "If this Pokémon is a Darmanitan, it becomes Zen Mode Darmanitan, and it's Fire-Type moves have 1.2x more power",
    },
    "reliccharm": {
        id: "reliccharm",
        name: "Relic Charm",
        onStart: function(pokemon) {
            this.add('-item', pokemon, 'Relic Charm');
            if (pokemon.baseTemplate.baseSpecies === 'Meloetta') {
                this.add('-formechange', pokemon, 'Meloetta-Pirouette', '[msg]');
                pokemon.formeChange("Meloetta-Pirouette");
            }
        },
        fling: {
            basePower: 40,
        },
        onBasePowerPriority: 6,
        onBasePower: function(basePower, user, target, move) {
            if (move && (user.baseTemplate.num === 648) && (move.type === 'Fighting')) {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function(item, pokemon, source) {
            if ((source && source.baseTemplate.num === 648) || pokemon.baseTemplate.num === 648) {
                return false;
            }
            return true;
        },
        gen: 7,
        desc: "If this Pokémon is a Meloetta, it changes to Pirouette, and it's Fighting-Type moves have 1.2x more power",
    },
    "graduationscale": {
        id: "graduationscale",
        name: "Graduation Scale",
        onStart: function(pokemon) {
            this.add('-item', pokemon, 'Graduation Scale');
            if (pokemon.baseTemplate.baseSpecies === 'Wishiwashi') {
                this.add('-formechange', pokemon, 'Wishiwashi-School', '[msg]');
                pokemon.formeChange("Wishiwashi-School");
                let oldAbility = pokemon.setAbility('intimidate', pokemon, 'intimidate', true);
                if (oldAbility) {
                    this.add('-activate', pokemon, 'ability: Intimidate', oldAbility, '[of] ' + pokemon);
                }
            }
        },
        onTakeItem: function(item, source) {
            if (source.baseTemplate.baseSpecies === 'Wishiwashi' || source.baseTemplate.baseSpecies === 'Wishiwashi-School') return false;
            return true;
        },
        fling: {
            basePower: 20,
        },
        onBasePowerPriority: 6,
        onBasePower: function(basePower, user, target, move) {
            if (move && (user.baseTemplate.num === 746) && (move.type === 'Water')) {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        gen: 7,
        desc: "If holder is a Wishiwashi, it becomes School Form. Its ability becomes Intimidate. Water moves are boosted by 1.2x",
    },
    farawaystone: {
        name: "Faraway Stone",
        fling: {
            basePower: 130,
        },
        desc: "If the holder's evolution has a regional variant (and the holder isn't a regional variant), this Pokemon will evolve into that regional form when held.",
        shortDesc: "Allows the holder to evolve into a regional variant.",
    },
};
