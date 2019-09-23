'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'userQuestionChoice',
      'guess',
      Sequelize.STRING
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'userQuestionChoice',
      'guess',
      Sequelize.STRING
    )
  }
};