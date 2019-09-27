const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(success => {
        console.log('Mongodb connected Success')
    })
    .catch(err => {
        console.log(err)
        console.log(`mongodb connected fail`)
    })

module.exports = mongoose