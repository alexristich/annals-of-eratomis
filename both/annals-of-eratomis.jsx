// Define a collection to hold our hero+villains

// move levels collection to new schema like Villains
//Levels = new Mongo.Collection("levels");

// set default movement rate for game
defaultMovementRate = 20;

if (Meteor.isClient) {
    // code executed on the client

    // TODO create a collection for each unique object type
    Meteor.subscribe("villains");
    Meteor.subscribe("levels");
    Meteor.subscribe("heroes");

    Meteor.startup(function() {
        // Use Meteor.startup to render the component after the page is ready
        ReactDOM.render(<Game />, document.getElementById("render-target"));
        Meteor.call('clearVillains');
        Meteor.call('removeHero');


        // tear down of levels
        Meteor.call('clearLevels');
        // initialization of levels
        //TODO move level properties to file to be processed in Levels.jsx
        Meteor.call('createJSONLevel');
        Meteor.call('createLevel', 2, 5, 0, 3, 0, false);
        Meteor.call('createLevel', 3, 0, 3, 0, 2, false);
        Meteor.call('createLevel', 4, 0, 5, 0, 3, false);
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
    });
}