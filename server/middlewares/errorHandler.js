module.exports = (err, req, res, next) =>{
    let status = err.status || 500
    let message = err.message || "internal server error"
    if(err.name === "ValidationError"){
        status = 400
        let errArray = []
        for(let el in err.errors){
            if(err.errors[el].kind === 'unique'){
                errArray.push(`This ${el} is already exist`)// fix el curly bracket
            }else{
                errArray.push(err.errors[el].message)
            }
        }
        message = errArray.join(', ')
    }else if(err.name === "TokenExpiredError"){
        status = 401
        message = "You've been idle for too long. Please log in again"
    }else if(err.name === "JsonWebTokenError"){
        status = 401
        message = "You need to login first"
    }
    console.log(err)
    res.status(status).json({message})
}