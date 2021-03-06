// Component to handle implementation details of villains

Villains = new Mongo.Collection('villains');

var Schemas = {};

Schemas.Villain = new SimpleSchema({
    id: {
        type: Number,
        label: "Villain ID"
    },

    type: {
        type: String,
        label: "Villain Type"
    },

    alive: {
        type: Boolean,
        label: "Alive",
        optional: true
    },

    hitPoints: {
        type: Number,
        label: "Hit Points",
        optional: true,
        min: 0,
        max: 10000
    },

    xpos: {
        type: Number,
        label: "X-Position",
        optional: true,
        min: 0
    },

    ypos: {
        type: Number,
        label: "Y-Position",
        optional: true,
        min: 0
    },

    width: {
        type: Number,
        label: "Width"
    },

    height: {
        type: Number,
        label: "Height"
    },

    speed: {
        type: Number,
        label: "Movement Speed",
        optional: true,
        min: 0,
        max: 5
    },

    source: {
        type: String,
        label: "Image",
        optional: true
    }
});

Villains.attachSchema(Schemas.Villain);

Meteor.methods({
    // adds villains to the list of villains using the given type
    summonVillains: function(villains) {
        for (i=0; i<villains.length; i++) {
            Meteor.call("summonVillain", villains[i]);
        }
    },

    // TODO call methods to determine appropriate speed and hit points based on villain type
    summonVillain: function(villain) {
        // TODO customize height and width based on game mode
        Villains.insert({
            id: villain._id,
            type: villain.type,
            xpos: villain.xpos,
            ypos: villain.ypos,
            height: 50,
            width: 50,
            alive: true,
            source: '/' + villain.type + '.jpg'
        })
    },

    killVillain: function(villain) {
        Villains.remove({id: villain.id});
    },

    clearVillains: function() {
        Villains.remove({});
    }
});