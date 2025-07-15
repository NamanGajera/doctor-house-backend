'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Specializations", [
      { id: 1, name: "Cardiologist", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Dermatologist", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: "Pediatrician", createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: "Neurologist", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: "Orthopedic Surgeon", createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: "Psychiatrist", createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: "Oncologist", createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: "Radiologist", createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: "ENT Specialist", createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: "General Physician", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Specializations", null, {});
  }
};
