//个人信息Inf按钮组件
var Inf = React.createClass({
    getInitialState: function () {
        return {
            InfShow: false
        };
    },
    showInf: function () {
        this.setState({InfShow: !this.state.InfShow});
    },
    render: function () {
        var style = {display: this.state.InfShow ? "block" : "none"};
        return (
            <span>
        <button id="inf" type="button" name="button" onClick={this.showInf}>个人信息</button>
        <UserInf style={style}/>
      </span>
        )
    }
});
