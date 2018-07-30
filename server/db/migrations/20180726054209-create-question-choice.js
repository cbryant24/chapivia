'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QuestionChoices', {
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
          model: 'Questions',
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
    return queryInterface.dropTable('QuestionChoices');
  }
};