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
    initializeLevels: function(id, numMelee1, numMelee2, numRanged1, numRanged2, active) {
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
        var thisLevel = Levels.findOne(level);
        addVillain("numMelee1", thisLevel.numMelee1);
        addVillain("numMelee2", thisLevel.numMelee2);
        addVillain("numRanged1", thisLevel.numRanged1);
        addVillain("numRanged2", thisLevel.numRanged2);
    }

});