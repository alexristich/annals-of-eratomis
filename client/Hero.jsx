// Represents the Hero
Hero = React.createClass({
    propTypes: {
        hero: React.PropTypes.object.isRequired
    },

    render() {
        var xpos = this.props.hero.xpos;

        //render hero according to current xpos
        var imgStyle = {
            position: 'relative',
            left: xpos + 'px'
        };

        return (
            <div>
                <img src='/hero.jpg' style=
                        {imgStyle}/>
            </div>
        )
    }
});