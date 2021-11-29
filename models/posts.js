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
  },
  type : {
    type :  String,
    enum : ["Food","Animal","Surgery","Crime"]
  }
})

module.exports = mongoose.model('Posts',postSchema)