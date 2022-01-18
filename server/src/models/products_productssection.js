'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Products_ProductsSection extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	Products_ProductsSection.init({
		productId: DataTypes.INTEGER,
		productsSectionId: DataTypes.INTEGER,
		createdAt: DataTypes.DATE(6),
		updatedAt: DataTypes.DATE(6),
		deletedAt: DataTypes.DATE(6),
	}, {
		sequelize,
		modelName: 'Products_ProductsSection',
		timestamps: true,
		paranoid: true,
	});
	return Products_ProductsSection;
};