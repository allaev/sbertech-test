import React, { Component } from 'react';
import satelliteImg from '../assets/satellite.svg';
import moonImg from '../assets/moon.svg';
import rocketImg from '../assets/rocket.svg';
import crashImg from '../assets/crash.svg';
import earthImage from '../assets/earth.svg';

import Rocket from './Rocket';
import Obstacle from './Obstacle';
import Earth from './Earth';
import Button from './Button';
import ObstacleList from './ObstacleList';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerX: 960,
      playerY: 340,
      windowWidth: 1500,
      windowHeight: 1500,
      rocketVelocityX: 0,
      rocketVelocityY: 0,
      rocketCrashed: false,
      gameLoopActive: false,
      satelliteCount: 4
    };

    this.spriteWidth = 25;
    this.spriteHeight = 25;

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.initiateNewGame();
  }

  initiateNewGame() {
    this.obstacles = this.buildObstacles();
    this.stopRocket();
  }

  stopRocket() {
    this.setState({
      rocketVelocityX: 0,
      rocketVelocityY: 0
    });
  }

  buildObstacles() {
    let obstacles = [];
    function getRandNum(num1, num2, num3=num2) {
      return Math.floor(Math.random() * (num1 - num1/num2 + 1) ) + num1/num3;
    }

    for (let i = 1; i <= 4; i++) {
      const centerX = getRandNum(this.state.windowWidth, 1.36);
      const centerY = getRandNum(this.state.windowHeight, 1.5, 5);
      const obstacleVelocity = Math.floor(Math.random() * (40 - 15 + 1) ) + 15;
      obstacles.push(<Obstacle key={i} image={satelliteImg} centerX={centerX} centerY={centerY} width={this.spriteWidth} height={this.spriteHeight} obstacleVelocity={obstacleVelocity} />);
    }
    obstacles.push(<Obstacle key="5" image={moonImg} centerX="920" centerY="60" width={this.spriteWidth} height={this.spriteHeight} obstacleVelocity="8" />);
    return obstacles;
  }

  gameLoop() {
    if (!this.state.gameLoopActive) return;

    this.playerMove(
      this.state.playerX + this.state.rocketVelocityX,
      this.state.playerY + this.state.rocketVelocityY
    );

    if (this.detectAnyCollision()) {
      this.playerDying(100);
    }
  }

  playerMove(x, y) {
    this.setState({
      playerX: x,
      playerY: y
    });
  }

  componentDidMount(){
    this.updateWindowDimensions();
    this.intervalId = setInterval(this.gameLoop.bind(this), 200);
    this.setState({ gameLoopActive: true });
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  detectAnyCollision() {
    const halfWidth = this.spriteWidth / 2;
    const halfHeight = this.spriteHeight / 2;

    return this.obstacles.some(a => {
      let rect1 = {x: this.state.playerX - halfWidth, y: this.state.playerY - halfHeight,
        width: this.spriteWidth, height: this.spriteHeight}
      var rect2 = {x: a.props.centerX - halfWidth, y: a.props.centerY - halfHeight,
        width: this.spriteWidth, height: this.spriteHeight}

      if (this.detectOutScreen(rect1)) {
        return true;
      }

      if (this.detectCollision(rect1, rect2)) {
        return true;
      } else {
        return false;
      }
    });
  }

  detectCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
        alert("Произошло столкновение");
        this.setState({rocketCrashed: true})
        return true;
    }
    return false;
  }

  detectOutScreen(rect1) {
    if (rect1.x < 0 || rect1.x + rect1.width > this.state.windowWidth
      || rect1.y < 0 || rect1.y + rect1.height > this.state.windowHeight) {
      alert("Ракета успешно вышла в открытый космос");
      this.setState({goalReached: true});
      return true;
    }
    return false;
  }


  playerDying(tillDeath) {
    this.setState({
      rocketCrashed: true,
      gameLoopActive: false
    });

    this.stopRocket();

    setTimeout(this.playerDies.bind(this), tillDeath);
  }

  playerDies() {
    this.setState({
      gameLoopActive: false
    });

    this.playerMove(960, 340);

    this.setState({
      rocketCrashed: false,
      gameLoopActive: true
    });
  }

  onClickHandler() {
    this.setState({rocketVelocityY: -10});
  }

  onChangeHandler() {
  }


  render() {
    return <div className="Game">
      <Rocket rocketImage={this.state.rocketCrashed && !this.state.goalReached ? crashImg : rocketImg}
        centerX={this.state.playerX} centerY={this.state.playerY}
        width={this.spriteWidth} height={this.spriteHeight} />
      <Earth earthImage={earthImage} />
      {this.obstacles}
      <ObstacleList onChange={this.onChangeHandler}/>
      <Button onClick={this.onClickHandler} />
    </div>
  }
}
