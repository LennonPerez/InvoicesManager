import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:4000/",
  // baseURL: "https://my-json-server.typicode.com/LennonPerez/invoicesfakedb",
});

export default AxiosClient;
