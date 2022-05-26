const repository = require('../services/repositories/orders');
const userRepository = require('../services/repositories/users');

const getOrders = async (params) => {
	const orders = await repository.getOrders(params);
	return orders;
};

const createOrder = async orderToPersist => {
	const order = await repository.persist(orderToPersist);
	let userId = orderToPersist.userId;
	let products = orderToPersist.info.products;
	let user = await userRepository.getById(userId);
	const result = await userRepository.update(userId, {
		info: {
			...user.info,
			productsInCart: [],
			pendingShipments: products,
		}
	});
	return order;
};

module.exports = {
	getOrders,
	createOrder,
};