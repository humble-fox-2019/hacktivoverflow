var CronJob = require('cron').CronJob;
// const { vote_controller } = require('../controller')
const Most = require('../model/most')
const { question } = require('../model')
new CronJob('* 30 18 * * *', function() {
    // console.log('hehe')
    question.create({
        title : 'lol' , description : 'hahaa'  
    })
    .then(data=>{
        console.log(data , ' terbuat anjir')
    })
    .catch(err=>{
        console.log(err)
    })
    // console.log('sk')

    
}, null, true, 'Asia/Jakarta');
// console.log('anjau')
//     console.log(question)
//     function getDataLOl(){
        
//     }
//     question.find({})
//     .then(data=>{
//         console.log(data)
//         let temp;
//         temp = data.sort((a,b)=> b.votes - a.votes)
//         // res.json({
//         //     data : temp
//         // })
//         console.log(temp , ' <?<><><><><><><<<<<<<<<')
//         console.log('lol')
//         console.log('plplplp')
//     })
//     .catch(err=>{
//         console.log(err)
//     })
//     getDataLOl()
//     // Most.remove({})
//     // .then(data=>{
//     //     return  question.find({  })
//     // })
//     // .then(data=>{
//     //     let temp;
//     //     temp = data.sort((a,b)=> b.votes - a.votes)
//     //     return Most.create({} ,{
//     //             question : temp
//     //     })
//     // })
//     // .then(data=>{
//     //     console.log('SUkses cuy wkwkwkwkwkwkwkwk')
//     // })
//     // .catch(err=>{
//     //     console.log(err)
//     // })
