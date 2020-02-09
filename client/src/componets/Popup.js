import React from 'react';  
import './Popup.css';  

class Popup extends React.Component {  
  render() {  
    return (  
    <div className='popup'>  
    <div className='popup_inner'>
    <button onClick={this.props.closePopup}>{this.props.text}</button>  
    </div>  
    </div>  
    );  
}  
}  

export default Popup;