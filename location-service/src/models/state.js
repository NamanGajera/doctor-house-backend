'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      State.belongsTo(models.Country, {
        foreignKey: "countryId",
        onDelete: "CASCADE"
      });

      State.hasMany(models.City, {
        foreignKey: "stateId",
        onDelete: "CASCADE",
      });
    }
  }
  State.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'State',
  });
  return State;
};