import React from "react";
import { ThemeProvider } from "@emotion/react";
import { useCookies } from "react-cookie";
import { lightTheme, darkTheme } from "./theme";
import { useConfigStore } from "../store/configStore";
interface CustomThemeProps {
    children: React.ReactNode;
  }
  
export default function CustomTheme({ children }: CustomThemeProps) {
    const [cookies, setCookie, removeCookie] = useCookies(["mode"])
    const config = useConfigStore(state => state);
      
        return (
          <ThemeProvider theme={config.state.config?.mode == 'light' ? lightTheme : darkTheme}>
            {children}
          </ThemeProvider>
        );
      }
    