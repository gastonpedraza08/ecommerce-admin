import { types } from "../types/types";

export const uiHandleDrawerToggle = () => ({
	type: types.uiToggleSidebarMobile,
});
export const uiStopLoadingAllSlides = (error) => ({
	type: types.uiStopLoadingAllSlides,
	payload: error,
});
export const uiStartLoadingAllSlides = () => ({
	type: types.uiStartLoadingAllSlides,
});
export const uiStartAddMoreAllSlides = () => ({
	type: types.uiStartAddMoreAllSlides,
});

export const uiStopAddMoreAllSlides = (error) => ({
	type: types.uiStopAddMoreAllSlides,
	payload: error,
});

export const uiStartLoadingCurrentSlides = () => ({
	type: types.uiStartLoadingCurrentSlides,
});
export const uiStopLoadingCurrentSlides = (error) => ({
	type: types.uiStopLoadingCurrentSlides,
	payload: error,
});
export const uiStartLoadingAllProducts = () => ({
	type: types.uiStartLoadingAllProducts,
});
export const uiStopLoadingAllProducts = (error) => ({
	type: types.uiStopLoadingAllProducts,
	payload: error
});

export const uiStartCreateProduct = () => ({
	type: types.uiStartCreateProduct,
});

export const uiStopCreateProduct = (error, success) => ({
	type: types.uiStopCreateProduct,
	payload: {
		error,
		success
	},
});

export const uiStartAddProductsSection = () => ({
	type: types.uiStartAddProductsSection,
});

export const uiStopAddProductsSection = (error, success) => ({
	type: types.uiStopAddProductsSection,
	payload: {
		error,
		success
	},
});

export const uiStartLoadingProductsSections = () => ({
	type: types.uiStartLoadingProductsSections,
});

export const uiStopLoadingProductsSections = (error, success) => ({
	type: types.uiStopLoadingProductsSections,
	payload: {
		error,
		success
	},
});

export const uiStartSearchingProducts = () => ({
	type: types.uiStartSearchingProducts,
});

export const uiStopSearchingProducts = (error, success) => ({
	type: types.uiStopSearchingProducts,
	payload: {
		error,
		success
	},
});

/* USERS */
export const uiStartCreateUser = () => ({
	type: types.uiStartCreateUser,
});

export const uiStopCreateUser = (error, success) => ({
	type: types.uiStopCreateUser,
	payload: {
		error,
		success
	},
});

export const uiStartUpdateUser = () => ({
	type: types.uiStartUpdateUser,
});

export const uiStopUpdateUser = (error, success) => ({
	type: types.uiStopUpdateUser,
	payload: {
		error,
		success
	},
});