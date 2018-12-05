const { Question, QuestionChoice, Nedb } = require('../../../../models');
const triviaConfig = require('./triviaConfig');
const dateFormat = require('dateformat');

const { formatModel } = require('../helpers');

const dailyTrivia = async () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const gameDate = dateFormat('yyyy-mm-dd');
  let currentHour = new Date().getHours();

  if (currentHour < 11) return false

  try {
    const [ stored ] = await Nedb.db.find({ gameDate: gameDate });
    if ( stored ) return stored.trivia
  } catch(e) {
    //TODO add error handling for storing trivia in memory
    debugger
  }

  const trivia = formatModel( await QuestionChoice.findOne({
    include: [
      {model: Question,
      where: {
        category: triviaConfig[dayOfWeek],
        difficulty: 'medium',
        is_used: 'false'
      }}
    ]}), 'dailyTrivia');

  Nedb.db.addTrivia(trivia);

  return trivia;
};

module.exports = {
  dailyTrivia
}