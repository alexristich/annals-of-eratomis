// Represents a villain - AI controlled enemies
Villain = React.createClass({
    propTypes: {
        villain: React.PropTypes.object.isRequired
    },

    render() {
        // Depending on the type of villain, a different
        // figure will be rendered
        const villainType = (this.props.villain.type);
        var xpos = (this.props.villain.xpos);

        var imgStyle = {
            position: 'relative',
            left: xpos + 'px'
        };

        return (
            <li>
                <div>
                    <h3> {villainType}</h3>
                    <img src={'/' + villainType + '.jpg'} style=
                        {imgStyle}  />
                </div>
            </li>
        )
    }
});