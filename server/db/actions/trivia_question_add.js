require('module-alias/register');


const { promisify } = require('util');
const fs = require('fs');
const { Questions } = require('@models');


const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);


let triviaCategories;
let triviaFiles = {};
let triviaRoot = './server/db/data/trivia_questions/';
let testRoot = './server/db/data/trivia_questions/test';

( async function () {
  try {
    // triviaCategories = await readDirAsync(triviaRoot);

    // for (const category of triviaCategories) {
    //   triviaFiles[category] = await readDirAsync(`${triviaRoot}/${category}`)
    // }

    triviaTestCategories = await readDirAsync(testRoot);

    // let vals = JSON.parse( await readFileAsync('./server/db/data/trivia_questions/test/testQuestions.json'))
    // debugger
    // for ()


    debugger
  } catch(err) {
    console.log(err);
    debugger
  }
})();

( async function () {
  try {
    // questionFile = questionDir.forEach()
    
    // JSON.parse( await readFileAsync(`./server/db/data/trivia_questions/test/testQuestions.json`));
    // debugger
  } catch(err) {
    console.log(err);
    debugger
  }
})();

// debugger