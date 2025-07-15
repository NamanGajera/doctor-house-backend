'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("DoctorSpecializations", [
      {
        doctorId: 1,
        specializationId: 1, // Cardiologist
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        doctorId: 1,
        specializationId: 3, // Pediatrician
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        doctorId: 1,
        specializationId: 5, // Orthopedic Surgeon
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        doctorId: 2,
        specializationId: 2, // Dermatologist
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        doctorId: 2,
        specializationId: 6, // Psychiatrist
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        doctorId: 3,
        specializationId: 4, // Neurologist
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        doctorId: 3,
        specializationId: 7, // Oncologist
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        doctorId: 3,
        specializationId: 8, // Radiologist
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        doctorId: 3,
        specializationId: 10, // General Physician
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DoctorSpecializations", null, {});
  }
};
