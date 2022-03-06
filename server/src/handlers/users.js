const jwt = require('jsonwebtoken');
const {
	sendEmailAccountActivation,
	sendEmailResetPassword
} = require('../services/external/emailSender');

const repository = require('../services/repositories/users');


const register = async (email, token) => {
	let isSendedEmail = await sendEmailAccountActivation(email, token);
	return isSendedEmail;
}

const getUserByEmail = async email => {
	const user = await repository.getByEmail(email);
	return user;
};

const getUserById = async id => {
	const user = await repository.getById(id);
	return user;
};

const getUserByResetPasswordLink = async resetPasswordLink => {
	const user = await repository.getByResetPasswordLink(resetPasswordLink);
	return user;
};

const getUserByEmailWithSoftdelete = async email => {
	const user = await repository.getByEmailWithSoftdelete(email);
	return user;
};

const createUser = async (newUser, token) => {
	const user = await repository.persist(newUser);
	await sendEmailAccountActivation(newUser.email, token);
	return user;
};

const updateUser = async data => {
	const result = await repository.update(data);
}

const deleteUserByEmail = async email => {
	const result = await repository.deleteByEmail(email);
}

const getUsers = async params => {
	const users = await repository.getUsers(params);
	return users;
};

module.exports = {
	getUserByEmailWithSoftdelete,
	getUserByEmail,
	getUserByResetPasswordLink,
	createUser,
	updateUser,
	getUserById,
	deleteUserByEmail,
	getUsers
};