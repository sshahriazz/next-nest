import { AxiosError } from "axios";
import { baseApi } from "./axios-instance";
import toast from "react-hot-toast";

export const authPath = "/auth";
export interface SigninDto {
  arg: { email: string; password: string };
}

export interface SignupDto {
  args: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  };
}

export async function getUser({ accessToken }: { accessToken: string }) {
  try {
    const response = await baseApi.get(authPath + `/user/${accessToken}`);
    return response.data;
  } catch (e: any) {
    // toast.error(e.response.data.message);
    throw e;
  }
}

export async function signin(key: string, { arg }: Readonly<SigninDto>) {
  try {
    const response = await baseApi.post(authPath + "/signin", {
      email: arg.email,
      password: arg.password,
    });
    toast.success(response.data.message);
    return response.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    throw e;
  }
}
export async function signup(url: string, { args }: SignupDto) {
  const response = await baseApi.post(authPath + "/signup", {
    firstname: args.firstname,
    lastname: args.lastname,
    email: args.email,
    password: args.password,
  });
  return response.data;
}
