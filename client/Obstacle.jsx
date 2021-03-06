// An obstacle represents a wall or some other impassable object
Obstacle = React.createClass({
    propTypes: {
        obstacle: React.PropTypes.object.isRequired
    },

    render() {
        const height = (this.props.obstacle.height);
        const width = (this.props.obstacle.width);
        const xpos = (this.props.obstacle.xpos);
        const ypos = (this.props.obstacle.ypos);
        const type = (this.props.obstacle.type);

        var divStyle = {
            position: 'absolute',
            width: width,
            height: height,
            left: xpos + 'px',
            top: ypos + 'px',
            backgroundColor: '#123456'
        };

        return (
            <div style={divStyle} />
        )
    }
});