'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Slide.init({
    image: DataTypes.STRING,
    isCurrentSelected: DataTypes.BOOLEAN,
    order: DataTypes.INTEGER,
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6),
    deletedAt: DataTypes.DATE(6),
  }, {
    sequelize,
    modelName: 'Slide',
    timestamps: true,
		paranoid: true,
  });
  return Slide;
};