const exp=require("express");

const emp_middleware=require("../middleware/empmiddleware");

const my_routes=exp.Router();

my_routes.post("/",emp_middleware.create_emp);

my_routes.get("/",emp_middleware.get_every_emp);

my_routes.get("/:id",emp_middleware.get_emp_ids);

my_routes.put("/:id",emp_middleware.update_emp);

my_routes.delete("/:id",emp_middleware.delete_emp);

module.exports=my_routes;