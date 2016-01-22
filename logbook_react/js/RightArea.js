
//RightArea组件
var RightArea = React.createClass({
    render: function () {
        if (this.props.userNoteId == -1) {
            return (
                <div className="rightArea">
                    <Dates />
                    <Departments department={this.props.department} users={this.props.users}/>
                </div>
            )
        } else {
            return (
                <User users={this.props.users} userNoteId={this.props.userNoteId}/>
            );
        }
    }
});
