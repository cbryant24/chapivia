// const app = require('../../web');
// const io = require('socket.io')(app);
// const CronJob = require('cron').CronJob;

// new CronJob('*/1 11-21 * * 1-5', () => {
//   io.emit('gameStatus', true);
// }, null, true, 'America/Los_Angeles');

// new CronJob('*/1 15-21 * * 1-5', () => {
//   io.emit('displayTriviaAnswer', true);
// }, null, true, 'America/Los_Angeles');

// new CronJob('*/1 21-23 * * 1-5', () => {
//   io.emit('gameStatus', false);
// }, null, true, 'America/Los_Angeles');

// new CronJob('*/1 21-23 * * 1-5', () => {
//   io.emit('displayTriviaAnswer', false);
// }, null, true, 'America/Los_Angeles');



// const startGameSocket = () => {
//   //TESTING SOCKET
//   new CronJob('*/1 01-21 * * 1-5', () => {
//     io.emit('gameStatus', true);
//     console.log('Chat Server Running Port: 3500');

//   }, null, true, 'America/Los_Angeles');
// };

// module.exports = startGameSocket;