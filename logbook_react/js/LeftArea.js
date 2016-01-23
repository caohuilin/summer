//LeftArea组件
var LeftArea = React.createClass({
    render: function () {
        return (
            <div className="leftArea">
                <Calender setDateNow={this.props.setDateNow}/>
                <Caption department={this.props.department} users={this.props.users}
                         setUserNoteId={this.props.setUserNoteId}/>
            </div>
        );
    }
});
