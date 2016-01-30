//Content组件
var Content = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    propTypes:{
      params: React.PropTypes.shape({
        user: React.PropTypes.string,
        day: React.PropTypes.string
      })
    },
    getInitialState () {
        return {
            department: [],
            users: [],
        };
    },
    componentWillMount () {
        $.when($.get(API_HOST + "/departments"), $.get(API_HOST + "/users")).done((department, users)=> {
            this.setState({
                department: department[0].data.reverse(),
                users: users[0].data
            });
        });
        var params = this.props.params;
        if(!params.day && !params.userNoteId){
            this.context.router.push("/day/"+moment().format('YYYY-MM-DD'));
        }
    },
    setDateNow (dateNow) {
        this.context.router.push("/day/"+dateNow);
    },
    render () {
        var params = this.props.params;
        var rightArea = null;
        if(params.day){
            rightArea = <RightArea department={this.state.department} users={this.state.users}
                           userNoteId={-1} date={params.day}/>
        }else if(params.userNoteId){
            rightArea = <RightArea department={this.state.department} users={this.state.users}
                           userNoteId={params.userNoteId} />
        }
        return (
            <div className="content">
                <LeftArea department={this.state.department} users={this.state.users}
                          setDateNow={this.setDateNow}/>
                {rightArea}
            </div>
        )
    }
});

