import React from 'react';
import api from '../api/index';
import Message from '../componets/Message'
import '../css/login.css';
import BaseComponent from '../componets/BaseComponent';

export default class Login extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            isMessage: true,
            message: '',
            isLoading: false,
        }

        this.toggleComponent = this.toggleComponent.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleSubmit = async (e) => {   
        if(this.state.username.length>=5) {
            this.setState({message: 'Signing In', isMessage: true, isLoading: true});
            const { username, password } = this.state;
            await api.loginUser({name: username, password: password}).then(res => {
            if(res.data == 'success') {
                this.setState({message: 'Login Successfull', isLoading: false});
                this.props.updateComponent({isSignIn: true});
            } else {
                this.setState({message: 'Wrong Credentials !', isLoading: false});
            }
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
        this.props.updateComponent({name: 'Sign Up', isLoggedIn: false})
    }

    messageUser() {
        if(this.state.isMessage) {
          return <Message message={this.state.message} isLoading={this.state.isLoading} styleObj={{color:'red'}}/>;    
        }
    }

    render() {
        return (
            <div className="loginForm">
                <div className="formContent">
                    <div className="welcome_msg"> <b>Welcome</b></div>
                    <div className="login_logo"/>
                    <input className="inputField1"  type="text" placeholder="username" name="username" value={this.state.username} onChange={this.handleInput}/>
                    <input  className="inputField2"  type="password"  placeholder="password" name="password" value={this.state.password} onChange={this.handleInput}/>
                    <div className="submitBtn">
                    <button type="submit" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
                {this.messageUser()}
                <div className="dont_have_accnt">
                     Don't have an account ? <p className="togglePage" onClick={this.toggleComponent}><b>Sign Up</b></p> 
                </div>
            </div>

        )
    }
}