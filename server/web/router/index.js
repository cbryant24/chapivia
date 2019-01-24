const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const { auth, users, trivia } = require('./api');
const router = express.Router();

router.use(bodyParser.json({ type: '*/*'}));

router.post('/api/signin', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) return res.status(422).send({error: 'There was an error logging in, please try again' });
    
    if (!user) return res.status(501).send({error: 'Invalid email or password'});
    
    auth.post.Authentication.signin(user, res);
  })(req, res, next);
});

router.post('/api/signup', auth.post.Authentication.signup);

router.get('/api/users', async (req, res, done) => {
  try {
    const players = await users.get.allUsers();
    res.status(200).send(players);
  } catch(e) {
    console.log('what is the error in the signup route', e);
    //TODO add descriptive error handling and winston logging or error for router data retrieval error
    // throw new AppError();
    debugger
  }
});

router.get('/api/daily_trivia', async (req, res, done) => {
  try {
    const dailyTrivia = await trivia.get.dailyTrivia();
    res.status(200).send(dailyTrivia);
  } catch(e) {
    //TODO add descriptive error handling and winston logging or error for router data retrieval error
    // throw new AppError();
    console.log('this is error from daily trivia', e)
  }
});

router.post('/api/player_guess', async (req, res, done) => {
  const { playerGuessData } = req.body;
  try {
  const recorded = await users.post.userGuess(playerGuessData);

  if (!recorded) return res.status(501).send('There was an error recording player guess')
  res.status(200).send('success');
  } catch(e) {
    //TODO add descriptive error handling and winston logging or error for router data retrieval error
    throw new AppError();
  }
});

router.get('/api/player_scores', async (req, res, done) => {
  try {
    const scores = await users.get.userScores();
    res.status(200).send(scores);
  } catch(e) {
    //TODO add descriptive error handling and winston logging or error for router data retrieval error
  }
});

router.get('/api/current_guesses', async (req, res, done) => {
  try {
    const todaysGuesses = await users.get.currentUserGuesses();
    res.status(200).send(todaysGuesses);
  } catch(e) {
    //TODO add descriptive error handling and winston logging or effor for router data retrieval error
  }
});

router.get('/api/correct_guesses', async (req, res, done) => {
  try {
    const correctUserGuesses = await users.get.correctUserGuesses();
    res.status(200).send(correctUserGuesses);
  } catch(e) {
    //TODO add descriptive error handling and winston logging for /api/correct_guesses route
  }
})

router.use( express.static( `${__dirname}/../../../build` ) );

router.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../../../build/index.html'));
});

module.exports = router;