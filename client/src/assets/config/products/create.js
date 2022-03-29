let objToExport = {
	categories: {
		//default for all products
		0: {
			componentsName: [
				{
					label: 'Información del producto',
					component: 'MainComponent.jsx'
				},
				{
					label: 'Hecho',
					component: 'FinalForm.jsx'
				}
			]
		},
		1: {
			componentsName: [
				{
					label: 'Información del producto',
					component: 'MainComponent.jsx'
				},
				{
					label: 'Camara',
					component: 'SecondComponent.jsx'
				},
				{
					label: 'Memoria',
					component: 'ThirdComponent.jsx',
				},
				{
					label: 'Hecho',
					component: 'FinalForm.jsx'
				}
			],
		},
		2: {
			componentsName: [
				{
					label: 'Información del producto',
					component: 'MainComponent.jsx'
				},
				{
					label: 'Ruedas',
					component: 'SecondComponent.jsx'
				},
				{
					label: 'Hecho',
					component: 'FinalForm.jsx'
				}
			]
		}	
	}
};

export default objToExport;