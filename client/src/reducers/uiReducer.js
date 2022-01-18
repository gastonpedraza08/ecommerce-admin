import { types } from "../types/types";

const initialState = {
	uiSidebarOpen: false,
	uiLoadingAllSlides: {
		isLoading: false,
		error: false,
	},
	uiLoadingCurrentSlides: {
		isLoading: false,
		error: false,
	},
	uiLoadingMoreAllSlides: {
		isLoading: true,
		error: false,
	},
	uiLoadingAllProducts: {
		isLoading: true,
		error: false,
	},
	uiCreateProduct: {
		isLoading: false,
		error: null,
		success: null
	},
	uiAddProductsSection: {
		isLoading: false,
		error: null,
		success: null
	},
	uiAllProductsSections: {
		isLoading: false,
		error: null,
		success: null
	},
	uiSearchingProducts: {
		isLoading: false,
		error: null,
		success: null,
	}
};

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.uiToggleSidebarMobile:
			return {
				...state,
				uiSidebarOpen: !state.uiSidebarOpen,
			};
		case types.uiStartLoadingAllSlides:
			return {
				...state,
				uiLoadingAllSlides: {
					isLoading: true,
					error: false,
				},
			};
		case types.uiStopLoadingAllSlides:
			return {
				...state,
				uiLoadingAllSlides: {
					...state.uiLoadingAllSlides,
					isLoading: false,
					error: action.payload,
				},
			};
		case types.uiStartAddMoreAllSlides:
			return {
				...state,
				uiLoadingMoreAllSlides: {
					isLoading: true,
					error: false,
				},
			};
		case types.uiStopAddMoreAllSlides:
			return {
				...state,
				uiLoadingMoreAllSlides: {
					isLoading: false,
					error: action.payload,
				},
			};
		case types.uiStartLoadingCurrentSlides:
			return {
				...state,
				uiLoadingCurrentSlides: {
					isLoading: true,
					error: false,
				},
			};
		case types.uiStopLoadingCurrentSlides:
			return {
				...state,
				uiLoadingCurrentSlides: {
					isLoading: false,
					error: action.payload,
				},
			};
		case types.uiStartLoadingAllProducts:
			return {
				...state,
				uiLoadingAllProducts: {
					isLoading: true,
					error: null
				}
			};
		case types.uiStopLoadingAllProducts:
			return {
				...state,
				uiLoadingAllProducts: {
					isLoading: false,
					error: action.payload
				}
			};
		case types.uiStartCreateProduct:
			return {
				...state,
				uiCreateProduct: {
					isLoading: true,
					error: null,
					success: null
				}
			};
		case types.uiStopCreateProduct:
			return {
				...state,
				uiCreateProduct: {
					isLoading: false,
					error: action.payload.error,
					success: action.payload.success
				}
			};
		case types.uiStartAddProductsSection:
			return {
				...state,
				uiAddProductsSection: {
					isLoading: true,
					error: null,
					success: null
				}
			};
		case types.uiStartAddProductsSection:
			return {
				...state,
				uiAddProductsSection: {
					isLoading: false,
					error: action.payload.error,
					success: action.payload.success
				}
			};
		case types.uiStartLoadingProductsSections:
			return {
				...state,
				uiAllProductsSections: {
					isLoading: true,
					error: null,
					success: null
				}
			};
		case types.uiStopLoadingProductsSections:
			return {
				...state,
				uiAllProductsSections: {
					isLoading: false,
					error: action.payload.error,
					success: action.payload.success
				}
			};
		case types.uiStartSearchingProducts:
			return {
				...state,
				uiSearchingProducts: {
					isLoading: true,
					error: null,
					success: null
				}
			};
		case types.uiStopSearchingProducts:
			return {
				...state,
				uiSearchingProducts: {
					isLoading: false,
					error: action.payload.error,
					success: action.payload.success
				}
			};
		default:
			return state;
	}
};