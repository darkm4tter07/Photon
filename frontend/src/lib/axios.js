import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: import.meta.env.MODE ==="development"? 'http://localhost:3000/api': 'https://photon-sepia.vercel.app/api',
    baseURL: 'https://photon-sepia.vercel.app/api',
    withCredentials: true,
});