// Component to handle the implementation details of Hero

// starting with a single Hero instance for now
// TODO figure out how to best handle storage and retrieval of hero for different players
Heros = new Mongo.Collection('heroes');

var Schemas = {};

Schemas.Hero = new SimpleSchema({
    username: {
        type: String,
        label: "Username"
    },

    hitPoints: {
        type: Number,
        label: "Hit Points",
        optional: true
    },

    damage: {
        type: Number,
        label: "Damage",
        optional: true
    },

    defense: {
        type: Number,
        label: "Defense Bonus",
        optional: true
    },

    atkSpeed: {
        type: Number,
        label: "Attack Speed",
        optional: true
    },

    xpos: {
        type: Number,
        label: "X Position",
        min: 0
    },

    ypos: {
        type: Number,
        label: "Y Position",
        min: 0
    },

    movSpeed: {
        type: Number,
        label: "Movement Speed",
        optional: true,
        min: 0,
        max: 10
    },

    gold: {
        type: Number,
        label: "Gold",
        optional: true,
        min: 0
    },

    // currently equipped weapon
    currWeapon: {
        type: Schemas.Weapon,
        label: "Current Weapon",
        optional: true
    },

    // list of all owned weapons
    purcWeapons: {
        type: [Schemas.Weapon],
        label: "Purchased Weapons",
        optional: true
    },

    // currently equipped armor
    currArmor: {
        type: Schemas.Armor,
        label: "Current Armor",
        optional: true
    },

    // list of all owned armors
    purcArmors: {
        type: [Schemas.Armor],
        label: "Purchased Armors",
        optional: true
    }
});

Heros.attachSchema(Schemas.Hero);

Meteor.methods({
    addHero: function(hero) {
        Heros.insert({
            username: hero.username,
            xpos: hero.xpos,
            ypos: hero.ypos
        })
    },
    //adjustBalance(delta) {
    //    Hero.gold += delta;
    //},
    //
    //changeArmor(armor) {
    //    Hero.currArmor = armor;
    //},
    //
    //changeWeapon(weapon) {
    //    Hero.currWeapon = weapon;
    //},

    removeHero() {
        Heros.remove({});
    }

    // TODO add additional methods to modify Hero
});