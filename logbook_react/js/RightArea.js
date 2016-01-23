//RightArea组件
var RightArea = React.createClass({
    render () {
        if (this.props.userNoteId == -1) {
            return (
                <div className="rightArea">
                    <Dates date={this.props.date}/>
                    <Departments department={this.props.department} users={this.props.users} date={this.props.date}/>
                </div>
            );
        } else {
            return (
                <User users={this.props.users} userNoteId={this.props.userNoteId}/>
            );
        }
    }
});
