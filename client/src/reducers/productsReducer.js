import { types } from "../types/types";

const initialState = {
	products: [],
	productsSections: [],
	productsSearch: [],
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
				productsSearch: action.payload.productsSearch
			};
		default:
			return state;
	}
};
