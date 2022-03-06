const { models: { Product } } = require('../../models-mongoose');
const { getFilterLine } = require('../../utils/productsFilters');

const getProducts = async params => {
	const { orderBy, limit, from, order } = params;

	let ord = order === 'DESC' ? -1 : 1;

	const result = await Product
		.find({})
		.sort({[orderBy]: ord})
		//.limit(limit)
		.skip(from)
		.select({ 
			_id: 1,
			sku: 1,
			name: 1,
			price: 1,
			condition: 1,
			description: 1,
			categoryId: 1,
			stock: 1,
			state: 1,
			createdAt: 1,
		});
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

const update = async (productId, fieldsToUpdate) => {
	const result = await Product.findOneAndUpdate({ _id: productId }, fieldsToUpdate);
	return result;
}

const persist = async product => {
	const result = await new Product(product).save();
	return result;
}

const searchProducts = async params => {
	const { search, limit, ...rest } = params;

	console.log(params);

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
		.sort( { score: { $meta: "textScore" } } )
		.limit(limit);

	return result;
}


module.exports = {
	getProducts,
	getProductById,
	destroy,
	update,
	persist,
	searchProducts,
}