import React, { Component } from "react";
import { directive } from "@babel/types";
import "./Register.css";
import login from "./Login";
import Route from "react-router-dom/Route";
import { bankRegister } from "../Services/bankServices";

import {
  withRouter,
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
class Register extends Component {
  state = {};
  nextPath() {
    let path = "/login";
    this.props.history.push(path);
  }
  home() {
    let path = "/home";
    this.props.history.push(path);
  }
  reqBody={userName:"",
            password:"",
            email:"",
            PIN:""};

            
  validate = () => {
    this.reqBody.userName=document.getElementById("userName").value;
    this.reqBody.password=document.getElementById("password").value;
    this.reqBody.email=document.getElementById("email").value;
    this.reqBody.PIN=document.getElementById("PIN").value;
              var regex = /\S+@\S+\.\S+/;
              var regexname = /\S+/;
          
              if (
                regex.test(this.reqBody.email) == 0 ||
                regexname.test(this.reqBody.name) == 0 ||
                regexname.test(this.reqBody.password) == 0 ||
                regexname.test(this.reqBody.PIN) == 0
              ) {
                alert("validation error");
                this.props.history.push();
                return false;
              }
              return true;
            };          
  async onClick(){
    if(this.validate()){
      try{
        await bankRegister(this.reqBody);
        this.nextPath();
      }
      catch(error){
        if (error.response.status === 400) {
          alert("already exists");
        }

      }

    }

  }
  render() {
    return (
      <body className="register">
        <div className="container">
          <h1 className="col-sm-6 offset-sm-3 text-center text-danger display-3">
            {" "}
            Sign up{" "}
          </h1>
          <br></br>
          <form className="registerForm" id="registerForm" >
            <div class="form-group" className="text-center mb-5">
              <input
                type="text"
                validations={["required"]}
                name="userName"
                id="userName"
                placeholder="Enter your UserName"
                className="form-control "
              />
              <br></br>
             
              <input
                type="text"
                validations={["required", "isEmail"]}
                name="email"
                id="email"
                placeholder="Enter your email address."
                className="form-control "
              />
              <br></br>
              <input
                type="password"
                validations={["required"]}
                name="password"
                id="password"
                placeholder="Enter your password."
                className="form-control "
              />
              <br></br>
              <input
                type="text"
                validations={["required"]}
                name="address"
                id="address"
                placeholder="Enter your address."
                className="form-control "
              />
              <br></br>
              <input
                type="name"
                validations={["required"]}
                name="PIN"
                id="PIN"
                placeholder="Enter your PIN"
                className="form-control "
              />
              <br></br>
              <button
                className="btn btn-danger m-3"
                type = "button"
                onClick={this.onClick.bind(this)}
              >
                Sign up
              </button>
              
              <a onClick={() => this.nextPath()} href="">
                Login
              </a>
            </div>
          </form>
        </div>
      </body>
    );
  }
}

export default Register;
