// Represents the entire application portion of the project
Game = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        let query = {};

        return {
            villains: Villains.find(query, {sort: {key: 1}}).fetch(),
            hero: Heros.find(query).fetch(),
            level: Levels.findOne({active: true})
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
        return this.data.hero.map((hero) => {
            return <Hero key={hero._id} hero={hero} />;
        })
    },

    // render all obstacles for the specified level
    renderObstacles() {
        if (this.data.level !== undefined) {
            //console.log(this.data.level.obstacles);
            return this.data.level.obstacles.map((obstacle) => {
                return <Obstacle obstacle={obstacle}/>
            })
        }
    },

    render() {
        return (
            <div>
                {this.renderObstacles()}
                <header>
                    <h1>Hero!</h1>
                </header>
                <HeroCreator />
                <div>
                        {this.renderHero()}
                </div>

                <header>
                    <h1>Villains!</h1>
                </header>
                <br />
                <LevelPicker />
                <ul>
                    {this.renderVillains()}
                </ul>
            </div>
        );
    }
});