export const validateFormProduct = (values) => {
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

export const validateFormUser = (values) => {
	let errors = {};
	if (values.firstName === '') {
		errors.name = 'El nombre es obligatorio';
	} else if (values.email === '') {
		errors.stock = 'El email es obligatorio';
	} else if (!validateEmail(values.email)) {
		errors.stock = 'Formato de email incorrecto';
	} else if (values.password === '') {
		errors.stock = 'La contraseña es obligatoria';
	}
	return errors;
}

export const validateFormEditUser = (values, changePassword) => {
	let errors = {};
	if (values.firstName === '') {
		errors.name = 'El nombre es obligatorio';
	} else if (values.email === '') {
		errors.stock = 'El email es obligatorio';
	} else if (!validateEmail(values.email)) {
		errors.stock = 'Formato de email incorrecto';
	} else if (changePassword && values.password === '') {
		errors.password = 'La contraseña no puede estar vacia'
	}
	return errors;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};