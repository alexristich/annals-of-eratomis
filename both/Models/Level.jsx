// Component to handle implementation details of levels

Levels = new Mongo.Collection('levels');

var Schemas = {};

Schemas.Level = new SimpleSchema({
    id: {
        type: Number,
        label: "Level"
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

    // ensure all villains added to the level have the required properties
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
        var levelId = level._id;

        // add initial entry for level
        // TODO set additional level properties when parsing the level
        Levels.upsert({id: levelId}, {
            $set: {
                id: levelId
            }
        });

        Meteor.call("parseObstacles", levelId, level.obstacles);
        Meteor.call("parseVillains", levelId, level.villains);

    },

    parseObstacles: function(levelId, obstacles) {
        Levels.update({id: levelId}, {
            $push: {
                'obstacles':  {
                    $each: obstacles
                }
            }
        });
    },

    parseVillains: function(levelId, villains) {
        Levels.update({id: levelId}, {
            $push: {
                'villains': {
                    $each: villains
                }
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
        // set the previous level to inactive
        var prevLevel = Levels.findOne({active: true});
        Levels.update(prevLevel, {$set: {active: false}});

        // set the new level to active
        var thisLevel = Levels.findOne({_id: levelId});
        Levels.update(thisLevel, {$set: {active: true}});

        // add the appropriate villains for the given level
        Meteor.call("summonVillains", thisLevel.villains);
    },

    clearLevels: function() {
        Levels.remove({});
    }

});