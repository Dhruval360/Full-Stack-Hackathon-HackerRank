const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
//ref to the collection
const User = mongoose.model("User");
//password hashing
const bcrypt = require('bcryptjs');
//token
const jwt = require("jsonwebtoken");
//signature to generate token
const signature = 'iwillwinthehackathon100percent';

router.post("/signup",(req,res)=>{
    console.log("Signup route...");

    //destructure from body
    const {name,orgName,empID,mobNo,email,imgURL} = req.body;
    console.log("this is the req.body " + req.body);

    console.log("Searching in db....");
    //search in db collection
    User.findOne({empID:empID}).then((dbUser)=>{
        //if found
        if(dbUser){
            console.log("user already in db :(");
            res.json({error:"User already exists in db",message:"Create new account"})
        }
        else{
            console.log("Creating user.....")
            //gen uid => username
            const regID = new Date().valueOf().toString();
            console.log("regid created is " + regID);

            console.log("Creating password...")
            //hash password
            bcrypt.hash(empID,12).then((hashedPassword)=>{
                //save data to db
                const newUser = new User({
                    name,
                    orgName,
                    empID,
                    mobNo,
                    email,
                    imgURL,
                    regID,
                    imgURL,
                    password:hashedPassword,
                    regDate:new Date()
                });
                newUser.save().then((x)=>{
                    console.log("New user created!")
                    res.json({message:"Successful registration",note:"redirecting to login page...",regID:regID,success:true})
                }).catch(err=>{
                    console.log("unable to create new user : " + "because of the error " + err);
                    res.json({success:false,error:"Unable to register",message:"try again.."})
                })
            }).catch(err=>{
                //dev error
                console.log(err);
            })
        }
    })
})

router.post('/signin',(req,res)=>{
    const {username,password} = req.body;
    console.log(req.body);

    //search db
    User.findOne({regID:username}).then(dbUser=>{
        //if user not present
        if(!dbUser){
            res.status(422).json({error:"Incorrect email or password",message:"Create new account or Enter valid email and password"})
        }else{
            //compare password of user present in db and user logging in
            bcrypt.compare(password,dbUser.password).then((match)=>{
                if(match){
                    //attach user with token so thathe can access protected resource like menu
                    let token = null;
                    jwt.sign({signedRegID:dbUser.regID},signature,(err,temp)=>{
                        if(err){
                            //error for dev
                            console.log(err);
                        }
                        else{
                            token = temp;
                            res.json({message:"Successfully signed in",token,success:true})
                        }
                    })
                }else{
                    res.status(422).json({error:"Incorrect email or password",message:"Create new account or Enter valid email and password",success:false})
                }
            }).catch(err=>{console.log(err)})
        }
    }).catch(err=>console.log(err))
})

module.exports = router;


/*
Successfull connection with mongodb...
{
  name: 'Ganu',
  orgName: 'Hp',
  mobNo: '9738971585',
  email: 'ganu@ymail.com',
  imgURL: 'www.google.com/images/pic',
  empID: '123'
}
*/

/*
{
	"name":"Ganu",
	"orgName":"Hp",
	"mobNo":"9738971585",
	"email":"ganu@ymail.com",
	"imgURL":"www.google.com/images/pic",
	"empID":"123"
}
*/

/*
{
    "message": "Successfully signed in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWduZWRSZWdJRCI6IjE2MTAyNjc1NjkyMzYiLCJpYXQiOjE2MTAyNzAzMjR9.9P5DtjoyiruExShvDADpLzQcNO1SR50QSQt1HDLUcBg"
}
*/