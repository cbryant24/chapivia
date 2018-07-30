require('module-alias/register');

const express = require('express');
const bodyParser = require('body-parser');
const { auth: {post}, auth: {get} } = require('./api');
const passport = require('passport');
const router = express.Router();

router.use(bodyParser.json({ type: '*/*'}));

router.post('/api/signin', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) return res.status(422).send({error: 'There was an error logging in, please try again' });
    
    if (!user) return res.status(501).send({error: 'Invalid email or password'});
    
    post.Authentication.signin(user, res);
  })(req, res, next);
});

module.exports = router;