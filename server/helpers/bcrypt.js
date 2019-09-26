const bcrypt = require('bcryptjs');
const SALT_ROUND = Number( process.env.SALT_ROUND )|| 10;
const SALT = bcrypt.genSaltSync( SALT_ROUND );

function hash( string ) {
    return bcrypt.hashSync( string , SALT );
}
function compare ( string , hashedString ) {
    return bcrypt.compareSync( string, hashedString );
}

module.exports = {
    hash ,
    compare 
}