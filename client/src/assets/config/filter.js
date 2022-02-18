import arrMarcas from './marcas.js';
import arrLineas from './lineas.js';

let objToExport = {
	categoryId: [
		{
			1: {
				filterTextLike: {
					list: [
						{
							name: 'Marca',
							identifier: 'marca',
							values: arrMarcas.list
						},
						{
							name: 'Línea',
							identifier: 'línea',
							values: arrLineas.list
						},
						{
							name: 'SO',
							identifier: 'nombre_del_sistema_operativo',
							values: ["Android", "iOS"]
						},
						{
							name: 'RAM (gb)',
							identifier: 'memoria_ram',
							values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
						},
						{
							name: 'Memoria Interna (gb)',
							identifier: 'memoria_interna',
							values: ["1", "2", "4", "8", "16", "32", "64", "128", "256", "512"]
						},
						{
							name: 'Red',
							identifier: 'red',
							values: ["4G/LTE", "5G", "2G", "3G", "GSM"]
						}
					]
				},
				filterSwitch: {
					list: [
						{
							name: 'Conectores',
							values: [
								{
									name: 'Con Conector USB',
									identifier: 'con_conector_usb',
									values: ["Si", "No"]
								}
							]
						}
					]
				}
			}
		}
	]
}

export default objToExport;