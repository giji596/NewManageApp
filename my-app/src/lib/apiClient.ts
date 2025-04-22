import aspida from "@aspida/axios";
import api from "@/aspida/api/$api";

const apiClient = api(aspida(undefined, { baseURL: "/api" }));
export default apiClient;
