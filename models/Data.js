const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
   position: {
      type: String,
      // required: true
   },
   team_name: {
      type: String,
      // required: true
   },
   team_id: {
      type: String,
      // required: true
   },
   played: {
      type: Number,
      // required: true
   },
   won: {
      type: Number,
      // required: true
   },
   drawn: {
      type: Number,
      // required: true
   },
   lost: {
      type: Number,
      // required: true
   },
   points: {
      type: Number,
      // required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
})

module.exports = mongoose.model('Data', DataSchema);