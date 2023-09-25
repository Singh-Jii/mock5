exports.my_pagination_res=(model,page,limit)=>{

    const my_begin_index=(page-1)*limit;

    const my_last_index=page*limit;

    const empty_res={};

    if(my_last_index<model.length){

        empty_res.next={page:page+1, limit:limit};

    }


    if(my_begin_index>0){

        empty_res.previous={page:page-1, limit:limit};

    }



    empty_res.results=model.slice(my_begin_index,my_last_index);


    return empty_res;


}



