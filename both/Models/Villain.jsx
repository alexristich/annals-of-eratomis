// Component to handle implementation details of villains

Villains = new Mongo.Collection('villains');

var Schemas = {};

Schemas.Villain = new SimpleSchema({
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
    // adds n villains to the list of villains using the given type
    addVillain: function(type, n) {
        for (i = 0; i < n; i++) {
            Villains.insert({
                type: type,
                alive: true,
                xpos: 300,
                ypos: 300,
                source: '/' + type + '.jpg'
            })
        }
    },

    addVillainsNew: function(villains) {
        for (i=0; i<villains.length; i++) {
            Villains.insert({
                type: villains[i].type,
                alive: true,
                xpos: villains[i].xpos,
                ypos: villains[i].ypos,
                source: '/' + villains[i].type + '.jpg'
            })
        }
    },

    clearVillains: function() {
        Villains.remove({});
    }
});