let objToExport = {
	categories: {
		//default for all products
		1: {
			componentsName: [
				{
					id: 1,
					label: 'Información Básica del Producto',
					component: 'BasicInfoForm',
					isOptional: false,
				},
				{
					id: 2,
					label: 'Características Generales',
					component: 'GeneralCharacteristics',
					isOptional: true
				},
				{
					id: 3,
					label: 'Especificaciones',
					component: 'Specs',
					isOptional: true
				},
				{
					id: 4,
					label: 'Sistema Operativo',
					component: 'OperatingSystem',
					isOptional: true
				},
				{
					id: 5,
					label: 'Camera',
					component: 'Camera',
					isOptional: true
				},
				{
					id: 6,
					label: 'Seguridad',
					component: 'Security',
					isOptional: true
				},
				{
					id: 7,
					label: 'Peso y Dimensiones',
					component: 'Weight',
					isOptional: true
				},
				{
					id: 8,
					label: 'Conectividad',
					component: 'Conectivity',
					isOptional: true
				},
				{
					id: 9,
					label: 'Hecho 9',
					component: 'FinalForm',
					isOptional: true
				},
				{
					id: 10,
					label: 'Hecho 9',
					component: 'FinalForm',
					isOptional: true
				}
			]
		},
		2: {
			componentsName: [
				{
					label: 'Información del producto',
					component: 'BasicInfoForm',
					isOptional: false,
				},
				{
					label: 'Camara',
					component: 'SecondComponent',
					isOptional: true,
				},
				{
					label: 'Memoria',
					component: 'ThirdComponent',
					isOptional: true,
				},
				{
					label: 'Hecho',
					component: 'FinalForm',
					isOptional: false,
				}
			],
		},
		3: {
			componentsName: [
				{
					label: 'Información del producto',
					component: 'BasicInfoForm',
					isOptional: false,
				},
				{
					label: 'Ruedas',
					component: 'SecondComponent',
					isOptional: true,
				},
				{
					label: 'Hecho',
					component: 'FinalForm',
					isOptional: false,
				}
			]
		}	
	}
};

export default objToExport;