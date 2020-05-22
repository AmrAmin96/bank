import React, { Component } from "react";
import { directive } from "@babel/types";
import "./userEdit.css";
import login from "./Login";
import {
  bankEditEmail,
  bankEditPassword,
} from "../services/bankServices";

import Route from "react-router-dom/Route";
import {
  withRouter,
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
class Edit extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    newPassword: "",
    newPassword2: "",
  };
  reqBody = {
    name: "",
    password: " ",
    email: "",
    newPassword: "",
  };
  constructor() {
    super();
    this.state = {
      email: null,
      phonenum: null
    };
  }
  validateEmail = () => {
    this.state.email = document.getElementById("email").value;
    // alert(this.state.email);
    var regex = /\S+@\S+\.\S+/;

    if (regex.test(this.state.email) == 0) {
      alert("validation error");
      this.props.history.push();
      return false;
    }
    return true;
  };
  
  validatePassword = () => {
    this.state.newPassword = document.getElementById("newPassword1").value;
    this.state.password = document.getElementById("oldPassword").value;
    this.state.newPassword2 = document.getElementById("newPassword2").value;
    var regexname = /\S+/;

    if (
      regexname.test(this.state.newPassword) == 0 ||
      regexname.test(this.state.password) == 0 ||
      regexname.test(this.state.newPassword2) == 0
    ) {
      alert("validation error");
      this.props.history.push();
      return false;
    }
    if (this.state.newPassword !== this.state.newPassword2) {
      alert("Two new passwords do not match");
      this.props.history.push();
      return false;
    }
    return true;
  };
 
  async onClickEmail() {
    if (this.validateEmail()) {
      this.reqBody.email = this.state.email;
      this.reqBody.userName = this.props.location.state.userName;
      try {
        await bankEditEmail(this.reqBody);
        ///this.nextPath();
      } catch (error) {
        if (error.response.status === 400) {
          alert("already exists");
        } else if (error.response.status === 404) {
          alert("Not Found");
        }
      }
    }
  }
  
  async onClickPassword() {
    if (this.validatePassword()) {
      this.reqBody.password = this.state.password;
      this.reqBody.newPassword = this.state.newPassword;
      this.reqBody.name = this.props.location.state.name;
      try {
        await bankEditPassword(this.reqBody);
      } catch (error) {
        if (error.response.status === 404) {
          alert("Wrong Password");
        } else if (error.response.status === 400) {
          alert("Invalid password");
        }
      }
    }
  }

  edit() {
    let path = "/edit";
    this.props.history.push({
      pathname: path,
      state: {
        email: this.props.location.state.email
      }
    });
  }
 
  home() {
    let path = "/home";

    this.props.history.push(path);
  }
  render() {
    return (
      <body className="register">
        <div className="navbar">
          <a href="" onClick={() => this.home()}>
            Home
          </a>
          </div>

        <div className="container">
          <h1 className="col-sm-6 offset-sm-3 text-center text-danger display-5">
            {" "}
            Edit user's page{" "}
          </h1>
          <br></br>

          <div className=" mx-sm-3 mb-2">
            <input
              className=" m-3"
              id="email"
              placeholder="Edit your email"
            ></input>
            <button
              className="btn btn-primary mb-2 btn-danger"
              onClick={this.onClickEmail.bind(this)}
            >
              Edit Email
            </button>
          </div>

       
          <form className="form-inline">
            <div className="form-group mb-2">
              <div className="form-group mx-sm-3 mb-2">
                <label htmlFor="inputPassword2" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control m-3"
                  id="oldPassword"
                  placeholder="Enter your old Password"
                ></input>
              </div>
            </div>
          </form>
          <form className="form-inline">
            <div className="form-group mb-2">
              <div className="form-group mx-sm-3 mb-2">
                <label htmlFor="inputPassword2" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control m-3"
                  id="newPassword1"
                  placeholder="Enter new password"
                ></input>
              </div>
            </div>
          </form>
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="inputPassword2" className="sr-only">
              Password
            </label>
            <input
              type="password"
              className=" m-3"
              id="newPassword2"
              placeholder="Re-write new password"
            ></input>
            <button
              type="submit"
              className="btn btn-primary mb-2 btn-danger"
              onClick={this.onClickPassword.bind(this)}
            >
              Edit Password
            </button>
          </div>
        </div>
    </body>
    );
  }
}
export default Edit;
