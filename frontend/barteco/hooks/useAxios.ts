
import { useState} from 'react';
import axiosInstance from './axiosInstance';


export default function useAxiosInstance() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | any>(null);
    const [success, setSuccess] = useState<any>(null);

    const request = async (method: 'get' | 'post' | 'put' | 'delete', url: string , body?: any ) => {
        setLoading(true);

        try {
            const response = await axiosInstance({
                method,
                url,
                data : body,
            });
            
            setSuccess(response.data);
            return response ;
        } catch (err : string | any) {
            const backendError = err?.response?.data?.error;
            const fallbackError = err?.message || "Something went wrong";
            setError({value : backendError || fallbackError});
        } finally {
            setLoading(false);
        }
    };

    return { request , success , loading , error };

}