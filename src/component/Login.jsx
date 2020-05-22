import React, { Component } from "react";

import "./Login.css";
import Register from "./Register";
import { bankLogin } from "../Services/bankServices";


class Login extends Component {
  state = {};
  home() {
    let path = "/home";
    this.props.history.push(path);
  }
  reqBody={
           password:"",
            email:""};
            
  validate = () => {
    this.reqBody.password=document.getElementById("password").value;
    this.reqBody.email=document.getElementById("email").value;
              var regex = /\S+@\S+\.\S+/;
              var regexname = /\S+/;
          
              if (
                regex.test(this.reqBody.email) == 0 ||
                regexname.test(this.reqBody.password) == 0
              ) 
              {
                alert("validation error");
                this.props.history.push();
                return false;
              }
              return true;
            };         
  async onClick(){
              if(this.validate()){
                try{
                  await bankLogin(this.reqBody);
                  this.home();
                }
                catch(error){
                  if (error.response.status === 404) {
                    alert("email not found");
                  }
                  if (error.response.status === 404) {
                    alert("wrong password");
                  }
          
                }
          
              }
          
            }
  render() {
    return (
      <body id="login" className="backGround">
        <div className="card-body p-5 ">
          <h1 className="col-sm-6 offset-sm-3 text-center text-danger display-3">
            {" "}
            Login{" "}
          </h1>
          <div
            id="loginform"
            method="post"
            onSubmit={this.login}
            className="col-sm-6 offset-sm-3 text-center pt-5"
          >
            <form className="loginForm">
              <input
                type="text"
                validations={["required", "isEmail"]}
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                id="email"
                placeholder="User E-mail"
                className="form-control input"
              />
              <br></br>
              <input
                type="password"
                validations={["required"]}
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
                placeholder=" Password"
                className="form-control "
              />
            </form>
            <br></br>
            <div class="col text-cener"></div>
            <button className="btn btn-danger " onClick={() => this.onClick()}>
              login
            </button>
          </div>
        </div>
      </body>
    );
  }
}

export default Login;
