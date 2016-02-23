// Represents a villain - AI controlled enemies
Villain = React.createClass({
    propTypes: {
        villain: React.PropTypes.object.isRequired
    },

    render() {
        // Depending on the type of villain, a different
        // figure will be rendered
        var xpos = this.props.villain.xpos;
        var ypos = this.props.villain.ypos;

        var imgStyle = {
            position: 'absolute',
            left: xpos + 'px',
            top: ypos + 'px'
        };

        return (
            <div>
                <img src={this.props.villain.source} style=
                    {imgStyle}  />
            </div>
        )
    }
});