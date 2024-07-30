const User = require("../models/user");
const blogModel =require('../models/blog');
const { createToken } = require("../services/user");
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

async function handleSignUp(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).send("Request body is missing");
    }
    try {
        const newUser = new User({
            FirstName: body.FirstName,
            LastName: body.LastName,
            EmailId: body.EmailId.toLowerCase(),
            password: body.password,
            profileUrl: body.profileUrl,
            role: body.role
        });

        await newUser.save();

        req.user = newUser;
        const token = createToken(newUser);
        res.cookie("token", token);
        return res.redirect("/haveblog/homepage");
    } catch (error) {
        console.log("Error found:", error);
        return res.status(500).send("Internal Server Error");
    }
}

async function handleLogin(req, res) {
    const { EmailId, password } = req.body;
    try {
        const { token, error } = await User.matchPasswordAndCreateToken(EmailId.toLowerCase(), password);

        if (error) {
            console.log(error);
            return res.status(400).redirect("/haveblog/signin");
        }

        res.cookie("token", token);
        return res.status(200).redirect("/haveblog/homepage");

    } catch (error) {
        console.error("An error occurred during login:", error);
        return res.status(500).redirect("/haveblog/signin");
    }
}

async function handleLogout(req, res) {
    res.clearCookie('token');
    res.redirect('/haveblog/signin');
}

async function handleCreateBlog(req,res){
    const file=req.file;
    const body=req.body;
    if (!body)
    {
        console.log('body not found');
        return res.redirect("/haveblog/createBlog");
    }

    try {
        const newBlog= await blogModel.create({
            domain: body.domain,
            thumbnail: body.thumbnail,
            content: body.content,
            createdBy: req.user._id
        });

        return res.status(201).redirect('/haveblog/homepage');
        
    } catch (error) {
        console.log('error occur due to ',error);
        return res.redirect("/haveblog/createBlog");
    }
}

module.exports = { handleSignUp, handleLogin, handleLogout, handleCreateBlog };
