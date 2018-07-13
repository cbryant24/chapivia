const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const cors = require('cors')
const sequelize = require('./models');

//DB setup
debugger
const User = sequelize.User;
// User.create({ name: 'kid', email: 'cudi@indicud.com', password: 'xyz12345' })
//   .then(() => User.findOrCreate({where: {name: 'kid'}}))
//   .spread((user, created) => {
//     debugger
//     console.log(user.get({
//       plain: true
//     }))
//     console.log(created)

//     /*
//     In this example, findOrCreate returns an array like this:
//     [ {
//         username: 'fnord',
//         job: 'omnomnom',
//         id: 2,
//         createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
//         updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
//       },
//       false
//     ]
//     The array returned by findOrCreate gets spread into its 2 parts by the "spread" on line 69, and the parts will be passed as 2 arguments to the callback function beginning on line 69, which will then treat them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "false".)
//     */
//   })

User.findAll().then( users => {
  debugger
  console.log('hello')
})

//App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port)