"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common");

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsTo(models.User, {
        foreignKey: "patientId",
        onDelete: "CASCADE",
      });
    }
  }
  Patient.init(
    {
      fullName: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      surname: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: DataTypes.ENUM,
        values: Object.values(Enums.GENDER),
        defaultValue: Enums.GENDER.MALE,
      },
      profilePic: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
