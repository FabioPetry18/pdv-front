
export interface PedidoProps {
    pk: PedidoPK;
    numpedido:   number;
    produto:  Produto[];
    total:    number;
    pgto:     string;
    endereco: Endereco;
    cliente: string;
    idFuncionario: UsuariosProps
}
export interface PedidoPK {
    numpedido:    number;
    codloja: number;
}

export interface Endereco {
    rua:    string;
    numero: string;
    cep:    string;
}

export interface Produto {
    coditprod: string;
    descricao: string;
    qtd:       string;
    total:     number;
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
    primeiroAcesso: boolean
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

interface LojasProps {
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