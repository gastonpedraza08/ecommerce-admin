import { types } from "../types/types";
import create from 'assets/config/products/create';
let componentsName = create.categories[0].componentsName;

const initialState = {
	products: [],
	productsSections: [],
	productsSearch: {
		products: []
	},
	productForm: {
		activeStep: 0,
		skipped: [],
		componentName: componentsName[0].component,
		componentsName,
		product: {}
	}
};

let nextStep;
let prevStep;

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
		case types.productCreateHandleNext:
			nextStep = state.productForm.activeStep + 1;
			return {
				...state,
				productForm: {
					...state.productForm,
					activeStep: nextStep,
					componentName: state.productForm.componentsName[nextStep]?.component,
					product: action.payload
				}
			}
		case types.productCreateHandleBack:
			prevStep = state.productForm.activeStep - 1;
			return {
				...state,
				productForm: {
					...state.productForm,
					activeStep: prevStep,
					componentName: state.productForm.componentsName[prevStep].component
				}
			}
		case types.productCreateHandleSkip:
			nextStep = state.productForm.activeStep + 1;
			return {
				...state,
				productForm: {
					...state.productForm,
					activeStep: nextStep,
					componentName: state.productForm.componentsName[nextStep]?.component,
					skipped: state.productForm.skipped.concat(state.productForm.activeStep),
				}
			}
		case types.productCreateHandleReset:
			return {
				...state,
				productForm: initialState.productForm
			}
		case types.productCreateHandleSetCategory:
			return {
				...state,
				productForm: {
					...state.productForm,
					componentsName: create.categories[action.payload.categoryId].componentsName
				}
			}
		default:
			return state;
	}
};
