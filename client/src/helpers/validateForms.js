export const validateFormProduct = (values, images, thumbnail, description) => {
	let errors = {};
	if (values.name.length < 3) {
		errors.name = 'El nombre debe poseer al menos 3 caracteres';
	} else if (values.stock === '') {
		errors.stock = 'El stock es obligatorio';
	} else if (values.sku.length < 10) {
		errors.sku = 'El sku debe poseer al menos 10 caracteres';
	} else if (values.price === '') {
		errors.price = 'El precio es obligatorio';
	} else if (values.category === '') {
		errors.category = 'Selecciona una categoria';
	} else if (description.length < 20) {
		errors.description =
			'La descripcion debe poseer al menos 20 caracteres';
	} else if (thumbnail === '') {
		errors.thumbnail = 'La miniatura es obligatoria';
	} else if (images.length < 1) {
		errors.images = 'Sube al menos una imagen';
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

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};