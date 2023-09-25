const mongo=require("mongoose");


const emp_schema=new mongo.Schema({


    FirstName:{type:String, required:true},

    LastName:{type:String, required:true},

    Email:{type:String, unique:true, required:true},

    Department:{type:String, enum:["Tech","Marketing","Operations"], required:true},

    Salary:{type:Number, required:true}


},{

    time_stamp:true

});


const my_Emp=mongo.model("Employee",emp_schema);


module.exports=my_Emp;