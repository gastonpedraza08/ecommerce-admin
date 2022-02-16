'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class orderDetail extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	orderDetail.init({
		orderId: DataTypes.INTEGER,
		productId: DataTypes.STRING,
		price: DataTypes.DECIMAL,
		sku: DataTypes.STRING,
		quantity: DataTypes.INTEGER,
		createdAt: DataTypes.DATE(6),
	    updatedAt: DataTypes.DATE(6),
	    deletedAt: DataTypes.DATE(6),
	}, {
		sequelize,
		modelName: 'OrderDetail',
		timestamps: true,
		paranoid: true,
	});
	return orderDetail;
};