'use strict';
const bcrypt = require('bcrypt-nodejs');


module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
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
  });
  User.associate = function (models) {
    // associations can be defined here
  }
  User.prototype.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatched) {
      console.log('am i getting to the bcrypt')
      // err = 'bcrypt acting crazy over here'
      if (err) { return callback(err); }
  
      callback(null, isMatched);
    })
  }
  return User;
};
