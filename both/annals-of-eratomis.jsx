// need to set this as a function of the screen size
// defaultMovementRate = 25;

if (Meteor.isClient) {
    // code executed on the client

    // TODO create a collection for each unique object type
    Meteor.subscribe("villains");
    Meteor.subscribe("levels");
    Meteor.subscribe("heroes");

    Meteor.startup(function() {
        screenX = window.innerWidth;
        screenY = window.innerHeight;
        // Use Meteor.startup to render the component after the page is ready
        ReactDOM.render(<Game />, document.getElementById("render-target"));

        // tear down of previous game state for easier testing
        Meteor.call('clearVillains');
        Meteor.call('removeHero');
        Meteor.call('clearLevels');

        // initialization of levels
        // TODO move this to the Game component
        Meteor.call('initLevels', screenX, screenY);

    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
    });
}