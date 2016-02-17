// Represents the entire application portion of the project
Game = React.createClass({

    mixins: [ReactMeteorData],

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
        return this.data.hero.map((hero) => {
            return <Hero key={hero._id} hero={hero} />;
        })
    },

    // adding this temporarily for testing
    renderObstacle() {
        var obstacle2 = {
                "type": "wall",
                "height": 700,
                "width": 10,
                "xpos": 0,
                "ypos": 0
            };
        var obstacle3 = {
                "type": "wall",
                "height": 700,
                "width": 10,
                "xpos": 690,
                "ypos": 0
            };
        var obstacle4 =
            {
                "type": "wall",
                "height": 10,
                "width": 700,
                "xpos": 0,
                "ypos": 0
            };
        var obstacle5 =
        {
            "type": "wall",
            "height": 10,
            "width": 700,
            "xpos": 0,
            "ypos": 690
        };

        var obstacles = [obstacle2, obstacle3, obstacle4, obstacle5
            ];

        return obstacles.map((obstacle) => {
            return <Obstacle obstacle={obstacle}/>
        });
    },

    render() {
        return (
            <div>
                {this.renderObstacle()}
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