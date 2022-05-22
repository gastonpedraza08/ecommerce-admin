const { models: { Product } } = require('../../models-mongoose');
const { getFilterLine } = require('../../utils/productsFilters');

const getProducts = async (params, search) => {
	const { orderBy, limit, from, order } = params;

	let ord = order === 'DESC' ? -1 : 1;

	let fullCondition = {};

	for (let prop in search) {
		fullCondition[prop] = {
			$regex: search[prop], 
			$options: 'i'
		}
	}


	const rows = await Product
		.find(fullCondition)
		.sort({[orderBy]: ord})
		.limit(limit)
		.skip(from)
		.select({
			_id: 1,
			sku: 1,
			name: 1,
			price: 1,
			condition: 1,
			description: 1,
			marca: 1,
			categoryId: 1,
			stock: 1,
			state: 1,
			createdAt: 1,
		});
	const count = await Product
		.find(fullCondition)
		.count();
	const result = {
		count,
		rows
	}
	return result;
}

const getProductById = async productId => {
	const product = await Product.findOne({ _id: productId });
	return product;
}

const destroy = async productId => {
	const result = Product.deleteOne({ _id: productId });
	return result;
}

const bulkDeleteProducts = async ids => {
	const result = await Product.deleteMany({_id:{$in:ids}});
	return result;
}

const update = async (productId, fieldsToUpdate) => {
	const result = await Product.findOneAndUpdate({ _id: productId }, fieldsToUpdate);
	return result;
}

const persist = async product => {
	const result = await new Product(product).save();
	return result;
}

const searchProducts = async params => {
	const { search, limit, from, ...rest } = params;

	let fullConditions = {};	

	for (let prop in rest) {
		let newObj = getFilterLine(prop, rest);
		fullConditions = {
			...fullConditions,
			...newObj
		}
	}


	const result = await Product
		.find({ $text : { $search : search }, ...fullConditions }, { score: { $meta: "textScore" } })
		.select({ name: 1, description: 1, _id: 1, price: 1, thumbnail: 1 })
		.skip(from)
		.sort( { score: { $meta: "textScore" } } )
		.limit(limit);

	const count = await Product
		.find({ $text : { $search : search }, ...fullConditions }, { score: { $meta: "textScore" } })
		.count();

	return {
		rows: result,
		count,
		numberOfPages: Math.ceil(count / limit)
	}
}

const getProductsByIds = async ids => {
	const result = await Product.find({ '_id': { $in: ids } });
	return result;
}


module.exports = {
	getProducts,
	getProductById,
	destroy,
	update,
	persist,
	searchProducts,
	bulkDeleteProducts,
	getProductsByIds
}