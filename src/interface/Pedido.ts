import { statusPedido } from "./pedidoEnum";

type StatusPedido = (typeof statusPedido)[keyof typeof statusPedido];

export interface PedidoProps {
    id: PedidoPK;
    produto:  Produto[];
    total:    number;
    pgto:     string;
    dtpedido:  Date;
    endereco: Endereco;
    cliente: string;
    status: StatusPedido
    idFuncionario: UsuariosProps
}
export interface PedidoPK {
    numeroPedido:    number;
    codproduto: number;
    idlojaPedido: number;
}

export interface Endereco {
    rua:    string;
    numero: string;
    cep:    string;
}

export interface Produto {
    codproduto: number;
    descricao: string;
    qtd:       number;
    idLojaProduto: number;
    idLojaEntrega: number;
    dpi:  number;
}

export interface UsuariosProps  {
    id: string 
    nome: string
    sobrenome: string
    username: string
    userType: 'ADMIN' | 'FORNECEDOR' | 'FUNCIONARIO' | 'DONO' | 'CLIENTE'
    Ativo: boolean
    lojas: LojasProps[]
    visualizacaoLoja: LojasProps
    acessos: Acessos[]
    assinatura: AssinaturaProps
    primeiroAcesso: boolean,
    token: string;
 }


interface AssinaturaProps  {
    qtdLojas: number
    dataAbertura: Date
    dataFechamento: Date
    dataUltimoPagamento: Date
    status: boolean
}

interface FuncionariosProps {
    idFuncionario: string
    nome: string
}

export interface LojasProps {
    id: number
    nome: string
    aberta: boolean
    horarioAbertura: number
    horarioFechamento: number
    funcionarios: FuncionariosProps[]
}
interface Acessos {
   nome:string
   href:string
}