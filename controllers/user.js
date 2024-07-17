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

        req.user=newUser;
        return res.redirect("/haveblog/homepage");
    } catch (error) {
        console.log("Error found:", error);
        return res.status(500).send("Internal Server Error");
    }
}

async function handleLogin(req, res) {
    const body = req.body;
    const EmailId = body.EmailId;
    const password = body.password;

    console.log("Received login request for email:", EmailId);  // Debug log
    console.log("Request body:", body);  // Debug log

    try {
        const loginUser = await User.matchPassword(EmailId.toLowerCase(), password);

        if (loginUser.error) {
            console.log("Login error:", loginUser.error);  // Debug log
            return res.status(400).send(loginUser.error);
        }

        console.log("Login successful for user:", EmailId);  // Debug log
        return res.status(200).redirect("/haveblog/homepage");

    } catch (error) {
        console.error("An error occurred during login:", error);  // Debug log
        return res.status(500).send("An error occurred during login.");
    }
}

module.exports = { handleSignUp,handleLogin };
