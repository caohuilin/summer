const Main = React.createClass({
    propTypes: {
        // 特定形状参数的对象
        params: React.PropTypes.shape({
            userNoteId: React.PropTypes.string,
            day: React.PropTypes.string,
            depId: React.PropTypes.string
        })
    },
    //加载最终页面 两个组件Header和Content
    render(){
        return (
            <div className="main">
                <Header/>
                <Content params={this.props.params}/>
            </div>
        )
    }
});


