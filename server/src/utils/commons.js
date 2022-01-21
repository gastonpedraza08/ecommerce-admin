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
			general_characteristics
		*
		*
		*/
		case 'trademark':
			return `AND info->>"$.general_characteristics.trademark" LIKE "${params[prop]}"`
			break;
		case 'phone_line':
			return `AND info->>"$.general_characteristics.phone_line" LIKE "${params[prop]}"`
			break;

		/*
		*
		*
			os
		*
		*
		*/
		case 'os_name':
			return `AND info->>"$.os.os_name" LIKE "${params[prop]}"`
			break;
		case 'os_original_version':
			return `AND info->>"$.os.os_original_version"=${params[prop]}`
			break;
		case 'min_os_original_version': {
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
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(info->>"$.os.os_original_version", '.', 1), '.', -1), 10, '0'),
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(info->>"$.os.os_original_version", '.', 2), '.', -1), 10, '0'),
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(info->>"$.os.os_original_version", '.', 3), '.', -1), 10, '0') 
       ) >= CONCAT(${str})`
			break;
		}

		case 'max_os_original_version': {
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
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(info->>"$.os.os_original_version", '.', 1), '.', -1), 10, '0'),
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(info->>"$.os.os_original_version", '.', 2), '.', -1), 10, '0'),
        LPAD(SUBSTRING_INDEX(SUBSTRING_INDEX(info->>"$.os.os_original_version", '.', 3), '.', -1), 10, '0') 
       ) <= CONCAT(${str})`
			break;
		}

		/*
		*
		*
			screen
		*
		*
		*/
		case 'screen_size_inch':
			return `AND info->>"$.screen.screen_size_inch"=${params[prop]}`
			break;
		case 'min_screen_size_inch':
			return `AND info->>"$.screen.screen_size_inch">=${params[prop]}`
			break;
		case 'max_screen_size_inch':
			return `AND info->>"$.screen.screen_size_inch"<=${params[prop]}`
			break;

		case 'screen_with_touch':
			return `AND info->>"$.screen.screen_with_touch" LIKE "${params[prop]}"`
			break;
			
		/*
		*
		*
			battery
		*
		*
		*/
		case 'battery_capacity_mah':
			return `AND info->>"$.battery.battery_capacity_mah"=${params[prop]}`
			break;
		case 'min_battery_capacity_mah':
			return `AND info->>"$.battery.battery_capacity_mah">=${params[prop]}`
			break;
		case 'max_battery_capacity_mah':
			return `AND info->>"$.battery.battery_capacity_mah"<=${params[prop]}`
			break;

		case 'talk_time_hs':
			return `AND info->>"$.battery.talk_time_hs"=${params[prop]}`
			break;
		case 'min_talk_time_hs':
			return `AND info->>"$.battery.talk_time_hs">=${params[prop]}`
			break;
		case 'max_talk_time_hs':
			return `AND info->>"$.battery.talk_time_hs"<=${params[prop]}`
			break;

		case 'battery_with_removable':
			return `AND info->>"$.battery.battery_with_removable" LIKE "${params[prop]}"`
			break;

		/*
		*
		*
			sim_card
		*
		*
		*/
		case 'is_dual_sim':
			return `AND info->>"$.sim_card.is_dual_sim" LIKE "${params[prop]}"`
			break;
		case 'supported_sim_card_sizes':
			return `AND info->>"$.sim_card.supported_sim_card_sizes" LIKE "${params[prop]}"`
			break;
		case 'with_esim':
			return `AND info->>"$.sim_card.with_esim" LIKE "${params[prop]}"`
			break;

		/*
		*
		*
			memory
		*
		*
		*/
		case 'internal_memory_gb':
			return `AND info->>"$.memory.internal_memory_gb"=${params[prop]}`
			break;
		case 'min_internal_memory_gb':
			return `AND info->>"$.memory.internal_memory_gb">=${params[prop]}`
			break;
		case 'max_internal_memory_gb':
			return `AND info->>"$.memory.internal_memory_gb"<=${params[prop]}`
			break;

		case 'ram_memory':
			return `AND info->>"$.memory.ram_memory_gb"=${params[prop]}`
			break;
		case 'min_ram_memory':
			return `AND info->>"$.memory.ram_memory_gb">=${params[prop]}`
			break;
		case 'max_ram_memory':
			return `AND info->>"$.memory.ram_memory_gb"<=${params[prop]}`
			break;

		case 'memory_card_types':
			return `AND info->>"$.memory.memory_card_types" LIKE "${params[prop]}"`
			break;

		case 'maximum_memory_card_capacity_gb':
			return `AND info->>"$.memory.maximum_memory_card_capacity_gb"=${params[prop]}`
			break;
		case 'min_maximum_memory_card_capacity_gb':
			return `AND info->>"$.memory.maximum_memory_card_capacity_gb">=${params[prop]}`
			break;
		case 'max_maximum_memory_card_capacity_gb':
			return `AND info->>"$.memory.maximum_memory_card_capacity_gb"<=${params[prop]}`
			break;

		/*
		*
		*
			camera
		*
		*
		*/
		case 'main_rear_camera_resolution_mpx':
			return `AND info->>"$.camera.main_rear_camera_resolution_mpx"=${params[prop]}`
			break;
		case 'min_main_rear_camera_resolution_mpx':
			return `AND info->>"$.camera.main_rear_camera_resolution_mpx">=${params[prop]}`
			break;
		case 'max_main_rear_camera_resolution_mpx':
			return `AND info->>"$.camera.main_rear_camera_resolution_mpx"<=${params[prop]}`
			break;

		case 'main_front_camera_resolution_mpx':
			return `AND info->>"$.camera.main_front_camera_resolution_mpx"=${params[prop]}`
			break;
		case 'min_main_front_camera_resolution_mpx':
			return `AND info->>"$.camera.main_front_camera_resolution_mpx">=${params[prop]}`
			break;
		case 'max_main_front_camera_resolution_mpx':
			return `AND info->>"$.camera.main_front_camera_resolution_mpx"<=${params[prop]}`
			break;

		case 'with_camera':
			return `AND info->>"$.camera.with_camera" LIKE "${params[prop]}"`
			break;
		case 'with_flash_on_the_front_camera':
			return `AND info->>"$.camera.with_flash_on_the_front_camera" LIKE "${params[prop]}"`
			break;

		/*
		*
		*
			connectivity
		*
		*
		*/
		case 'connectivity_red':
			return `AND info->>"$.connectivity.connectivity_red" LIKE "${params[prop]}"`
			break;
		case 'with_usb_connector':
			return `AND info->>"$.connectivity.with_usb_connector" LIKE "${params[prop]}"`
			break;
		case 'with_wifi':
			return `AND info->>"$.connectivity.with_wifi" LIKE "${params[prop]}"`
			break;
		case 'with_gps':
			return `AND info->>"$.connectivity.with_gps" LIKE "${params[prop]}"`
			break;
		case 'with_bluetooth':
			return `AND info->>"$.connectivity.with_bluetooth" LIKE "${params[prop]}"`
			break;
		case 'with_nfc':
			return `AND info->>"$.connectivity.with_nfc" LIKE "${params[prop]}"`
			break;
		case 'with_radio':
			return `AND info->>"$.connectivity.with_radio" LIKE "${params[prop]}"`
			break;
		case 'with_tv_tuner':
			return `AND info->>"$.connectivity.with_tv_tuner" LIKE "${params[prop]}"`
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