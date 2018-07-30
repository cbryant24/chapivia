'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'Questions',
        'difficulty',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'Questions',
        'categroy',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Questions', 'difficulty'),
      queryInterface.removeColumn('Questions', 'category')
    ];
  }
};
