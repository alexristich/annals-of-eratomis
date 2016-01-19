// Define a collection to hold our hero+villains
Villains = new Mongo.Collection("villains");
Levels = new Mongo.Collection("levels");

if (Meteor.isClient) {
    // code executed on the client

    // TODO create a collection for each unique object type
    Meteor.subscribe("villains");
    Meteor.subscribe("levels");

    Meteor.startup(function() {
        // Use Meteor.startup to render the component after the page is ready
        ReactDOM.render(<Game />, document.getElementById("render-target"));
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // a hack to get around the requirement that Collection.remove({}) calls
        // are only permitted from the server side
        // TODO find a more readable solution that can clear out Villains collection
        Villains.remove({});

        return Meteor.methods({
            clearLevel: function() {
                return Villains.remove({});
            }
        });
    });
}