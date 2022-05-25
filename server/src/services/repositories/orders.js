const { Order } = require('../../models-sequelize');
const { sequelize } = require('../../models-sequelize');

const getOrders = async (params) => {
	const result = await Order.findAndCountAll({
		limit: params.limit,
		offset: params.from,
		order: [[params.orderBy, params.order]],
	});
	return result;
};

const persist = async orderToPersist => {
	const result = await Order.create(orderToPersist);
	return result;
};


module.exports = {
	getOrders,
	persist,
};