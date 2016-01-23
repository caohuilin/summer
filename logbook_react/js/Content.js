//Content组件
var Content = React.createClass({
    getInitialState () {
        return {
            department: [],
            users: [],
            userNoteId: -1,
            date: moment().format('YYYY-MM-DD')
        };
    },
    componentWillMount () {
        $.when($.get(API_HOST + "/departments"), $.get(API_HOST + "/users")).done((department, users)=> {
            this.setState({
                department: department[0].data.reverse(),
                users: users[0].data
            });
        })
    },
    setUserNoteId (id) {
        this.setState({userNoteId: id});
    },
    setDateNow (dateNow) {
        this.setState({userNoteId:-1, date: dateNow})
    },
    render () {
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
