//侧边的部门组件
var Caption = React.createClass({
    getInitialState() {
        return {showUser: -1};
    },
    setShowUsers(id) {
        if (id == this.state.showUser) id = -1;
        this.setState({showUser: id});
    },
    render () {
        var departmentNode = this.props.department.map((dep, id)=> {
            var users = this.props.users.filter((user)=>user.department == dep);
            // TODO: users.length 不对
            return (
                <div key={id}>
                    <li onClick={this.setShowUsers.bind(null,id)}>{dep}({users.length}/{users.length})</li>
                    <ul className="gd" style={css_display(this.state.showUser==id)}>
                        {
                            users.map((user, id)=>
                                <li key={id} onClick={this.props.setUserNoteId.bind(null,user.id)}>{user.real_name}</li>
                            )
                        }
                    </ul>
                </div>
            );
        });
        return (
            <div className="caption">
                <ul className="c_de">
                    {departmentNode}
                </ul>
            </div>
        )
    }
});
