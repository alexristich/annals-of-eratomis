// Define a collection to hold our hero+villains
Characters = new Mongo.Collection("chars");

if (Meteor.isClient) {
    // code executed on the client

    Meteor.subscribe("chars");

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
