import React from 'react';
import './View.css'
import Table_Tennis from './table_tannis/Game';
import Talking_Parrot from './talking_parrot/Game'

export default class View extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            game: 'table_tennis game',
            isPlaying: true,
        }
    }
    setGame = (e)=> {
        this.setState({game: e.currentTarget.className, isPlaying: true});
    }

    loadGame() {
        switch(this.state.game) {
            case "table_tennis game": return <Table_Tennis/>
                break;
            case "talking_parrot game": return <Talking_Parrot/>
                break;
            case "nothing": return <div>No more game</div>
                break;
        }
    }

    render() {
        return(
        <div className="game_wrapper">
            <div className='title_wrapper'>
                <div className="logo_wrapper"><div className="logo"></div></div>
            </div>
            <div className="quote">No Reason To Not Play</div>
            {/* <div className="gamebody" style={{display: this.state.isPlaying ? "none" : "flex"}}>
                <div className="table_tennis game" onClick={this.setGame}>
                </div>
                <div className="talking_parrot game" onClick={this.setGame}>
                </div>
            </div> */}
            <div class="state_playing">
                {this.loadGame()}
            </div>
        </div>
        );
    }
}