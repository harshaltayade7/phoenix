import React from 'react';
import './Game.css'
import * as createjs from 'createjs-module';
import _ from 'lodash'

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
        this.drawGraphics();
        this.addListeners();
    }

    drawGraphics(){
        this.container = new createjs.Container();
        const playerBall = new createjs.Shape();
        
        this.playerBall = new createjs.Container();
        playerBall.graphics.beginFill("red").drawCircle(0,0,30);
        playerBall.x = this.stage.canvas.width/2;
        playerBall.y = this.stage.canvas.height/2 - 15;
        playerBall.cursor = "grabbing";
        this.playerBall.addChild(playerBall)
        this.container.addChild(this.playerBall);
        this.stage.addChild(this.container);

        this.drawWhiteBall();
    }

    drawWhiteBall() {
        this.whiteBall = new createjs.Container();
        const whiteBall = new createjs.Shape();

        whiteBall.graphics.beginFill("yellow").drawCircle(0,0,30);
        whiteBall.x = Math.floor(Math.random() * 700) + 15;
        whiteBall.y = Math.floor(Math.random()* 500) + 15;

        console.log(whiteBall.x);
        console.log(whiteBall.y)
        this.whiteBall.addChild(whiteBall);
        this.container.addChild(this.whiteBall);
    }

    handleTick=()=> {  
        this.stage.update();
    }

    addListeners() {
        this.playerBall.addEventListener('mousedown',this.mouseDownCircle);
        this.playerBall.addEventListener('mouseup',()=>{
            this.playerBall.removeEventListener('pressmove',this.pressMoveCircle);
        });
    }

    mouseDownCircle(e) {
        const { stageX, stageY} = e;
        this.offset = { x:e.currentTarget.x-stageX, y:e.currentTarget.y-stageY};
        this.playerBall.addEventListener('pressmove',this.pressMoveCircle);
    }

    pressMoveCircle(e) {
        const {x, y} = this.offset;
        this.playerBall.x = e.stageX+x;
        this.playerBall.y = e.stageY+y;
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