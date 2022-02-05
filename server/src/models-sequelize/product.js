'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Product.belongsTo(models.Category, {
				as: 'category',
				foreingKey: 'categoryId',
			});
			Product.belongsToMany(models.ProductsSection, { 
				through: models.Products_ProductsSection,
				foreignKey: 'productId'
			});
		}
	};

	Product.init({
		sku: DataTypes.STRING,
		name: DataTypes.STRING,
		price: DataTypes.DECIMAL(20, 2),
		description: DataTypes.TEXT('long'),
		thumbnail: DataTypes.STRING,
		images: {
			type: DataTypes.TEXT('long'),
			get() {
				const rawValue = this.getDataValue('images');
				return rawValue ? rawValue.split(';') : null;
			},
			set(val) {
				return this.setDataValue('images', val.join(';'));
			},
		},
		state: DataTypes.STRING,
		infoHelper: DataTypes.TEXT('long'),
		condition: DataTypes.STRING,
		link: DataTypes.TEXT('long'),
		categoryId: DataTypes.INTEGER,
		stock: DataTypes.INTEGER,
		createdAt: DataTypes.DATE(6),
		updatedAt: DataTypes.DATE(6),
		deletedAt: DataTypes.DATE(6),
	}, {
		sequelize,
		modelName: 'Product',
		timestamps: true,
		paranoid: true,
	});
	return Product;
};