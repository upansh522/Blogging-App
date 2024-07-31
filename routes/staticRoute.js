const express = require("express");
const blogModel = require("../models/blog");
const routes = express.Router();

routes.get('/signin', (req, res) => {
    return res.render('signin');
}).get('/signup', (req, res) => {
    return res.render('signup');
}).get('/homepage', async (req, res) => {
    const userId=res.locals.UserInfo._id;
    const articles=await blogModel.find({createdBy:userId}).limit(2);
    return res.render('home', { UserInfo: res.locals.UserInfo,
        articles:articles
     });
}).get('/createBlog', (req, res) => {
    return res.render('createBlog', { UserInfo: res.locals.UserInfo });
}).get('/premium',(req,res)=>{
    return res.render('premium',{ UserInfo: res.locals.UserInfo });
}).get('/myBlog',async (req,res)=>{
    const userId=res.locals.UserInfo._id;
    const articles=await blogModel.find({createdBy:userId});
    return res.render('myBlog',{ UserInfo: res.locals.UserInfo,
        articles:articles
     });
})

module.exports = routes;
