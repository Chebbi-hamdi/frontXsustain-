import axios from "axios";

//const { REACT_APP_API_BACK } = process.env;

const customAxios = axios.create({
baseURL: "http://localhost:3000/api/v0/",
// baseURL: "http://192.168.11.113:3000/api/v0/",

});


customAxios.interceptors.request.use(
async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
     config.headers.authorization = `bearer ${token}`;
    }
    return config;
},
(error) => Promise.reject(error)
);

export default customAxios;
