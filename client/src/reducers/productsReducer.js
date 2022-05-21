import { types } from "../types/types";
import create from 'assets/config/products/create';
let componentsName = create.categories[1].componentsName;

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
		product: {
			//initial values to improve the development process
			basic_info: {
				thumbnail: 'https://st2.depositphotos.com/1203257/7557/i/450/depositphotos_75573601-stock-photo-brand-new-cars-for-sale.jpg',
				images: [
					{ 
						name: 'imagen1', 
						url: 'https://image.shutterstock.com/image-photo/cars-sale-stock-row-car-260nw-1906135519.jpg'
					},
					{
						name: 'imagen2',
						url: 'https://elceo.com/wp-content/uploads/2021/12/seguro.jpg'
					}
				],
				categoryId: 1,
				name: 'Samsung Galaxy',
				price: 20000,
				sku: 'idjiajdaiwjidaw',
				stock: 5,
				description: '<p>Esta es una descripcion con mas de 20 chars</p>'
			}
		}
	}
};

let nextStep;
let prevStep;
let activeStep;

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
			activeStep = state.productForm.activeStep;
			nextStep = activeStep + 1;
			
			return {
				...state,
				productForm: {
					...state.productForm,
					activeStep: nextStep,
					componentName: state.productForm.componentsName[nextStep]?.component,
					product: {
						...state.productForm.product, 
						[action.payload.name]: action.payload.values
					},
					skipped: state.productForm.skipped.filter(id => id !== state.productForm.componentsName[activeStep].id)
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
					skipped: state.productForm.skipped.concat(state.productForm.componentsName[nextStep - 1].id),
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
