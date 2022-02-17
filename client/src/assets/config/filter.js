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
						}
					]
				}
			}
		}
	]
}

export default objToExport;