import arrMarcas from './marcas.js';

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
							values: ["claro", "personal"]
						}
					]
				}
			}
		}
	]
}

export default objToExport;