import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { LojasProps, UsuariosProps } from '../interface/Pedido';
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
    updateVisualizacaoLoja: (loja: LojasProps) => void;

}

export const useUserStore = create<UserProps>((set, get) => ({
      state: {
        user: null as UsuariosProps | null,
      },
      actions: {
        addUser: (usuario) => set((state) => ({ state: { ...state.state, user: usuario } })),
        removeUser: () => set((state) => ({ state: { ...state.state, user: null } })),
        updateVisualizacaoLoja: (loja) => set((state) => {
          const user = state.state.user;
          if (user) {
            return {
              state: {
                ...state.state,
                user: {
                  ...user,
                  visualizacaoLoja: loja,
                },
              },
            };
          }
          return state;
        }),
      },
    }));