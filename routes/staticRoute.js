const express=require("express");
const { get } = require("mongoose");
const {createToken,validateToken}= require("../services/user");
const { configDotenv } = require("dotenv");

const routes=express.Router();

routes.get('/signin',(req,res)=>{
    return res.render('signin');
}).get('/signup',(req,res)=>{
    return res.render('signup')
}).get('/homepage',(req,res)=>{
    const tokenExtract=req.cookies.token;
    const UserPayload=validateToken(tokenExtract,configDotenv.SECERET_KEY);
    return res.render('home',
        {UserPayload}
    );
})

module.exports=routes;