import React from 'react';
import './Game.css'
import * as createjs from 'createjs-module';
import _ from 'lodash';

window.createjs= createjs;

const stage = {
    width: 800,
    height: 500,
}

class PlayerBall extends createjs.Container {
    constructor(props) {
        super(props);
        this.drawBall();
    }

    drawBall() {
        const playerBall = new createjs.Shape();
        playerBall.graphics.beginFill("white").drawCircle(0,0,30);
        this.x = (stage.width / 2)-10;
        this.y = (stage.height/2) - 15;
        this.cursor = "grabbing";
        this.addChild(playerBall);
    }
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        window.display = this;
        _.bindAll(this,['mouseDownCircle','pressMoveCircle'])
        createjs.Ticker.addEventListener("tick", this.handleTick);
    }
    componentDidMount() {
        const canvas = document.querySelector('canvas');
        this.stage = new createjs.Stage(canvas);
        this.stage.enableMouseOver(10);
        this.stage.mouseEnabled=true
        this.loadGame();   
    }

    loadGame() {
        this.container = new createjs.Container();
        this.container = new createjs.Container();
        this.stage.addChild(this.container);
        for(let i=0;i<=10;i++){
            this.drawGraphics();

        }
    }

    drawGraphics(){
        let ball = new PlayerBall();
        this.addListeners(ball);
        this.container.addChild(ball);
        createjs.Tween.get(ball).to({x: 30+ Math.floor(Math.random() * 700),y: Math.floor(Math.random() * 400) +30},1000)
    }

    handleTick=()=> {  
        this.stage.update();
    }

    addListeners(ball) {
        ball.addEventListener('mousedown',this.mouseDownCircle);
        ball.addEventListener('pressmove',this.pressMoveCircle);
    }

    mouseDownCircle(e) {
        const { stageX, stageY} = e;
        this.offset = { x:e.currentTarget.x-stageX, y:e.currentTarget.y-stageY};
    }

    pressMoveCircle(e) {
        const {x, y} = this.offset;
        e.currentTarget.x = e.stageX+x;
        e.currentTarget.y = e.stageY+y;
        this.stage.update();
    }

    render() {
        return (
            <div className='game_table'>
                <canvas width="800px" height="500px" style={{backgroundColor: "#4d5151"}}></canvas>
            </div>
        )
    }
}