const express = require('express');
const session = require('express-session');

const app = express();
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelizeConnection: sequelize } = require('../db');

const myStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 60 * 60 * 1000,
  expiration: 30 * 24 * 60 * 60 * 1000,
  autoReconnect: true
});

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: myStore
}));

//TODO: Add check for first time initialization
// sequelize.sync();
// myStore.sync();

module.exports = {
  app
}







// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const expressGraphQL = require('express-graphql');
// const session = require('express-session');
// const passport = require('passport');
// const path = require('path');
// const { sequelizeConnection: sequelize } = require('../../db');
// const app = express();

// const myStore = new SequelizeStore({
//   db: sequelize,
//   autoReconnect: true
// });

// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: 'aaabbbccc',
//   store: myStore
// }));

// app.use(passport.initialize());
// app.use(passport.session());