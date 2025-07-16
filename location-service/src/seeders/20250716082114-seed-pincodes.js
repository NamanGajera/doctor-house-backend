'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pincodes', [
      { id: 1, code: '380015', cityId: 1, createdAt: new Date(), updatedAt: new Date() }, // Shilaj
      { id: 2, code: '382350', cityId: 1, createdAt: new Date(), updatedAt: new Date() }, // Science City
      { id: 3, code: '382415', cityId: 1, createdAt: new Date(), updatedAt: new Date() }, // Nikol
      { id: 4, code: '380007', cityId: 1, createdAt: new Date(), updatedAt: new Date() }, // Maninagar
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pincodes', null, {});
  }
};
