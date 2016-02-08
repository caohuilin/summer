const numRows = 20;
const numCols = 20;
const deX = [-1, +1, 0, 0];
const deY = [0, 0, -1, +1];

function cssDisplay(value) {
  if (value) {
    return { display: 'block' };
  } else {
    return { display: 'none' };
  }
}

function getNext(node, de) {
  var x = Math.floor(node / numRows) + deX[de];
  var y = node % numRows + deY[de];
  if (x >= numRows) x = 0;
  if (y >= numCols) y = 0;
  if (x < 0) x = numRows - 1;
  if (y < 0) y = numCols - 1;

  // console.log(x,y,de);
  return x * numRows + y;
}

const Main = React.createClass({
    getInitialState() {
      var start = 0;
      var con = [];
      con[start] = 'S';
      var foodStart = Math.floor(Math.random() * 40);
      while (foodStart == start) {
        foodStart = Math.floor(Math.random() * 40);
      }

      con[foodStart] = "F";
      return { snake: [start], de: 3, gameOver: false, con: con };
    },

    componentDidMount() {
      this.refs.body.focus();
      this.goNext();

    },

    goNext() {
      var snake = this.state.snake;
      var con = this.state.con;
      var de = this.state.de;
      var next = getNext(snake[0], de);

      if (this.state.con[next] === 'S') {
        this.setState({ gameOver: true }
				);

        //alert("gameOver!");
        return;
      }

      if (con[next] == 'F') {
        var food = next;
        while (con[food]) {
          food = Math.floor(Math.random() * 40);
        }

        con[food] = "F";
      } else {
        con[snake.pop()] = null;
      }

      //unshift()方法将把它的参数插入arrayObject的头部，并将已经存在的元素依次顺次的移到较高的下标处；
      snake.unshift(next);

      //con_1[snake_1.pop()] = null;
      // console.log(snake_1,next);
      con[next] = 'S';
      if (this.nextDe != null) {
        de = this.nextDe;
        this.nextDe = null;
      }

      this.setState({ snake: snake, con: con, de: de });
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
      } else {
        de = this.state.de;
      }

      this.nextDe = de;
    },

    resume() {
      this.setState({ gameOver: false });
      this.setState(this.getInitialState());
      this.goNext();
    },

    render() {
      var cells = [];
      var id = 0;
      for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
          if (this.state.con[row * numRows + col] === 'S') {
            cells.push(<div key={id} className="snake_cell cell"></div>);
          } else if (this.state.con[row * numRows + col] === 'F') {
            cells.push(<div key={id} className="food_cell cell"></div>);
          } else {
            cells.push(<div key={id} className="cell"></div>);
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
          <div className="game_over" style={cssDisplay(this.state.gameOver)}>Game Over !</div>
          <button style={cssDisplay(this.state.gameOver)} onClick={this.resume}>重置</button>
        </div>
      );
    },

  });
ReactDOM.render(
  <Main />,
  document.getElementById('main')
);
