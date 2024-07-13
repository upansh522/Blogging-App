const express=require("express");
const { get } = require("mongoose");

const routes=express.Router();

routes.get('/signin',(req,res)=>{
    return res.render('signin');
}).get('/signup',(req,res)=>{
    return res.render('signup')
}).get('/homepage',(req,res)=>{
    return res.render('home');
})

module.exports=routes;