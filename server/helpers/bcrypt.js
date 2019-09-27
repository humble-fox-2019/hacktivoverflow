const bcrypt = require('bcryptjs');
const roll = Number(process.env.SALT_SYNC);

module.exports = {

    generatePassword(password) {
        const salt = bcrypt.genSaltSync(roll);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    ,
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }

}