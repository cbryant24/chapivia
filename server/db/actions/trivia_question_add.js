const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const { Question, QuestionChoice } = require('../../models');

const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

let triviaCategories;
let triviaFiles = {};
let triviaRoot = 'db/data/trivia_questions/';
let triviaQuestions = [];
debugger
try {
  ( async function () {
    console.log('Starting db question add');
    debugger
    try {
      triviaCategories = await fs.promises.readdir(triviaRoot);
      debugger
      for (const category of triviaCategories) {
        triviaFiles[category] = await readDirAsync(`${triviaRoot}/${category}`)
      }
      for (triviaCategory in triviaFiles) {
        for ( const file of triviaFiles[triviaCategory]) {
          const { results: trivia } = JSON.parse( await readFileAsync(`${triviaRoot}/${triviaCategory}/${file}`));
          triviaQuestions.push(...trivia);
        }
      }
      
      for (const trivia of triviaQuestions) {
        let isCreated = await QuestionChoice.create({
          correctChoice: trivia.correct_answer,
          incorrectChoiceOne: trivia.incorrect_answers[0],
          incorrectChoiceTwo: trivia.incorrect_answers[1],
          incorrectChoiceThree: trivia.incorrect_answers[2],
          question: {
            question: trivia.question,
            is_used: false,
            difficulty: trivia.difficulty,
            category: trivia.category
          }
        }, {
          include: Question,
        })
      }

      console.log('done adding db questions');
    } catch(err) {
      console.log(err);
    }
  })()
} catch(e) {
  console.log('There was an error adding db questions', e);
}

