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
        //if (this.data.villains.length === 0 && this.data.level) {
        //    Meteor.call("endLevel", this.data.level.id);
        //}

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

    handleClick(event) {
        // TODO handle hero movement at a global level (perhaps using React HotKeys)

        // for now, we don't want to catch any key events while the hero is not active
        if (this.data.level !== undefined) {

            event.preventDefault();
            console.log("X coordinate: " + event.pageX);
            console.log("Y coordinate: " + event.pageY);

            Meteor.call('moveHeroToCursor', event.pageX, event.pageY);
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

        var backgroundStyle = {
            width: screenX,
            height: screenY,
            // width: '700px',
            // height: '700px',
            //maxWidth: '700px',
            //maxHeight: '700px',
            //margin: '0 auto',
            //minHeight: '100%',
            background: 'white'
        };

        var heroActive = (this.data.hero !== undefined);
        var levelActive = (this.data.level !== undefined);

        return (
            <div style={backgroundStyle} tabIndex="0" onKeyDown={this.handleKey} onClick={this.handleClick}>

                    <HeroCreator heroActive={heroActive} />

                    <LevelPicker heroActive={heroActive} levelActive={levelActive}/>

                    <LevelEndSplash levelActive={levelActive} villains={this.data.villains} />

                <div>
                    {this.renderHero()}
                    {this.renderObstacles()}
                    {this.renderVillains()}
                </div>
            </div>
        );
    }
});