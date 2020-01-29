import React from 'react';
import api from '../api/index';
require("../css/login.css")

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
        }
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

    handleInput = (e)=> {
        switch(e.target.name) {
            case "username": console.log("username") ;
               this.setState({username: e.target.value});
            break;
            case "password": console.log("password");
                this.setState({password: e.target.value});
            break;
        }
    }

    render() {
        return (
            <div className="loginForm">
                <div className="formContent">
                    <div>
                        <div className="inputLableField">User name </div>
                        <input className="inputField"  type="text" placeholder="harshal" name="username" value={this.state.username} onChange={this.handleInput}/>
                    </div>
                    <div>
                        <div className="inputLableField">Password</div>
                        <input  className="inputField"  type="password"  placeholder="password" name="password" value={this.state.password} onChange={this.handleInput}/>
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="submitBtn">Submit</button>
                </div>
            </div>

        )
    }
}