//具体的个人信息组件
var UserInf = React.createClass({
    getInitialState: function () {
        return {department: "loading", real_name: "loadding"}
    },
    componentWillMount: function () {
        //获取本人信息
        var self = this;
        $.get("http://96a8to7r.apps.qbox.me/user/overview", function (user) {
            self.setState({department: user.data.department, real_name: user.data.real_name});
        });
    },
    render: function () {
        return (
            <ul id="user" style={this.props.style}>
                <li>{this.state.department}</li>
                <li>{this.state.real_name}</li>
                <li id="change_dep">修改部门</li>
                <li>登出</li>
            </ul>
        )
    }
});
