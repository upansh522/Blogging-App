const express=require("express");
const routes=express.Router();
const {handleSignUp}=require("../controllers/user");

routes.post("/user",handleSignUp);

module.exports=routes;