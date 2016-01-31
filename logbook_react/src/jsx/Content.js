//Content组件
const Content = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    propTypes: {
        params: React.PropTypes.shape({
            userNoteId: React.PropTypes.string,
            day: React.PropTypes.string,
            depId: React.PropTypes.string
        })
    },
    getInitialState () {
        return {
            department: [],
            users: []
        };
    },
    componentWillMount () {
        $.when($.get(API_HOST + "/departments"), $.get(API_HOST + "/users")).done((department, users)=> {
            this.setState({
                department: department[0].data.reverse(),
                users: users[0].data
            });
        });
        //给路径赋默认值
        var params = this.props.params;
        if (!params.day && !params.userNoteId && !params.depId) {
            this.context.router.push("/day/" + moment().format('YYYY-MM-DD') + "/dep/-1");
        }
    },
    setDateNow (dateNow) {
        this.context.router.push("/day/" + dateNow + "/dep/" + this.props.params.depId);
    },
    render () {
        var params = this.props.params;
        var rightArea = null;
        if (params.day) {
            rightArea = <RightArea department={this.state.department} users={this.state.users}
                                   userNoteId={""} date={params.day} depId={params.depId}/>
        } else if (params.userNoteId) {
            rightArea = <RightArea department={this.state.department} users={this.state.users}
                                   userNoteId={params.userNoteId}/>
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

