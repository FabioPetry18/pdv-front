import { Skeleton } from "@/components/ui/skeleton";
import { useOrderStore } from "@/store/OrderStore";
import { useUserStore } from "@/store/UserStore";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { useAutenticarComToken } from "@/hooks/react-query-hooks";
import { PedidoProps, UsuariosProps } from "@/interface/Pedido";
import { useLocation } from "react-router-dom";
import useUser from "@/hooks/useUser";
import CadastroEntregador from "@/components/personal/CadastroEntregador";
import { useMediaQuery } from "@/hooks/mediaQueries";
import { api_get, api_post, request } from "@/api";
import { statusPedido } from "@/interface/pedidoEnum";

export default function Dashboard() {
  const isDesktop = useMediaQuery("(min-width: 919px)");
  const user = useUser();
  const order = useOrderStore(state => state)  
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [pedidos, setPedidos] = useState<PedidoProps[]>([]);


  const fetchPedidos = async () => {
    const headers = {
      Authorization: `Bearer ${user.state.user?.token}`
    };
  
    try {
      // Fazendo as duas requisições
      if (user.state.user?.visualizacaoLoja.id && user.state.user.token) {
        const [criadoResponse, novoResponse] = await Promise.all([
          request.get(`/pedido?page=1&size=10&codloja=${user.state.user?.visualizacaoLoja.id}&status=${statusPedido.CRIADO}`, { headers }),
          request.get(`/pedido?page=1&size=10&codloja=${user.state.user?.visualizacaoLoja.id}&status=${statusPedido.CONFIRMADO}`, { headers })
        ]);
      //  const eventSource = new EventSource(`http://localhost:8081/pedido/sse/${user.state.user?.visualizacaoLoja.id}`);


    //    return () => {
     //     eventSource.close();
    //    };
    
        // Extraindo os dados das respostas
        const criadoPedidos: PedidoProps[] = criadoResponse.data;
        const novoPedidos: PedidoProps[] = novoResponse.data;
        const pedidoExists = (lista: PedidoProps[], novoPedido: PedidoProps) => {
          return lista.some(pedido => pedido.id.numeroPedido === novoPedido.id.numeroPedido);
        };    
        // Combinando as duas listas
        //eventSource.onmessage = (event) => {
       //   console.log('Received event:', event);
      //    const novoPedido = JSON.parse(event.data);
      //    setPedidos((prevPedidos) => {
     //       if (!prevPedidos.some(pedido => pedido.id.numeroPedido === novoPedido.id.numeroPedido)) {
     //         return [...prevPedidos, novoPedido];
    //        }
    //        return prevPedidos;
     //     });
    //    };
        const todosPedidos = [...criadoPedidos, ...novoPedidos];
        console.log(todosPedidos[0].status)
        // Ordenando os pedidos (por exemplo, pelo campo 'data' ou 'id')
        todosPedidos.sort((a, b) => a.status - b.status); // Substitua 'data' pelo campo desejado para ordenação
    
        return todosPedidos;
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw error;
    }
  };
  const { data, isLoading, refetch } = useQuery(["pedidosAceitos"], fetchPedidos, {
    enabled: !!user.state.user && !!user.state.user?.visualizacaoLoja.id && !!user.state.user.token,
    retry: 0,
    refetchOnWindowFocus: false
  });
  useEffect(() => {
    if (data) {
      setPedidos(data);
    }
  }, [data]);


  useEffect(() => {
    if (user.state.user?.visualizacaoLoja.id) {
      const eventSource = new EventSource(`http://localhost:8081/pedido/sse/${user.state.user?.visualizacaoLoja.id}`);

      eventSource.onmessage = (event) => {
        console.log('Received event:', event);
        const novoPedido: PedidoProps = JSON.parse(event.data);

        setPedidos((prevPedidos) => {
          if (!prevPedidos.some(pedido => pedido.id.numeroPedido === novoPedido.id.numeroPedido)) {
            return [novoPedido,...prevPedidos];
          }
          return prevPedidos;
        });
      };

      refetch();

      return () => {
        eventSource.close();
      };
    }
  }, [user.state.user?.visualizacaoLoja.id]);

  if (isLoading) return <div>Loading</div>;
  if(pedidos.length === 0) return<div className="h-full w-full flex items-center justify-center">Não foi encontrado pedido no momento😟</div>;
  return (
    <div className={`flex-1 flex flex-shrink flex-wrap ${isDesktop ? 'm-4' : ''}`}>
    {pedidos && pedidos.map((card, index) => (
        <Card key={index} className="w-[300px] h-[350px] mx-1 mt-2 mb-4 flex-shrink-0 ">
          <CardHeader>
            <CardTitle>
               Nº {card.id.numeroPedido}
              <div className={`animate-ping inline-block ${card.status === 1 ? 'ml-2 w-2 h-2 bg-yellow-500' : 'ml-2  w-2 h-2 bg-green-500'} rounded-full`}></div>
            </CardTitle>
            <CardDescription>{new Date(card.dtpedido).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{new Date(card.dtpedido).toLocaleString()}</p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-3">
              <Button>Cancelar</Button>
              <Button>Confirmar</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
