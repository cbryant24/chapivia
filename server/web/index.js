const app = require('./server');
const winston = require('winston');
const cors = require('cors');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  silent: false,
  level: 'verbose'
});

app.use(cors());

const port = 4000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;