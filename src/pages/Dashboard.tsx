import { Skeleton } from "@/components/ui/skeleton";
import { useOrderStore } from "@/store/OrderStore";
import { useUserStore } from "@/store/UserStore";
import { useEffect } from "react";
import { useQuery } from "react-query";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
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

export default function Dashboard() {
    const pedido = useOrderStore(state => state);
    const user = useUserStore(state => state);

    
    const { data, error, isLoading } = useQuery(["pedidosss"], () => {
        if (user.state.user && user.state.user.visualizacaoLoja) {
            return pedido.actions.fetchPedido(user.state.user.visualizacaoLoja.id);
        } else {
            user.actions.fetch();
            if (user.state.user && user.state.user.visualizacaoLoja) {
                return pedido.actions.fetchPedido(user.state.user.visualizacaoLoja.id);
            } 
        }
    },
    {
        cacheTime:0,
        refetchOnWindowFocus: false
    }
);


    if(isLoading) {
        return <h1>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>
    }
    if(error) return  <div className="w-full h-full flex items-center justify-center"><h1>Ocorreu um erro inesperado!</h1></div>

    if(pedido.state.novosPedidos.length === 0 && pedido.state.pedidosAceitos.length === 0) return  <div className="w-full h-full flex items-center justify-center"><h1>Não foi encontrado pedidos novos e/ou aceitos na data de hoje!</h1></div>


    return (
       <div className="w-[250px] h-[100px]">
        <Card>
            <CardHeader>
                <CardTitle>Nº </CardTitle>
                <CardDescription>{new Date().toString()}</CardDescription>
                <CardDescription>pix    </CardDescription>

            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

        <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Cadastrar entregador</Button>
      </SheetTrigger>
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
        

       </div>
    );
}
