const express = require("express");
const blogModel = require("../models/blog");
const User = require("../models/user");
const routes = express.Router();

routes.get('/signin', (req, res) => {
    return res.render('signin');
}).get('/signup', (req, res) => {
    return res.render('signup');
}).get('/homepage', async (req, res) => {
    const userId=res.locals.UserInfo
    const articles=await blogModel.find({createdBy:userId}).limit(2);
    return res.render('home', { UserInfo: res.locals.UserInfo,
        articles:articles
     });
}).get('/createBlog', (req, res) => {
    return res.render('createBlog', { UserInfo: res.locals.UserInfo });
}).get('/premium',(req,res)=>{
    return res.render('premium',{ UserInfo: res.locals.UserInfo });
}).get('/dashboard/:id', async (req, res) => {
    console.log(req.user);
    try {
        const currentUserId = req.params.id;
        const userId = res.locals.UserInfo._id;

        const user = await User.findById(currentUserId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const articles = await blogModel.find({ createdBy: currentUserId });

        return res.render('dashboard', {
            UserInfo: res.locals.UserInfo, // Logged-in user's info
            user: user,                    // The user fetched by :id
            articles: articles,
            currUserId: currentUserId
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});


module.exports = routes;
