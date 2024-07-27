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
    // const tokenExtract=req.cookies.token;
    // const UserPayload=validateToken(tokenExtract,configDotenv.SECERET_KEY);
    // req.user=UserPayload;
    return res.render('home');
}).get('/createBlog',(req,res)=>{
    return res.render('createBlog',
        {UserPayload: req.user}
    );
})

module.exports=routes;