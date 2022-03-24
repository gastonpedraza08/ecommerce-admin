import { types } from "../types/types";

const initialState = {
	products: [],
	productsSections: [],
	productsSearch: {
		products: []
	},
};

export const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.productsLoadAllproducts:
			return {
				...state,
				products: action.payload.products,
			};
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
		case types.productsDeleteAllProducts:
			return initialState;
		case types.productsSearchProducts:
			return {
				...initialState,
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
