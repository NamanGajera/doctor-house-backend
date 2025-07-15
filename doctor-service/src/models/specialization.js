'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Specialization.belongsToMany(models.Doctor, {
        through: "DoctorSpecializations",
        foreignKey: "specializationId",
        targetKey: 'userId',
        otherKey: "doctorId",
        onDelete: "CASCADE",
      });
    }
  }
  Specialization.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Specialization',
  });
  return Specialization;
};