'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        as: 'user',
        foreingKey: 'userId',
      });
    }
  };
  Order.init({
    userId: DataTypes.INTEGER,
    ammount: DataTypes.DECIMAL,
    shippingAddress: DataTypes.STRING,
    referenceAddress: DataTypes.STRING,
    fullName: DataTypes.STRING,
    info: DataTypes.JSON,
    orderEmail: DataTypes.STRING,
    orderDate: DataTypes.DATE,
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
  return Order;
};