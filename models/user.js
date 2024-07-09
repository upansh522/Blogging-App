const {createHmac, randomBytes } = require('node:crypto');
const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
    },
    EmailId:
    {
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type: String,
    },
    password:{
        type:String,
        required:true
    },
    profileUrl:{
        type:String,
        default: '/public/images.png'
    },
    role:{
        type:String,
        enum:["User","Admin"],
        default:'User'
    }

},{timestamps: true});

userSchema.pre('save',function(next){
    const user=this;
    if (!user.isModified()){
        return;
    }

    const salt=randomBytes(16).toString();
    const hmac = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

    this.salt=salt;
    this.password=hmac;

})

const User=new mongoose.model("users",userSchema);

module.exports=User;