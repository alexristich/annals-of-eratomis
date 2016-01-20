// Component to handle implementation details of villains

/* Leaving this Mongo call commented out until helper methods are completed
   so villains can be properly accessed from other parts of the project.
*/
Villains = new Mongo.Collection('villains');

var Schemas = {};

Schemas.Villains = new SimpleSchema({
    type: {
        type: String,
        label: "Villain Type"
    },

    alive: {
        type: Boolean,
        label: "Alive"
    },

    //hitPoints: {
    //    type: Number,
    //    label: "Hit Points",
    //    min: 0,
    //    max: 10000
    //},
    //
    //xpos: {
    //    type: Number,
    //    label: "X-Position",
    //    min: 0
    //},
    //
    //ypos: {
    //    type: Number,
    //    label: "Y-Position",
    //    min: 0
    //},
    //
    //speed: {
    //    type: Number,
    //    label: "Movement Speed",
    //    min: 0,
    //    max: 5
    //},

    source: {
        type: String,
        label: "Image"
    }
});

Villains.attachSchema(Schemas.Villains);

//Villains.helpers({
    // TODO add helper methods to access different attributes of villains
//});

Meteor.methods({
    addVillain(type, num) {
        for (i = 0; i < num; i++) {
            Villains.insert({
                type: type,
                alive: true,
                source: '/' + type + '.jpg'
            })
        }
    },

    clearVillains() {
        Villains.remove({});
    }
});