// Component to handle implementation details of levels

Levels = new Mongo.Collection('levels');

var Schemas = {};
var screenX;
var screenY;

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
        var tempObstacles = [
            {
                "_id": 1,
                "type": "wall",
                "height": screenY,
                "width": 10,
                "xpos": 0,
                "ypos": 0
            },
            {
                "_id": 2,
                "type": "wall",
                "height": screenY,
                "width": 10,
                "xpos": screenX-10,
                "ypos": 0
            },
            {
                "_id": 3,
                "type": "wall",
                "height": 10,
                "width": screenX,
                "xpos": 0,
                "ypos": 0
            },
            {
                "_id": 4,
                "type": "wall",
                "height": 10,
                "width": screenX,
                "xpos": 0,
                "ypos": screenY-10
            }
        ];

        Levels.update({id: levelId}, {
            $push: {
                'obstacles':  {
                    $each: tempObstacles
                }
            }
        });

        // temporarily comment this out while manually adding obstacles
        // Levels.update({id: levelId}, {
        //     $push: {
        //         'obstacles':  {
        //             $each: obstacles
        //         }
        //     }
        // });
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

    initLevels: function(x, y) {
        screenX = x;
        screenY = y;
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

    // endLevel is called when there are no remaining villains in the level
    endLevel: function() {
        var prevLevel = Levels.findOne({active:true});
        Levels.update(prevLevel, {$set: {active: false}});
    },

    clearLevels: function() {
        Levels.remove({});
    }

});