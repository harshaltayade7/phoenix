import React from 'react';
import '../css/message.css'

export default class Message extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messageText: "Hey There !",
        }
    }

    render() {
        return (
            <div className="message" style={this.props.styleObj}>
                {this.props.message}
            </div>
        );
    }
}
