const Datastore = require('nedb');
const dateFormat = require('dateformat');
const { promisify } = require('util');

const db = new Datastore();
Datastore.prototype.find = promisify(Datastore.prototype.find)
Datastore.prototype.insert = promisify(Datastore.prototype.insert)

Datastore.prototype.addTrivia = async data => {
  const gameDate = dateFormat('yyyy-mm-dd');
  
  const doc = {trivia: data, gameDate};

  
  try {
    const memoryInsert = await db.insert(doc);
  } catch(e) {
    //TODO add trivia data memory insert error handling
    debugger
  }
}

Datastore.prototype.addGameStatus = async data => {
  const gameDate = dateFormat('yyyy-mm-dd');

  const doc = { gameStatus: data, gameDate };
  
  try {
    const memoryInsert = await db.insert(doc);
  } catch(e) {
    //TODO add trivia data memory insert error handling
    debugger
  }
}

module.exports = {
  db
}
