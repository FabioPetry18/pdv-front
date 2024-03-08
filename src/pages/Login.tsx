import React from "react";
import { ReactNode } from "react";
import Button from '@mui/material/Button'

interface Props {
    children: ReactNode;
}

export default function Login({ children }: Props) {
    return (
        <div>
            <h1>teste</h1>
            <Button variant="contained" color="primary" >
              as
            </Button>
            miuipa
        </div>
    )
}
