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
        label: "Alive"
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
        label: "Image"
    }
});

Villains.attachSchema(Schemas.Villain);

//Villains.helpers({
    // TODO add helper methods to access different attributes of villains
//});

var rate = 2;

Meteor.methods({
    addVillain(type, num) {
        for (i = 0; i < num; i++) {
            Villains.insert({
                type: type,
                alive: true,
                xpos: 300,
                ypos: 300,
                source: '/' + type + '.jpg'
            })
        }
    },

    moveVillains(key) {
        if (key === "ArrowRight") {
            Meteor.call("moveVillainsLaterally", rate);
        } else if (key === "ArrowLeft") {
            this.moveVillainsLaterally(-rate);
        } else if (key === "ArrowDown") {
            this.moveVillainsVertically(-rate);
        } else if (key === "ArrowUp") {
            this.moveVillainsVertically(-rate);
        }
    },

    // TODO figure out how to re-render villains after move action
    moveVillainsLaterally(delta) {
        Villains.update({}, {$inc: {xpos: delta}});
    },

    moveVillainsVertically(delta) {
        Villains.update({}, {$inc: {ypos: delta}});
    },

    clearVillains() {
        Villains.remove({});
    }
});