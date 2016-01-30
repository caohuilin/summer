//RightArea组件
var RightArea = React.createClass({
    propTypes:{
        userNoteId: React.PropTypes.number.isRequired
    },
    render () {
        if (this.props.userNoteId == -1) {
            return (
                <div className="rightArea">
                    <Dates {...this.props}/>
                    <Departments {...this.props}/>
                </div>
            );
        } else {
            return (
                <User {...this.props}/>
            );
        }
    }
});
