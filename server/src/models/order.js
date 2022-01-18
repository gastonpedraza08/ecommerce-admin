'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  order.init({
    customerId: DataTypes.INTEGER,
    ammount: DataTypes.DECIMAL,
    shippingAddress: DataTypes.STRING,
    orderAddress: DataTypes.STRING,
    orderEmail: DataTypes.STRING,
    orderDate: DataTypes.STRING,
    orderStatus: DataTypes.STRING,
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6),
    deletedAt: DataTypes.DATE(6),
  }, {
    sequelize,
    modelName: 'Order',
    timestamps: true,
		paranoid: true,
  });
  return order;
};