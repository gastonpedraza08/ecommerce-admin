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
	const productsSection = await ProductsSection
		.findOne({ _id: productsSectionId })
		.populate({
			path: 'products',
			select: 'name description price _id thumbnail'
		});
	return productsSection;
}

const destroy = async productsSectionId => {
	const result = ProductsSection.deleteOne({ _id: productsSectionId });
	return result;
}

const update = async (productsSectionId, fieldsToUpdate) => {
	const result = await ProductsSection.findOneAndUpdate({ _id: productsSectionId }, fieldsToUpdate, { new: true })
	.populate({
			path: 'products',
			select: 'name description price _id thumbnail'
		});;
	return result;
}

const persist = async productsSection => {
	const productsSectionOnDB = await new ProductsSection(productsSection).save();		
	const result = await ProductsSection
	.findOne({ _id: productsSectionOnDB._id })
	.populate({
		path: 'products',
		select: 'name description price _id thumbnail'
	});
	return result;
}


module.exports = {
	getProductsSections,
	getProductsSectionById,
	destroy,
	update,
	persist
}