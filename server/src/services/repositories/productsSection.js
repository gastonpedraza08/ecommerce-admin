const { models: { ProductsSection } } = require('../../models-mongoose');
const { getFilterLine } = require('../../utils/commons');

const getProductsSections = async params => {
	const { orderBy, limit, from, order } = params;

	let ord = order === 'DESC' ? -1 : 1;

	const result = await ProductsSection
		.find({})
		.sort({[orderBy]: ord})
		.limit(limit)
		.skip(from)
		.populate({
			path: 'products',
			select: 'name description price _id thumbnail'
		});
	return result;
}

const getProductsSectionById = async productsSectionId => {
	const productsSection = await ProductsSection.findOne({ _id: productsSectionId });
	return productsSection;
}

const destroy = async productsSectionId => {
	const result = ProductsSection.deleteOne({ _id: productsSectionId });
	return result;
}

const update = async (productsSectionId, fieldsToUpdate) => {
	const result = await ProductsSection.findOneAndUpdate({ _id: productsSectionId }, fieldsToUpdate);
	return result;
}

const persist = async productsSection => {
	const result = await new ProductsSection(productsSection).save();
	return result;
}


module.exports = {
	getProductsSections,
	getProductsSectionById,
	destroy,
	update,
	persist
}