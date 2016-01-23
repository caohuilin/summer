//Departments组件
var Departments = React.createClass({
    getInitialState() {
        return {showUser: -1, noteToday: []}
    },
    componentWillMount(){
        var self = this;
        $.get("http://96a8to7r.apps.qbox.me/posts?day=" + self.props.date, function (date) {
            if (!date.data) {
                date.data = [];
            }
            self.setState({noteToday: date.data});
        });
    },
    componentWillReceiveProps(nextProps){
        var self = this;
        if (nextProps.date != this.props.date) {
            $.get("http://96a8to7r.apps.qbox.me/posts?day=" + nextProps.date, function (date) {
                if (!date.data) {
                    date.data = [];
                }
                self.setState({noteToday: date.data});
            });
        }
    },
    setShowUsers: function (id) {
        if (id == this.state.showUser) id = -1;
        this.setState({showUser: id});
    },
    render: function () {
        var self = this;
        var departmentNode = self.props.department.map(function (dep, id) {
            var con = 0;
            var usersNode = self.props.users.map(function (user, id2) {
                if (user.department == dep) {
                    con++;
                    var noteNode = self.state.noteToday.filter(function (note) {
                        return note.user_id == user.id;
                    });
                    var note = '';
                    var mood = '';
                    if (noteNode.length > 0) {
                        note = noteNode[0].content;
                        mood = noteNode[0].mood;
                    }
                    return (
                        <li key={id2}>
                            <div className="name">姓名：{user.real_name}</div>
                            <div className="mood">心情：{mood}</div>
                            <div className="note">日志：
                                <div className="noteCon" dangerouslySetInnerHTML={{__html:marked(note)}}></div>
                            </div>
                        </li>
                    );
                } else {
                    return null;
                }
            });
            var style = {};

            if (self.state.showUser == -1) {
                style = {display: "none"};
            } else if (self.state.showUser == id) {
                style = {display: "block"};
            } else {
                style = {display: "none"};
            }
            return (
                <div key={id}>
                    <li onClick={self.setShowUsers.bind(null,id)}>{dep}
                        <div className="num">共{con}人</div>
                    </li>
                    <ul className="gs" style={style}>
                        {usersNode}
                    </ul>
                </div>
            );
        });
        return (
            <ul className="departments">
                {departmentNode}
            </ul>
        )
    }
});
