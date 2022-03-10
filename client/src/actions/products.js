import { types } from "../types/types";
import { fetchWithoutToken } from "helpers/fetch";
import {
	uiStartLoadingAllProducts,
	uiStopLoadingAllProducts,
	uiStartLoadingProductsSections,
	uiStopLoadingProductsSections,
	uiStartCreateProduct,
	uiStopCreateProduct,
	uiStartSearchingProducts,
	uiStopSearchingProducts,
} from "actions/ui";
import Swal from "sweetalert2";

export const productsLoadAllproducts = () => {
	return async (dispatch) => {
		dispatch(uiStartLoadingAllProducts());
		const result = await fetchWithoutToken("products?limit=5000", "GET");
		if (!result.error) {
			let products = result.data.products;
			dispatch({
				type: types.productsLoadAllproducts,
				payload: {
					products
				},
			});
			dispatch(uiStopLoadingAllProducts());
		} else {
			dispatch(uiStopLoadingAllProducts(result.error));
		}
	};
};

export const productsLoadProductsSections = () => {
	return async (dispatch) => {
		dispatch(uiStartLoadingProductsSections());
		const result = await fetchWithoutToken("products-section", "GET");
		if (!result.error) {
			dispatch({
				type: types.productsLoadProductsSections,
				payload: {
					productsSections: result.data.productsSections
				},
			});
			dispatch(uiStopLoadingProductsSections(null, true));
		} else {
			dispatch(uiStopLoadingProductsSections(result.error, null));
		}
	};
};

export const productCreateProduct = (product) => {
	return async (dispatch) => {
		dispatch(uiStartCreateProduct());
		const result = await fetchWithoutToken("products", { product }, "POST");
		if (!result.error) {
			let product = result.data.product;
			dispatch({
				type: types.productCreateProduct,
				payload: {
					product
				},
			});
			dispatch(uiStopCreateProduct(null, true));
		} else {
			dispatch(uiStopCreateProduct(result.error, null));
		}
	};
};

export const productAddProductsSection = (productsSection, history) => {
	return async (dispatch) => {
		Swal.fire({
			title: "Cargando",
			text: "Creando Sección de Productos",
			didOpen: async () => {
				Swal.showLoading();
				const result = await fetchWithoutToken('products-section', { productsSection }, 'POST');
				if (!result.error) {
					dispatch({
						type: types.productAddProductsSection,
						payload: {
							productsSection: result.data.productsSection,
						},
					});
					Swal.fire({
						title: "Correcto!",
						text: "Redirigiendo a las secciones",
						icon: "success",
						timer: 2000,
						didOpen: async () => {
							Swal.showLoading();
						}
					}).then(() => {
						history.goBack();
					})
				} else {
					Swal.fire({
						icon: "error",
						title: "No se pudo crear la sección de productos",
						text: result.error,
					});
				}
			},
			allowOutsideClick: () => !Swal.isLoading(),
		});
	};
};

export const productsDeleteAllProducts = () => {
	return (dispatch) => {
		dispatch({
			type: types.productsDeleteAllProducts,
		});
	};
};

export const productsSearchProducts = search => {
	return async (dispatch) => {
		dispatch(uiStartSearchingProducts());
		const result = await fetchWithoutToken("products/search" + search);
		if (!result.error) {
			dispatch({
				type: types.productsSearchProducts,
				payload: {
					productsSearch: result.data.products,
				},
			});
			dispatch(uiStopSearchingProducts(null, true));
		} else {
			dispatch(uiStopSearchingProducts(result.error, null));
		}
	}
}