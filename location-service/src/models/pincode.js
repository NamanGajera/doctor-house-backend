'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pincode extends Model {
    static associate(models) {
      Pincode.belongsTo(models.City, {
        foreignKey: "cityId",
        onDelete: "CASCADE"
      });

      Pincode.hasMany(models.Area, {
        foreignKey: "pincodeId",
        onDelete: "CASCADE"
      });
    }
  }
  Pincode.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pincode',
  });
  return Pincode;
};
