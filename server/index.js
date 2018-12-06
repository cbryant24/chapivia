require('module-alias/register');

const type = process.env.PROCESS_TYPE || 'web';
const db_action = process.env.db_action;

if (type === 'web') {
  require('./web');
} 

if (db_action === 'trivia_db_add') {
  require('./db/actions/trivia_question_add');
}
