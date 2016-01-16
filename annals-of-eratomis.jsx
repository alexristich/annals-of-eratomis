// Define a collection to hold our hero+villains
Villains = new Mongo.Collection("villains");

if (Meteor.isClient) {
    // code executed on the client

    // TODO create a collection for each unique object type
    Meteor.subscribe("villains");

    Meteor.startup(function() {
        // Use Meteor.startup to render the component after the page is ready
        ReactDOM.render(<Game />, document.getElementById("render-target"));
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
