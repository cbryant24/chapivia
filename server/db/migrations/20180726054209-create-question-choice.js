'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questionChoice', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      correctChoice: {
        type: Sequelize.STRING
      },
      incorrectChoiceOne: {
        type: Sequelize.STRING
      },
      incorrectChoiceTwo: {
        type: Sequelize.STRING
      },
      incorrectChoiceThree: {
        type: Sequelize.STRING
      },
      questionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'question',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('questionChoice');
  }
};