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