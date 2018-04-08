const mongoose = require('mongoose')
const schema = mongoose.Schema;

const PollVoteSchema = new schema({
  user: {
    type: String,
    required: true},
  pollOptionId: {
    type: String,
    required: true}
});

const PollVote = mongoose.model('poll-vote', PollVoteSchema);
module.exports = PollVote;