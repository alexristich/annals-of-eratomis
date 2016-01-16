// Represents the entire application portion of the project
Game = React.createClass({

    // Temporary fixed set of villains
    //getVillains() {
    //    return [
    //        { _id: 1, type: "melee1"},
    //        { _id: 2, type: "melee2"},
    //        { _id: 3, type: "ranged1"},
    //        { _id: 4, type: "ranged2"}
    //    ];
    //},

    mixins: [ReactMeteorData],

    getMeteorData() {
        let query = {};

        return {
            villains: Villains.find(query, {sort: {key: -1}}).fetch()
        }
    },

    renderVillains() {
        return this.data.villains.map((villain) => {
            return <Villain key={villain._id} villain={villain} />;
        })
    },

    handleSubmit(event) {

        console.log(event);
        event.preventDefault();

        // TODO figure out how to access the unique type value from the DOM node
        var type = ReactDOM.findDOMNode(this.refs.type).value.trim();
        console.log(ReactDOM.findDOMNode(this.refs.type));
        Villains.insert({
            type: type
        })
    },

    render() {
        return (
            <div>
                <header>
                    <h1>Villains!</h1>
                </header>
                <input type="button" value="melee1" ref="type" onClick={this.handleSubmit} />
                <input type="button" value="melee2" ref="type" onClick={this.handleSubmit} />
                <input type="button" value="ranged1" ref="type" onClick={this.handleSubmit} />
                <input type="button" value="ranged2" ref="type" onClick={this.handleSubmit} />
                <ul>
                    {this.renderVillains()}
                </ul>
            </div>
        );
    }
});