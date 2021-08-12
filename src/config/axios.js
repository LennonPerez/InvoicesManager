import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "https://invoicesappapi.herokuapp.com//invoices",
});

export default AxiosClient;
