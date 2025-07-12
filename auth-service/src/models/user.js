"use strict";
const { Model } = require("sequelize");

const { Enums } = require("../utils/common");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Patient, {
        foreignKey: "patientId",
        as: "patientData",
      });
      User.hasOne(models.Doctor, {
        foreignKey: "doctorId",
        as: "doctorData",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isProfileDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: Object.values(Enums.USER_ROLE),
        defaultValue: Enums.USER_ROLE.PATIENT,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
