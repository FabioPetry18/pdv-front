
import {create} from 'zustand'
import { PedidoProps } from '../interface/Pedido';
import { RequestNoCaheWithAuthorization } from '@/service/Requisicao';



interface OrderStoreProps  {
    state: {
        novosPedidos: PedidoProps[];
        pedidosAceitos: PedidoProps[]
    }
    actions: actionProps
}

interface actionProps {
    addPedidoAceito: (pedido: PedidoProps) => void;
    addPedidoNovo: (pedido: PedidoProps) => void;
    removerPedidoNovo: (productId: number) => void;
    fetchPedido: (LojaId:number) => Promise<void>;
    fetchConfirmarPedido: (pedido: PedidoProps) => Promise<void>;
    fetchCancelarPedido: (pedido: PedidoProps) => Promise<void>;


}

export const useOrderStore = create<OrderStoreProps>((set, get) => ({
    state: {
        novosPedidos: [],
        pedidosAceitos:[]
    },  
        actions: {
            addPedidoNovo: (pedido) => 
            set((state) => ({
                state: { 
                    novosPedidos: [...state.state.novosPedidos, pedido],
                    pedidosAceitos: state.state.pedidosAceitos
                }
            })),
            addPedidoAceito: (pedido) => 
            set((state) => ({
                state: { 
                    pedidosAceitos: [...state.state.novosPedidos, pedido],
                    novosPedidos: state.state.pedidosAceitos
                }
            })),
            removerPedidoNovo: (productId) =>
                set((state) => ({
                    state: {
                        novosPedidos: state.state.novosPedidos.filter(
                            (product) => product.pk.numeroPedido !== productId
                        ),
                        pedidosAceitos: state.state.pedidosAceitos
                    }
                })),
                fetchPedido: async(LojaId : number) : Promise<void> => {
                    try {
                        const pedidosAceitos :PedidoProps[]= await RequestNoCaheWithAuthorization('GET', `pedido?page=1&size=10&codloja=${LojaId}&status=2`, ''); 
                        const novosPedidos :PedidoProps[]= await RequestNoCaheWithAuthorization('GET', `pedido?page=1&size=10&codloja=${LojaId}&status=1`, ''); 
                        set(({
                            state: { 
                                pedidosAceitos: pedidosAceitos,
                                novosPedidos: novosPedidos
                            }
                        }))     
                        console.log(get().state.novosPedidos)
                    } catch (error : any) {
                      throw new Error(error);
                    }
                  },
                fetchConfirmarPedido: async(pedido : PedidoProps) : Promise<void> => {
                    try {
                        const response = RequestNoCaheWithAuthorization('PUT', "pedido", pedido)    
                        set((state) => ({
                            state: { 
                                pedidosAceitos: [...state.state.novosPedidos, pedido],
                                novosPedidos: state.state.novosPedidos
                            }
                        }))          
                    } catch (error : any) {
                        throw new Error(error);
                    }
                },
                fetchCancelarPedido: async(pedido : PedidoProps) : Promise<void> => {
                    try {
                        const response = RequestNoCaheWithAuthorization('DELETE', "pedido", pedido)    
                        set((state) => ({
                            state: {
                                novosPedidos: state.state.novosPedidos.filter(
                                    (product) => product.pk.numeroPedido !== pedido.pk.numeroPedido
                                ),
                                pedidosAceitos: state.state.pedidosAceitos
                            }
                        }))
                    } catch (error : any) {
                        throw new Error(error);
                    }
                },
            },
                   
})) 
