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
					isOptional: false
				},
				{
					id: 3,
					label: 'Especificaciones',
					component: 'Specs',
					isOptional: false
				},
				{
					id: 4,
					label: 'Sistema Operativo',
					component: 'OperatingSystem',
					isOptional: true
				},
				{
					id: 5,
					label: 'Hecho 5',
					component: 'FinalForm',
					isOptional: true
				},
				{
					id: 6,
					label: 'Hecho 6',
					component: 'FinalForm',
					isOptional: false
				},
				{
					id: 7,
					label: 'Hecho 7',
					component: 'FinalForm',
					isOptional: false
				},
				{
					id: 8,
					label: 'Hecho 8',
					component: 'FinalForm',
					isOptional: false
				},
				{
					id: 9,
					label: 'Hecho 9',
					component: 'FinalForm',
					isOptional: false
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