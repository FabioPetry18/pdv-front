import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { UsuariosProps } from '../interface/Pedido';
import { IUser } from '../interface/login';
import { light } from '@mui/material/styles/createPalette';

interface configProps{
    mode: 'light' | 'dark'
}

 interface config  {
  state: {
      config: configProps | null;
  }
  actions: actionProps

}


interface actionProps {
    switch: () => void;
}
export const useConfigStore = create<config>((set) => ({
      state: {
        config: {mode: "light"},
      },
      actions: {
        switch: () =>
          set((state) => ({
            state: { config: {mode: state.state.config?.mode == "light" ? "dark" : "light"} },
          })),
          
      }
    }),
  );