const exp=require("express");

const auth_middleware=require("../middleware/authmiddleware");

const {body}=require("express-validator");

const my_routes=exp.Router();


my_routes.post([body("Email").is_my_email().withMessage("Invalid Email"), body("Password").trim().is_password_length({min:5}).withMessage("Password should be length of 5 alphabets")],auth_middleware.signup);


my_routes.post("/login",auth_middleware.login);


module.exports=my_routes;