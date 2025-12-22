import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
    baseURL: 'https://blood-donation-server-side-ten.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        const responseInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            const status = error.response?.status;

            if (status === 401 || status === 403) {
                await logout();
                localStorage.removeItem('access-token'); // Safety cleanup
                toast.error('Session expired. Please login again.');
                navigate('/login');
            }
            return Promise.reject(error);
        });

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logout, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;