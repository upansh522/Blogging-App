const express = require("express");
const User = require("../models/user");

async function handleSignUp(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).send("Request body is missing");
    }
    try {
        const newUser = new User({
            FirstName: body.FirstName,
            LastName: body.LastName,
            EmailId: body.EmailId,
            password: body.password,
            profileUrl: body.profileUrl,
            role: body.role
        });

        await newUser.save();

        console.log(newUser);
        return res.redirect("/haveblog/homepage");
    } catch (error) {
        console.log("Error found:", error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { handleSignUp };
