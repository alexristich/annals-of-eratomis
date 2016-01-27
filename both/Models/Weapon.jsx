// Component to handle implementation details of weapons

Weapons = new Mongo.Collection('weapons');

Schema.Weapon = new SimpleSchema({
    type: {
        type: String,
        name: "Weapon Class"
    },

    name: {
        type: String,
        name: "Weapon Name"
    },

    damage: {
        type: Number,
        name: "Damage"
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

Weapons.attachSchema(Schema.Weapon);

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