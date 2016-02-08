
var numRows = 20;
var numCols = 20;
var de_x = [-1, +1, 0, 0];
var de_y = [0, 0, -1, +1];

function css_display(value) {
    if (value) {
        return {display: 'block'};
    } else {
        return {display: 'none'};
    }
}

function getNext(node, de) {
    var x = Math.floor(node / numRows) + de_x[de];
    var y = node % numRows + de_y[de];
    if (x >= numRows) x = 0;
    if (y >= numCols) y = 0;
    if (x < 0) x = numRows - 1;
    if (y < 0) y = numCols - 1;
   // console.log(x,y,de);
    return x * numRows + y;
}
const Main = React.createClass({
        getInitialState(){
            var nextDe = null;
            var start = 0;
            var con = [];
            con[start] = 'S';
            var food_start = Math.floor(Math.random()*40);
            while(food_start==start){
                food_start = Math.floor(Math.random()*40);
            }
            con[food_start]="F";
            return {score: 1, snake: [start], de: 3, gameOver: false, con: con};
        },
        componentDidMount(){
            this.refs.body.focus();
            this.goNext();

        },

        goNext(){
            var snake_1 = this.state.snake;
            var con_1 = this.state.con;
            var de_1 = this.state.de;
            var next = getNext(snake_1[0], de_1);

            if (this.state.con[next] === 'S') {
                this.setState({gameOver: true});
                //alert("gameOver!");
                return;
            }
            if(con_1[next]=='F'){
                var food = next;
                while(con_1[food]){
                    food = Math.floor(Math.random()*40);
                }
                con_1[food]="F";
            }else{
                con_1[snake_1.pop()] = null;
            }
            //unshift()方法将把它的参数插入arrayObject的头部，并将已经存在的元素依次顺次的移到较高的下标处；
            snake_1.unshift(next);
            //con_1[snake_1.pop()] = null;
           // console.log(snake_1,next);
            con_1[next] = 'S';
            if (this.nextDe != null) {
                de_1 = this.nextDe;
                this.nextDe = null;
            }
            this.setState({snake: snake_1, con: con_1, de: de_1});
            setTimeout(this.goNext, 100);
        },
        keyDown(event)
        {
            var de = this.state.de;
            var code = event.nativeEvent.keyCode;
            //console.log(code);
            if (code == 38 && de !== 1) {
                de = 0;
            } else if (code == 40 && de != 0) {
                de = 1;
            } else if (code == 37 && de != 3) {
                de = 2;
            } else if (code == 39 && de != 2) {
                de = 3;
            } else {}
            this.nextDe = de;
        },
        resume(){
            this.setState({gameOver:false});
            this.setState(this.getInitialState());
            this.goNext();
        },
        render()
        {
            var cells = [];
            var id = 0;
            for (var row = 0; row < numRows; row++) {
                for (var col = 0; col < numCols; col++) {
                    if (this.state.con[row * numRows + col] === 'S') {
                        cells.push(<div key={id} className="snake_cell cell" id={"c"+row*20+col}></div>);
                    } else if (this.state.con[row * numRows + col] === 'F') {
                        cells.push(<div key={id} className="food_cell cell" id={"c"+row*20+col}></div>);
                    } else {
                        cells.push(<div key={id} className="cell" id={"c"+row*10+col}></div>);
                    }
                    id++;
                }
            }
            return (
                <div className="snake_game">
                    <header>length : {this.state.snake.length}</header>
                    <div ref="body" className="game_body" tabIndex="0" onKeyDown={this.keyDown}>
                        {cells}
                    </div>
                    <div className="game_over" style={css_display(this.state.gameOver)}>Game Over !</div>
                    <button style={css_display(this.state.gameOver)} onClick={this.resume}>重置</button>
                </div>
            );
        }

    })
    ;
ReactDOM.render(
    <Main />,
    document.getElementById('main')
);
