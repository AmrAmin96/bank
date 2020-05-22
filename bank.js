const Bank = require("../Models/Bank");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt=require('bcryptjs');
const date = require('date-and-time');

router.get('/', async (req,res)=>{
    const bankAccounts= await Bank.find();
    if(bankAccounts.length<1) return res.status(404).send("No accounts Found");
    return res.status(200).send(bankAccounts);
});

router.post('/signup', async (req,res) => {
    console.log(req.body);
    const result = await Bank.find({           
        $or:[{ bankAccountNumber: req.body.bankAccountNumber },
            { email: req.body.email }] });
    if (result.length > 0) {                
        console.log('tany ya zaky');
      return res.status(400).send('Already  Exists');
    }
    const now = new Date();
    const month=now.getMonth();
    const year=now.getFullYear()%100+3;
    console.log("year: "+year);
    const validityDate = date.addYears(now, 3);

    let bank = new Bank({
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
        name: req.body.name,
        Balance: 0  ,
        PIN: req.body.PIN
    });
    try {
        bank = await bank.save();
    } catch (error) {
        console.log(error)
    };
    res.status(200).send(bank);
    console.log(bank);
});
router.post('/login', async (req, res) => {
    console.log(req.body);
    result = await Bank.find({ email: req.body.email});

    //if not found 
    if (result.length === 0) {
        console.log('not found');
        return res.status(404).send('user is not found');
    }
    const hash=result[0].password;
    const results= await bcrypt.compare(req.body.password,hash);
        if(results=== true){
              console.log('AUTHORIZED');
        return res.status(200).send('AUTHORIZED');
        }else{
            console.log('Not found');
        return res.status(404).send('user is not found');
        }
});

///Edit User Email
router.put('/edit/email', async (req, res) => {
    console.log(req.body);

    const bank = await Bank.findOne({ email: req.body.email });
    // if user is not found in DataBase
    
    if (!bank) return res.status(404).send('Not found');

    if (req.body.email) {

        let results = await Bank.find({ email: req.body.email });
        if (results.length>0) {

            console.log(results);
            console.log('Email already taken');
            return res.status(400).send('Email already taken');
        }
        console.log(results);
        await Bank.updateOne({ _id: bank._id }, { $set: { email: req.body.email } }); 
    } 
    const newbank = await Bank.findOne({ email: req.body.email });
    console.log(newbank);
    res.status(200).send(newbank);


});
router.put('/edit/password', async (req, res) => {

    const bank = await Bank.findOne({ email: req.body.email, password: req.body.password });
    // if user is not found in DataBase
    if (!bank) return res.status(404).send('wrong password');
    const hash=bank.password;
    const results= await bcrypt.compare(req.body.password,hash);
    if(!results)
    {
        console.log('wrong Password');
        return res.status(404).send('Wrong Password');
    }
    //check if oldPassword=== newPassword
    const check= await bcrypt.compare(req.body.newPassword,hash);
    if(check === true){
        console.log('same old password');
        return res.status(400).send('same old password');
    }
    if(req.body.newPassword){
        //hashing the new password
        bcrypt.hash(req.body.newPassword, 10).then(async (hash)=>{
        //updating the password
         await Bank.updateOne({ _id: bank._id }, { $set: { password: hash } });
        });        
    }
    const newUser = await Bank.findOne({ email: req.body.email });
    console.log(newUser);
    res.status(200).send(newUser);


});

router.put('/deposit', async (req, res) => {

    console.log(req.body);
    const bank = await Bank.findOne({ email: req.body.email });
    // if user is not found in DataBase
    if (!bank) {
        console.log('sss');
        return res.status(404).send('Not found');
    }
    if (req.body.deposit) {
        await Bank.updateOne({ _id: bank._id }, { $inc: { balance: req.body.deposit } } 
            );
    }
    const newbank = await Bank.findOne({ email: req.body.email });
    res.status(200).send(newbank);

});
router.put('/withdraw', async (req, res) => {

    console.log(req.body);
    const bank = await Bank.findOne({ email: req.body.email });
    // if user is not found in DataBase
    if (!bank) {
        console.log('sss');

        return res.status(404).send('Not found');
    }
    if (req.body.withdraw) {
        await Bank.updateOne({ _id: bank._id }, { $inc: { balance: -req.body.withdraw } }
            );
    }
    const newbank = await Bank.findOne({ email: req.body.email });
    res.status(200).send(newbank);

});
router.post("/userProfile", async (req, res) => {
    console.log(req.body);
    result = await Bank.find({ email: req.body.email });
    //if found
    if (result.length === 0) {
      console.log("not found");
      return res.status(404).send("user is not found");
    }
    return res.status(200).send(result);
  });

router.post("/search", async (req, res) => {
    console.log(req.body);
    result = await Bank.find({
      email: req.body.email
    });
  
    if (result.length === 0) {
      console.log("not found");
      return res.status(400).send("user is not found");
    }
    console.log(result);
  
    return res.status(200).send(result);
  });



module.exports = router;