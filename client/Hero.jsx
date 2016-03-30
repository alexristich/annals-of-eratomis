// Represents the Hero
Hero = React.createClass({
    propTypes: {
        hero: React.PropTypes.object.isRequired
    },

    render() {
        var xpos = this.props.hero.xpos;
        var ypos = this.props.hero.ypos;

        //render hero according to current xpos
        var imgStyle = {
            position: 'absolute',
            left: xpos + 'px',
            top: ypos + 'px',
            width: this.props.hero.width,
            height: this.props.hero.height
        };

        return (
            <div>
                <img src='/hero.jpg' style=
                        {imgStyle}/>
            </div>
        )
    }
});