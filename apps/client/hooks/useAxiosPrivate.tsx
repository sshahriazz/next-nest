import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { privateApi } from "@client/config/axios";
import { useAppSelector } from "@client/store/hooks";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const requestIntercept = privateApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken!}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = privateApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateApi(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateApi.interceptors.request.eject(requestIntercept);
      privateApi.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return privateApi;
};

export default useAxiosPrivate;
