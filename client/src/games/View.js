import React from 'react';
import './View.css'
import Table_Tennis from './table_tannis/Game';
import Talking_Parrot from './talking_parrot/Game'

export default class View extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
        <div className="game_wrapper">
            <div className='title_wrapper'>
                <div className="logo_wrapper"><div className="logo"></div></div>
            </div>
            <div className="quote">No Reason To Not Play</div>
            <div className="gamebody">
                <div className="table_tennis game">
                    <Table_Tennis/>
                </div>
                <div className="talking_parrot game">
                    <Talking_Parrot/>
                </div>
            </div>
        </div>
        );
    }
}