const { decode } = require('../helpers/jwt');

const User = require('../models/user')
function authentication ( req, res ,next ) {
    try {
        const token = req.headers.token;
        const decoded = decode( token );
        req.decode = decoded;

        User.findById( req.decode.id ) 
        .then( found => {
            if ( found ) next()
            else next({ status: 401 , message : "Invalid Token"})
        })
        .catch( next )
        
    } catch( err ) {
        next({ status : 401 , message : 'You must login first'})
    }
}

module.exports = authentication