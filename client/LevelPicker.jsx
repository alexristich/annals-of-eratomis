// The widget where a user can select their desired difficulty level
LevelPicker = React.createClass({

    //temporary set of fixed levels
    // TODO add a new component for Level
    //getLevels() {
    //    return [
    //        { _id: 1, type: 1},
    //        { _id: 2, type: 2},
    //        { _id: 3, type: 3},
    //        { _id: 4, type: 4}
    //    ];
    //},

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
        return (
            <div>
                <select name="levels" id="levels">
                    <option value="0">Select a level...</option>
                    {this.showLevels()}
                </select>
                <input type="button" value="Set level" onClick={this.setLevel} />
            </div>
        )
    }
});