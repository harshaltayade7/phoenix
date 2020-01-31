import React from 'react';
import api from '../api/index';
import '../css/signup.css';

export default class Signup extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            username: '',
            password: '',
        }
        this.toggleComponent = this.toggleComponent.bind(this);
    }

    handleSignUp = async ()=> {
      if(this.state.username.length>=5) {
        await api.createUser(this.state.username).then(res => {
          console.log("inserted")
        })
      }
    }


    handleInput(e) {
        switch(e.target.name) {
            case "username": console.log("username") ;
               this.setState({username: e.target.value});
            break;
            case "password": console.log("password");
                this.setState({password: e.target.value});
            break;
        }
    }

    toggleComponent(e) {
        this.props.updateComponent({name:e.currentTarget.innerText, isLoggedIn: true})
    }


    render() {
        return (
            <div className="signUpForm">
                <div className="formContent">
                    <div className="welcome_msg"> <b>Welcome</b></div>
                    <div className="signup_logo"/>
                </div>
                <div className="dont_have_accnt">
                     Your already have an account ? <p className="togglePage" onClick={this.toggleComponent}><b>Sign In</b></p> 
                </div>
            </div>

        )
    }
}