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
			return `AND infoHelper->>"$.características_generales.marca" LIKE "${params[prop]}"`
			break;
		case 'línea':
			return `AND infoHelper->>"$.características_generales.línea" LIKE "${params[prop]}"`
			break;

		/*
		*
		*
			sistema_operativo
		*
		*
		*/
		case 'nombre_del_sistema_operativo':
			return `AND infoHelper->>"$.sistema_operativo.nombre_del_sistema_operativo" LIKE "${params[prop]}"`
			break;
		case 'versión_original_del_sistema_operativo':
			return `AND infoHelper->>"$.sistema_operativo.versión_original_del_sistema_operativo"=${params[prop]}`
			break;
		case 'min_versión_original_del_sistema_operativo': {
			let arr = params[prop].split('.');
			arr.length = 3;
			arr = arr.map(num => {
				if(num) {
					return `LPAD(${num},10,'0')`
				} else {
					return `LPAD(0,10,'0')`
				}
			});
			let str = arr.join(', ');
			return `AND CONCAT(
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(infoHelper->>"$.sistema_operativo.versión_original_del_sistema_operativo", '.', 1), '.', -1), 10, '0'),
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(infoHelper->>"$.sistema_operativo.versión_original_del_sistema_operativo", '.', 2), '.', -1), 10, '0'),
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(infoHelper->>"$.sistema_operativo.versión_original_del_sistema_operativo", '.', 3), '.', -1), 10, '0') 
       ) >= CONCAT(${str})`
			break;
		}

		case 'max_versión_original_del_sistema_operativo': {
			let arr = params[prop].split('.');
			arr.length = 3;
			arr = arr.map(num => {
				if(num) {
					return `LPAD(${num},10,'0')`
				} else {
					return `LPAD(0,10,'0')`
				}
			});
			let str = arr.join(', ');
			return `AND CONCAT(
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(infoHelper->>"$.sistema_operativo.versión_original_del_sistema_operativo", '.', 1), '.', -1), 10, '0'),
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(infoHelper->>"$.sistema_operativo.versión_original_del_sistema_operativo", '.', 2), '.', -1), 10, '0'),
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(infoHelper->>"$.sistema_operativo.versión_original_del_sistema_operativo", '.', 3), '.', -1), 10, '0') 
       ) <= CONCAT(${str})`
			break;
		}

		/*
		*
		*
			pantalla
		*
		*
		*/
		case 'tamaño_de_la_pantalla':
			return `AND infoHelper->>"$.pantalla.tamaño_de_la_pantalla"=${params[prop]}`
			break;
		case 'min_tamaño_de_la_pantalla':
			return `AND infoHelper->>"$.pantalla.tamaño_de_la_pantalla">=${params[prop]}`
			break;
		case 'max_tamaño_de_la_pantalla':
			return `AND infoHelper->>"$.pantalla.tamaño_de_la_pantalla"<=${params[prop]}`
			break;

		case 'con_pantalla_táctil':
			return `AND infoHelper->>"$.pantalla.con_pantalla_táctil" LIKE "${params[prop]}"`
			break;
			
		/*
		*
		*
			batería
		*
		*
		*/
		case 'capacidad_de_la_batería':
			return `AND infoHelper->>"$.batería.capacidad_de_la_batería"=${params[prop]}`
			break;
		case 'min_capacidad_de_la_batería':
			return `AND infoHelper->>"$.batería.capacidad_de_la_batería">=${params[prop]}`
			break;
		case 'max_capacidad_de_la_batería':
			return `AND infoHelper->>"$.batería.capacidad_de_la_batería"<=${params[prop]}`
			break;

		case 'tiempo_de_conversación':
			return `AND infoHelper->>"$.batería.tiempo_de_conversación"=${params[prop]}`
			break;
		case 'min_tiempo_de_conversación':
			return `AND infoHelper->>"$.batería.tiempo_de_conversación">=${params[prop]}`
			break;
		case 'max_tiempo_de_conversación':
			return `AND infoHelper->>"$.batería.tiempo_de_conversación"<=${params[prop]}`
			break;

		case 'con_batería_removible':
			return `AND infoHelper->>"$.batería.con_batería_removible" LIKE "${params[prop]}"`
			break;

		/*
		*
		*
			tarjeta_sim
		*
		*
		*/
		case 'es_dual_sim':
			return `AND infoHelper->>"$.tarjeta_sim.es_dual_sim" LIKE "${params[prop]}"`
			break;
		case 'tamaños_de_tarjeta_sim_compatibles':
			return `AND infoHelper->>"$.tarjeta_sim.tamaños_de_tarjeta_sim_compatibles" LIKE "${params[prop]}"`
			break;
		case 'con_esim':
			return `AND infoHelper->>"$.tarjeta_sim.con_esim" LIKE "${params[prop]}"`
			break;

		/*
		*
		*
			memoria
		*
		*
		*/
		case 'memoria_interna':
			return `AND infoHelper->>"$.memoria.memoria_interna"=${params[prop]}`
			break;
		case 'min_memoria_interna':
			return `AND infoHelper->>"$.memoria.memoria_interna">=${params[prop]}`
			break;
		case 'max_memoria_interna':
			return `AND infoHelper->>"$.memoria.memoria_interna"<=${params[prop]}`
			break;

		case 'memoria_ram':
			return `AND infoHelper->>"$.memoria.memoria_ram_gb"=${params[prop]}`
			break;
		case 'min_memoria_ram':
			return `AND infoHelper->>"$.memoria.memoria_ram_gb">=${params[prop]}`
			break;
		case 'max_memoria_ram':
			return `AND infoHelper->>"$.memoria.memoria_ram_gb"<=${params[prop]}`
			break;

		case 'tipos_de_tarjeta_de_memoria':
			return `AND infoHelper->>"$.memoria.tipos_de_tarjeta_de_memoria" LIKE "${params[prop]}"`
			break;

		case 'capacidad_máxima_de_la_tarjeta_de_memoria':
			return `AND infoHelper->>"$.memoria.capacidad_máxima_de_la_tarjeta_de_memoria"=${params[prop]}`
			break;
		case 'min_capacidad_máxima_de_la_tarjeta_de_memoria':
			return `AND infoHelper->>"$.memoria.capacidad_máxima_de_la_tarjeta_de_memoria">=${params[prop]}`
			break;
		case 'max_capacidad_máxima_de_la_tarjeta_de_memoria':
			return `AND infoHelper->>"$.memoria.capacidad_máxima_de_la_tarjeta_de_memoria"<=${params[prop]}`
			break;

		/*
		*
		*
			cámara
		*
		*
		*/
		case 'resolución_de_la_cámara_trasera_principal':
			return `AND infoHelper->>"$.cámara.resolución_de_la_cámara_trasera_principal"=${params[prop]}`
			break;
		case 'min_resolución_de_la_cámara_trasera_principal':
			return `AND infoHelper->>"$.cámara.resolución_de_la_cámara_trasera_principal">=${params[prop]}`
			break;
		case 'max_resolución_de_la_cámara_trasera_principal':
			return `AND infoHelper->>"$.cámara.resolución_de_la_cámara_trasera_principal"<=${params[prop]}`
			break;

		case 'resolución_de_la_cámara_frontal_principal':
			return `AND infoHelper->>"$.cámara.resolución_de_la_cámara_frontal_principal"=${params[prop]}`
			break;
		case 'min_resolución_de_la_cámara_frontal_principal':
			return `AND infoHelper->>"$.cámara.resolución_de_la_cámara_frontal_principal">=${params[prop]}`
			break;
		case 'max_resolución_de_la_cámara_frontal_principal':
			return `AND infoHelper->>"$.cámara.resolución_de_la_cámara_frontal_principal"<=${params[prop]}`
			break;

		case 'con_cámara':
			return `AND infoHelper->>"$.cámara.con_cámara" LIKE "${params[prop]}"`
			break;
		case 'con_flash_en_la_cámara_frontal':
			return `AND infoHelper->>"$.cámara.con_flash_en_la_cámara_frontal" LIKE "${params[prop]}"`
			break;

		/*
		*
		*
			conectividad
		*
		*
		*/
		case 'red':
			return `AND infoHelper->>"$.conectividad.red" LIKE "${params[prop]}"`
			break;
		case 'con_conector_usb':
			return `AND infoHelper->>"$.conectividad.con_conector_usb" LIKE "${params[prop]}"`
			break;
		case 'con_wi-fi':
			return `AND infoHelper->>"$.conectividad.con_wi-fi" LIKE "${params[prop]}"`
			break;
		case 'con_gps':
			return `AND infoHelper->>"$.conectividad.con_gps" LIKE "${params[prop]}"`
			break;
		case 'con_bluetooth':
			return `AND infoHelper->>"$.conectividad.con_bluetooth" LIKE "${params[prop]}"`
			break;
		case 'con_nfc':
			return `AND infoHelper->>"$.conectividad.con_nfc" LIKE "${params[prop]}"`
			break;
		case 'con_radio':
			return `AND infoHelper->>"$.conectividad.con_radio" LIKE "${params[prop]}"`
			break;
		case 'con_sintonizador_de_tv':
			return `AND infoHelper->>"$.conectividad.con_sintonizador_de_tv" LIKE "${params[prop]}"`
			break;

		/*
		*
		*
			categoryId
		*
		*
		*/
		case 'categoryId':
			return `AND categoryId=${params[prop]}`
			break;


		default:
			return '';
	}
}

module.exports = {
	validate,
	getFilterLine
};