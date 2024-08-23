import {
    Calculator,
    Calendar,
    CreditCard,
    MenuIcon,
    Settings,
    Smile,
    User,
  } from "lucide-react"
  

  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { useState } from "react"
import ToogleTheme from "./ToogleTheme"
import { useMediaQuery } from "@/hooks/mediaQueries"
import MenuSide from "./menu"
import { Outlet } from "react-router-dom"
import { ComboFilial } from "./comboboxFilial"
import useUser from "@/hooks/useUser"

  export function FooterAndMenu() {
    const {state, actions} = useUser();

      const isDesktop = useMediaQuery("(min-width: 919px  )")
    return (
      <div className="w-full h-full  flex">
        <div className={`${isDesktop && ("w-[300px] border-r-[1px]")} h-screen flex flex-col gap-4 min-h-screen  p-4`}>          
          {isDesktop && (
            <>
             <Avatar name={state.user?.username}>
             <AvatarImage src="https://github.com/FabioPetry18.png" alt="fab" />
                <AvatarFallback>ER</AvatarFallback>
            </Avatar>   
            <ComboFilial/>
            <MenuSide/>  
            
            </>            
          )}
          {!isDesktop && (
            <div>           
              <Drawer direction="left">
              <DrawerTrigger asChild>
                  <MenuIcon/>
              </DrawerTrigger>
              <DrawerContent>
              <div className="mx-auto w-full max-w-sm p-2">
                    <div className="mt-6">
                      <Avatar>
                        <AvatarImage src="https://github.com/FabioPetry18.png" alt="fab" />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>  
                    </div>
                    <div className="mt-6">
                      <MenuSide />    
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                        <Button variant="outline">Fechar</Button>
                        </DrawerClose>
                    </DrawerFooter>
                    </div>
                </DrawerContent>
              </Drawer>
            </div>
          )}
        </div>
        <div className={`flex flex-1  scrollbar-thin scrollbar-thumb-blue-500  `}>
         <Outlet/>
        </div>
      </div>    
    )
  }
  