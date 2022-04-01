let objToExport = {
	categories: {
		//default for all products
		0: {
			componentsName: [
				{
					label: 'Información del producto',
					component: 'BasicInfoForm',
					isOptional: false,
				},
				{
					label: 'Hecho',
					component: 'FinalForm',
					isOptional: false
				}
			]
		},
		1: {
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
		2: {
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