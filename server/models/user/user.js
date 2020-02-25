'use strict';
const bcrypt = require('bcrypt-nodejs');
const { keyBy, map } = require('lodash');
const AppError = require('../../error');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'user',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      gameLobby: DataTypes.STRING
    },
    {
      freezeTableName: true,
      hooks: {
        beforeCreate: async user => {
          return await bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              return err;
            }

            // hash (encrypt) our password using the salt
            return bcrypt.hash(user.password, salt, null, function(err, hash) {
              if (err) {
                return err;
              }
              // overwrite plain text password with encrypted password
              return (user.password = hash);
            });
          });
        }
      }
    }
  );

  User.associate = function(models) {
    User.hasMany(models.UserQuestionChoice);
  };

  User.prototype.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatched) {
      if (err) {
        return callback(err);
      }

      callback(null, isMatched);
    });
  };

  User.getPlayers = async function() {
    try {
      const users = await User.findAll();
      let players = users.map(user => ({
        name: user.name,
        id: user.id
      }));
      players = keyBy(players, 'name');
      return players;
    } catch (e) {
      //TODO: add descriptive error handling and winston logging or error
      throw new AppError();
    }
  };

  User.getUnguessedPlayers = async function() {
    try {
      const players = await this.findAll();
      const todaysGuesses = await this.todaysGuesses();
      const unguessedPlayers = [];
      players.map(player => {
        if (!todaysGuesses.some(guesser => guesser.id === player.id))
          unguessedPlayers.push(player);
      });

      return unguessedPlayers;
    } catch (e) {
      debugger;
      //TODO: add error handling for getting unguessed players
      throw new AppError();
    }
  };

  User.scores = async function(month = 'currentMonth') {
    const startOfMonth =
      month === 'prevMonth'
        ? moment()
            .subtract(1, 'months')
            .startOf('month')
            .toDate()
        : moment()
            .startOf('month')
            .toDate();

    const endOfMonth =
      month === 'prevMonth'
        ? moment()
            .subtract(1, 'months')
            .endOf('month')
            .toDate()
        : moment()
            .endOf('month')
            .toDate();
    //TODO: Update to pull only through association with joined table and only pull 3 for winner?
    try {
      const userCorrectGuessesScore = await this.findAll({
        include: [
          {
            model: this.associations.userQuestionChoices.target,
            where: {
              isCorrect: true,
              updatedAt: {
                [Op.between]: [startOfMonth, endOfMonth]
              }
            }
          }
        ]
      });
      userCorrectGuessesScore.forEach(userCorrectGuess => {
        userCorrectGuess.score = userCorrectGuess.userQuestionChoices.length;
      });
      userCorrectGuessesScore.sort((a, b) => b.score - a.score);

      if (month === 'prevMonth') {
        const determineTopThree = () => {
          let topThreeCutoff = 3;

          //DETERMINING IF THERE IS A TIE FOR 3rd PLACE AND HOW MANY
          userCorrectGuessesScore.some((user, idx) => {
            if (idx < 2) return false;

            if (user.score === userCorrectGuessesScore[idx + 1].score)
              return false;

            topThreeCutoff = idx + 1;

            return true;
          });
          userCorrectGuessesScore.splice(topThreeCutoff);
        };

        if (userCorrectGuessesScore.length > 3) determineTopThree();
      }

      return userCorrectGuessesScore;
    } catch (e) {
      //TODO: add error handling for player scores retrieval
      console.log(e);
    }
  };

  User.todaysGuesses = async function() {
    const startOfToday = moment()
      .startOf('day')
      .toDate();

    try {
      const todaysGuesses = await this.findAll({
        include: [
          {
            model: this.associations.userQuestionChoices.target,
            where: {
              createdAt: {
                [Op.gte]: startOfToday
              }
            }
          }
        ]
      });

      return todaysGuesses;
    } catch (e) {
      debugger;
      //TODO: add error handling for player scores retrieval
      console.log(e);
    }
  };

  User.correctGuesses = async function() {
    const currentHour = moment().format('HH');
    const dayOfWeek = new Date().getDay();

    const startOfToday = moment()
      .startOf('day')
      .toDate();
    const endOfToday = moment()
      .endOf('day')
      .toDate();
    const startOfPreviousGameDate = moment()
      .add(`${dayOfWeek === 1 ? -3 : -1}`, 'day')
      .startOf('day')
      .toDate();
    const endOfPreviousGameDate = moment()
      .add(`${dayOfWeek === 1 ? -3 : -1}`, 'day')
      .endOf('day')
      .toDate();

    try {
      const correctGuesses = await this.findAll({
        include: [
          {
            model: this.associations.userQuestionChoices.target,
            where: {
              isCorrect: true,
              updatedAt: {
                [Op.between]:
                  currentHour >= 18
                    ? [startOfToday, endOfToday]
                    : [startOfPreviousGameDate, endOfPreviousGameDate]
              }
            }
          }
        ]
      });
      return correctGuesses;
    } catch (e) {
      debugger;
      //TODO: add error handling for player scores retrieval
      console.log(e);
    }
  };

  User.prevMonthWinners = async function() {
    return this.scores('prevMonth');
  };

  return User;
};
