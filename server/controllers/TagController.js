const Tag = require("../models/Tag")

class TagController{


    static getAll(req, res, next){

        let UserId = req.decode.id
        Tag.find({UserId})
        .then(alltags=>{
            res.status(200).json(alltags)
        })
        .catch(next)
    }

    static delete(req, res, next){

        let id = req.params.id

        Tag.findByIdAndDelete(id)
        .then()


    }



}

module.exports = TagController


