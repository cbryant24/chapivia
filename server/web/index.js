const app = require('./server');
const winston = require('winston');
const cors = require('cors');
const bodyParser = require('body-parser');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  silent: false,
  level: 'verbose'
});
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));

const port = 4000;
console.log('am i running on this port', port)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
