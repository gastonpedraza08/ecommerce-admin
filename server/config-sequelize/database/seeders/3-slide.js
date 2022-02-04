'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Slides',
			[
				{
					image: 'https://imagenes.compufull.com/otros/32366_bannerX11615932942.jpeg',
					isCurrentSelected: 1,
					order: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					image: 'https://imagenes.compufull.com/otros/32366_bannerX21615932942.jpeg',
					isCurrentSelected: 1,
					order: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					image: 'https://imagenes.compufull.com/otros/32366_bannerX31615932942.jpeg',
					isCurrentSelected: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					image: 'https://imagenes.compufull.com/otros/32366_bannerX41615932942.jpeg',
					isCurrentSelected: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					image: 'https://imagenes.compufull.com/otros/32366_bannerX51615932942.jpeg',
					isCurrentSelected: 0,
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
