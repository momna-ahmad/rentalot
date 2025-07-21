'use client' ;

import { createContext, useContext, useState} from 'react';
import axiosInstance from '../hooks/axiosInstance';

interface User {
  id: string;
  email: string;
  name?: string;
  role : 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  request: (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    body?: any
  ) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  request: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | any>(null);
    const [user, setUser] = useState<User | null>(null);

    const request = async (method: 'get' | 'post' | 'put' | 'delete', url: string , body?: any ) => {
        setLoading(true);

        try {
            const response = await axiosInstance({
                method,
                url,
                data : body,
            });
            
            setUser(response.data.user);
            return response ;
        } catch (err : string | any) {
            const backendError = err?.response?.data?.error;
            const fallbackError = err?.message || "Something went wrong";
            setError( backendError || fallbackError);
        } finally {
            setLoading(false);
        }
    };

    const logout = () =>{
      setUser(null) ;
    }

    return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        error,
        request,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};


export const useAuth = () => useContext(AuthContext);