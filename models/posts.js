const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title :{
    type : String
  },
  body : {
    type : String
  },
  userId : {
    type : Number
  },
  id : {
    type : Number
  }
})

module.exports = mongoose.model('Posts',postSchema)