const my_Emp=require("../model/emp");

exports.create_emp=async(request,response)=>{

    try{

        const my_emp=new my_Emp(request.body);

        await my_emp.save();

        response.status(201).json({msg:"data created for employee",my_emp});


    }

    catch(er){

        console.log("error occurs in creating employees data",er);

        response.status(500).json({msg:"error occurs"});

    }


};


exports.get_every_emp=async(request,response)=>{

    try{

        const {page,limit,my_sorting,my_sorting_order,my_dept,my_srching}=request.body;


        const my_begin_index=(page-1)*limit;


        const my_last_index=page*limit;

        const empty_res={};


        const questions=my_Emp.find();

        if(my_sorting){

            const my_sorting_fld=my_sorting==="Salary"?"Salary":"createdAt";


            const my_sort_ordervalue=my_sorting_order==="desc"?-1:1;

            questions=questions.sort({[my_sorting_fld]:my_sort_ordervalue});

        }

        if(my_dept){

            questions=questions.where("Department",my_dept);


        }


        if(my_srching){


            questions=questions.where("FirstName",new RegExp(search,"i"));

        }


        const all_Emp=await my_Emp.countDocuments(questions).exec();


        if(my_last_index<all_Emp){

            empty_res.next={page:parseInt(page,12)+1, limit:parseInt(limit,12),my_sorting,my_sorting_order,my_dept,my_srching};

        }


        if(my_begin_index>0){

            empty_res.previous={page:parseInt(page,12)-1, limit: parseInt(limit,12),my_sorting,my_sorting_order,my_dept,my_srching};

        };


        empty_res.results=await questions.skip(my_begin_index).limit(limit).exec();


        response.status(200).json(empty_res);


    }

    catch(er){

        console.log("error occures",er);

        response.status(500).json({msg:"error"});

    }



};


////////

exports.get_emp_ids=async(request,response)=>{

    const {id}=request.params;
  
    try{

      const my_emp = await my_Emp.findById(id);

      if(!my_emp){


        return response.status(404).json({er:"employees not available"});

      }


      response.status(200).json({my_emp});


    } 
    
    
    catch(er){


      console.log("error occurs", er);

      response.status(500).json({er:"error"});

    }


  };
  




  exports.update_emp=async(request,response)=>{


    const {id}=request.params;
  
    try{


      const my_emp=await my_Emp.findByIdAndUpdate(id,request.body,{new:true});


      if(!my_emp){


        return response.status(404).json({er:"employees are not available"});


      }


      response.status(200).json({msg:"data updated",my_emp});


    } 
    
    
    catch(er){



      console.log("error occurs",er);


      response.status(500).json({er:"error"});


    }

  };
  




  exports.delete_emp=async(request,response)=>{


    const {id}=request.params;


  
    try{
      const my_emp=await my_Emp.findByIdAndDelete(id);


      if(!my_emp){


        return response.status(404).json({ er:"employees not available"});


      }


      response.status(200).json({msg:"data deleted"});


    } 
    
    
    catch(er){


      console.log("error occurs",er);



      response.status(500).json({er:"error"});


    }


    
  };
