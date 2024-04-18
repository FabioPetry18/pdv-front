import React, { useState } from "react";
import { ReactNode } from "react";
import Switch from '@mui/material/Switch'
import { useConfigStore } from "../store/configStore";
import { Paper, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserStore } from "@/store/UserStore";
import { useTheme } from "@/store/provider";
import ToogleTheme from "@/components/personal/ToogleTheme";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router'




const validation = z.object({
  usuario: z.string().min(3),
  senha: z.string().min(6).max(10)
})

type Validation = z.infer<typeof validation>

export default function Login() {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Validation>();
  const user = useUserStore(state => state.actions);
    
    async function getAuthenticating(data: Validation ){
      try {     
          await user.fetch(data)       
          navigate("/dashboard")
      } catch (error : any) {        
      }   
  }


    return (
      <div className="bg-bkg w-screen h-screen">
        <div className="flex items-center justify-center w-full h-full flex-col gap-14 font-semibold text-xl">
            <h1>Faça o login na sua conta</h1>
            <form className="w-72 h-72 flex flex-col" onSubmit={handleSubmit(getAuthenticating)}>
              <Label htmlFor="usuario">Usuário</Label>
              <Input {...register("usuario")} className="mb-10" type="usuario" id="usuario"  placeholder="Digite seu nome de usuário"/>
              <div className="w-72 h-3 flex justify-between items-center">
              <Label htmlFor="senha" className="mb-4">Senha</Label> 
                <span className="mb-4 text-primary font-semibold text-sm cursor-pointer">Esqueceu a senha?</span>
             </div>              
              <Input {...register("senha")} className="mb-1"  name="senha" type="password"  placeholder="Digite sua senha"/>
              <Button className="mt-4" type="submit" >Login</Button>
             </form>
        </div>
      </div>
    )
}
