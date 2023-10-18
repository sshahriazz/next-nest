import { baseApi } from "./axios-instance";
import toast from "react-hot-toast";

export const resumePath = "/resume";

export async function getResumes() {
  try {
    const response = await baseApi.get(resumePath);
    return response.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    throw e;
  }
}

export async function getResume({ id }: { id: string }) {
  try {
    const response = await baseApi.get(resumePath + `/${id}`);
    return response.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    throw e;
  }
}

export async function createResume({
  userId,
  resume,
}: {
  userId: string;
  resume: any;
}) {
  try {
    const response = await baseApi.post(resumePath + `/${userId}`, {
      resume,
    });
    return response.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    throw e;
  }
}

export async function updateResume({ resume }: { resume: any }) {
  try {
    const response = await baseApi.put(resumePath, resume);
    return response.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    throw e;
  }
}

export async function deleteResume({ id }: { id: string }) {
  try {
    const response = await baseApi.delete(resumePath + `/${id}`);
    return response.data;
  } catch (e: any) {
    toast.error(e.response.data.message);
    throw e;
  }
}
