const express=require("express");
const multer=require('multer');
const routes=express.Router();
const {handleSignUp,
    handleLogin,handleLogout,handleCreateBlog,
}=require("../controllers/user");
const { route } = require("./staticRoute");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
const upload = multer({ storage: storage });

routes.post("/signup",handleSignUp);
routes.post("/login",handleLogin);
routes.get("/logout",handleLogout);
routes.post("/createBlog",upload.single('coverImage'),handleCreateBlog);

module.exports=routes;