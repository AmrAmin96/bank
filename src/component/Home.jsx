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
    name:"",
    accountNumber:"",
    balance:"",
    cardValidityDate:"",
    cardNumber:"",
    email:""
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
    
    this.props.history.push(path);
    this.props.history.push(this.state.email);
    // this.props.history.push({
    //   pathname: path,
    //   state: {
    //     email: this.props.location.state.email
    //   }
    // });
 
  }
  home() {
    let path = "/home";

   this.props.history.push({
    pathname: path,
    email:this.state.email
  });
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
      this.reqBody.deposit = document.getElementById("amount").value;
      this.reqBody.email=this.state.email
      console.log(this.reqBody.deposit);
      //this.reqBody.email = this.props.location.state.email; 
      try {
        await bankDeposit(this.reqBody);
        this.home()
      } catch (error) {
        if (error.response.status === 404) {
          alert("NotFound");
        }
      }
      
    }
  
  async onClickWithdraw() {
    
      this.reqBody.email=this.state.email
      this.reqBody.withdraw = document.getElementById("amount").value;
      console.log(this.reqBody.withdraw);
      //this.reqBody.name = this.props.location.state.name; 
      try {
        await bankwithdraw(this.reqBody);
        this.home()

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


     async   componentWillMount() {
          // Typical usage (don't forget to compare props):
          this.reqBody.email=this.props.location.email;
       const account=  await userSearch(this.reqBody);
        this.state.name=account[0].name;
        this.state.accountNumber=account[0].bankAccountNumber;
        this.state.cardNumber=account[0].cardNumber;
        this.state.cardValidityDate=account[0].cardValidityDate;
        this.state.email=account[0].email;
        this.state.balance=account[0].balance;
        this.props.history.push({
         
          state:this.state
        });
alert(this.state.balance)

        }
  render() {
    //alert(this.props.location.email)
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
                id="amount"
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
              
                  {/* <div className="userInfo text-light float-bottom">
                    <em className="accountNumber font-weight-bold h4">
                      Account number:
                    </em>
                    <br />
                    <br />

                    <em className="email font-weight-bold h4">
                      Email:this.state.Email
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
                  </div> */}
                  <table class="table text-light">
            <tbody>
              <tr>
                <th scope="row">NAME</th>

                <th scope="col">{this.state.name}</th>
              </tr>
              <tr>
                <th scope="row">ACCOUNT NUMBER</th>
                <th scope="col">{this.state.accountNumber}</th>
              </tr>

              <tr>
                <th scope="row">Email</th>
                <th scope="col">{this.state.email}</th>
              </tr>

              <tr>
                <th scope="row">BALANCE</th>
                <th scope="col">{this.state.balance}</th>
                
              </tr>
              <tr>
                <th scope="row">CARD NUMBER</th>
                <th scope="col">{this.state.cardNumber}</th>
                
              </tr><tr>
                <th scope="row">CARD VALIDITY DATE</th>
                <th scope="col">{this.state.cardValidityDate}</th>
                
              </tr>
            </tbody>
          </table>
            </div>
          </div>
        </div>
        
      </body>
    );
  }
}

export default Home;
