import { toast } from "react-toastify";

export default function tratamentoErros(msg: any){
    const errorMessage = msg && msg.message ? msg.message : 'Erro inesperado durante a requisição.';
    toast.error(errorMessage)
    throw Error;
  }