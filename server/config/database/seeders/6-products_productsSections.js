'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Products_ProductsSections',
			[
			//PRODUCTOS DESTACADOS
				{
					productId: 3,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 11,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 21,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 41,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 71,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 81,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 91,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 8,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 22,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 16,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 92,
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 32, //motorola g30
					productsSectionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				//LO ULTIMO DE APPLE
				{
					productId: 21,
					productsSectionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 22,
					productsSectionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 23,
					productsSectionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 24,
					productsSectionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 25,
					productsSectionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 26,
					productsSectionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 27,
					productsSectionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 28,
					productsSectionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 29,
					productsSectionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 30,
					productsSectionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				//Compra Xiaomi, Huawei y Mucho Más
				{
					productId: 12,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 82,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 42,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 13,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 83,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 100,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 14,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 44,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 15,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 46,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 84,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 17,
					productsSectionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				//Accesorios para Celulares
				{
					productId: 51,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 52,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 53,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 54,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 55,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 56,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 57,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 58,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 59,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 60,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 61,
					productsSectionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: 62,
					productsSectionId: 4,
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
	}
};
