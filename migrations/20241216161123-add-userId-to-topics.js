'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Topics', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1, // Make this `true` if you want it optional
      references: {
        model: 'Users', // Assumes you have a `Users` table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // Or 'CASCADE' if you want to delete topics when a user is deleted
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Topics', 'userId');
  },
};
