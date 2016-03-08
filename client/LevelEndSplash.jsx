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
        var endSplashStyle;

        if (this.props.levelActive && this.props.villains.length === 0) {
            // level is active but all villains are defeated; show the splash screen
            endSplashStyle = {
                position: 'absolute',
                top: 270 + 'px',
                left: 260 + 'px',
                textAlign: 'center'
            }
        }

        if (!this.props.levelActive || this.props.villains.length !== 0) {
            // either level is inactive or there are still villains remaining; hide splash screen
            endSplashStyle = {
                position: 'absolute',
                top: -500 + 'px',
                left: -500 + 'px',
                textAlign: 'center',
                opacity: 0
            }
        }

        return (
            <div style={endSplashStyle}>
                <h2>Level complete! </h2>
                <input type="button" value="Restart Game" onClick={this.handleClick} />
            </div>
        )
    }
});