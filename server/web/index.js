const app = require('./server');
const morgan = require('morgan');

app.use(morgan('combined'));

const port = process.env.PORT || 3090;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
