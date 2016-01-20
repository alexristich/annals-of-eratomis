// The widget where a user can select their desired difficulty level
LevelPicker = React.createClass({

    //temporary set of fixed levels
    // TODO add a new component for Level
    getLevels() {
        return [
            { _id: 1, type: 1},
            { _id: 2, type: 2},
            { _id: 3, type: 3},
            { _id: 4, type: 4}
        ];
    },

    setLevel(e) {
        e.preventDefault();

        // clears out Villains collection whenever new level is selected
        // this has to be called from a Meteor method as direct calls to
        // "Collection".remove({}) are not permitted from client side code.
        Meteor.call('clearVillains');

        var level = $('#levels option:selected').val();


        // TODO find a more compact way to generate levels
        if (level === "1") {
            Meteor.call('addVillain', "melee1", 3);
            Meteor.call('addVillain', "ranged1", 2);
        }
        if (level === "2") {
            Meteor.call('addVillain', "melee1", 5);
            Meteor.call('addVillain', "ranged1", 3);
        }
        if (level === "3") {
            Meteor.call('addVillain', "melee2", 3);
            Meteor.call('addVillain', "ranged2", 2);
        }
        if (level === "4") {
            Meteor.call('addVillain', "melee2", 5);
            Meteor.call('addVillain', "ranged2", 3);
        }
    },

    showLevels() {
        return this.getLevels().map((level) => {
            return <option key={level._id} value={level._id}>{level._id}</option>;
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