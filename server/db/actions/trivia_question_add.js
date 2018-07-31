require('module-alias/register');


const { promisify } = require('util');
const fs = require('fs');
const { Questions } = require('@models');


const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

let questionDir;
let qestionFile;

( async function () {
  try {
    questionDir = await readDirAsync('./server/db/data/trivia_questions');
    debugger
  } catch(err) {
    console.log(err);
  }
})();

( async function () {
  try {
    questionFile = await readFileAsync('./server/db/data/trivia_questions/test');
    debugger
  } catch(err) {
    console.log(err);
    debugger
  }
})();