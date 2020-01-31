import React from 'react';
import api from '../api/index';
import '../css/login.css';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            component: 'Sign Up'
        }

        this.toggleComponent = this.toggleComponent.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleSubmit = async (e) => {   
        if(this.state.username.length>=5) {
            await api.loginUser(this.state.username).then(res => {
            console.log("login successfully",res);
        })
     }
    }

    handleSignUp = async ()=> {
      if(this.state.username.length>=5) {
        await api.createUser(this.state.username).then(res => {
          console.log("inserted")
        })
      }
    }

    handleShowUsers = async ()=> {
        await api.showUsers().then(res => {
          console.log("users are ...",res)
        });
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
        console.log('toggled');
        this.props.updateComponent({name:e.currentTarget.innerText, isLoggedIn: false})
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
                <div className="dont_have_accnt">
                     Don't have an account ? <p className="togglePage" onClick={this.toggleComponent}><b>Sign Up</b></p> 
                </div>
            </div>

        )
    }
}