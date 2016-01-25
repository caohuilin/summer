//顶部导航组件
var Header = React.createClass({
    getInitialState(){
        return {login_show: false, login_success: false,register_show: false, register_success: false,login_inf:"hello ***"};
    },
    setLoginShow(){
        this.setState({login_show: true});
    },
    closeLoginShow(){
        this.setState({login_show: false});
    },
    loginSuccess(){
        this.setState({login_show: false, login_success: true});
    },
    setRegisterShow(){
        this.setState({register_show:true});
    },
    closeRegisterShow(){
        this.setState({register_show: false});
    },
    registerSuccess(){
        this.setState({register_success: true});
    },
    toLogin(){
        this.setState({register_success:false,register_show:false,login_show:true});
    },
    render(){
        return(
            <div className="header">
                <div className="logo">物联二班logo</div>
                <ul className="header_nav">
                    <li><a href="">首页</a></li>
                    <li><a href="">公告栏</a></li>
                    <li><a href="">小伙伴</a></li>
                    <li><a href="">荣誉墙</a></li>
                    <li><a href="">相册</a></li>
                    <li><a href="">留言板</a></li>
                </ul>
                <div className="login">
                    <a onClick={this.setLoginShow} style={css_display(!this.state.login_success)}>登录</a>
                    <sapn className="inf"style={css_display(this.state.login_success)}>{this.state.login_inf}</sapn>
                    <Login login_show={this.state.login_show} login_success={this.state.login_success}
                           setLoginShow={this.setLoginShow} loginSuccess={this.loginSuccess} closeLoginShow={this.closeLoginShow}/>
                    <a onClick={this.setRegisterShow} style={css_display(!this.state.login_success)}>注册</a>
                    <div className="registerSuccess" style={css_display(this.state.register_success)}><div>注册成功！</div><a className="span" onClick={this.toLogin}>去登陆</a></div>
                    <Register register_show={this.state.register_show} register_success={this.state.register_success}
                           setRegisterShow={this.setRegisterShow} registerSuccess={this.registerSuccess} closeRegisterShow={this.closeRegisterShow}/>
                </div>
            </div>
        );
    }
});