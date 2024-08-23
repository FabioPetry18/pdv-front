import axios from "axios";
import { useEffect, useState } from "react";

const hostname = 'http://localhost:8081';

interface ApiResponse{
  loading: boolean;
  isError: boolean;
  error: string;
  data: any;
  isFetched: boolean
}

export const request = axios.create({
    baseURL: hostname,
  });

  export const api_get = (endpoint: string,  FetchOnMount: boolean) => {
    const [state, setState] = useState<ApiResponse>({ loading: true, isError: false, error: '', data: null, isFetched: false });
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await request.get(endpoint);
          setState({ loading: false, isError: false, error: '', data: response.data,  isFetched: true });
        } catch (error) {
          let errorMessage = 'Erro desconhecido';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
          setState({ loading: false, isError: true, error: errorMessage, data: null,  isFetched: false });
        }
      };
      if(FetchOnMount) {
        fetchData();
      }
    }, [endpoint, FetchOnMount]);
  
    return state;
  };  

  export function api_post(endpoint: string, body: any, FetchOnMount: boolean) {
    const [state, setState] = useState<ApiResponse>({
      loading: true,
      isError: false,
      error: '',
      data: null,
      isFetched: false,
    });
  
    useEffect(() => {
      const fetchData = async () => {
        setState((prevState) => ({ ...prevState, loading: true }));
        try {
          const response = await request.post(endpoint, body);
          setState({
            loading: false,
            isError: false,
            error: '',
            data: response.data,
            isFetched: true,
          });
        } catch (error) {
          let errorMessage = 'Erro desconhecido';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          setState((prevState) => ({
            ...prevState,
            loading: false,
            isError: true,
            error: errorMessage,
          }));
        }
      };
  
      if (FetchOnMount) {
        fetchData();
      }
    }, [endpoint, body, FetchOnMount]);
  
    return state;
  }