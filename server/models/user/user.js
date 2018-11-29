'use strict';
const bcrypt = require('bcrypt-nodejs');
const { keyBy } = require('lodash');
const AppError = require('@error');


module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    freezeTableName: true,
    hooks: {
      beforeCreate: ( async (user) => {
        return await bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return err
          };

          // hash (encrypt) our password using the salt
          return bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
              return err
            };
            // overwrite plain text password with encrypted password
            return user.password = hash;
          });
        })
      })
    }
  },);
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Question, {through: 'userQuestionChoice'});
  }
  User.prototype.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatched) {
      if (err) { return callback(err); }
  
      callback(null, isMatched);
    })
  }

  User.prototype.getPlayers = async function() {
    try {
      const users = await User.findAll();
      let players = users.map( user => ({name: user.name, id: user.id}));
      players = keyBy(players, 'name'); 
      return players
    } catch(e) {
      //TODO add descriptive error handling and winston logging or error
      throw new AppError();
    }
  }
  return User;
};
