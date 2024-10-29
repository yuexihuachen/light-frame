import axios, { AxiosError } from "axios";
import { nanoid } from "nanoid";
import {CONSTANTS} from "../constants/constants"

const httpRequest = axios.create({
  baseURL: "/",
  timeout: 10000,
});

const errorHandler = (error: AxiosError) => {
  let errorMsg = {
    code: -1,
    message: "failed",
    data: {},
  };
  if (error.message) {
    errorMsg.data = {
      message: error.message,
      errorCode: error.code,
    };
  } else {
    errorMsg.data = CONSTANTS.ERRORS.defaultErrorMessage
  }
  return Promise.resolve(errorMsg);
};

//request interceptor
httpRequest.interceptors.request.use(
  function (config) {
    //request id 方便查问题，定位request 的时间
    config.headers["X-Request-ID"] = nanoid();

    return config;
  },
  function (error) {
    return errorHandler(error);
  }
);

//response interceptor
httpRequest.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error: AxiosError) {
    return errorHandler(error);
  }
);

export default httpRequest;
