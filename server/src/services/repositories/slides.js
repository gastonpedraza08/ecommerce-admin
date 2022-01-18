const { Slide } = require('../../models');
const { sequelize } = require('../../models');

const getSlides = async (params, conditions) => {
	const result = await Slide.findAndCountAll({
		limit: params.limit,
		offset: params.from,
		order: [[params.orderBy, params.order]],
		where: {
			...conditions
		}
	});
	return result;
};

const persist = async slideToPersist => {
	const result = await Slide.Create(slideToPersist, { returning: ['id', 'image'] })
	return result;
};

const update = async (slideToUpdate, fieldsToUpdate) => {
	const result = await Slide.update(fieldsToUpdate, {
		where: {
			id: slideToUpdate
		}
	});
	return result;
};

const addToCurrent = async (slideToUpdate, isCurrentSelected) => {
	return sequelize.transaction(function(t) {
		return Slide.count({
			where: { isCurrentSelected },
			transaction: t
		})
			.then((count) => {
				if (count + slideToUpdate.length <= 10) {
					return Slide.update({ isCurrentSelected }, {
						where: {
							id: slideToUpdate
						}
					}, { transaction: t })
				}
			});
	});
};

const destroy = async slideToDelete => {
	const result = await Slide.destroy({
		where: {
			id: slideToDelete
		}
	});
	return result;
};

module.exports = {
	getSlides,
	persist,
	addToCurrent,
	update,
	destroy
};