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
            for (i = 0; i<3; i++) {
                Meteor.call('addVillain', "melee1");
            }
            for (i = 0; i<2; i++) {
                Meteor.call('addVillain', "ranged1");
            }
        }
        if (level === "2") {
            for (i = 0; i<5; i++) {
                Meteor.call('addVillain', "melee1");
            }
            for (i = 0; i<3; i++) {
                Meteor.call('addVillain', "ranged1");
            }
        }
        if (level === "3") {
            for (i = 0; i<3; i++) {
                Meteor.call('addVillain', "melee2");
            }
            for (i = 0; i<2; i++) {
                Meteor.call('addVillain', "ranged2");
            }
        }
        if (level === "4") {
            for (i = 0; i<5; i++) {
                Meteor.call('addVillain', "melee2");
            }
            for (i = 0; i<3; i++) {
                Meteor.call('addVillain', "ranged2");
            }
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
                {/*
                <input type="button" value="Level 1" ref="type" onClick={this.selectLevel(1)} />
                <input type="button" value="Level 2" ref="type" onClick={this.selectLevel(2)} />
                <input type="button" value="Level 3" ref="type" onClick={this.selectLevel(3)} />
                <input type="button" value="Level 4" ref="type" onClick={this.selectLevel(4)} />
                */}
                <select name="levels" id="levels">
                    <option value="0">Select a level...</option>
                    {this.showLevels()}
                </select>
                <input type="button" value="Set level" onClick={this.setLevel} />
            </div>
        )
    }
});