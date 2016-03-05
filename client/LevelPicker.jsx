// The widget where a user can select their desired difficulty level
LevelPicker = React.createClass({

    propTypes: {
        heroActive: React.PropTypes.bool.isRequired,
        levelActive: React.PropTypes.bool.isRequired
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        let query = {};

        return {
            levels: Levels.find({}, {sort: {key: 1}}).fetch()
        }
    },

    setLevel(e) {
        e.preventDefault();

        // clears out Villains collection whenever new level is selected
        // this has to be called from a Meteor method as direct calls to
        // "Collection".remove({}) are not permitted from client side code.
        Meteor.call('clearVillains');

        var level = $('#levels option:selected').val();


        Meteor.call('loadLevel', level);
    },

    showLevels() {
        return this.data.levels.map((level) => {
            return <option key={level._id} value={level._id}>{level.id}</option>;
        });
    },

    render() {
        var levelSelectStyle;

        if (!this.props.heroActive && !this.props.levelActive) {
            levelSelectStyle = {
                position: 'absolute',
                top: -500 + 'px',
                left: -500 + 'px',
                textAlign: 'center',
                opacity: 0
            };
        } else if (!this.props.levelActive) {
            // hero has been created, so we can show the LevelPicker element
            levelSelectStyle = {
                position: 'absolute',
                top: 240 + 'px',
                left: 20 + 'px',
                textAlign: 'center',
                transform: 'translateX(200px)',
                transition: 'transform 1s ease'
            };
        } else {
            // level has been selected, so we hide the level picker
            levelSelectStyle = {
                position: 'absolute',
                top: 240 + 'px',
                left: 220 + 'px',
                textAlign: 'center',
                transform: 'translateX(100%) scale(0,0)',
                transition: 'transform 1.5s ease'
            };
        }


        return (
            <div style={levelSelectStyle}>
                <h1>Choose Your Level:</h1>
                <select name="levels" id="levels">
                    <option value="0">Select a level...</option>
                    {this.showLevels()}
                </select>
                <input type="button" value="Set level" onClick={this.setLevel} />
            </div>
        )
    }
});