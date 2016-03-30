// need to set this as a function of the screen size
// defaultMovementRate = 25;

if (Meteor.isClient) {
    // code executed on the client

    // TODO create a collection for each unique object type
    Meteor.subscribe("villains");
    Meteor.subscribe("levels");
    Meteor.subscribe("heroes");

    Meteor.startup(function() {

        var screenX = window.innerWidth;
        var screenY = window.innerHeight;

        if (Meteor.isCordova) {
            gameWidth = 375;
            gameHeight = 667;
            gameMode = "mobile";
        } else {
            if (screenX < 750) {
                gameWidth = 500;
                gameHeight = 300;
                gameMode = "web-sm";
            } else if (screenX < 1000) {
                gameWidth = 750;
                gameHeight = 470;
                gameMode = "web-md";
            } else {
                gameWidth = 1000;
                gameHeight = 625;
                gameMode = "web-lg";
            }
        }

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
        Meteor.call('initLevels', gameWidth, gameHeight, gameMode);
        Meteor.call("setMovementRate", gameMode);

    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
    });
}