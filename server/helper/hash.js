var bcrypt = require('bcryptjs');


function hashPass(password) {
    const salt = bcrypt.genSaltSync(Number(process.env.HASH_PASS))
    let hash = bcrypt.hashSync(password, salt);
    return hash
}

function checkPass(password, counter) {
    let compare = bcrypt.compareSync(password, counter)
    return compare
}

module.exports = {
    hashPass,
    checkPass
}