// Represents the menu through which a player can create a Hero
HeroCreator = React.createClass({

    propTypes: {
        heroActive: React.PropTypes.bool.isRequired
    },

    createHero(e) {
        e.preventDefault();

        //creating Hero
        var hero = {
            username: "newHero",
            xpos: 100,
            ypos: 100
        };
        Meteor.call('addHero', hero);
    },

    render() {
        if (!this.props.heroActive) {
            var heroSelectStyle = {
                position: 'absolute',
                top: 240 + 'px',
                left: 220 + 'px',
                textAlign: 'center'
            };
        } else {
            // hero has been created, so we can hide this HeroCreator component
            // to prevent user from adding multiple heroes
            var heroSelectStyle = {
                position: 'absolute',
                top: 240 + 'px',
                left: 220 + 'px',
                textAlign: 'center',
                //opacity: 0,
                transform: 'translateX(100%) scale(0,0)',
                transition: 'transform 0.5s ease'

            };
        }


        return(
            <div style={heroSelectStyle}>
                <h1>Name Your Hero!</h1>
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