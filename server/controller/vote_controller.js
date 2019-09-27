const {  question , answer } = require('../model');

class vote_controller {
    
    static upVote (req,res,next){
        let kondisi =  false
        question.findById(req.params.id).populate('voter')
        .then(data=>{
            for(let i in data.voter){
                if(data.voter[i]._id == req.decode.data._id){
                    kondisi = true
                }
            }
            if(!kondisi){
                data.voter.push(req.decode.data)
                data.votes += req.body.num
                data.save()
                res.json({
                    m : 'sukses'
                })
            }else {
                res.status(400).json({
                    message : 'anda sudah pernah vote !!!!'
                })
            }
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static voteAnswer(req,res,next){
        let kondisi =  false
        answer.findById(req.params.id).populate('voter')
        .then(data=>{
            for(let i in data.voter){
                if(data.voter[i]._id == req.decode.data._id){
                    kondisi = true
                }
            }
            if(!kondisi){
                data.voter.push(req.decode.data)
                data.votes += req.body.num
                data.save()
                res.json({
                    m : 'sukses'
                })
            }else {
                res.status(400).json({
                    message : 'anda sudah pernah vote !!!!'
                })
            }
            
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static getMostVoters (req,res,next){
        question.find({})
        .then(data=>{
            let temp;
            temp = data.sort((a,b)=> b.votes - a.votes)
            // res.json({
            //     data : temp
            // })
            console.log()
        })
        .catch(err=>{
            next(err)
        })
    }

    static upVotesQuestion (req,res,next) {
        let kondisi = 'belum pernah vote'
        question.findById(req.params.id).populate('voter.User')
        .then(data=>{
            data.voter.forEach(el=>{
                if(el.User._id == req.decode.data._id && el.status == 'upvote' && data.votes != 0 ){
                    kondisi = 'sudah pernah upvote'
                }
                else if(el.User._id == req.decode.data._id && el.status == 'downvote'){
                    console.log('Masuk Sini sayangnya up')
                    el.status = 'upvote'
                    kondisi = 'akan upvote'
                }
            })
            if(kondisi == 'akan upvote'){
                data.votes+=1
                res.json({
                    message : 'Anda Berhasil Voter'
                })
                data.save()
            }else if(kondisi =='belum pernah vote'  ){
                data.votes += 1
                data.voter.push({
                    User : req.decode.data,
                    status : 'upvote'
                })
                res.json({
                    message : 'Anda Berhasil Voter'
                })
                console.log(data , ' plplplplplplplplp ')
                data.save()
            }else if(kondisi == 'sudah pernah upvote') {
                next({ status : 400 , message : 'Anda Sudah Pernah Vote' })
            }
            else if(kondisi == 'votes 0'){
                data.votes +=1
                res.json({
                    message : 'Anda Berhasil Voter'
                })
                data.save()
            }
        })
        .catch(next)
    }

    static downVotesQuestion (req,res,next) {
        let kondisi = 'belum pernah vote'
        question.findById(req.params.id).populate('voter.User')
        .then(data=>{
            data.voter.forEach(el=>{
                if(el.User._id == req.decode.data._id && el.status == 'downvote' && data.votes != 0){
                    kondisi = 'sudah pernah downvote'
                }
                else if(el.User._id == req.decode.data._id && el.status == 'upvote'){
                    console.log('Masuk Sini sayangnya down')
                    el.status = 'downvote'
                    kondisi = 'akan downvote'
                }
            })
            if(kondisi == 'akan downvote'){
                data.votes -=1
                res.json({
                    message : 'Anda Berhasil Voter'
                })
                data.save()
            }else if(kondisi =='belum pernah vote'  ){
                data.votes -= 1
                data.voter.push({
                    User : req.decode.data,
                    status : 'downvote'
                })
                res.json({
                    message : 'Anda Berhasil Vote'
                })
                data.save()
            }else if(kondisi == 'sudah pernah downvote') {
                next({ status : 400 , message : 'Anda Sudah Pernah Vote' })
            }else if(kondisi == 'votes 0'){
                data.votes -=1
                res.json({
                    message : 'Anda Berhasil Vote'
                })
                data.save()
            }
        })
        .catch(next)
    }

    static upVoteAnswer (req,res,next){
        let kondisi = 'belum pernah vote'
        answer.findById(req.params.id).populate('voter.User')
        .then(data=>{
            data.voter.forEach(el=>{
                if(el.User._id == req.decode.data._id && el.status == 'upvote' && data.votes != 0 ){
                    kondisi = 'sudah pernah upvote'
                }
                else if(el.User._id == req.decode.data._id && el.status == 'downvote'){
                    console.log('Masuk Sini sayangnya up')
                    el.status = 'upvote'
                    kondisi = 'akan upvote'
                }
            })
            if(kondisi == 'akan upvote'){
                data.votes+=1
                res.json({
                    message : 'Anda Berhasil Voter'
                })
                data.save()
            }else if(kondisi =='belum pernah vote'  ){
                data.votes += 1
                data.voter.push({
                    User : req.decode.data,
                    status : 'upvote'
                })
                res.json({
                    message : 'Anda Berhasil Voter'
                })
                console.log(data , ' plplplplplplplplp ')
                data.save()
            }else if(kondisi == 'sudah pernah upvote') {
                next({ status : 400 , message : 'Anda Sudah Pernah Vote' })
            }
            else if(kondisi == 'votes 0'){
                data.votes +=1
                res.json({
                    message : 'Anda Berhasil Voter'
                })
                data.save()
            }
        })
        .catch(next)
    }

    static downVotesAnswer (req,res,next){
        let kondisi = 'belum pernah vote'
        answer.findById(req.params.id).populate('voter.User')
        .then(data=>{
            data.voter.forEach(el=>{
                if(el.User._id == req.decode.data._id && el.status == 'downvote' && data.votes != 0){
                    kondisi = 'sudah pernah downvote'
                }
                else if(el.User._id == req.decode.data._id && el.status == 'upvote'){
                    console.log('Masuk Sini sayangnya down')
                    el.status = 'downvote'
                    kondisi = 'akan downvote'
                }
            })
            if(kondisi == 'akan downvote'){
                data.votes -=1
                res.json({
                    message : 'Anda Berhasil Voter'
                })
                data.save()
            }else if(kondisi =='belum pernah vote'  ){
                data.votes -= 1
                data.voter.push({
                    User : req.decode.data,
                    status : 'downvote'
                })
                res.json({
                    message : 'Anda Berhasil Vote'
                })
                data.save()
            }else if(kondisi == 'sudah pernah downvote') {
                next({ status : 400 , message : 'Anda Sudah Pernah Vote' })
            }else if(kondisi == 'votes 0'){
                data.votes -=1
                res.json({
                    message : 'Anda Berhasil Vote'
                })
                data.save()
            }
        })
        .catch(next)
    }
}

module.exports = vote_controller