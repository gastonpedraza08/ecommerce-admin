'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  customer.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    billingAddress: DataTypes.STRING,
    defaultShippingAddress: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6),
    deletedAt: DataTypes.DATE(6),
  }, {
    sequelize,
    modelName: 'Customer',
    timestamps: true,
		paranoid: true,
  });
  return customer;
};