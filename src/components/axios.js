import axios from "axios";
// Crée une instance Axios
// const  api = axios.create({
//   baseURL: "http://localhost:5000/api",
  
// });
const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}api`, // Utilise l'URL définie dans le fichier .env
  withCredentials: true,
});
// Intercepteur pour inclure automatiquement le token dans les en-têtes des requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajoute le token JWT dans l'en-tête
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
