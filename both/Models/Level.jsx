// Component to handle implementation details of levels

Levels = new Mongo.Collection('levels');

var Schemas = {};
var screenX;
var screenY;
var gameMode;



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

        Meteor.call("parseObstacles", levelId);
        Meteor.call("parseVillains", levelId, level.villains);

    },

    // eventually this will be extended with other impassible objects, such as boulders and posts
    parseObstacles: function(levelId) {
        var wallThickness;
        if (gameMode === "mobile") {
            wallThickness = 4
        } else if (gameMode === "web-sm") {
            wallThickness = 5
        } else if (gameMode === "web-md") {
            wallThickness = 8
        } else {
            wallThickness = 10
        }

        var walls = [
            {
                "_id": 1,
                "type": "wall",
                "height": screenY,
                "width": wallThickness,
                "xpos": 0,
                "ypos": 0
            },
            {
                "_id": 2,
                "type": "wall",
                "height": screenY,
                "width": wallThickness,
                "xpos": screenX-wallThickness,
                "ypos": 0
            },
            {
                "_id": 3,
                "type": "wall",
                "height": wallThickness,
                "width": screenX,
                "xpos": 0,
                "ypos": 0
            },
            {
                "_id": 4,
                "type": "wall",
                "height": wallThickness,
                "width": screenX,
                "xpos": 0,
                "ypos": screenY-wallThickness
            }
        ];

        Levels.update({id: levelId}, {
            $push: {
                'obstacles':  {
                    $each: walls
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

    parseVillains: function(levelId, vilList) {
        var villains = vilList;
        
        for (var i=0; i<villains.length; i++) {
            villains[i].xpos = Math.floor(villains[i].xpos * screenX / 100);
            villains[i].ypos = Math.floor(villains[i].ypos * screenY / 100);
        }
        
        Levels.update({id: levelId}, {
            $push: {
                'villains': {
                    $each: villains
                }
            }
        });
    },

    initLevels: function(x, y, mode) {
        gameMode = mode;
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