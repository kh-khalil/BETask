const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
   team_name: {
      type: String,
      required: true
   },
   _id: {
      type: Number,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
})

module.exports = mongoose.model('Teams', TeamSchema);