const express=require("express");
const routes=express.Router();
const {handleSignUp,
    handleLogin
}=require("../controllers/user");
const { route } = require("./staticRoute");

routes.post("/signup",handleSignUp);
routes.post("/login",handleLogin);

module.exports=routes;