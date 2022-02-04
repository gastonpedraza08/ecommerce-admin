'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
			'ProductsSections',
			[
				{
					name: 'Productos Destacados',
					order: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Lo ultimo de Apple',
					order: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Compra Xiaomi, Huawei y Mucho Más',
					order: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Accesorios para Celulares',
					order: null,
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
