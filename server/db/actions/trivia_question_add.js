require('module-alias/register');


const { promisify } = require('util');
const fs = require('fs');
const { Questions } = require('@models');


const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

let triviaCategories;
let triviaFiles = {};
let triviaRoot = './server/db/data/trivia_questions/';

( async function () {
  try {
    triviaCategories = await readDirAsync(triviaRoot);
    triviaCategories.forEach( await function (category) {
      debugger
      triviaFiles[category] = readDirAsync(`${triviaRoot}/${category}`)
      //https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
    })
    Promise.all(triviaFiles)
    debugger
  } catch(err) {
    console.log(err);
  }
})();

( async function () {
  try {
    // questionFile = questionDir.forEach()
    
    // JSON.parse( await readFileAsync(`./server/db/data/trivia_questions/test/testQuestions.json`));
    debugger
  } catch(err) {
    console.log(err);
    debugger
  }
})();

debugger