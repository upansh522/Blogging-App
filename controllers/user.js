const User = require("../models/user");
const { createToken } = require("../services/user");

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
        const Token=createToken(newUser);
        return res.cookie("token",Token).redirect("/haveblog/homepage");
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
             // Use query parameters to pass error
        }

        return res.cookie("token", token).status(200).redirect("/haveblog/homepage");

    } catch (error) {
        console.error("An error occurred during login:", error);
        return res.status(500).redirect("/haveblog/signin");
    }
}
async function handleLogout(req,res){
    res.clearCookie('token'); // Clear the token cookie
    res.redirect('/haveblog/signin');
}

module.exports = { handleSignUp, handleLogin, handleLogout };
