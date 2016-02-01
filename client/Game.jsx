// Represents the entire application portion of the project
Game = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        let query = {};

        return {
            villains: Villains.find(query, {sort: {key: 1}}).fetch()
        }
    },

    renderVillains() {
        return this.data.villains.map((villain) => {
            return <Villain key={villain._id} villain={villain} />;
        })
    },

    handleKey(event) {
        event.preventDefault();

        var keyEvent = event.key;

        if (keyEvent === "ArrowRight") {
            Meteor.call('moveVillainsLaterally', defaultMovementRate);
        } else if (keyEvent === "ArrowLeft") {
            Meteor.call('moveVillainsLaterally', -defaultMovementRate);
        } else if (keyEvent === "ArrowDown") {
            Meteor.call('moveVillainsVertically', defaultMovementRate);
        } else if (keyEvent === "ArrowUp") {
            Meteor.call('moveVillainsVertically', -defaultMovementRate);
        }
    },

    render() {
        return (
            <div onKeyDown={this.handleKey}>
                <header>
                    <h1>Villains!</h1>
                </header>
                <LevelPicker />
                <ul>
                    {this.renderVillains()}
                </ul>
            </div>
        );
    }
});