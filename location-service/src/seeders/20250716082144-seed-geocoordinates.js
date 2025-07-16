'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('GeoCoordinates', [
      {
        id: 1,
        latitude: 23.0678,
        longitude: 72.5086,
        areaId: 1,
        label: 'Shilaj Main Road',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        latitude: 23.0827,
        longitude: 72.5244,
        areaId: 2,
        label: 'Science City Center',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        latitude: 23.0463,
        longitude: 72.6620,
        areaId: 3,
        label: 'Nikol Lake',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        latitude: 23.0054,
        longitude: 72.5988,
        areaId: 4,
        label: 'Maninagar Bus Station',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GeoCoordinates', null, {});
  }
};
