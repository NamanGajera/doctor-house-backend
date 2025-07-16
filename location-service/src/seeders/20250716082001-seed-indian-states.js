'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('States', [
      { id: 1, name: 'Gujarat', code: 'GJ', countryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Maharashtra', code: 'MH', countryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Rajasthan', code: 'RJ', countryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Uttar Pradesh', code: 'UP', countryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Punjab', code: 'PB', countryId: 1, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('States', null, {});
  }
};
