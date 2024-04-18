import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { UsuariosProps } from '../interface/Pedido';
import { IUser } from '../interface/login';
import Cookies from 'js-cookie'
import { RequestNoCacheNoAuthorization, RequestWithCaheWithAuthorization } from '@/service/Requisicao';
import { toast } from 'react-toastify';


export interface UserProps  {
  state: {
      user: UsuariosProps | null;
  }
  actions: actionProps

}


interface actionProps {
    addUser: (user: UsuariosProps) => void;
    removeUser: (userId: number) => void;
    fetch: (auth?: IUser, token?:string ) => void;

}

interface httpProps {
  isLoading: (user: UsuariosProps) => void;
  removeUser: (userId: number) => void;
  fetch: (auth?: IUser, token?:string ) => void;

}
export const useUserStore = create<UserProps>((set) => ({
      state: {
        user: null as UsuariosProps | null,
      },
      actions: {
        addUser: (user) =>
          set(() => ({
            state: { user: user },
          }))
          
          ,
        removeUser: () =>
          set(() => ({
            state: { user: null },
          })),
        fetch: async(auth?: any, token?: string) : Promise<void> => {
          try {
            const reponse =  auth ? await RequestNoCacheNoAuthorization('POST','login/autenticar', auth) : await RequestWithCaheWithAuthorization('GET','login/autenticar', undefined);
            set((state) => ({
              state: { user: reponse },
            }))
            const dataAtual = new Date();
            const dataDaqui2Horas = new Date(dataAtual);
            dataDaqui2Horas.setHours(dataAtual.getHours() + 2);
            Cookies.set("Authorization", reponse.token, {expires: dataDaqui2Horas})
            Cookies.set("Acessos", JSON.stringify(reponse.acessos))
            Cookies.set("User_type", reponse.userType)

          } catch (error : any) {
            toast.error(error.toString());
            throw new Error(error);
          }
        }  
      }
    }),
  );