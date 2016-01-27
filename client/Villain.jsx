// Represents a villain - AI controlled enemies
Villain = React.createClass({
    propTypes: {
        villain: React.PropTypes.object.isRequired
    },

    render() {
        // Depending on the type of villain, a different
        // figure will be rendered
        const villainType = (this.props.villain.type);

        return (
            <li>
                <h3> {villainType}</h3>
               <img src={'/' + villainType + '.jpg'} style=
                   {{"position: relative; left":+ this.props.villain.xpos + "px"}}  />
            </li>
        )
    }
});