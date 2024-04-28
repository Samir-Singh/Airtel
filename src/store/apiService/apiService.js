import axios from "axios";
import secureLocalStorage from "react-secure-storage";

let baseUrl = process.env.REACT_APP_BACKEND_URL;

export async function makeHttpRequest({
  method,
  url,
  data = null,
  headers = {},
  navigate,
}) {
  try {
    const config = {
      method: method.toLowerCase(),
      url: `${baseUrl}${url}`,
      headers: {
        platform: "WEB",
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("loginResponse"))?.bearerToken
        }`,
        ...headers,
      },
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    if (error?.response?.status === 401) {
      navigate("/");
      secureLocalStorage.clear();
      return;
    }

    throw error;
  }
}
