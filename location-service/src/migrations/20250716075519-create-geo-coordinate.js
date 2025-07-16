'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GeoCoordinates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false
      },
      label: {
        type: Sequelize.STRING
      },
      areaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Areas",
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

    await queryInterface.addIndex('GeoCoordinates', ['areaId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('GeoCoordinates', ['areaId']);
    await queryInterface.dropTable('GeoCoordinates');
  }
};
