
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useUser from "@/hooks/useUser"
import { toast } from "react-toastify"



export function ComboFilial() {
    const {state, actions} = useUser();

  const [open, setOpen] = React.useState(false)

  return (
    <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {state.user?.visualizacaoLoja
            ? state.user.lojas.find((framework) => framework.nome.toLowerCase() === state.user?.visualizacaoLoja.nome.toLowerCase())?.nome
            : "Selecione sua loja"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>  
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Selecione sua loja" />
          <CommandEmpty>Nenhuma loja encontrada.</CommandEmpty>
          <CommandGroup>
            {state.user?.lojas.map((framework) => (
              <CommandItem
                key={framework.nome}
                value={framework.nome}
                onSelect={(currentValue) => {
                  const valor  = state.user?.lojas.find((framework) => framework.nome.toLowerCase() === currentValue.toLowerCase())
                  if(valor){
                    actions.updateVisualizacaoLoja(valor);
                  }else {
                    toast.error("Teste");
                  }
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    state.user?.visualizacaoLoja.nome.toLowerCase() === framework.nome.toLowerCase() ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.nome}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
    </>
  )
}
