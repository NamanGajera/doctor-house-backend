'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GeoCoordinate extends Model {
    static associate(models) {
      GeoCoordinate.belongsTo(models.Area, {
        foreignKey: "areaId",
        onDelete: "CASCADE"
      });
    }
  }
  GeoCoordinate.init({
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false
    },
    label: {
      type: DataTypes.STRING
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'GeoCoordinate',
  });
  return GeoCoordinate;
};
