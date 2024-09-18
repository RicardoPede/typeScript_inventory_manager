import { useAxios } from "./AxiosContext";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
    const axios = useAxios();
    const [user, setUser] = useState<User | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const register = async (formData: any) => {
        try {
            const response = await axios.post('/auth/register', formData);
            console.log('response', response);
            setUser(response.data.user.username);
            setToken(response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            console.error('Error al registrar usuario', error);
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            register,
            token,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

export const useAuth = () => {
    return useContext(AuthContext);
}

export interface AuthContextData {
    user: User | null;
    setUser: (user: User) => void;
    token: string | null;
    register: (formData: any) => Promise<User>;
    logout: () => void;
}

export interface User {
    id: number;
    name: string;
    username: string;
    avatar: string;
}