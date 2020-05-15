const mongoose = require('mongoose')
const DB_NAME = 'bookmarksdb'
const { MONGO_URL } = require('../config')

module.exports.initialize = function() {
  return mongoose.connect(MONGO_URL+ DB_NAME, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
}
