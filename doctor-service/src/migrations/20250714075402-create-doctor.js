"use strict";
/** @type {import('sequelize-cli').Migration} */

const { Enums } = require("../utils/common");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Doctors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fullName: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      surname: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: Sequelize.ENUM,
        values: Object.values(Enums.GENDER),
        defaultValue: Enums.GENDER.MALE,
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      likeCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5
        }
      },
      experience: {
        type: Sequelize.INTEGER,
        default: 0,
      },
      // Add inside up() after 'qualifications':
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Countries",
          key: "id"
        },
        onDelete: "SET NULL",
      },

      stateId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "States",
          key: "id"
        },
        onDelete: "SET NULL",
      },

      cityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Cities",
          key: "id"
        },
        onDelete: "SET NULL",
      },

      pincodeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Pincodes",
          key: "id"
        },
        onDelete: "SET NULL",
      },

      areaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Areas",
          key: "id"
        },
        onDelete: "SET NULL",
      },

      addressLine: {
        type: Sequelize.STRING,
        allowNull: true
      },

      qualifications: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Doctors");
  },
};
