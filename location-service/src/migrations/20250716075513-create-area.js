'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pincodeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Pincodes",
          key: "id"
        },
        onDelete: "CASCADE"
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

    await queryInterface.addIndex('Areas', ['pincodeId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Areas', ['pincodeId']);
    await queryInterface.dropTable('Areas');
  }
};
