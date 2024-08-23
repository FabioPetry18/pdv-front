import { LojasProps } from "@/interface/Pedido";
import Cookies from "js-cookie";

export default function atualizarLoja(loja:LojasProps){
    Cookies.set("loja",  JSON.stringify(loja));

}