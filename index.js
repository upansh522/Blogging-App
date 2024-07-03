const express=require("express");
const mongoose=require("mongoose");
const mongoDbConnect=require("./connection");
const path=require("path");


app.set('view engine', 'ejs');
app.use("views",path.resolve("./views"));

mongoDbConnect(" mongodb://127.0.0.1:27017/BlogApp");

const app=express();
const PORT= 8000;

app.listen(PORT,()=>{console.log("Server get started !! at port: ",PORT)});
