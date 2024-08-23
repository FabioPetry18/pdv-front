import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '../interface/login';

export interface UserProps {
 state: {
    autenticacao: IUser | null;
 };
 actions: actionProps;
}

interface actionProps {
 addAuth: (user: IUser) => Promise<void>;
}

export const useAuthStore = create<UserProps>((set, get) => ({
 state: {
    autenticacao: null as IUser | null,
 },
 actions: {
    addAuth: (user: IUser): Promise<void> => {
      return new Promise((resolve) => {
        set((state) => {
          return { state: { autenticacao: user } };
        });
        // this prints the latest state
        console.log(get().state.autenticacao);
        resolve();
      });
    },
 },
}));