const express=require("express");
const mongoose=require("mongoose");
const mongoDbConnect=require("./connection");
const staticRoute=require('./routes/staticRoute');
const path=require("path");
const app = express();
const PORT= 8000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views")); 

mongoDbConnect("mongodb://127.0.0.1:27017/BlogApp").then(()=>{
    console.log("mongoDbConnected");
}).catch((err)=>{
    console.log(err);
});

app.use('/haveblog', staticRoute);

app.listen(PORT,()=>{console.log("Server get started !! at port: ",PORT)});
