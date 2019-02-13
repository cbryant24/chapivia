'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'question',
      'dateUsed',
      Sequelize.DATEONLY
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'question',
      'dateUsed'
    );
  }
};
