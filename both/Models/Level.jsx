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
    },

    villains: {
        type: [Object],
        label: "Villains",
        optional: true
    },

    "villains.$._id": {
        type: Number,
        label: "Villain #"
    },

    "villains.$.type": {
        type: String,
        label: "Villain Type"
    },

    "villains.$.xpos": {
        type: Number,
        label: "X-Position"
    },

    "villains.$.ypos": {
        type: Number,
        label: "Y-Position"
    },

    obstacles: {
        type: [Object],
        label: "Obstacles",
        optional: true
    },

    // ensure that all obstacles passed in have the required properties
    "obstacles.$._id": {
        type: Number,
        label: "Obstacle #"
    },

    "obstacles.$.type": {
        type: String,
        label: "Obstacle Type",
        optional: true
    },

    "obstacles.$.height": {
        type: Number,
        label: "Height"
    },

    "obstacles.$.width": {
        type: Number,
        label: "Width"
    },

    "obstacles.$.xpos": {
        type: Number,
        label: "X-Position"
    },

    "obstacles.$.ypos": {
        type: Number,
        label: "Y-Position"
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
        //var test = level.obstacles[0]._id;
        var obstacles = level.obstacles;
        console.log("This is the current value of newVillains");
        console.log(level.newvillains);
        Meteor.call("createLevel", level._id, level.villains, level.obstacles, level.newvillains);

        // TODO add method to parse obstacles
    },

    createLevel: function(levelId, villains, obstacles, newVillains) {
        Levels.upsert({id: levelId}, {
            $set: {
                id: levelId,
                numMelee1: villains.melee1,
                numMelee2: villains.melee2,
                numRanged1: villains.ranged1,
                numRanged2: villains.ranged2
            }
        });
        Meteor.call("addObstacles", levelId, obstacles);
        Meteor.call("addVillains", levelId, newVillains);
    },

    addObstacles: function(levelId, obstacles, newVillains) {
        Levels.update({id: levelId}, {
            $push: {
                'obstacles':  {
                    $each: obstacles
                }
            }
        });
    },

    addVillains: function(levelId, villains) {
        console.log("This is the current value of villains:");
        console.log(villains);
        Levels.update({id: levelId}, {
            $push: {
                'villains': {
                    $each: villains
                }
            }
        });
        console.log(Levels.findOne({id: levelId}));
    },

    initLevels: function() {
        // TODO add "meteor add http" to build instructions
        HTTP.get(Meteor.absoluteUrl("levels.json"), function(err, result) {
            Meteor.call("parseLevels", result.data);
        });
    },

    loadLevel: function(levelId) {
        // set the previous level to inactive
        var prevLevel = Levels.findOne({active: true});
        Levels.update(prevLevel, {$set: {active: false}});

        // set the new level to active
        var thisLevel = Levels.findOne({_id: levelId});
        Levels.update(thisLevel, {$set: {active: true}});

        // add the appropriate villains for the given level
        Meteor.call("addVillainsNew", thisLevel.villains);
        //Meteor.call("addVillain", "melee1", thisLevel.numMelee1);
        //console.log(thisLevel);
        //Meteor.call("addVillain", "melee2", thisLevel.numMelee2);
        //Meteor.call("addVillain", "ranged1", thisLevel.numRanged1);
        //Meteor.call("addVillain", "ranged2", thisLevel.numRanged2);
    },

    clearLevels: function() {
        Levels.remove({});
    }

});