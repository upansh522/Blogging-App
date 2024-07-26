const express=require("express");
const routes=express.Router();
const {handleSignUp,
    handleLogin,handleLogout
}=require("../controllers/user");
const { route } = require("./staticRoute");

routes.post("/signup",handleSignUp);
routes.post("/login",handleLogin);
routes.get("/logout",handleLogout);

module.exports=routes;