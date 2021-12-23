import axios from "axios";
import { BASE_URL, TOKEN } from "../constants";

export const api = {
  call() {
    return axios.create({
      baseURL: BASE_URL,
    });
  },
  callWithToken() {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  },
};
