import React, { useState } from "react";
import { ReactNode } from "react";
import Button from '@mui/material/Button'
import { useCookies } from "react-cookie";
import Switch from '@mui/material/Switch'
import { useConfigStore } from "../store/configStore";
import { Paper, Typography } from "@mui/material";
import Card from '@mui/material/Card';

interface Props {
    children: ReactNode;
}

export default function Login({ children }: Props) {
    const [handle, setHandle] = useState(false);
    const config = useConfigStore(state=>state);
    return (
        <div>
            <Typography variant="h2" component="h2"  >Login page</Typography>
            <Card sx={{flex: 'center', width: '200px', height:'200px'}} variant="outlined">teste</Card>
            <Paper sx={{flex: 'center', width: '200px', height:'200px'}} variant="outlined">teste</Paper>
            <Typography >{config.state.config?.mode}</Typography>
            <Switch
              value=""
              checked={handle}
              onChange={()=>{setHandle(!handle),config.actions.switch()}}
              inputProps={{ "aria-label": '' }}
            />
            <Button variant="contained" color="primary" >
              botão
            </Button>
        </div>
    )
}
