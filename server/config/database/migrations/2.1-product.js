'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			sku: {
				type: Sequelize.STRING,
				unique: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			price: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT('long'),
				allowNull: false,
			},
			thumbnail: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			images: {
				type: Sequelize.TEXT('long'),
				allowNull: false,
			},
			categoryId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Categories',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			stock: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			state: {
				type: Sequelize.STRING,
				defaultValue: "activo",
				allowNull: false,
			},
			infoHelper: {
				type: Sequelize.TEXT('long'),
				allowNull: false,
			},
			condition: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			link: {
				type: Sequelize.TEXT('long'),
				allowNull: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE(6),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE(6),
			},
			deletedAt: {
				type: Sequelize.DATE(6),
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		//await queryInterface.dropTable('OrderDetails');
		await queryInterface.dropTable('Products');
	}
};