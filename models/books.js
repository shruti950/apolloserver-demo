const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title : {
    type : String
  },
  author : {
    type : String
  }
})

module.exports = mongoose.model('Books',bookSchema)