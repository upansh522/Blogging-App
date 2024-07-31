const mongoose=require("mongoose");
const { schema } = require("./user");
const blogSchema= new mongoose.Schema({
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
    domain :{
        type: String,
        required: true
    },

    thumbnail:{
        type: String,
        required: true
    },

    content:{
        type: String,
        required:true
    },

    coverImage:{
        type:String,
        default:'Blog Banner.png'
    }

},{timestamps : true});

const blogModel= mongoose.model('blogModel',blogSchema);

module.exports =blogModel;