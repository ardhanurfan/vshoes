import axios, { AxiosResponse } from "axios";

const url = "https://apivshoes.ardhanurfan.my.id/";
// const url = "http://127.0.0.1:8000/";

export const post = async (
  api: string,
  form: any
): Promise<AxiosResponse<any, any>> => {
  return await axios.post(url + api, form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const postWithAuth = async (
  api: string,
  form: any,
  token: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.post(url + api, form, {
    headers: {
      // Accept: "multipart/form-data",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token,
    },
  });
};

export const postWithAuthJson = async (
  api: string,
  json: any,
  token: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.post(url + api, json, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const get = async (
  apiParams: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.get(url + apiParams);
};

export const getWithAuth = async (
  token: string,
  apiParams: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.get(url + apiParams, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

export const deleteWithAuth = async (
  api: string,
  token: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.delete(url + api, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
