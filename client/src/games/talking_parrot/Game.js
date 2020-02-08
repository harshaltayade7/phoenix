import React from 'react';

export default class Game extends React.Component {
    render() {
        return (
            <div className='game_table'>
                <canvas width="800px" height="500px" style={{backgroundColor: "#4d5151"}}></canvas>
            </div>
        )
    }
}