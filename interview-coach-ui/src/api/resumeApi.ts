import API from "./axiosConfig";

export const uploadResume = async (
  file: File
) => {

  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post(
    "/api/resume/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};