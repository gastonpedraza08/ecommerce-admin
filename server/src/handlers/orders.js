const repository = require('../services/repositories/orders');

const getOrders = async (params, conditions) => {
	const orders = await repository.getOrders(params, conditions);
	return orders;
};

const createOrder = async orderToPersist => {
	const order = await repository.persist(orderToPersist);
	return order;
};

module.exports = {
	getOrders,
	createOrder,
};