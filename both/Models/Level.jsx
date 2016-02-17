// Component to handle implementation details of levels

Levels = new Mongo.Collection('levels');

var Schemas = {};

Schemas.Level = new SimpleSchema({
    id: {
        type: Number,
        label: "Level"
    },

    numMelee1: {
        type: Number,
        label: "# Melee1",
        optional: true
    },

    numMelee2: {
        type: Number,
        label: "# Melee2",
        optional: true
    },

    numRanged1: {
        type: Number,
        label: "# Ranged1",
        optional: true
    },

    numRanged2: {
        type: Number,
        label: "# Ranged2",
        optional: true
    },

    active: {
        type: Boolean,
        label: "Currently Active",
        optional: true
    }
});

Levels.attachSchema(Schemas.Level);

Meteor.methods({
    parseLevels: function(obj) {
        // this returns a JSON object containing level information
        var levelSet = {};
        levelSet = obj;
        for (i=0; i<levelSet.length; i++) {
            Meteor.call("parseLevel", levelSet[i]);
        }
    },

    parseLevel: function(level) {
        // should the level be created here?

        Meteor.call("createLevel", level._id, level.villains);

        // TODO add method to parse obstacles
    },

    createLevel: function(levelId, villains) {
        Levels.upsert({id: levelId}, {
            $set: {
                id: levelId,
                numMelee1: villains.melee1,
                numMelee2: villains.melee2,
                numRanged1: villains.ranged1,
                numRanged2: villains.ranged2
            }
        });

    },

    initLevels: function() {
        // TODO add "meteor add http" to build instructions
        HTTP.get(Meteor.absoluteUrl("levels.json"), function(err, result) {
            Meteor.call("parseLevels", result.data);
        });
    },

    loadLevel: function(levelId) {
        var thisLevel = Levels.findOne({_id: levelId});
        Meteor.call("addVillain", "melee1", thisLevel.numMelee1);
        Meteor.call("addVillain", "melee2", thisLevel.numMelee2);
        Meteor.call("addVillain", "ranged1", thisLevel.numRanged1);
        Meteor.call("addVillain", "ranged2", thisLevel.numRanged2);
    },

    clearLevels: function() {
        Levels.remove({});
    }

});

if (Meteor.isServer) {
    Meteor.methods({

        // leaving this commented out; parsing will initially be handled on client side
        // and returned to server side later if necessary

        //createJSONLevel: function (path) {
        //    // parse JSON object here to create level
        //    var levels = {};
        //    levels = Assets.getText(path);
        //    return levels;
        //}

    });
}