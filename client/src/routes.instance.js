import axios from "axios";

const routeInstance = axios.create();

routeInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["authorization"] = "Bearer " + accessToken;
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

routeInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");

    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      refreshToken
    ) {
      const response = await routeInstance({
        method: "POST",
        url: "/api/auth/refresh-token",
        data: { refreshToken },
      });
      if (!response) {
        throw new axios.Cancel();
      }
      const resData = await response.data;
      console.log("originalRequest", originalRequest);
      localStorage.setItem("accessToken", resData.data.accessToken);
      localStorage.setItem("refreshToken", resData.data.refreshToken);
      originalRequest.headers["authorization"] =
        "Bearer " + resData.data.accessToken;

      // const { method, url } = error.config;

      // let requestObject = {};
      // if (method === "GET") {
      //   requestObject = {
      //     method,
      //     url,
      //   };
      // } else {
      //   const requestData = error.config.data;
      //   console.log("dataa", requestData);
      //   requestObject = {
      //     method,
      //     url,
      //     data: requestData,
      //   };
      // }
      return routeInstance(originalRequest);
    }
  }
);

export default routeInstance;
