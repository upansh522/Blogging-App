const express = require("express");
const routes = express.Router();

routes.get('/signin', (req, res) => {
    return res.render('signin');
}).get('/signup', (req, res) => {
    return res.render('signup');
}).get('/homepage', (req, res) => {
    return res.render('home', { UserInfo: res.locals.UserInfo });
}).get('/createBlog', (req, res) => {
    return res.render('createBlog', { UserInfo: res.locals.UserInfo });
}).get('/premium',(req,res)=>{
    return res.render('premium',{ UserInfo: res.locals.UserInfo });
}).get('/myBlog',(req,res)=>{
    return res.render('myBlog',{ UserInfo: res.locals.UserInfo });
})

module.exports = routes;
