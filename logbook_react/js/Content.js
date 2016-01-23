//Content组件
var Content = React.createClass({
    getInitialState: function () {
        return {
            department: [],
            users: [],
            userNoteId: -1,
            date: moment().format('YYYY-MM-DD')
            //date: moment().subtract(moment.duration(0, 'd')).format('YYYY-MM-DD')
        };
    },
    componentWillMount: function () {
        var self = this;
        $.get("http://96a8to7r.apps.qbox.me/departments", function (department) {
            self.setState({department: department.data});
        });
        $.get("http://96a8to7r.apps.qbox.me/users", function (users) {
            self.setState({users: users.data});
        });
    },
    setUserNoteId: function (id) {
        this.setState({userNoteId: id});
    },
    setDateNow: function (dateNow) {
        this.setState({date: dateNow})
    },
    render: function () {
        return (
            <div className="content">
                <LeftArea department={this.state.department} users={this.state.users}
                          setUserNoteId={this.setUserNoteId} setDateNow={this.setDateNow}/>
                <RightArea department={this.state.department} users={this.state.users}
                           userNoteId={this.state.userNoteId} date={this.state.date}/>
            </div>
        )
    }
});
