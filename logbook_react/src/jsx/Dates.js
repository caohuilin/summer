//Dates组件
var Dates = React.createClass({
    propTypes:{
        date: React.PropTypes.string.isRequired
    },
    render () {
        return <div className="date">{this.props.date}</div>
    }
});
