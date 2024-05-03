import axios from "axios"
import { config } from './constants'

const connect = axios.create({
  baseURL: config.url.API_URL,
});

connect.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response)
    return Promise.reject(error);
  }
);


export default connect