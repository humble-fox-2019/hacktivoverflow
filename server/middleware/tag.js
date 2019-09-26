const { tag } = require('../model')
module.exports =  async function addTag (req,res,next){
    if(!req.body.tags){
        return next()
    }
    console.log(req.body.tags , ' pleaseeeeeeeeeeeeeeeeeeeeee!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    let tagList = req.body.tags
    let result = []
    for(let i in tagList){
        await tag.findOneAndUpdate({
            name :  tagList[i] 
        },{
            $set : {
                name :  tagList[i]
            }
        },{  new: true, runValidators: true, upsert: true  })
        .then(data=>{
            // console.log(data)
            result.push(data)
        })
        .catch(next)
    }
    req.body.tagResult = result
    next()
}