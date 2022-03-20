import { types } from "../types/types";
import { validateImage } from "helpers/validateImage";
import { fetchWithoutToken } from "helpers/fetch";
import {
  uiStartLoadingAllSlides,
  uiStopLoadingAllSlides,
  uiStartAddMoreAllSlides,
  uiStopAddMoreAllSlides,
  uiStartLoadingCurrentSlides,
  uiStopLoadingCurrentSlides,
} from "actions/ui";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';

export const slideUpload = (file) => {
  return async (dispatch) => {
    const { base64, error, fileType } = await validateImage(file, ["jpg", "png", "jpeg"]);
    if (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo subir la imagen",
        text: error,
      });
    } else {
      Swal.fire({
        title: "Cargando",
        text: "Subiendo slide al servidor",
        didOpen: async () => {
          Swal.showLoading();
          const result = await fetchWithoutToken(
            "slides",
            { 
              slide: { 
                base64, 
                name: uuidv4() + '.' + fileType
              } 
            },
            "POST"
          );
          if (!result.error) {
            dispatch({
              type: types.slideUpload,
              payload: [result.data.slide],
            });
            Swal.fire("Correcto!", "Slide subido correctamente", "success");
          } else {
            Swal.fire({
              icon: "error",
              title: "No se pudo subir la imagem",
              text: result.error,
            });
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    }
  };
};

export const slideChangeOrder = (order) => {
  return async (dispatch, currentState) => {
    Swal.fire({
      title: "Cargando",
      text: "Actualizando el orden de las slides",
      didOpen: async () => {
        Swal.showLoading();
        const result = await fetchWithoutToken(
          "slides/change-order",
          { slides: order },
          "PUT"
        );
        if (!result.error) {
          const orderedSlides = order.map((num) => {
            const sli = currentState().slides.slideCurrentSlides.find(
              (slide) => slide.id === num
            );
            return sli;
          });
          dispatch({
            type: types.slideLoadCurrentSlides,
            payload: orderedSlides,
          });
          Swal.fire("Correcto!", "Se cambio el orden correctamente", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo actualizar el orden",
            text: result.error,
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
};

export const slideAddMoreAllSlides = (query) => {
  return async (dispatch, currentState) => {
    dispatch(uiStartAddMoreAllSlides());
    const result = await fetchWithoutToken("slides" + query, "GET");
    if (!result.error) {
      const thereIsMore =
        parseInt(result.data.count) >
        currentState().slides.slides.length + result.data.slides.length;
      dispatch({
        type: types.slideAddMoreAllSlides,
        payload: {
          slides: result.data.slides,
          slideThereIsMoreSlides: thereIsMore,
        },
      });
      dispatch(uiStopAddMoreAllSlides());
    } else {
      dispatch(uiStopAddMoreAllSlides(result.error));
    }
  };
};

export const slideLoadAllSlides = (query) => {
  return async (dispatch, currentState) => {
    dispatch(uiStartLoadingAllSlides());
    const result = await fetchWithoutToken("slides" + query, "GET");
    if (!result.error) {
      const thereIsMore =
        parseInt(result.data.count) > result.data.slides.length;
      dispatch({
        type: types.slideLoadAllSlides,
        payload: {
          slides: result.data.slides,
          slideThereIsMoreSlides: thereIsMore,
        },
      });
      dispatch(uiStopLoadingAllSlides());
    } else {
      dispatch(uiStopLoadingAllSlides(result.error));
    }
  };
};

export const slideLoadCurrentSlides = () => {
  return async (dispatch, currentState) => {
    dispatch(uiStartLoadingCurrentSlides());
    const result = await fetchWithoutToken(
      "slides" +
        "?order=ASC&orderBy=order&from=1&limit=10&isCurrentSelected=true",
      "GET"
    );
    if (!result.error) {
      dispatch({
        type: types.slideLoadCurrentSlides,
        payload: result.data.slides,
      });
      dispatch(uiStopLoadingCurrentSlides());
    } else {
      dispatch(uiStopLoadingCurrentSlides(result.error));
    }
  };
};

export const slideAddToCurrentSlides = (slide) => {
  return async (dispatch) => {
    Swal.fire({
      title: "Cargando",
      text: "Añadiendo a Slides Actuales",
      didOpen: async () => {
        Swal.showLoading();
        const result = await fetchWithoutToken(
          `slides/${slide.id}`,
          { isCurrentSelected: true },
          "PUT"
        );
        if (!result.error) {
          dispatch({
            type: types.slideAddToCurrentSlides,
            payload: {
              slide,
            },
          });
          Swal.fire("Correcto!", "Añadido a Slides Actuales", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo añadir a Slides Actuales",
            text: result.error,
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
};

export const slideDelete = (id) => {
  return async (dispatch) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar este slide?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        Swal.getCancelButton().style.display = "none";
        const result = await fetchWithoutToken(`slides/${id}`, {}, "DELETE");
        if (!result.error) {
          dispatch({
            type: types.slideDelete,
            payload: {
              id,
            },
          });
          Swal.fire("Correcto!", "Slide eliminado correctamente", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo eliminar el slide",
            text: result.error,
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
};
