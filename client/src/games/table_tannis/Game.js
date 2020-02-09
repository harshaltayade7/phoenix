import React from 'react';
import './Game.css'
import * as createjs from 'createjs-module';
import _ from 'lodash';
import Popup from '../../componets/Popup';

window.createjs= createjs;

const stage = {
    width: 800,
    height: 500,
}

class PlayerBall extends createjs.Container {
    constructor(radius, color, ...props) {
        super(props);
        this.drawBall(radius, color);
    }

    drawBall(radius=30, color="white") {
        const playerBall = new createjs.Shape();
        playerBall.graphics.beginFill(color).drawCircle(0,0,radius);
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
        this.state = { showPopup: true, message: "Start Game", score: 0 };  
        createjs.Ticker.addEventListener("tick", this.handleTick);
        this._corner = null;
        this._timer = null;
        this.timerRef = React.createRef();
        _.bindAll(this,['mouseDownCircle','pressMoveCircle'])
    }
    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
        this.startGame();
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
        this.drawCorners();
    }
    
    startGame() {
        this.startTimer();
        for(let i=0;i<=10;i++){
            this.drawWhiteBalls();
        }
    }

    startTimer() {
    }

    stopTimer() {

    }

    drawCorners(radius) {
        let topLeft, topRight, bottomLeft, bottomRight;

        topLeft = new PlayerBall(90, 'black');
        topRight = new PlayerBall(90, 'black');
        bottomLeft = new PlayerBall(90, 'black');
        bottomRight = new PlayerBall(90, 'black');

        this.corners = new createjs.Container();
        this.whiteBalls = new createjs.Container();

        topLeft.x = 0;
        topLeft.y = 0;

        topRight.x = 800;
        topRight.y = 0;

        bottomLeft.x = 0;
        bottomLeft.y = 500;

        bottomRight.x = 800;
        bottomRight.y = 500;

        this.corners.addChild(topLeft)
        this.corners.addChild(topRight)
        this.corners.addChild(bottomLeft)
        this.corners.addChild(bottomRight)

        this.container.addChild(this.corners);
        this.container.addChild(this.whiteBalls);
    }

    drawWhiteBalls(){
        let ball = new PlayerBall();
        this.addListeners(ball);
        this.whiteBalls.addChild(ball);
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
        this.checkArea(e.currentTarget);
        this.stage.update();
    }

    checkArea(target) {
        const corners = this.corners.children;
        const radius = 90;
        let isInside = true;
            if(target.x < corners[0].x + radius / 2 && target.y < corners[0].y+radius){
                this._corner = corners[0];
            } else if(target.x > corners[1].x - radius/2 && target.y < radius/2){
                this._corner = corners[1];
            } else if(target.x < radius / 2 && target.y > corners[2].y - radius/2){
                this._corner = corners[2];
            } else if(target.x > corners[3].x - radius/2 && target.y > corners[3].y - radius/2){
                this._corner = corners[3];
            } else {
                isInside = false;
                target.alpha = 1;
            }
            if(isInside) {
                target.alpha=0.5;
                console.log(this._corner)
                target.children[0].graphics._fill.style="red";
                this._corner.children[0].graphics._fill.style="yellow";
                target.removeAllEventListeners();
                target.parent.removeChild(target);
                setTimeout(()=>{
                    this._corner.children[0].graphics._fill.style="black";
                },500)
            }
    }

    render() {
        return (
            <div className='game_table'>
                <canvas width="800px" height="500px" style={{backgroundColor: "#4d5151"}}></canvas>
                <div className="popup_wrapper">  

                {this.state.showPopup ?  
                <Popup  
                        text={this.state.message}  
                        closePopup={this.togglePopup.bind(this)}  
                />      
                : null  
                }  
                </div>  
            </div>
        )
    }
}