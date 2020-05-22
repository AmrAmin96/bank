import React, { Component, useState } from "react";
import "./Home.css";
import { stringify } from "querystring";
import {userInformation ,
bankDeposit,
bankwithdraw,
userSearch
} from "../Services/bankServices";

class Home extends Component {
  state = {
  };
  constructor() {
    super();
    this.state= {
      email: ""
    }
    this.reqBody = { email: "" };

   
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
  searchUser(result) {
    let path = "/bank";
    this.props.history.push({
      pathname: path,
      state: {
        email: this.state.email,
        result: result
      }
    });
  }
  async onClickDeposit() {
      this.reqBody.deposit = this.state.deposit;
      console.log(this.reqBody.deposit);
      //this.reqBody.email = this.props.location.state.email; 
      try {
        await bankDeposit(this.reqBody);
      } catch (error) {
        if (error.response.status === 404) {
          alert("NotFound");
        }
      }
    }
  
  async onClickWithdraw() {
      this.reqBody.withdraw = this.state.withdraw;
      console.log(this.reqBody.withdraw);
      this.reqBody.name = this.props.location.state.name; 
      try {
        await bankwithdraw(this.reqBody);
      } catch (error) {
        if (error.response.status === 404) {
          alert("NotFound");
        }
      }
    }
    
  

    async onClick() {
      this.state.email = document.getElementById("email").value;
  
      this.reqBody.email = this.state.email;
      try {
        let result = await userSearch(this.reqBody);
        this.searchUser(result);
      } catch (error) {
        if (error.response.status === 400) {
          alert("cannot find user");
        }
      }
    }
 /* async onClick(){
    
      try{
        await userInformation(this.reqBody);
      }
      catch(error){
        if (error.response.status === 404) {
          alert("email not found");
        }}}*/
  render() {
    return (
      <body>
         <div className="navbar">
          <a href="" onClick={() => this.edit()}>
            Edit profile
          </a>
          </div>
        <div>
          <div className="handle text-right">
            <div>
              <input
                className="search  ml-2 "
                type="text"
                placeholder="Enter a value"
              />
              <button
                className=" depositButton btn btn-primary m-2 "
                id="searchButton"
                onClick={this.onClickDeposit.bind(this)}
              >
                Deposit
              </button>
              <button
                className=" withdrawButton btn btn-primary m-2 "
                id="searchButton"
                onClick={this.onClickWithdraw.bind(this)}
              >
                withdraw
              </button>
              
                  <div className="userInfo text-light float-bottom">
                    <em className="accountNumber font-weight-bold h4">
                      Account number:
                    </em>
                    <br />
                    <br />

                    <em className="email font-weight-bold h4">
                      Email:
                    </em>

                    <br />
                    <br />
                    <em className="balance font-weight-bold h4">
                      Balance:
                    </em>

                    <br />
                    <br />
                    <em className="name font-weight-bold h4 pt-3">
                    Name :
                    </em>
                    <br />
                    <br />

                    <em className="cardDate font-weight-bold h4  pd-3  ">
                      Card validity date:
                    </em>
                    <br />
                    <br />

                    <em className="cardNumber font-weight-bold h4  pt-3">
                      Card Number:
                    </em>
                    <br />
                  </div>
            </div>
          </div>
        </div>
        
      </body>
    );
  }
}

export default Home;
