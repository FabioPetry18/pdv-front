import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { useNavigate } from "react-router-dom";

export default function MenuSide(){
    const navigate = useNavigate();


    return(
        <>
         <Command>
                  <CommandInput placeholder="Pesquisar um módulo" />
                  <CommandList>
                      <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
                      <CommandGroup heading="Sugestões">
                      <div onClick={() => navigate('/dashboard')}><CommandItem>Dashboard</CommandItem></div>
                      <div onClick={() => navigate('teste')}><CommandItem >Estoque</CommandItem></div>
                      <div onClick={() => navigate('/teste2')}><CommandItem >Produtos</CommandItem></div>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandItem>Caixa</CommandItem>
                      <CommandItem>Relatórios</CommandItem>
                      <CommandItem>Funcionários</CommandItem>
                      <CommandSeparator />

                      <CommandGroup heading="Settings">
                      <CommandItem>Perfil</CommandItem>
                      <CommandItem>Assinatura</CommandItem>
                      <CommandItem>Configurações da loja</CommandItem>
                      </CommandGroup>
                  </CommandList>
                </Command>
        </>
    )
}