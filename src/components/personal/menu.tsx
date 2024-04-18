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

export default function MenuSide(){


    return(
        <>
         <Command>
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                      <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
                      <CommandGroup heading="Sugestões">
                      <CommandItem>Dashboard</CommandItem>
                      <CommandItem>Estoque</CommandItem>
                      <CommandItem>Produtos</CommandItem>
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