// Represents the menu through which a player can create a Hero
HeroCreator = React.createClass({

    propTypes: {
        heroActive: React.PropTypes.bool.isRequired
    },

    createHero(e) {
        e.preventDefault();
        
        var hero;

        // set hero size and default pos based on gameMode
        if (gameMode === "mobile") {
            hero = {
                width: 20,
                height: 25,
                xpos: 180,
                ypos: 100
            }
        } else if (gameMode === "web-sm") {
            hero = {
                width: 26,
                height: 32,
                xpos: 240,
                ypos: 100
            }
        } else if (gameMode === "web-md") {
            hero = {
                width: 36,
                height: 45,
                xpos: 360,
                ypos: 100
            }
        } else {
            hero = {
                width: 50,
                height: 63,
                xpos: 485,
                ypos: 100
            }
        }
        
        Meteor.call('addHero', hero, gameMode);
    },

    render() {
        var headerStyle = {
            fontSize: Math.floor(gameWidth * .04),
            fontWeight: "bold"
        };

        if (!this.props.heroActive) {
            var heroSelectStyle = {
                position: 'absolute',
                top: (gameHeight / 3) + 'px',
                left: (gameWidth / 3) + 'px',
                textAlign: 'center'
            };
        } else {
            // hero has been created, so we can hide this HeroCreator component
            // to prevent user from adding multiple heroes
            var heroSelectStyle = {
                position: 'absolute',
                top: (gameHeight / 3) + 'px',
                left: (gameWidth / 3) + 'px',
                textAlign: 'center',
                //opacity: 0,
                transform: 'translateX(-100%) scale(0,0)',
                transition: 'transform 1.5s ease'

            };
        }


        return(
            <div style={heroSelectStyle}>
                <p style={headerStyle}>Name Your Hero!</p>
                <form onSubmit={this.createHero}>
                    <input
                        type="text"
                        ref="heroName"
                        placeholder="Enter your hero's name" />
                    <input
                        type="submit"
                        value="Submit" />
                </form>
            </div>
        )
    }

});