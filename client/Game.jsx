// Represents the entire application portion of the project
Game = React.createClass({

    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            hideHero: true
        }
    },

    getMeteorData() {
        let query = {};

        return {
            villains: Villains.find(query, {sort: {key: 1}}).fetch(),
            hero: Heros.find(query).fetch()
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

    renderHero() {
        // TODO figure out why the button is being "clicked" immediately to call this
        return this.data.hero.map((hero) => {
            return <Hero key={hero._id} hero={hero} />;
        })
    },

    render() {
        return (
            <div onKeyDown={this.handleKey}>
                <header>
                    <h1>Villains!</h1>
                </header>
                { this.state.hideHero ?
                    <input type="button" value="Create Your Hero!"
                           onClick={this.state.hideHero = false}/> :
                    <ul> {this.renderHero()}
                    </ul>
                }
                <br />
                <LevelPicker />
                <ul>
                    {this.renderVillains()}
                </ul>
            </div>
        );
    }
});