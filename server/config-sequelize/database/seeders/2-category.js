'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Categories',
			[
				{
					name: 'Celulares y Smartphones',
					description: 'Celulares y Smartphones',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Accesorios para Celulares',
					description: 'Accesorios para Celulares',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Cámaras y Accesorios',
					description: 'Cámaras Digitales, Accesorios para Cámaras',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Consolas y Videojuegos',
					description: 'Videojuegos, Para PlayStation Gamepads y Joystick, Consolas y Accesorios',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Computación',
					description: 'Componentes de PC, Impresión, Tablets y Accesorios, PC',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Electrónica, Audio y Video',
					description: 'Audio, Accesorios para Audio y Video, Componentes Electrónicos, Drones y Accesorios',
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
