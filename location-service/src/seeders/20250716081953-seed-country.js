'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Countries', [
      { id: 1, name: 'India', iso_code: 'IN', phone_code: '+91', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'United States', iso_code: 'US', phone_code: '+1', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Canada', iso_code: 'CA', phone_code: '+1', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'United Kingdom', iso_code: 'UK', phone_code: '+44', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Germany', iso_code: 'DE', phone_code: '+49', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Australia', iso_code: 'AU', phone_code: '+61', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};
