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

    render() {
        return (
            <div>
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