import { types } from "../types/types";
import { fetchWithoutToken } from "helpers/fetch";
import {
	uiStartLoadingProductsSections,
	uiStopLoadingProductsSections,
	uiStartCreateProduct,
	uiStopCreateProduct,
	uiStartSearchingProducts,
	uiStopSearchingProducts,
} from "actions/ui";
import Swal from "sweetalert2";


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

export const productCreateProduct = (productInfo) => {
	return async (dispatch) => {
		let product = {};
		for (let prop in productInfo) {
			for (let prop2 in productInfo[prop]) {
				product[prop2] = productInfo[prop][prop2]
			}
		}

		product.images = product.images.map(img => {
			return img.url
		})
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
			dispatch(productCreateHandleNext({}))
			dispatch(productCreateHandleFinish())
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

export const productUpdateProductsSection = (productsSection, history) => {
	return async (dispatch) => {
		Swal.fire({
			title: "Cargando",
			text: "Actualizando Sección de Productos",
			didOpen: async () => {
				Swal.showLoading();
				const result = await fetchWithoutToken('products-section/' + productsSection._id, { fieldsToUpdate: productsSection }, 'PUT');
				if (!result.error) {
					dispatch({
						type: types.productUpdateProductsSection,
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
						title: "No se pudo actualizar la sección de productos",
						text: result.error,
					});
				}
			},
			allowOutsideClick: () => !Swal.isLoading(),
		});
	};
};

export const productDeleteProductsSection = id => {
	return async (dispatch) => {
		Swal.fire({
			title: "Cargando",
			text: "Eliminando Sección de Productos",
			didOpen: async () => {
				Swal.showLoading();
				const result = await fetchWithoutToken('products-section/' + id, {}, 'DELETE');
				if (!result.error) {
					dispatch({
						type: types.productDeleteProductsSection,
						payload: id
					});
					Swal.fire({
						title: "Correcto!",
						text: "Sección de Productos eliminada con éxito.",
						icon: "success",
					})
				} else {
					Swal.fire({
						icon: "error",
						title: "No se pudo eliminar la sección de productos",
						text: result.error,
					});
				}
			},
			allowOutsideClick: () => !Swal.isLoading(),
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
					count: result.data.count,
					numberOfPages: result.data.numberOfPages,
				},
			});
			dispatch(uiStopSearchingProducts(null, true));
		} else {
			dispatch(uiStopSearchingProducts(result.error, null));
		}
	}
}

export const productCreateHandleNext = (values) => {
  return {
    type: types.productCreateHandleNext,
    payload: values
  };  
}

export const productCreateHandleBack = () => {
  return {
    type: types.productCreateHandleBack,
  };  
}

export const productCreateHandleSkip = () => {
  return {
    type: types.productCreateHandleSkip,
  };  
}

export const productCreateHandleReset = () => {
  return {
    type: types.productCreateHandleReset,
  };  
}

export const productCreateHandleFinish = () => {
  return {
    type: types.productCreateHandleFinish,
  };  
}

export const productCreateHandleSetCategory = categoryId => {
  return {
    type: types.productCreateHandleSetCategory,
    payload: {
    	categoryId
    }
  };  
}