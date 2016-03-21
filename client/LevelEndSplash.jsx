// Splash screen which appears at the end of a level
LevelEndSplash = React.createClass({
    propTypes: {
        levelActive: React.PropTypes.bool.isRequired,
        villains: React.PropTypes.array.isRequired
    },

    handleClick(e) {
        e.preventDefault();

        // this will end the level and bring up the LevelPicker again
        Meteor.call('endLevel');
    },

    render() {
        var headerStyle = {
            fontSize: Math.floor(gameWidth * .04),
            fontWeight: "bold"
        };
        
        var endSplashStyle;

        if (this.props.levelActive && this.props.villains.length === 0) {
            // level is active but all villains are defeated; show the splash screen
            endSplashStyle = {
                position: 'absolute',
                top: (gameHeight / 3) + 'px',
                left: (gameWidth / 3) + 'px',
                textAlign: 'center'
            }
        }

        if (!this.props.levelActive || this.props.villains.length !== 0) {
            // either level is inactive or there are still villains remaining; hide splash screen
            endSplashStyle = {
                position: 'absolute',
                top: -gameHeight + 'px',
                left: -gameWidth + 'px',
                textAlign: 'center',
                opacity: 0
            }
        }

        return (
            <div style={endSplashStyle}>
                <p style={headerStyle}>Level complete! </p>
                <input type="button" value="Restart Game" onClick={this.handleClick} />
            </div>
        )
    }
});