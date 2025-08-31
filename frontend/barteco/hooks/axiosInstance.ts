//need two axios instances one for server components and one for client components
import axios from "axios";

//only accessible in server components

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default api;
