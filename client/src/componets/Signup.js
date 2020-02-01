import React from 'react';
import api from '../api/index';
import '../css/signup.css';
import Message from '../componets/Message'
import BaseComponent from '../componets/BaseComponent';

export default class Signup extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            formField: {
                username: '',
                email: '',
                password1: '',
                password2: '',
            },
            isMessage: true,
            message: '',
            isLoading: false
        }
        this.toggleComponent = this.toggleComponent.bind(this);
        this.handleInput = this.handleInput.bind(this); 
    }

    handleSignUp = async ()=> {
      this.setState({isLoading: true, message: 'Validating your data...'});
      const validate = this.validateForm();
      if(validate.length == 0) {
          const { username, email, password1, password2} = this.state.formField;
        await api.createUser({name:username, email, password:password1}).then(res => {
            console.log(res.data,'---------->>>>>')
            let message='';
            if(res.data == 'user found') {
                message = 'User found'; 
            } else {
                message = 'Account created, You are all set to login now';
            }
            this.setState({message, isMessage: true, isLoading: false});
        })
      } else {
        let message='';
        validate.forEach((err)=> {
            message = message + `<div>${err}</div>`;
        });
        this.setState({isLoading: false, message});
      }
    }

    showPopup() {

    }

    validateForm() {
        const error = [];
        const { username, email, password1, password2 } = this.state.formField;

        if(username.length<6){
            error.push('Username should have at least 6 characters');
        }
        if(email.indexOf('@') <= 0) {
            error.push('Please enter a valid email');
        }
        if(password1 !== password2){
            error.push('Password1 and Password2 does not matching')
        }
        if(password1.length < 5) {
            error.push('Password should have atleast 5 characters')
        }
        return error;
    }


    handleInput(e) {
        switch(e.target.name) {
            case "username": console.log("username") ;
               this.setState({formField:{...this.state.formField,username: e.target.value}});
            break;
            case "email": console.log("password");
              this.setState({formField:{...this.state.formField,email: e.target.value}});
            break
            case "password1": console.log("password");
              this.setState({formField:{...this.state.formField,password1: e.target.value}});
            break
            case "password2": console.log("password");
             this.setState({formField:{...this.state.formField,password2: e.target.value}});
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
                    <div className="welcome_msg"> <b>Welcome</b></div>
                    <div className="signup_logo"/>
                <div className="formContent">
                    <label className="lableField">Username</label>
                    <input className="inputField"  type="text" name="username" value={this.state.formField.username} onChange={this.handleInput}/>
                    <label className="lableField">Email Address</label>
                    <input  className="inputField"  type="text" name="email" value={this.state.formField.email} onChange={this.handleInput}/>
                    <label className="lableField">Password</label>
                    <input  className="inputField"  type="password" name="password1" value={this.state.formField.password1} onChange={this.handleInput}/>
                    <label className="lableField">Confirm Password</label>
                    <input  className="inputField"  type="password" name="password2" value={this.state.formField.password2} onChange={this.handleInput}/>
                    <div className="submitBtn">
                        <button type="submit" onClick={this.handleSignUp}>Sign Up</button>
                    </div>
                    {this.messageUser()}
                    <div className="dont_have_accnt">
                        Your already have an account ? <p className="togglePage" onClick={this.toggleComponent}><b>Sign In</b></p> 
                    </div>
                </div>
            </div>

        )
    }
}