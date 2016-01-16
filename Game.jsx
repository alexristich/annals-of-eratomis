// Represents the entire application portion of the project
Game = React.createClass({
    getVillains() {
        return [
            // returning a fixed set of enemies
            { _id: 1, type: "melee1"},
            { _id: 2, type: "melee2"},
            { _id: 3, type: "ranged1"},
            { _id: 4, type: "ranged2"}
        ];
    },

    renderVillains() {
        return this.getVillains().map((villain) => {
            return <Villain key={villain._id} villain={villain} />;
        })
    },

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Villains!</h1>
                </header>

                <ul>
                    {this.renderVillains()}
                </ul>
            </div>
        );
    }
});