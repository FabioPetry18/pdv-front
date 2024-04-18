import React from "react";
import { lightTheme, darkTheme } from "./theme";
import { useConfigStore } from "../store/configStore";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@/store/provider";
interface CustomThemeProps {
    children: React.ReactNode;
  }
  
export default function CustomTheme({ children }: CustomThemeProps) {
    const config = useConfigStore(state => state);
        const client = new QueryClient();
        //            <ThemeProvider theme={config.state.config?.mode == 'light' ? lightTheme : darkTheme}>
        
        return (
          <QueryClientProvider client={client}> 
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {children}
          </ThemeProvider>       
          </QueryClientProvider>
        );
      }
    