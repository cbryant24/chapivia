const express = require('express')
const api = require('./api');

const router = express.Router();

// endpoints
router.get('/api/users', async (req, res) => {
  res.send( await api.users.get());
});

router.post('/api/signin', api.auth.post.requireSignin, api.auth.post.Authentication.signin);
router.post('/api/signup', api.auth.post.signup);

module.exports = router;