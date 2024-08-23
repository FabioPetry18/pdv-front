import { IUser } from "@/interface/login";
import { UsuariosProps } from "@/interface/Pedido";
import { useUserStore } from "@/store/UserStore";
import Cookies from "js-cookie";
import { QueryCache, QueryFunctionContext, useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const protocol = 'http://';
const host = 'localhost';
const port = ':8081';
const url = protocol + host + port;
const configQueryEnableTrue = {refetchOnWindowFocus: false, retry: 0, enabled: true}
const configQueryEnableFalse = {refetchOnWindowFocus: false, retry: 0, enabled: false}
const configQueryEnableFalseAndNoCache = {refetchOnWindowFocus: false, retry: 0, enabled: false, staleTime: 0,cacheTime: 0,  refetchInterval: 0,}

    
function tratamentoErros(msg: any){
  const errorMessage = msg && msg.message ? msg.message : 'Erro inesperado durante a requisição.';
  toast.error(errorMessage)
}
/*    LOGIN      */
// logar com username e senha

export async function getLoginWithUsernamePassword(ctx: QueryFunctionContext): Promise<UsuariosProps> {

 const [queryKey ,user] = ctx.queryKey;
 const isAuth = await fetch(url + '/login/autenticar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user), // Pass the user object directly
 });
 const response = await isAuth.json();
 if (!isAuth.ok) {
    tratamentoErros(response.message)    
 } else {
   const dataAtual = new Date();
   const dataDaqui2Horas = new Date(dataAtual);
   dataDaqui2Horas.setHours(dataAtual.getHours() + 2);
   Cookies.set("Authorization", response.token, {expires: dataDaqui2Horas})
 }
 return response;
}
export  function useAutenticarComUsuarioESenha(usuario: IUser){
  const query = useQuery(['autenticacao', usuario], getLoginWithUsernamePassword, configQueryEnableFalseAndNoCache);
  return query;
}
// logar com token
export async function getLoginWithToken(ctx: QueryFunctionContext): Promise<UsuariosProps> {
  const [queryKey ,auth] = ctx.queryKey;
  const isAuth = await fetch(url + '/login/autenticar', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': auth as string
     },
  });
  const response = await isAuth.json();
  if (!isAuth.ok) {
     tratamentoErros(response.message)    
  } 
  return response;
 }
 
 export  function useAutenticarComToken(token: string){
   const query = useQuery(['autenticacao', token], getLoginWithToken, configQueryEnableTrue);
   return query;
 }



