import axios from "axios";
import api from "../api/axios";

interface useAddOnuResult {
  authenticationAddO: (groupAdd: createOnu) => Promise<string>;
}

export type createOnu = {
  type: string;
  file?: File;
  dataOne?: File;
  dataTwo?: File;
}

export const useAddOnu = (): useAddOnuResult => {

  const authenticationAddO = async (onuAdd: createOnu) => {
    try {
      const formData = new FormData();
      formData.append('type', onuAdd.type);
      if (onuAdd.file) formData.append('file', onuAdd.file);
      if (onuAdd.dataOne) formData.append('dataOne', onuAdd.dataOne);
      if (onuAdd.dataTwo) formData.append('dataTwo', onuAdd.dataTwo);

      const response = await api.post('/onus/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          return "user erro";
        }else if(error.response && error.response.status === 404){
            return "erro data empty"
        } 
        else {
          return "servidor erro";
        }
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  };

  return { authenticationAddO };
};
