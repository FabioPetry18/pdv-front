import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { lightTheme } from './theme/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Cookies } from 'react-cookie'
import CustomTheme from './theme/CustomTheme'

export default function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login children={undefined}/>}/>
        </Routes>
      </BrowserRouter>
  )
}


//<QueryClientProvider client={client}>
//   </QueryClientProvider>
const client = new  QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomTheme>
      <CssBaseline />
      <App />
    </CustomTheme>    
  </React.StrictMode>,
);

