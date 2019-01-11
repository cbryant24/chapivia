'use strict';
const bcrypt = require('bcrypt-nodejs');
const { keyBy, map } = require('lodash');
const AppError = require('../../error');
const dateFormat = require('dateformat');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    freezeTableName: true,
    hooks: {
      beforeCreate: (async (user) => {
        return await bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return err
          };

          // hash (encrypt) our password using the salt
          return bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
              return err
            };
            // overwrite plain text password with encrypted password
            return user.password = hash;
          });
        })
      })
    }
  });

  User.associate = function (models) {
    User.hasMany(models.UserQuestionChoice);
  }

  User.prototype.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatched) {
      if (err) {
        return callback(err);
      }

      callback(null, isMatched);
    })
  }

  User.getPlayers = async function () {
    try {
      const users = await User.findAll();
      let players = users.map(user => ({
        name: user.name,
        id: user.id
      }));
      players = keyBy(players, 'name');
      return players
    } catch (e) {
      //TODO add descriptive error handling and winston logging or error
      throw new AppError();
    }
  }

  User.getUnguessedPlayers = async function() {
    try {
      const players = await this.findAll();
      const todaysGuesses = await this.todaysGuesses();

      const unguessedPlayers = [];
      players.map( player => {
        if( !todaysGuesses.some( guesser => guesser.id === player.id) )
        unguessedPlayers.push(player);
      });

      return unguessedPlayers;
    } catch(e) {
      debugger
      //TODO add error handling for getting unguessed players
      throw new AppError();
    }
  }
  

  User.scores = async function() {
    const currentHour = moment().format('HH');
    // const currentMonth = (date.getMonth() + 1);
    // const gameDate = dateFormat('yyyy-mm-dd');
    const tomorrowsDate = moment().add(1, 'day').toDate();
    const yesterDaysDate = moment().add(-1, 'day').toDate();
    const startOfMonth = moment().startOf('month').toDate();

    const gameDate   = moment().format();
      try {
        const userCorrectGuesses = await this.findAll({
          include: [{ 
            model: this.associations.userQuestionChoices.target,
            where: {
              isCorrect: true,
              updatedAt: {
                $between: currentHour >= 15 ?  
                  [startOfMonth, tomorrowsDate] : [startOfMonth, yesterDaysDate]
              }
            }
          }]
        });
        userCorrectGuesses.map( userCorrectGuess => {
          userCorrectGuess.score = userCorrectGuess.userQuestionChoices.length;
        });
        return userCorrectGuesses
      } catch (e) {
        debugger
        //TODO add error handling for player scores retrieval
        console.log(e);
      }
  }

  User.todaysGuesses = async function() {
    const gameDate = moment().startOf('day').toDate();
    
    try {
      const todaysGuesses = await this.findAll({
        include: [{ 
          model: this.associations.userQuestionChoices.target,
          where: {
            updatedAt: {
              $gte: gameDate
            }
          }
        }]
      });

      return todaysGuesses;
    } catch(e) {
      debugger
      //TODO add error handling for player scores retrieval
      console.log(e);
    }    
  }

  User.correctGuesses = async function() {
    const gameDate = dateFormat('yyyy-mm-dd');

    try { 
      const correctGuesses = await this.findAll({
        include: [{
          model: this.associations.userQuestionChoices.target,
          where: {
            isCorrect: true,
            updatedAt: {
              gte: gameDate
            }
          }
        }]
      });

      return correctGuesses;

    } catch(e) {
      debugger
      //TODO add error handling for player scores retrieval
      console.log(e);
    };
  }

  return User;
};