const mongoose = require('mongoose')
const schema = mongoose.Schema;

const PollOptionSchema = new schema({
  pollId: {
    type: String,
    required: true},
  optionText: {
    type: String,
    required: true},
  votes: {
    type: Number,
    default: 0}
});

const PollOption = mongoose.model('poll-option', PollOptionSchema);
module.exports = PollOption;