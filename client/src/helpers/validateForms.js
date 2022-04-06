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