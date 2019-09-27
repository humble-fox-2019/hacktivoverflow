const mongoose = require('mongoose')


const popularTagSchema = new mongoose.Schema({
  tags: {
    type: Array
  }
})


const PopularTag = mongoose.model('PopularTag', popularTagSchema)


module.exports = PopularTag
