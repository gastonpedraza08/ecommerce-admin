'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductsSection.belongsToMany(models.Product, { 
				through: models.Products_ProductsSection,
				foreignKey: 'productsSectionId' 
			});
    }
  };
  ProductsSection.init({
    name: DataTypes.STRING,
    order: DataTypes.INTEGER,
    createdAt: DataTypes.DATE(6),
		updatedAt: DataTypes.DATE(6),
		deletedAt: DataTypes.DATE(6),
  }, {
    sequelize,
    modelName: 'ProductsSection',
		timestamps: true,
		paranoid: true,
  });
  return ProductsSection;
};