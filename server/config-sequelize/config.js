require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		logging: console.log,
		seederStorage: 'sequelize',
		seederStorageTableName: 'seeds',
		migrationStorage: 'sequelize',
		migrationStorageTableName: 'migrations',
		environment: 'DEV',
		dialectOptions: {
			timezone: "local",
			dateStrings: true,
			typeCast: true,
		},
		timezone: 'America/Buenos_Aires',
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'mysql',
		environment: 'TEST',
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'mysql',
		environment: 'PROD',
	},
};