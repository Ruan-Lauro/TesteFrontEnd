import axios from "axios";
import api from "../api/axios";

interface useGetOnuResult {
  authenticationON: () => Promise<onu[] | string>;
}

export type onu = {
  id: number,
  slot: number;
  port: number;
  ont_id: string;
  sn: string;
  state: string | null;
  origin: string;
}


export const useGetOnu = (): useGetOnuResult => {
 

  const authenticationON = async () => {
    try {
      const response = await api.get('/onus/');

      
      return response.data;
    } catch (error) {
     
      if (axios.isAxiosError(error)) {
        
        if (error.response && error.response.status === 400) {
          return "user erro"
        } else {
          return "servidor erro"
        }
      } else {
       
        console.error('Erro desconhecido:', error)
      }
    }

  };

  return { authenticationON };
};