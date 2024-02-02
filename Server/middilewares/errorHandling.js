export  const errorhandler=(error,req,res, next)=>{

    const statusCode=res.statusCode ?res.statusCode:500;
    res.status(statusCode).json({error:error|| error.massage });

}