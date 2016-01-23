//Departments组件
var Departments = React.createClass({
    getInitialState() {
        return {showUser: -1, noteToday: []}
    },
    componentWillMount(){
        $.get(API_HOST + "/posts?day=" + this.props.date, (date) => {
            if (!date.data) {
                date.data = [];
            }
            this.setState({noteToday: date.data});
        });
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.date != this.props.date) {
            $.get(API_HOST + "/posts?day=" + nextProps.date, (date)=> {
                if (!date.data) {
                    date.data = [];
                }
                this.setState({noteToday: date.data});
            });
        }
    },
    setShowUsers (id) {
        if (id == this.state.showUser) id = -1;
        this.setState({showUser: id});
    },
    render () {
        var departmentNode = this.props.department.map((dep, id)=> {
            var users = this.props.users.filter((user)=>user.department == dep).map((user, id)=> {
                var noteNode = _.find(this.state.noteToday, (note)=> note.user_id == user.id);
                if (!noteNode) {
                    noteNode = {mood: "", content: ""};
                }
                return {real_name: user.real_name, mood: noteNode.mood, content: noteNode.content};
            });
            return (
                <div key={id}>
                    <li onClick={this.setShowUsers.bind(null,id)}>{dep}
                        <div className="num">共{users.length}人</div>
                    </li>
                    <ul className="gs" style={css_display(this.state.showUser==id)}>
                        {users.map((user, id)=>(
                            <li key={id}>
                                <div className="name">姓名：{user.real_name}</div>
                                <div className="mood">心情：{user.mood}</div>
                                <div className="note">日志：
                                    <div className="noteCon"
                                         dangerouslySetInnerHTML={{__html:marked(user.content)}}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        });
        return (
            <ul className="departments">
                {departmentNode}
            </ul>
        )
    }
});
