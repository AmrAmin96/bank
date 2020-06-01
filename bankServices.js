import { stringify } from 'querystring';
import http from './httpService';
import Axios from "axios";

export function bankRegister(reqBody) {
    alert('posting');

    return http.post('http://localhost:4000/bank/signup', stringify(reqBody));
   
}
export  async function bankLogin(reqBody) {
   
    console.log(reqBody);

    return await http.post('http://localhost:4000/bank/login', stringify(reqBody));

};
export async function bankEditEmail(reqBody) {
    alert('edit email');
    console.log(reqBody);

    return await http.put('http://localhost:4000/bank/edit/email', stringify(reqBody));


};
export async function bankEditPassword(reqBody) {

    console.log(reqBody);

    return await http.put('http://localhost:4000/bank/edit/password', stringify(reqBody));


};
/*export async function bankInformation(reqBody) {

    console.log(reqBody);

    return await http.get('http://localhost:4000/bank/', stringify(reqBody));


};*/

export async function bankDeposit(reqBody) {
    
    console.log(reqBody);

    return await http.put('http://localhost:4000/bank/deposit', stringify(reqBody));


};
export async function bankwithdraw(reqBody) {
    
    console.log(reqBody);

    return await http.put('http://localhost:4000/bank/withdraw', stringify(reqBody));


};
export async function userInformation(reqBody) {
    let url = "http://localhost:4000/bank/userProfile";
    let options = {
      method: "POST",
      url: url,
      data: reqBody
    };
  
    let response = await Axios(options);
  
    if (response) {
      let info = await response.data;
  
      return info;
    }
  }
  export async function userSearch(reqBody) {
    //alert("posting");
    let url = "http://localhost:4000/bank/search";
    let options = {
      method: "POST",
      url: url,
      data: reqBody
    };
  
    let response = await Axios(options);
    if (response) {
      let information = await response.data;
      return information;
    }
  }