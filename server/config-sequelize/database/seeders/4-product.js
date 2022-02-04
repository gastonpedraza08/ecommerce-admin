'use strict';
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

let realDirname = __dirname.replace('seeders', 'static/products');

let fullArr = [];

fs.readdirSync(realDirname).forEach((file, i) => {
  const { myArray } = require(path.join(realDirname, file));
  fullArr.push(...myArray);
});



module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Products',
			fullArr,
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
	}
};
