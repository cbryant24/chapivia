// const express = require('express');
// const schema = require('./schema');
// const passport = require('passport');
// const path = require('path');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const expressGraphQL = require('express-graphql');

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

// app.use('/graphql', expressGraphQL({
//   schema,
//   graphiql: true
// }));

// myStore.sync();

// module.exports = app;

const { initializer } = require('./initializer');

module.exports = {
  initializer: initializer()
}