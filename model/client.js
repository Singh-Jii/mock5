const mongo=require("mongoose");

const client_schema=new mongo.Schema({

    Email:{type:String, unique:true, required:true},

    Password:{type:String, required:true}

},{

    time_stamp:true

});


const my_Client=mongo.model("User",client_schema);


module.exports=my_Client;