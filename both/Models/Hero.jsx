// Component to handle the implementation details of Hero

// starting with a single Hero instance for now
// TODO figure out how to best handle storage and retrieval of hero for different players
Hero = new Mongo.Collection('hero');

var Schemas = {};

Schemas.Hero = new SimpleSchema({
    name: {
        type: String,
        name: "Username"
    },

    hitPoints: {
        type: Number,
        name: "Hit Points"
    },

    damage: {
        type: Number,
        name: "Damage"
    },

    defense: {
        type: Number,
        name: "Defense Bonus"
    },

    atkSpeed: {
        type: Number,
        name: "Attack Speed"
    },

    xpos: {
        type: Number,
        name: "X Position",
        min: 0
    },

    ypos: {
        type: Number,
        name: "Y Position",
        min: 0
    },

    movSpeed: {
        type: Number,
        name: "Movement Speed",
        min: 0,
        max: 10
    },

    gold: {
        type: Number,
        name: "Gold",
        min: 0
    },

    // currently equipped weapon
    currWeapon: {
        type: Schemas.Weapon,
        name: "Current Weapon"
    },

    // list of all owned weapons
    purcWeapons: {
        type: [Schemas.Weapon],
        name: "Purchased Weapons"
    },

    // currently equipped armor
    currArmor: {
        type: Schemas.Armor,
        name: "Current Armor"
    },

    // list of all owned armors
    purcArmors: {
        type: [Schemas.Armor],
        name: "Purchased Armors"
    }
});

Hero.attachSchema(Schemas.Hero);

Meteor.methods({
    adjustBalance(delta) {
        Hero.gold += delta;
    },

    changeArmor(armor) {
        Hero.currArmor = armor;
    },

    changeWeapon(weapon) {
        Hero.currWeapon = weapon;
    }

    // TODO add additional methods to modify Hero
});