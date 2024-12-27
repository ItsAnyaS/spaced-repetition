'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validate email format
      },
    });

    await queryInterface.addColumn('Users', 'emailAppPassword', {
      type: Sequelize.STRING,
      allowNull: false, // App password may be optional initially
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'email');
    await queryInterface.removeColumn('Users', 'emailAppPassword');
  },
};
