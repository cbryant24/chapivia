const io = require('socket.io')();
const CronJob = require('cron').CronJob;

new CronJob('*/1 11-21 * * 1-5', () => {
  io.emit('gameStatus', true);
}, null, true, 'America/Los_Angeles');

new CronJob('*/1 15-21 * * 1-5', () => {
  io.emit('displayTriviaAnswer', true);
}, null, true, 'America/Los_Angeles');

new CronJob('*/1 21-23 * * 1-5', () => {
  io.emit('gameStatus', false);
}, null, true, 'America/Los_Angeles');

new CronJob('*/1 21-23 * * 1-5', () => {
  io.emit('displayTriviaAnswer', false);
}, null, true, 'America/Los_Angeles');

io.listen(3500);

console.log('Chat Server Running Port: 3500');
