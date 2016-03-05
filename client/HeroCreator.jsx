// Represents the menu through which a player can create a Hero
HeroCreator = React.createClass({

    getInitialState() {
        return {
            heroSelected: false
        }
    },

    createHero(e) {
        e.preventDefault();

        //creating Hero
        var hero = {
            username: "newHero",
            xpos: 300,
            ypos: 300
        };
        Meteor.call('addHero', hero);

        this.setState({
            heroSelected: true
        });
    },

    render() {
        if (!this.state.heroSelected) {
            var heroSelectStyle = {
                position: 'absolute',
                top: 50 + 'px',
                left: 230 + 'px',
                textAlign: 'center'
            };
        } else {
            // hero has been created, so we can hide this HeroCreator component
            // to prevent user from adding multiple heroes
            var heroSelectStyle = {
                position: 'absolute',
                top: 50 + 'px',
                left: 230 + 'px',
                textAlign: 'center',
                transform: 'scale(0,0)',
                transition: 'transform 0.5s ease'

            };
        }

        //var heroSelectStyle = {
        //    position: 'absolute',
        //    top: 50 + 'px',
        //    left: 230 + 'px',
        //    "textAlign": 'center'
        //};

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