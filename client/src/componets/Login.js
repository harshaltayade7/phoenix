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
            component: 'Sign Up',
            isMessage: true,
            message: 'Sign In'
        }

        this.toggleComponent = this.toggleComponent.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleSubmit = async (e) => {   
        if(this.state.username.length>=5) {
            await api.loginUser(this.state.username).then(res => {
            if(res.data == 'success') {
                this.setState({message: 'Login Successfull', isMessage: true});
                this.props.updateComponent({isLoggedIn: true});
            } else {
                this.setState({message: 'Wrong Credentials !', isMessage: true});
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
          return <Message message={this.state.message} styleObj={{color:'blue'}}/>;    
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