// Component to handle implementation details of weapons

Weapons = new Mongo.Collection('weapons');

var Schemas = {};

Schemas.Weapon = new SimpleSchema({
    type: {
        type: String,
        label: "Weapon Class"
    },

    name: {
        type: String,
        label: "Weapon Name"
    },

    damage: {
        type: Number,
        label: "Damage"
    },

    source: {
        type: String,
        label: "Image"
    },

    atkSpeed: {
        type: Number,
        label: "Attack Speed",
        min: 0.1,
        max: 5
    },

    purchased: {
        type: Boolean,
        label: "Purchased"
    }
});

Weapons.attachSchema(Schemas.Weapon);

Meteor.methods({
    addWeapon() {
        //this will create weapons using an external list of weapons

    },

    removeWeapon() {
        //this will remove a weapon from the game; may not need this in the end
    },

    updateWeapon(weaponName, bool) {
        // update the weapon "purchased" value to
        Weapons.update({name: weaponName}, {$set: {purchased: bool}});
    }
});