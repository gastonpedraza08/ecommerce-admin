import { types } from "../types/types";
import { fetchWithoutToken } from "helpers/fetch";
import {
} from "actions/ui";

export const authRegister = (values) => {
  return async dispatch => {
    const result = await fetchWithoutToken("auth/register", values, "POST");
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
    dispatch({
      type: types.authRegister
    });
  }
}