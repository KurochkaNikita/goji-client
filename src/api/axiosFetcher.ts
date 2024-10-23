import axios from "axios";

const axiosFetcher = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosFetcher;
