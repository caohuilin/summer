"use strict";
const numRows = 40;
const numCols = 40;
const deX = [-1, +1, 0, 0];
const deY = [0, 0, -1, +1];
const deSX = [-1, +1, 0, 0];
const deSY = [0, 0, -1, +1];
function cssDisplay(value) {
  let display = null;
  if (value) {
    display = { display: 'block' };
  } else {
    display = { display: 'none' };
  }

  return display;
}

function getNext(node, de) {
  let x = Math.floor(node / numRows) + deSX[de];
  let y = node % numRows + deSY[de];
  if (x >= numRows) x = 0;
  if (y >= numCols) y = 0;
  if (x < 0) x = numRows - 1;
  if (y < 0) y = numCols - 1;

  // console.log(x,y,de);
  return x * numRows + y;
}

function bulletGetNext(node, de) {
  let x = Math.floor(node / numRows) + deX[de];
  let y = node % numRows + deY[de];
  if (x >= 0 && x < numRows && y >= 0 && y < numCols) {
    // console.log(x,y,de);
    return x * numRows + y;
  } else {
    return -1;
  }
}

const SnakeReact = React.createClass({
  getInitialState() {
    const start = [4, 3, 2, 1, 0];
    let con = [];
    for (let i = 0; i < start.length; i++) {
      con[start[i]] = 'S';
    }

    let foodStart = Math.floor(Math.random() * numCols * numRows);
    while (foodStart === start[0]) {
      foodStart = Math.floor(Math.random() * numCols * numRows);
    }

    con[foodStart] = 'F';
    let monster = Math.floor(Math.random() * numCols * numRows);
    while (monster === start[0] || monster === foodStart) {
      monster = Math.floor(Math.random() * numCols * numRows);
    }

    con[monster] = 'M';
    return { snake: start, de: 3, gameOver: false, con: con, bullet: [], bulletDe: -1, score:0, tick:0 };
  },

  componentDidMount() {
    this.refs.body.focus();
    this.goNext();

  },

  goNext() {
    // console.log('goNext');
    let snake = this.state.snake;
    let con = this.state.con;
    let de = this.state.de;
    let bullet = this.state.bullet;
    let bulletDe = this.state.bulletDe;
    let score = this.state.score;
    let tick = this.state.tick;
    let next = -1;
    let bulletNext = -1;
    if (bulletDe != -1) {
      bulletNext = bulletGetNext(bullet[0], bulletDe);
    } else {
      bullet = [];
    }

    if (tick == 0) {
      next = getNext(snake[0], de);
      if (this.state.con[next] === 'S' || this.state.con[next] === 'M') {
        this.setState({ gameOver: true });

        //alert("gameOver!");
        return;
      }

      if (con[next] === 'F') {
        let food = next;
        while (con[food]) {
          food = Math.floor(Math.random() * numCols * numRows);
        }

        con[food] = "F";
      } else {
        con[snake.pop()] = null;
      }

      if (con[next] != 'B') {
        con[next] = 'S';
      }

      snake.unshift(next);
    }

    if (con[bulletNext] === 'F') {
      bulletNext = bulletGetNext(bulletNext, bulletDe);
    }

    if (con[bulletNext] === 'M') {
      score = score + 5;

      let monster = bulletNext;
      while (con[monster]) {
        monster = Math.floor(Math.random() * numCols * numRows);
      }

      con[bulletNext] = null;
      con[bullet.pop()] = null;
      bullet = [];
      bulletNext = -1;
      con[monster] = "M";
    }

    if (this.nextDe != null) {
      if (this.nextDe === 4) {
        con[bullet[0]] = null;
        bullet = [];
        bullet[0] = snake[0];
        bulletDe = de;
        bulletNext = bulletGetNext(bullet[0], bulletDe);
        snake.shift();
        if (next != -1) {
          next = getNext(snake[0], de);
        }

        con[bullet[0]] = 'B';
      } else {
        de = this.nextDe;
      }

      this.nextDe = null;
    }

    if (bulletNext != -1) {
      con[bulletNext] = 'B';
    }

    //unshift()方法将把它的参数插入arrayObject的头部，并将已经存在的元素依次顺次的移到较高的下标处；
    bullet.unshift(bulletNext);
    con[bullet.pop()] = null;

    if (tick == 0) {
      tick = 1;
    }else {
      tick = 0;
    }

    this.setState({ snake: snake, con: con, de: de, bullet: bullet, bulletDe: bulletDe, score:score, tick:tick });
    setTimeout(this.goNext, 10);
  },

  keyDown(event)
  {
    let de = this.state.de;
    let code = event.nativeEvent.keyCode;

    // console.log(code);
    if (code == 38 && de !== 1) {
      de = 0;
    } else if (code == 40 && de != 0) {
      de = 1;
    } else if (code == 37 && de != 3) {
      de = 2;
    } else if (code == 39 && de != 2) {
      de = 3;
    } else if (code == 32) {
      de = 4;
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
    const cells = [];
    let id = 0;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (this.state.con[row * numRows + col] === 'B') {
          cells.push(<div key={id} className="bullet_cell cell"></div>);
        } else if (this.state.con[row * numRows + col] === 'S') {
          cells.push(<div key={id} className="snake_cell cell"></div>);
        } else if (this.state.con[row * numRows + col] === 'F') {
          cells.push(<div key={id} className="food_cell cell"></div>);
        }else if (this.state.con[row * numRows + col] === 'M') {
          cells.push(<div key={id} className="monster_cell cell"></div>);
        } else {
          cells.push(<div key={id} className="cell"></div>);
        }

        id++;
      }
    }

    return (
      <div>
        <div className="snake_game">
          <header>score : {this.state.score}</header>
          <div className="left">
            <div className="title">贪吃蛇 消灭怪物版</div>
            <div className="rules">游戏规则：绿色为食物，红色为怪物，只有吃了食物才能有力气打怪物哟！</div>
          </div>
          <div ref="body" className="game_body" tabIndex="0" onKeyDown={this.keyDown}>
            {cells}
          </div>
          <div className="game_over" style={cssDisplay(this.state.gameOver)}>Game Over !</div>
          <button style={cssDisplay(this.state.gameOver)} onClick={this.resume}>重置</button>
        </div>
      </div>
    );
  },

});

ReactDOM.render(
  <SnakeReact />,
  document.getElementById('main')
);
