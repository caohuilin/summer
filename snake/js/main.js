"use strict";
const numRows = 40;
const numCols = 40;
const deX = [-1, +1, 0, 0];
const deY = [0, 0, -1, +1];
const deSX = [-1, +1, 0, 0];
const deSY = [0, 0, -1, +1];
const SWIPE_DISTANCE = 30;  //移动30px之后才认为swipe事件
const SWIPE_TIME = 500;     //swipe最大经历时间

let pointStart;
let pointEnd;
let timeStart;
let timeEnd;

function cssDisplay(value) {
  let display = null;
  if (value) {
    display = { display: 'block' };
  } else {
    display = { display: 'none' };
  }

  return display;
}

function setLength(length) {
  return { height:length, width:length };
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

//计算两点之间距离
function getDist(p1, p2) {
  if (!p1 || !p2) return 0;
  return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

//计算两点之间所成角度
function getAngle(p1, p2) {
  let r = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  let a = r * 180 / Math.PI;
  return a;
}

//获取swipe的方向
function getSwipeDirection(p2, p1) {
  let dx = p2.x - p1.x;
  let dy = -p2.y + p1.y;
  let angle = Math.atan2(dy, dx) * 180 / Math.PI;
  if (angle >= 45 && angle < 135) return 0;
  if (angle >= -135 && angle <= -45) return 1;
  if (angle >= 135 || angle < -135) return 2;
  if (angle < 45 && angle > -45) return 3;
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
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let gameBodyHeight = windowHeight - 50;
    let gameBodyWidth = windowWidth * 0.5;
    if (windowWidth < 980) {
      gameBodyWidth = windowWidth - 5;
    }

    let gameLength = Math.min(gameBodyHeight, gameBodyWidth);
    let cellLength = Math.floor(gameLength / numRows);
    gameLength = cellLength * numRows;
    return { snake: start, de: 3, gameOver: false, con: con, bullet: [], bulletDe: -1, food:foodStart, monster:monster, score:0, tick:0, windowWidth: windowWidth, windowHeight: windowHeight, gameLength:gameLength, cellLength:cellLength, };
  },

  handleResize() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let gameBodyHeight = windowHeight - 50;
    let gameBodyWidth = windowWidth * 0.5;
    if (windowWidth < 980) {
      gameBodyWidth = windowWidth - 5;
    }

    let gameLength = Math.min(gameBodyHeight, gameBodyWidth);
    let cellLength = Math.floor(gameLength / numRows);
    gameLength = cellLength * numRows;
    this.setState({ windowWidth: window.innerWidth, windowHeight:window.innerHeight, gameLength:gameLength, cellLength:cellLength });
  },

  //会在组件render之前执行，并且永远都只执行一次
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  componentDidMount() {
    this.refs.body.focus();
    window.addEventListener('resize', this.handleResize);
    this.goNext();

  },

  findPosition(conIndex) {
    let top = Math.floor(conIndex / numRows) * this.state.cellLength;
    let left = conIndex % numRows * this.state.cellLength;
    return { transform: "translate(" + left + "px, " + top + "px)", width:this.state.cellLength, height:this.state.cellLength, borderRadius:this.state.cellLength / 2 };
  },

  findPosition2(conIndex) {
    let top = Math.floor(conIndex / numRows) * this.state.cellLength;
    let left = conIndex % numRows * this.state.cellLength;
    return { transform: "translate(" + left + "px, " + top + "px)", width:this.state.cellLength, height:this.state.cellLength };
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
    let food = this.state.food;
    let monster = this.state.monster;
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
        food = next;
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

    if (con[bulletNext] === 'F') {
      bulletNext = bulletGetNext(bulletNext, bulletDe);
    }

    if (con[bulletNext] === 'M') {
      score = score + 5;
      monster = bulletNext;
      while (con[monster]) {
        monster = Math.floor(Math.random() * numCols * numRows);
      }

      con[bulletNext] = null;
      con[bullet.pop()] = null;
      bullet = [];
      bulletNext = -1;
      con[monster] = "M";
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

    this.setState({ snake: snake, con: con, de: de, bullet: bullet, bulletDe: bulletDe, score:score, tick:tick, food:food, monster:monster });
    setTimeout(this.goNext, 100);
  },

  keyDown(event)
  {
    let de = this.state.de;
    let code = event.nativeEvent.keyCode;

    //console.log(code);
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

  //获取touch的点(兼容mouse事件)
  getTouchPos(e) {
    let touches = e.touches;
    if (touches && touches[0]) {
      return { x:touches[0].clientX,
        y: touches[0].clientY, };
    }

    return { x: e.clientX, y: e.clientY };
  },

  startEvtHandler(e) {
    let touches = e.touches;
    if (!touches || touches.length == 1) { //touches为空，代表鼠标点击
      pointStart = this.getTouchPos(e);
      timeStart = Date.now();
    }
  },

  moveEvtHandler(e) {
    pointEnd = this.getTouchPos(e);
    e.preventDefault();
  },

  endEvtHandler(e) {
    let timeEnd = Date.now();
    let de = this.state.de;

    //距离和时间都符合
    if (getDist(pointStart, pointEnd) > SWIPE_DISTANCE && timeStart - timeEnd < SWIPE_TIME) {
      let dir = getSwipeDirection(pointEnd, pointStart);

      if (dir == 0 && de !== 1) {
        de = 0;
      } else if (dir == 1 && de != 0) {
        de = 1;
      } else if (dir == 2 && de != 3) {
        de = 2;
      } else if (dir == 3 && de != 2) {
        de = 3;
      } else if (code == 32) {
        de = 4;
      } else {
        de = this.state.de;
      }

      this.nextDe = de;
    }

  },

  render() {
    let snakeCell = [];
    let snake = this.state.snake;
    for (let i = 0; i < snake.length; i++) {
      if (snake[0] >= 0) {
        snakeCell.push(<div key={i} style={this.findPosition2(snake[i])} className="snake_cell cell"></div>);
      }
    }

    let bulletCell = [];
    let bullet = this.state.bullet;
    for (let i = 0; i < bullet.length; i++) {
      if (bullet[i] >= 0) {
        bulletCell.push(<div key={i} style={this.findPosition(bullet[i])} className="bullet_cell cell"></div>);
      }
    }

    return (
      <div>
        <div ref="body" className="snake_game" onKeyDown={this.keyDown} tabIndex="0">
          <header>score : {this.state.score}</header>
          <div  style={setLength(this.state.gameLength)} className="game_body" onTouchStart={this.startEvtHandler} onTouchMove={this.moveEvtHandler} onTouchEnd={this.endEvtHandler} >
            <div style={this.findPosition(this.state.food)} className="food_cell cell"></div>
            <div style={this.findPosition(this.state.monster)}className="monster_cell cell"></div>
            <div className="snake">{snakeCell}</div>
            <div className="bullet">{bulletCell}</div>
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
