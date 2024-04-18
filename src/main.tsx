import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { BrowserRouter,createBrowserRouter,Route,RouterProvider,Routes } from 'react-router-dom'
import Login from './pages/Login'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { lightTheme } from './theme/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CustomTheme from './theme/CustomTheme'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'
import Teste from './pages/teste'
import Page404Error from './components/personal/Error404'
import { FooterAndMenu } from './components/personal/FooterAndMenu'
import PrivateRoute from './components/personal/PrivateRoute'
export default function App() {
  const [count, setCount] = useState(0)
 
  return (

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='dashboard' children={[
            <Route path='teste' element={<Teste/>}/>
          ]}
          element={<Dashboard/>}/>

        </Routes>
      </BrowserRouter>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element: <Login/>,    
    errorElement: <Page404Error/>,

  },
  {
    path:"dashboard",
    element: <FooterAndMenu/>,
    children: [
      {
        path:"/dashboard",
        element:
        <PrivateRoute RedirectTo='/'>
          <Dashboard/>
        </PrivateRoute>
      },
      {
        path:"teste",
        element:<Teste/>
      },
  ],
  },

])

const client = new  QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <CustomTheme>
        <ToastContainer/>
        <RouterProvider router={router}/>
      </CustomTheme>    
  </React.StrictMode>,
);

