import React from 'react';
import Login from './componets/Login';
import Signup from './componets/Signup';
import './css/global.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'Sign In',
      isSignIn: false,
    }
  }

  updateComponent = ({text = 'Sign In', isLoggedIn = false})=> {
    this.setState({
      component: text, 
      isSignIn: isLoggedIn ? false: true
    });
  }


  getComponent() {
    if (this.state.component == 'Sign In' && !this.state.isSignIn) {
      return <Login updateComponent = {this.updateComponent} />;
    }
    return <Signup updateComponent = {this.updateComponent} />;
  }

  render(){
    return (
      <div className="App" style={{textAlign:"-webkit-center"}}>
        {this.getComponent()}
      </div>
    );
  }
}

