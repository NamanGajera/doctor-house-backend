'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cities', [
      { id: 1, name: 'Ahmedabad', stateId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Surat', stateId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Vadodara', stateId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Rajkot', stateId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Bhavnagar', stateId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Gandhinagar', stateId: 1, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
