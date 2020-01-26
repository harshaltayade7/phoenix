import React from 'react';
import api from '../api/index';

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
            <React.Fragment>
                {/* <form method="GET"> */}
                <input type="text" placeholder="harshal" name="username" value={this.state.username} onChange={this.handleInput}/>
                <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleInput}/>
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
                {/* </form> */}
            </React.Fragment>

        )
    }
}