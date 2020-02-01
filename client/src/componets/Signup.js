import React from 'react';
import api from '../api/index';
import '../css/signup.css';
import Message from '../componets/Message'
import BaseComponent from '../componets/BaseComponent';

export default class Signup extends BaseComponent {
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            username: '',
            password: '',
            isMessage: true,
            message: 'Sign Up',
            isLoading: false
        }
        this.toggleComponent = this.toggleComponent.bind(this);
    }

    handleSignUp = async ()=> {
      if(this.state.username.length>=5) {
        await api.createUser(this.state.username).then(res => {
            this.setState({message: 'Account created', isMessage: true});
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
        this.props.updateComponent({name:'Sign In', isLoggedIn: false})
    }

    messageUser() {
        if(this.state.isMessage) {
          return <Message message={this.state.message} isLoading={this.state.isLoading} styleObj={{color:'red'}}/>;    
        }
    }

    render() {
        return (
            <div className="signUpForm">
                <div className="formContent">
                    <div className="welcome_msg"> <b>Welcome</b></div>
                    <div className="signup_logo"/>
                </div>
                {this.messageUser()}
                <div className="dont_have_accnt">
                     Your already have an account ? <p className="togglePage" onClick={this.toggleComponent}><b>Sign In</b></p> 
                </div>
            </div>

        )
    }
}