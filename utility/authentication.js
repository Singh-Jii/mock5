const jot=requere("jsonwebtoken");

const my_configure=require("../configure");


exports.verify_token=(request,response,next)=>{


    const my_token=request.headers.authorization;


    if(!my_token){

        return response.status(401).json({er:"token is not available"});

    }


    jot.verify(my_token,my_configure.JWT_SECRET,(er,dec)=>{

        
        if(er){

            return response.status(401).json({er: "Invalid token "});

        }


        request.client_id=dec.client_id;

        next();


    });


};