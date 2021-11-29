const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount : {
    type : Number
  },
  currency : {
    type : String
  },
  token : {
    type : String
  },
  email:{
    type : String
  },
  name : {
    type : String
  }
})

module.exports = mongoose.model('Payments',paymentSchema)