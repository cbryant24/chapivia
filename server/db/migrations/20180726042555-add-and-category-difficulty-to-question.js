'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'question',
        'difficulty',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'question',
        'category',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('question', 'difficulty'),
      queryInterface.removeColumn('question', 'category')
    ];
  }
};
