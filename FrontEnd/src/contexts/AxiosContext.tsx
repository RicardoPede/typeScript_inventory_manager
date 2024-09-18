import axios from "axios";
import React, { createContext, useContext } from "react";

const AxiosContext = createContext(axios.create());

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store/store";

interface AxiosProviderProps {
    children: ReactNode;
}



export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
    const token = useSelector((state: AppState) => state.auth.token);

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:4000/api',
    });

    axiosInstance.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return (
        <AxiosContext.Provider value={axiosInstance}>
            {children}
        </AxiosContext.Provider>
    );
};

export const useAxios = () => {
    return useContext(AxiosContext);
};