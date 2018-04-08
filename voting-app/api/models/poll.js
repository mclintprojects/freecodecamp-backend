const mongoose = require('mongoose')
const schema = mongoose.Schema;

const PollSchema = new schema({
  question: {
    type: String,
    required: true},
  author: {
    type:String,
    required: true},
  date: {
    type: Number,
    required: true}
});

const Poll = mongoose.model('poll', PollSchema);
module.exports = Poll;