'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename 'title' to 'subject'
    await queryInterface.renameColumn('Topics', 'title', 'subject');

    // Add a new column 'content'
    await queryInterface.addColumn('Topics', 'content', {
      type: Sequelize.STRING,
      allowNull: true, // Change to false if 'content' should be required
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert 'subject' back to 'title'
    await queryInterface.renameColumn('Topics', 'subject', 'title');

    // Remove the 'content' column
    await queryInterface.removeColumn('Topics', 'content');
  },
};