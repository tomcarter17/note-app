import type { AxiosResponse, AxiosPromise, AxiosRequestConfig } from "axios";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

export const createRequest = <T>(config: AxiosRequestConfig): AxiosPromise<T> =>
  axios(config);

const baseMapper = <T, M = T>(response: AxiosResponse<T>): M =>
  response.data as T | M as M;

/**
 * Wraps a query function to pick particular keys from the response.
 *
 * Defaults to the `data` key in the response.
 */
export const responseWrapper = <T = unknown, M = T>(
  promise: AxiosPromise<T>,
  mapper: (response: AxiosResponse<T>) => M = baseMapper,
) => promise.then(mapper);
