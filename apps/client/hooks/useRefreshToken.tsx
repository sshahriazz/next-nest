import api from "@client/config/axios";
import { setAccessToken } from "@client/features/authSlice";
import { useAppDispatch, useAppSelector } from "@client/store/hooks";

const useRefreshToken = () => {
  const { refreshToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const refresh = async () => {
    const response = await api.get("/refresh", {
      withCredentials: true,
      headers: {
        "refresh-token": refreshToken,
      },
    });
    dispatch(setAccessToken(response.data.accessToken));

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
