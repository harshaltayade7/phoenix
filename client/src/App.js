import React from 'react';
import Login from './componets/Login';
import Signup from './componets/Signup';
import Home from './componets/Home';
import './css/global.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'Sign Up',
      isSignIn: false
    }
  }

  updateComponent = (param)=> {
    this.setState({
      component: param.name, 
      isSignIn: param.isSignIn
    });
  }


  getComponent() {
    // if(this.state.isSignIn){
      return <Home />
    // }
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

