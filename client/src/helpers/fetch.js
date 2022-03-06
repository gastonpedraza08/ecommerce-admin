import axios from "axios";
let baseUrl;
if (process.env.NODE_ENV !== "production") {
	baseUrl = process.env.REACT_APP_API_URL_DEV;
	//baseUrl = 'http://192.168.0.18:5000/api'
} else {
	baseUrl = process.env.REACT_APP_API_URL;
}

export const fetchWithoutToken = async (endpoint, data, method = "GET") => {
  try {
    const url = `${baseUrl}/${endpoint}`;
    if (method === "GET") {
      const result = await axios({
        method,
        url,
      });
      return result;
    } else {
      const result = await axios({
        headers: {
          "content-type": "application/json",
        },
        method,
        url,
        data,
      });
      return result;
    }
  } catch (error) {
    if (error.response) {
      return {
        error: error.response.data.error
          ? error.response.data.error
          : "Error en el servidor",
      };
    }
    return { error: "Error en el servidor " };
  }
};

export const fetchWithToken = async (endpoint, data, method = "GET", tokenFn) => {
  try {
    const url = `${baseUrl}/${endpoint}`;
    let token;

    if (tokenFn) {
      token = tokenFn;
    } else {
      token = localStorage.getItem("token") || "";
    }

    if (method === "GET") {
      const result = await axios({
        headers: {
          "Authorization": 'Bearer' + token,
        },
        method,
        url,
      });
      return result;
    } else {
      const result = await axios({
        headers: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + token,
        },
        method,
        url,
        data,
      });
      return result;
    }
  } catch (error) {
    if (error.response) {
      return {
        error: error.response.data.error
          ? error.response.data.error
          : "Error en el servidor",
      };
    }
    return { error: "Error en el servidor " };
  }
};
