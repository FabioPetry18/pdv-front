import Cookies from "js-cookie";
import { Children, ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";

interface RedirectTo{
RedirectTo: string,
children: ReactNode
}

export default function PrivateRoute(redirectTo: RedirectTo){

    const isAuthenticated = Cookies.get("Authorization") !== null && Cookies.get("Authorization") !== undefined;

    console.log("autenticado: " + isAuthenticated)
    return isAuthenticated ? redirectTo.children : <Navigate to={redirectTo.RedirectTo}/>
}