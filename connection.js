const mongoose=require("mongoose"); 

async function mongoDbConnect(url){
    mongoose.connect(url,()=>{console.log("MongoDbGetConnected")});
}

module.export = mongoDbConnect;