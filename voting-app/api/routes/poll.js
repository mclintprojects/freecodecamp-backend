const router = require('express').Router();
const { check, validationResult } = require('express-validator/check');
const Poll = require('../models/poll')
const PollOption = require('../models/poll-option')
const User = require('../models/user')
const PollVote = require('../models/poll-vote')
const errorFormatter = require('../errorFormatter')

router.get('/polls', async function(request, response){
  let polls = await Poll.find();
  response.send(polls);
});

router.get('/polls/:author', async function(request, response){
  let polls = await Poll.find({author: request.params.author});
  return response.send(polls);
});

router.get('/polls/:id/options', async function(request, response){
  let options = await PollOption.find({pollId: request.params.id});
  response.send(options);
});

router.post('/polls', 
		[check('author')
			.exists()
			.withMessage('Author is required'),
		check('question')
     .exists()
			.withMessage('Poll question is required')
	],async function(request, response, next){
  
  let errors = validationResult(request).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    next({status: 422, message: errors.mapped()});
  }
  else{
    let existingUser = await User.findOne({email: request.body.author});
    if(existingUser){
      request.body.date = new Date().getTime();
      let poll = await Poll.create(request.body);
      response.status(201).send(poll);
    }
    else{
      next({status: 404, message: 'Poll author does not exist'});
    }
  }
});

router.post('/polls/options', [check('optionText').exists().withMessage('Poll option text is required'), check('pollId').exists().withMessage('Poll id is required')], async function(request, response, next){
  let existingPoll = await Poll.findById(request.body.pollId);
  if(existingPoll){
    let option = await PollOption.create(request.body);
    response.status(201).send(option);
  }
  else{
    next({status: 404, message: 'Poll does not exist'});
  }
});

router.post('/polls/options/:id/vote', async function(request, response, next){
  let user = request.headers['x-forwarded-for'].split(',')[0];
  let vote = {user, pollOptionId: request.params.id};
  let existingVote = await PollVote.findOne(vote);
  
  if(existingVote){
    next({status: 403, message: 'You have already voted for this option'});
  }
  else{
    let option = await PollOption.findById(request.params.id);
    if(option){
      option.votes = option.votes + 1;
      await PollOption.update({votes: option.votes});
      
      PollVote.create(vote);
      response.send(option);
    }
    else{
      next({status: 404, message: 'Poll option does not exist'});
    }
  }
});

module.exports = router;