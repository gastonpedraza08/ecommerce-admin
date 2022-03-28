import { types } from "../types/types";

const initialState = {
	products: [],
	productsSections: [],
	productsSearch: {
		products: []
	},
	productForm: {
		activeStep: 0,
		skipped: [],
		componentName: 'MainComponent.jsx',
		steps: ['Select campaign settings', 'Create an ad group', 'Create an ad'],
	}
};

export const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.productCreateProduct:
			return {
				...state,
				products: [action.payload.product].concat(state.products),
			};
		case types.productAddProductsSection:
			return {
				...state,
				productsSections: [action.payload.productsSection].concat(state.productsSections),
			};
		case types.productsLoadProductsSections:
			return {
				...state,
				productsSections: action.payload.productsSections,
			};
		case types.productsSearchProducts:
			return {
				...state,
				productsSearch: {
					products: action.payload.productsSearch,
					count: action.payload.count,
					numberOfPages: action.payload.numberOfPages,
				}
			};
		default:
			return state;
	}
};
