import  { api_post, request } from "@/api";
import { IUser } from "@/interface/login";
import { UsuariosProps } from "@/interface/Pedido";
import tratamentoErros from "@/utils/erros";
import Cookies from "js-cookie";

export async function fazerLoginUsuarioSenha(usuario: IUser): Promise<UsuariosProps>{
    try {
        const response =  api_post('/login/autenticar', usuario, false);
        if(response.isError){
            tratamentoErros(response.error);
        }
        const data: UsuariosProps = response.data;
        adicionarValoresCookies(data);
        return data;
    
    } catch (error) {
         throw error;
    }
}

export function adicionarValoresCookies(data:UsuariosProps){
    const dataAtual = new Date();
    const dataDaqui2Horas = new Date(dataAtual);
    dataDaqui2Horas.setHours(dataAtual.getHours() + 2);
    Cookies.set("Authorization", data.token, {expires: dataDaqui2Horas})
    Cookies.set("loja", JSON.stringify(data.visualizacaoLoja), {expires: dataDaqui2Horas})
  }

