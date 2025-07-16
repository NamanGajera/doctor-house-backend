'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    static associate(models) {
      Area.belongsTo(models.Pincode, {
        foreignKey: "pincodeId",
        onDelete: "CASCADE"
      });

      Area.hasMany(models.GeoCoordinate, {
        foreignKey: "areaId",
        onDelete: "CASCADE"
      });
    }
  }
  Area.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pincodeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Area',
  });
  return Area;
};
