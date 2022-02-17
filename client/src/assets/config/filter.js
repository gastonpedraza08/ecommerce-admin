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
							identifier: 'linea',
							values: arrLineas.list
						}
					]
				}
			}
		}
	]
}

export default objToExport;