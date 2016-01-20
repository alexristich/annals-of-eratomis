// Define a collection to hold our hero+villains

// move levels collection to new schema like Villains
//Levels = new Mongo.Collection("levels");

if (Meteor.isClient) {
    // code executed on the client

    // TODO create a collection for each unique object type
    Meteor.subscribe("villains");
    Meteor.subscribe("levels");

    Meteor.startup(function() {
        // Use Meteor.startup to render the component after the page is ready
        ReactDOM.render(<Game />, document.getElementById("render-target"));
        Meteor.call('clearVillains');
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
    });
}