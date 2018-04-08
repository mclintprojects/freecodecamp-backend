const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const config = require('./config')
const pollsRoutes = require('./routes/poll')
const userRoutes = require('./routes/user')

const app = express();

mongoose.connect('mongodb://fakey:password@ds247327.mlab.com:47327/mclint-mongo');
mongoose.Promise = global.Promise;

app.use(expressJwt({secret: config.jwt.secret}).unless({path: ['/users', '/users/auth']}));
app.use(bodyparser.json());
app.use(pollsRoutes);
app.use(userRoutes);

app.use(function(error, request, response, next){
  response.status(error.status || 401).send({error: error.message});
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
});
