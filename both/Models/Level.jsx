// Component to handle implementation details of levels

Levels = new Mongo.Collection('levels');

var Schemas = {};

Schemas.Levels = new SimpleSchema({
    id: {
        type: Number,
        label: "Level"
    },

    numMelee1: {
        type: Number,
        label: "# Melee1"
    },

    numMelee2: {
        type: Number,
        label: "# Melee2"
    },

    numRanged1: {
        type: Number,
        label: "# Ranged1"
    },

    numRanged2: {
        type: Number,
        label: "# Ranged2"
    },

    active: {
        type: Boolean,
        label: "Currently Active"
    }
});

Levels.attachSchema(Schemas.Levels);

Meteor.methods({
    createLevel: function(id, numMelee1, numMelee2, numRanged1, numRanged2, active) {
        Levels.insert({
            id: id,
            numMelee1: numMelee1,
            numMelee2: numMelee2,
            numRanged1: numRanged1,
            numRanged2: numRanged2,
            active: active
        })
    },

    loadLevel: function(level) {
        var thisLevel = Levels.findOne({_id: level});
        Meteor.call("addVillain", "melee1", thisLevel.numMelee1);
        Meteor.call("addVillain", "melee2", thisLevel.numMelee2);
        Meteor.call("addVillain", "ranged1", thisLevel.numRanged1);
        Meteor.call("addVillain", "ranged2", thisLevel.numRanged2);
    },

    clearLevels: function() {
        Levels.remove({});
    }

});