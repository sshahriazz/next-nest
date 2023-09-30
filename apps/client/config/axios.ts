import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://127.0.0.1:4000",
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "http://127.0,0.1:3000",
  },
});
export const privateApi = axios.create({
  baseURL: "http://127.0.0.1:4000",
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "http://127.0,0.1:3000",
  },
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    toast.error(
      error.response.data.statusCode + " " + error.response.data.message
    );
    return error;
  }
);

privateApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    toast.error(
      error.response.data.statusCode + " " + error.response.data.message
    );
    return error;
  }
);

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);

    return Promise.reject(error);
  }
);

export const setAccessTokenHeader = (token: string) => {
  privateApi.defaults.headers.get["Authorization"] = "Bearer " + token;
  privateApi.defaults.headers.post["Authorization"] = "Bearer " + token;
  privateApi.defaults.headers.put["Authorization"] = "Bearer " + token;
  privateApi.defaults.headers.delete["Authorization"] = "Bearer " + token;
};

export default api;
