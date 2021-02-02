const mongoose = require('mongoose');

const MatchSchema = mongoose.Schema({
   team_a_id: {
      type: String,
      required: true
   },
   team_b_id: {
      type: String,
      required: true
   },
   team_a_score: {
      type: String,
      required: true
   },
   team_b_score: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
})

module.exports = mongoose.model('Matches', MatchSchema);