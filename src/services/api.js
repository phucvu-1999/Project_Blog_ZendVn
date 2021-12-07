import axios from 'axios'
import { BASE_URL } from "../constants";


export const api = {
  call() {
    return axios.create({
      baseURL: BASE_URL,
    });
  }
}
