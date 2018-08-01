require('module-alias/register');


const { promisify } = require('util');
const fs = require('fs');
const { Questions, QuestionChoices } = require('@models');


const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);


let triviaCategories;
let triviaFiles = {};
let triviaRoot = './server/db/data/trivia_questions/';
let triviaQuestions = [];

( async function () {
  try {
    triviaCategories = await readDirAsync(triviaRoot);

    for (const category of triviaCategories) {
      triviaFiles[category] = await readDirAsync(`${triviaRoot}/${category}`)
    }
    for (triviaCategory in triviaFiles) {
      for ( const file of triviaFiles[triviaCategory]) {
        const { results: trivia } = JSON.parse( await readFileAsync(`${triviaRoot}/${triviaCategory}/${file}`));
        triviaQuestions.push(...trivia);
      }
    }
    debugger

    for (const trivia of triviaQuestions) {
      Questions.create()
    }

    
  } catch(err) {
    console.log(err);
    debugger
  }
})();

debugger