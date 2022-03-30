let objToExport = {
	categories: {
		//default for all products
		0: {
			componentsName: [
				{
					label: 'Información del producto',
					component: 'MainComponent.jsx',
					isOptional: false,
				},
				{
					label: 'Hecho',
					component: 'FinalForm.jsx',
					isOptional: false
				}
			]
		},
		1: {
			componentsName: [
				{
					label: 'Información del producto',
					component: 'MainComponent.jsx',
					isOptional: false,
				},
				{
					label: 'Camara',
					component: 'SecondComponent.jsx',
					isOptional: true,
				},
				{
					label: 'Memoria',
					component: 'ThirdComponent.jsx',
					isOptional: true,
				},
				{
					label: 'Hecho',
					component: 'FinalForm.jsx',
					isOptional: false,
				}
			],
		},
		2: {
			componentsName: [
				{
					label: 'Información del producto',
					component: 'MainComponent.jsx',
					isOptional: false,
				},
				{
					label: 'Ruedas',
					component: 'SecondComponent.jsx',
					isOptional: true,
				},
				{
					label: 'Hecho',
					component: 'FinalForm.jsx',
					isOptional: false,
				}
			]
		}	
	}
};

export default objToExport;