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
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			info: {
				type: Sequelize.JSON,
			},
			ammount: {
				type: Sequelize.DECIMAL,
				allowNull: false,
			},
			shippingAddress: {
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
			orderDate: {
				type: Sequelize.DATE,
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