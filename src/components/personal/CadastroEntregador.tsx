import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function CadastroEntregador(){
    
    return(
        <Sheet>
        {true && (
          <SheetTrigger asChild>
      <Button variant="outline">Cadastrar entregador</Button>
    </SheetTrigger>
        )}
    
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Cadastro de entregador</SheetTitle>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nome do entregador
          </Label>
          <Input id="name" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            nome de usuário
          </Label>
          <Input id="username"  className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            senha
          </Label>
          <Input id="username"  className="col-span-3" />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Cadastrar</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
    )
}