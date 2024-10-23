import axios from "axios";

const axiosFetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL_DEVELOPMENT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosFetcher;
