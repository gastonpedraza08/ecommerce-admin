const { User, Role, Sequelize } = require('../../models-sequelize');

const getByEmail = async email => {
	const result = await User.findOne({
		include: [{
			model: Role,
			required: true,
			as: 'role'
		}],
		where: { email }
	});
	return result;
};

const getById = async id => {
	const result = await User.findOne({
		include: [{
			model: Role,
			required: true,
			as: 'role'
		}],
		where: { id }
	});
	return result;
};

const getByResetPasswordLink = async resetPasswordLink => {
	const result = await User.findOne({
		where: { resetPasswordLink },
	});
	return result;
};

const getByEmailWithSoftdelete = async email => {
	const result = await User.findOne({
		include: [{
			model: Role,
			required: true,
			as: 'role'
		}],
		where: { email },
		paranoid: false
	});
	return result;
};

const getUserByIdWithSoftdelete = async id => {
	const result = await User.findOne({
		include: [{
			model: Role,
			required: true,
			as: 'role'
		}],
		where: { id },
		paranoid: false
	});
	return result;
};

const persist = async user => {
	const result = await User.create(user, {
		include: [{
			model: Role,
			required: true,
			as: 'role'
		}],
	});
	return result;
};

const deleteByEmail = async email => {
	await User.destroy({
		where: {
			email
		},
		force: true
	});
};

const bulkDeleteUsers = async ids => {
	const result = await User.destroy({
		where: {
			id: ids
		},
		force: true
	});
}

const getUsers = async (params, search) => {

	let fullCondition = {};


	if (search.deletedAt === "Deshabilitado") {
		fullCondition.deletedAt = {
			[Sequelize.Op.not]: null		
		}
	} else if (search.deletedAt === "Verificado") {
		fullCondition.deletedAt = {
			[Sequelize.Op.is]: null		
		}
	}

	delete search.deletedAt;

	for (let prop in search) {
		fullCondition[prop] = {
			[Sequelize.Op.like]: `%${search[prop]}%`
		}
	}


	const result = await User.findAndCountAll({
		limit: params.limit,
		offset: params.from,
		order: [[params.orderBy, params.order]],
		include: [{
			model: Role,
			required: true,
			as: 'role'
		}],
		paranoid: false,
		where: {
      ...fullCondition
    },
	});
	return result;
};

const update = async (userToUpdate, fieldsToUpdate) => {
	const result = await User.update(fieldsToUpdate, {
		where: {
			id: userToUpdate
		}
	});
	return result;
};



module.exports = {
	getByEmailWithSoftdelete,
	getByEmail,
	persist,
	getByResetPasswordLink,
	getById,
	deleteByEmail,
	getUsers,
	update,
	bulkDeleteUsers,
	getUserByIdWithSoftdelete,
};