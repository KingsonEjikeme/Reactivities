import axios, { AxiosResponse } from "axios";
import { IReactivities } from "../../lib";

axios.defaults.baseURL = "http://localhost:5001/api";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () =>
    requests.get<IReactivities["schemas"]["Activity"][]>("/activities"),
  details: (id: string) =>
    requests.get<IReactivities["schemas"]["Activity"]>(`/activities/${id}`),
  create: (body: IReactivities["schemas"]["Activity"]) =>
    requests.post<IReactivities["schemas"]["Activity"]>("/activities", body),
  update: (body: IReactivities["schemas"]["Activity"]) =>
    requests.put<IReactivities["schemas"]["Activity"]>(
      `/activities/${body.id}`,
      body
    ),
  delete: (id: string) =>
    requests.delete<IReactivities["schemas"]["Activity"]>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
