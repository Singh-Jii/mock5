const exp=require("express");

const mongo=require("mongoose");

const cor=require("cors");

const my_auth_routers=require("./router/authrouter");

const my_configure=require("./configure");

const my_emp_router=require("./router/emprouter");

const my_application=exp();


my_application.use(exp.json());

my_application.use(cor());


mongo.connect(my_configure.mongodb_link,{useNewUrlParser:true,useUnifiedTopology:true,})


.then(()=>{ 

    console.log("mongodb connected");

})


.catch((er)=>{ 

    console.log("Error occured in connection",er);

});


my_application.get("/",(request,response)=>{

    response.send("<h2>Employee Management</h2>");

})


my_application.use("/api/auth",my_auth_routers);

my_application.use("/api/employees",my_emp_router);


const my_port=process.env.port || 6000;


my_application.listen(my_port,()=>{

    console.log(`${my_port}`);

});

