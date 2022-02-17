const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const errorsToResponse = errors.array().map(error => error.msg);
	return res.status(400).json({
		ok: false,
		error: 'invalid fields',
		errors: errorsToResponse
	});
};

function getFilterLine(prop, params) {
	switch(prop) {

		/*
		*
		*
			características_generales
		*
		*
		*/
		case 'marca':
			return {
				marca: params[prop]
			};
			break;
		case 'línea':
			return {
				línea: params[prop]
			};
			break;

		/*
		*
		*
			sistema_operativo
		*
		*
		*/
		case 'nombre_del_sistema_operativo':
			return {
				nombre_del_sistema_operativo: params[prop]
			};
			break;
		case 'versión_original_del_sistema_operativo':
			return {
				versión_original_del_sistema_operativo: params[prop]
			};
			break;

		/*
		*
		*
			pantalla
		*
		*
		*/
		case 'tamaño_de_la_pantalla':
			return {
				tamaño_de_la_pantalla: params[prop]
			};
			break;
		case 'min_tamaño_de_la_pantalla':
			return {
				tamaño_de_la_pantalla: { $gt: params[prop] }
			};
			break;
		case 'max_tamaño_de_la_pantalla':
			return {
				tamaño_de_la_pantalla: { $lt: params[prop] }
			};
			break;

		case 'con_pantalla_táctil':
			return {
				con_pantalla_táctil: params[prop]
			};
			break;
			
		/*
		*
		*
			batería
		*
		*
		*/
		case 'capacidad_de_la_batería':
			return {
				capacidad_de_la_batería: params[prop]
			};
			break;
		case 'min_capacidad_de_la_batería':
			return {
				capacidad_de_la_batería: { $gt: params[prop] }
			};
			break;
		case 'max_capacidad_de_la_batería':
			return {
				capacidad_de_la_batería: { $lt: params[prop] }
			};
			break;

		case 'tiempo_de_conversación':
			return {
				tiempo_de_conversación: params[prop]
			};
			break;
		case 'min_tiempo_de_conversación':
			return {
				tiempo_de_conversación: { $gt: params[prop] }
			};
			break;
		case 'max_tiempo_de_conversación':
			return {
				tiempo_de_conversación: { $lt: params[prop] }
			};
			break;

		case 'con_batería_removible':
			return {
				con_batería_removible: params[prop]
			};
			break;

		/*
		*
		*
			tarjeta_sim
		*
		*
		*/
		case 'es_dual_sim':
			return {
				es_dual_sim: params[prop]
			};
			break;
		case 'tamaños_de_tarjeta_sim_compatibles':
			return {
				tamaños_de_tarjeta_sim_compatibles: params[prop]
			};
			break;
		case 'con_esim':
			return {
				con_esim: params[prop]
			};
			break;

		/*
		*
		*
			memoria
		*
		*
		*/
		case 'memoria_interna':
			return {
				memoria_interna: params[prop]
			};
			break;
		case 'min_memoria_interna':
			return {
				memoria_interna: { $gt: params[prop] }
			};
			break;
		case 'max_memoria_interna':
			return {
				memoria_interna: { $lt: params[prop] }
			};
			break;

		case 'memoria_ram':
			return {
				memoria_ram: params[prop]
			};
			break;
		case 'min_memoria_ram':
			return {
				memoria_ram: { $gt: params[prop] }
			};
			break;
		case 'max_memoria_ram':
			return {
				memoria_ram: { $lt: params[prop] }
			};
			break;

		case 'tipos_de_tarjeta_de_memoria':
			return {
				tipos_de_tarjeta_de_memoria: params[prop]
			};
			break;

		case 'capacidad_máxima_de_la_tarjeta_de_memoria':
			return {
				capacidad_máxima_de_la_tarjeta_de_memoria: params[prop]
			};
			break;
		case 'min_capacidad_máxima_de_la_tarjeta_de_memoria':
			return {
				capacidad_máxima_de_la_tarjeta_de_memoria: { $gt: params[prop] }
			};
			break;
		case 'max_capacidad_máxima_de_la_tarjeta_de_memoria':
			return {
				capacidad_máxima_de_la_tarjeta_de_memoria: { $lt: params[prop] }
			};
			break;

		/*
		*
		*
			cámara
		*
		*
		*/
		case 'resolución_de_la_cámara_trasera_principal':
			return {
				resolución_de_la_cámara_trasera_principal: params[prop]
			};
			break;
		case 'min_resolución_de_la_cámara_trasera_principal':
			return {
				resolución_de_la_cámara_trasera_principal: { $gt: params[prop] }
			};
			break;
		case 'max_resolución_de_la_cámara_trasera_principal':
			return {
				resolución_de_la_cámara_trasera_principal: { $lt: params[prop] }
			};
			break;

		case 'resolución_de_la_cámara_frontal_principal':
			return {
				resolución_de_la_cámara_frontal_principal: params[prop]
			};
			break;
		case 'min_resolución_de_la_cámara_frontal_principal':
			return {
				resolución_de_la_cámara_frontal_principal: { $gt: params[prop] }
			};
			break;
		case 'max_resolución_de_la_cámara_frontal_principal':
			return {
				resolución_de_la_cámara_frontal_principal: { $lt: params[prop] }
			};
			break;

		case 'con_cámara':
			return {
				con_cámara: params[prop]
			};
			break;
		case 'con_flash_en_la_cámara_frontal':
			return {
				con_flash_en_la_cámara_frontal: params[prop]
			};
			break;

		/*
		*
		*
			conectividad
		*
		*
		*/
		case 'red':
			return {
				red: params[prop]
			};
			break;
		case 'con_conector_usb':
			return {
				con_conector_usb: params[prop]
			};
			break;
		case 'con_wi_fi':
			return {
				con_wi_fi: params[prop]
			};
			break;
		case 'con_gps':
			return {
				con_gps: params[prop]
			};
			break;
		case 'con_bluetooth':
			return {
				con_bluetooth: params[prop]
			};
			break;
		case 'con_nfc':
			return {
				con_nfc: params[prop]
			};
			break;
		case 'con_radio':
			return {
				con_radio: params[prop]
			};
			break;
		case 'con_sintonizador_de_tv':
			return {
				con_sintonizador_de_tv: params[prop]
			};
			break;

		/*
		*
		*
			categoryId
		*
		*
		*/
		case 'categoryId':
			return {
				categoryId: params[prop]
			};
			break;


		default:
			return '';
	}
}

module.exports = {
	validate,
	getFilterLine
};