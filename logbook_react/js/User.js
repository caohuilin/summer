var User = React.createClass({
    getInitialState: function () {
        return {note: [], noteShow: -1,allComShow:-1,addComShow:false,addComSuccess:false};
    },
    componentWillMount: function () {
        var self = this;
        $.get("http://96a8to7r.apps.qbox.me/posts?uid="+self.props.userNoteId, function (notes) {
            self.setState({note: notes.data});
             console.log(self.state.note);

        });
    },
    componentWillReceiveProps(nextProps){
        var self = this;
        $.get("http://96a8to7r.apps.qbox.me/posts?uid="+nextProps.userNoteId, function (notes) {
            self.setState({note: notes.data});
            console.log(self.state.note);

        });
    },
    setNoteShow: function (id) {
        //debugger
        if (id == this.state.noteShow) {
            id = -1;
        }
        this.setState({noteShow:id});
    },
    viewAllComment:function(id){
        if (id == this.state.allComShow) {
            id = -1;
        }
        this.setState({allComShow:id});
    },
    addCom:function(){
        this.setState({addComShow:true});
    },
    closeAdd:function(){
        this.setState({addComShow:false});
    },
    addSuccess:function(){
        this.setState({addComShow:false});
        var self = this;
        console.log(0,new Date());
        setTimeout(function() {
            self.setState({addComSuccess:true});
            console.log(1,new Date());
            setTimeout(function() {
                console.log(2,new Date());
                self.setState({addComSuccess:false});
            },3000);
        },1000);

    },
    render: function () {
        var self = this;
        var userName = '';
        var userDep = '';
        var noteDate = this.props.users.map(function (user, id) {
            if (user.id == self.props.userNoteId) {
                userName = user.real_name;
                userDep = user.department;
                return self.state.note.filter(function (note) {
                    return note.user_id == user.id
                }).map(function (note, id2) {
                    var style = {};

                    if (self.state.noteShow == -1) {
                        style = {display: "none"};
                    } else if (self.state.noteShow == id2) {
                        style = {display: "block"};
                    } else {
                        style = {display: "none"};
                    }
                    var style2 = {};

                    if (self.state.allComShow == -1) {
                        style2 = {display: "none"};
                    } else if (self.state.noteShow == id2) {
                        style2 = {display: "block"};
                    } else {
                        style2 = {display: "none"};
                    }
                    var style3 = {display:self.state.addComShow?"block":"none"};
                    var style4 = {display:self.state.addComSuccess?"block":"none"};
                    return (
                        <div>
                            <li key={id2} onClick={self.setNoteShow.bind(null,id2)}>
                                {note.day}
                            </li>
                            <div className="notess" style={style}>
                                <div className="mo">{note.mood}</div>
                                <div className="rizhi">日志：
                                    <div className="con"><span dangerouslySetInnerHTML={{__html:marked(note.content)}}></span></div>
                                </div>
                                <div className="comment">
                                    <a onClick={self.viewAllComment.bind(null,id2)}>查看所有评论</a>
                                    <div className="all_com" style={style2}>暂无评论</div>
                                </div>
                                <div className="add_comment"><a onClick={self.addCom}>添加评论</a></div>
                                <div className="add_ssuccess" style={style4}>添加成功</div>
                                <div id="mask" onClick={self.closeAdd} style={style3}></div>
                                <div className="add_com_text" style={style3}>
                                    <div className="title">
                                        我的评论
                                    </div>
                                    <div className="icon" onClick={self.closeAdd}></div>
                                    <textarea name="name"></textarea>
                                    <button className="btn btn-primary" type="button" name="button" onClick={self.addSuccess}>确定</button>
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        });
        return (
            <div className="rightArea">
                <div className="name">{userName}</div>
                <div className="de">--{userDep}</div>
                <ul className="note_nav">
                    {noteDate}
                </ul>
            </div>
        );
    }
});
