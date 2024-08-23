import { LojasProps, UsuariosProps } from "@/interface/Pedido";
import { useUserStore } from "@/store/UserStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useUser() {
    const location = useLocation();
    const { state, actions } = useUserStore(state => state);

    useEffect(() => {
        if (location.state && location.state.userInfo) {
            actions.addUser(location.state.userInfo);
        }
    }, [location.state?.userInfo, actions]);

    return { state, actions };
}