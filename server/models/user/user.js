'use strict';
const bcrypt = require('bcrypt-nodejs');
const { keyBy, map } = require('lodash');
const AppError = require('../../error');
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
    const tomorrowsDate = moment().add(1, 'day').toDate();
    const yesterDaysDate = moment().add(-1, 'day').toDate();
    const startOfMonth = moment().startOf('month').toDate();

    try {
      const userCorrectGuesses = await this.findAll({
        include: [{ 
          model: this.associations.userQuestionChoices.target,
          where: {
            isCorrect: true,
            updatedAt: {
              $between: currentHour >= 17 ?  
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
    const currentHour = moment().format('HH');
    const dayOfWeek = new Date().getDay();
    const todaysDate = moment().format('YYYY-MM-DD');
    const previousGameDate = dayOfWeek === 1 ? 
      moment().add(-3, 'day').format('YYYY-MM-DD') : moment().add(-1, 'day').format('YYYY-MM-DD');
    
    try { 
      const correctGuesses = await this.findAll({
        include: [{
          model: this.associations.userQuestionChoices.target,
          where: {
            isCorrect: true,
            updatedAt: {
              gte: currentHour >= 17 ? todaysDate : previousGameDate
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