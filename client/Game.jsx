// Represents the entire application portion of the project
Game = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        let query = {};

        return {
            villains: Villains.find(query, {sort: {key: 1}}).fetch(),
            // TODO add search query here to find specific hero
            hero: Heroes.findOne(query),
            level: Levels.findOne({active: true})
        }
    },

    renderVillains() {
        return this.data.villains.map((villain) => {
            return <Villain key={villain._id} villain={villain} />;
        })
    },

    handleKey(event) {
        // TODO handle hero movement at a global level (perhaps using React HotKeys)

        // for now, we don't want to catch any key events while the hero is not active
        if (this.data.hero !== undefined) {

            event.preventDefault();
            var keyEvent = event.key;

            if (keyEvent === "ArrowRight") {
                Meteor.call('moveHeroLaterally', defaultMovementRate);
            } else if (keyEvent === "ArrowLeft") {
                Meteor.call('moveHeroLaterally', -defaultMovementRate);
            } else if (keyEvent === "ArrowDown") {
                Meteor.call('moveHeroVertically', defaultMovementRate);
            } else if (keyEvent === "ArrowUp") {
                Meteor.call('moveHeroVertically', -defaultMovementRate);
            }
        }
    },

    renderHero() {
        // we will only be rendering one hero at any give time
        if (this.data.hero !== undefined) {
        return <Hero key={this.data.hero._id} hero={this.data.hero} />
        }
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
        var gameBackground = {
            position: 'absolute',
            width: '700px',
            height: '700px',
            backgroundColor: 'white'
        };

        return (
            <div style={gameBackground} tabIndex="0" onKeyDown={this.handleKey}>

                {this.renderObstacles()}
                <HeroCreator />
                <div>
                        {this.renderHero()}
                </div>
                <br />
                <LevelPicker />
                <div>
                    {this.renderVillains()}
                </div>
            </div>
        );
    }
});