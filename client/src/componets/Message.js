import React from 'react';
import '../css/message.css'

export default class Message extends React.Component {
    constructor(props){
        super(props);
        this.text = React.createRef();
    }

    componentDidUpdate() {
    this.text.current.innerHTML =  this.props.isLoading ? `${this.props.message}<div class="loader"></div>` : this.props.message;
    }

    render() {
        return (
            <div ref={this.text} className="message" style={this.props.styleObj}/>
        );
    }
}
