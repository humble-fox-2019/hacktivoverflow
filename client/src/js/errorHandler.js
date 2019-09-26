function errorHandler(err){
    let errorMessage = null
    if(err.response){
        errorMessage = err.response.data.message
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${errorMessage}`
        })
    }else if(err.request){
        errorMessage = `500 Internal Server Error`
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${errorMessage}`
        })
    }else {
        console.log(err.message)
    }
}

export default errorHandler