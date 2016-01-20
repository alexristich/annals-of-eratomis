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
            villains: Villains.find(query, {sort: {key: 1}}).fetch()
        }
    },

    renderVillains() {
        return this.data.villains.map((villain) => {
            return <Villain key={villain._id} villain={villain} />;
        })
    },

    // is this function needed if I switch to the LevelPicker component?
    //handleSubmit(event) {
    //    event.preventDefault();
    //    console.log(this.refs);
    //
    //    // TODO figure out how to access the unique type value from the DOM node
    //    var type = ReactDOM.findDOMNode(this.refs.type).value.trim();
    //    //console.log(ReactDOM.findDOMNode(this.refs.type));
    //    Villains.insert({
    //        type: type
    //    })
    //},

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