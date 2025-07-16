'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Areas', [
      { id: 1, name: 'Shilaj', pincodeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Science City', pincodeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Nikol', pincodeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Maninagar', pincodeId: 4, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Areas', null, {});
  }
};
