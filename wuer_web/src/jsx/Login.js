//登录
var Login = React.createClass({
    render(){
            return (
                <span>
                    <div className="mask" style={css_display(this.props.login_show)}></div>
                    <div className="login_pop" style={css_display(this.props.login_show)}>
                        <div className="login_register_title">
                            <button type="button" className="close" data-dismiss="modal" onClick={this.props.closeLoginShow}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title">登录</h4>
                        </div>
                        <div className="login_register_body">
                            <div className="login_register_wrap">
                                <h4>小伙伴，欢迎回来！</h4>
                                <from>
                                    <div className="from-group">
                                        <label className="control-label">账号</label>
                                        <input type="text" className="form-control" name="id" placeholder="13050402**"/>
                                    </div>
                                    <div className="from-group">
                                        <label className="control-label">密码</label>
                                        <input type="password" className="form-control" name="id" placeholder="密码"/>
                                    </div>
                                    <div className="from-group">
                                        <div className="checkbox">
                                            <label><input name="remember" type="checkbox"/> 记住登录状态</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary pull-right pl20 pr20"
                                           onClick={this.props.loginSuccess}>登录
                                        </button>
                                    </div>
                                </from>
                            </div>
                        </div>
                    </div>
            </span>
            );
        }
});