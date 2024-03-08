import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { UsuariosProps } from '../interface/Pedido';
import { IUser } from '../interface/login';



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
export const useUserStoreZustand = create<UserProps>((set) => ({
      state: {
        user: null as UsuariosProps | null,
      },
      actions: {
        addUser: (user) =>
          set(() => ({
            state: { user: user },
          })),
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
           // Cookie.set("Authorization", reponse.token, {expires: dataDaqui2Horas})
            //Cookie.set("Acessos", JSON.stringify(reponse.acessos))
            //Cookie.set("User_type", reponse.userType)

          } catch (error : any) {
            throw new Error(error);
          }
        }  
      }
    }),
  );