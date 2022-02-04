'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Slides', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			image: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			isCurrentSelected: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			order: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE(6)
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE(6)
			},
			deletedAt: {
				type: Sequelize.DATE(6),
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Slides');
	}
};