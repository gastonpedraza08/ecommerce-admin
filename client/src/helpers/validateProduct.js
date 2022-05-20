export const validateBasicInfo = (values) => {
	let errors = {};

	switch (true) {

		//name
		case (values.name.length < 3):
			errors.name = 'El nombre debe poseer al menos 3 caracteres'
			break;
		case (values.name === ''):
			errors.name = 'El nombre es obligatorio'
			break;

		//stock
		case (isNaN(values.stock)):
			errors.stock = 'El stock debe ser un número valido'
			break;
		case (values.stock === ''):
			errors.stock = 'El stock es obligatorio'
			break;

		//sku
		case (values.sku.length < 10):
			errors.sku = 'El sku debe poseer al menos 10 caracteres'
			break;
		case (values.sku === ''):
			errors.sku = 'El sku es obligatorio'
			break;

		//price
		case (isNaN(values.price)):
			errors.price = 'El precio debe ser un número valido'
			break;
		case (values.price === ''):
			errors.price = 'El precio es obligatorio'
			break;

		//categoryId
		case (values.categoryId === ''):
			errors.categoryId = 'La categoria es obligatoria'
			break;

		//description
		case (values.description.length < 20):
			errors.description = 'La descripción debe poseer al menos 20 caracteres'
			break;
		case (values.description === ''):
			errors.description = 'La descripción es obligatoria'
			break;

		//images
		case (values.images.length < 1):
			errors.images = 'Sube al menos una imagen'
			break;

		//thumbnail
		case (values.thumbnail === ''):
			errors.thumbnail = 'La miniatura es obligatoria'
			break;
		default:
	}
	return errors;
}

export const validateGeneralCharacteristics = (values) => {
	let errors = {};

	switch (true) {

		default:
	}
	return errors;
}

export const validateSpecs = (values) => {
	let errors = {};

	switch (true) {

		default:
	}
	return errors;
}

export const validateOperatingSystem = (values) => {
	let errors = {};

	switch (true) {

		default:
	}
	return errors;
}

export const validateCamera = (values) => {
	let errors = {};

	switch (true) {

		default:
	}
	return errors;
}

export const validateSecurity = (values) => {
	let errors = {};

	switch (true) {

		default:
	}
	return errors;
}

export const validateWeight = (values) => {
	let errors = {};

	switch (true) {

		default:
	}
	return errors;
}

export const validateConectivity = (values) => {
	let errors = {};

	switch (true) {

		default:
	}
	return errors;
}