'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Orders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			customerId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Customers',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			ammount: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
			shippingAddress: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			orderAddress: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			orderEmail: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			orderStatus: {
				type: Sequelize.STRING,
				allowNull: false,
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
		await queryInterface.dropTable('Orders');
	}
};