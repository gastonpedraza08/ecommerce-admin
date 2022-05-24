'use strict';
const bcrypt = require('bcrypt');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Users', 
			[
				{
					firstName: 'Gastón',
					lastName: 'Pedraza',
					email: 'gp.ju.dev@gmail.com',
					password: bcrypt.hashSync('abcd1234', 10),
					avatarUrl: null,
					roleId: 1,
					info: JSON.stringify({
						productsInCart: []
					}),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
