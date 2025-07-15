"use strict";
const { Model } = require("sequelize");

const { Enums } = require("../utils/common");

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.hasMany(models.DoctorLikes, {
        foreignKey: "doctorId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      Doctor.belongsToMany(models.Specialization, {
        through: "DoctorSpecializations",
        foreignKey: "doctorId",
        otherKey: "specializationId",
        as: "specialization",
        onDelete: "CASCADE",
      });
    }
  }
  Doctor.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
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
        unique: true,
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
      likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      experience: {
        type: DataTypes.INTEGER,
        default: 0,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5
        }
      },
      qualifications: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
